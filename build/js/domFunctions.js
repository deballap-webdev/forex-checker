export const toggleNavSection = (event, navSectionArray) => {
  const sectionId = event.target.closest("a").hash;
  if (!sectionId) return;
  for (let i = 0; i < navSectionArray.length; i++) {
    if (sectionId === "#" + navSectionArray[i].id) {
      navSectionArray[i].classList.add("flex");
      navSectionArray[i].classList.remove("hidden");
    } else {
      navSectionArray[i].classList.remove("flex");
      navSectionArray[i].classList.add("hidden");
    }
  }
};

export const underlineActiveNav = (event, navLinkArray) => {
  for (let i = 0; i < navLinkArray.length; i++) {
    navLinkArray[i] === event.target.closest("a")
      ? navLinkArray[i].classList.add("active")
      : navLinkArray[i].classList.remove("active");
  }
};

export const applyDeleteHover = (event, deleteBtnArray, deleteBtn) => {
  if ([...deleteBtnArray].includes(deleteBtn)) {
    event.type === "mouseover"
      ? (deleteBtn.querySelector("img").src = "img/icon-delete-filled.svg")
      : (deleteBtn.querySelector("img").src = "img/icon-delete.svg");
  }
};

export const dropDownDisplay = (event, elemToToggle, btn) => {
  const key = event.type;
  const keyLookup = {
    click: () => {
      event.currentTarget
        .querySelector('[data-dropdown="true"]')
        .classList.toggle("rotate-180");
      elemToToggle.classList.toggle("hidden");
      elemToToggle.classList.toggle("flex");
      event.target.ariaExpanded =
        event.target.ariaExpanded === "true" ? "false" : "true";
    },
    keydown: () => {
      if (event.key !== "Escape") return;
      setTimeout(hideDropDown, 300, elemToToggle, btn);
      btn.focus();
    },
    focusout: () => {
      if (elemToToggle.contains(event.relatedTarget)) return;
      setTimeout(hideDropDown, 300, elemToToggle, btn);
      event.currentTarget.ariaExpanded = "false";
    },
  };
  const action = keyLookup[key];
  if (!action) return;
  action();
};

const hideDropDown = (elemToToggle, btn) => {
  btn.querySelector('[data-dropdown="true"]').classList.remove("rotate-180");
  elemToToggle.classList.add("hidden");
  elemToToggle.classList.remove("flex");
};

export const toggleIntervalBtn = (activeBtn, intervalBtns) => {
  intervalBtns.forEach((btn) => {
    btn === activeBtn
      ? btn.classList.add("active")
      : btn.classList.remove("active");
  });
};

export const favConvBtnDisplay = (event) => {
  const favConvBtn = event.currentTarget;
  favConvBtn.classList.toggle("favorited");
  favConvBtn.classList.toggle("unfavorited");
  const favIcon = favConvBtn.querySelector("img");
  if (favConvBtn.classList.contains("favorited")) {
    favIcon.src = "img/star-solid-full.svg";
    favConvBtn.querySelector("#fav-label").textContent = "FAVORITED";
  } else {
    favIcon.src = "img/icon-star.svg";
    favConvBtn.querySelector("#fav-label").textContent = "FAVOURITE";
  }
};

export const logConvBtnDisplay = (event) => {
  if (event.type === "mousedown") {
    const img = document.createElement("img");
    img.id = "check";
    img.src = "img/checkmark.png";
    img.width = "512";
    img.height = "512";
    img.classList.add("w-4", "h-4");
    event.currentTarget.classList.add("bg-PRIMARY", "text-SURFACE", "w-31.75");
    event.currentTarget.classList.remove("hover:bg-PRIMARY-SUBTLE");
    event.currentTarget.textContent = "LOGGED";
    event.currentTarget.append(img);
  } else {
    setTimeout(() => {
      event.target.closest("button").textContent = "LOG CONVERSION";
      event.target
        .closest("button")
        .classList.remove("bg-PRIMARY", "text-SURFACE", "w-31.75");
      event.target.closest("button").classList.add("hover:bg-PRIMARY-SUBTLE");
    }, 500);
  }
};

export const updateMobileNavBtn = (navObj) => {
  const { appState, exchangeData, navLink, navLinkArray, navSectionArray } =
    navObj;
  document.getElementById("activeSection").textContent =
    appState.getActiveSection();
  document.getElementById("numBox").textContent =
    appState.getActiveSection() === "FAVORITES"
      ? exchangeData.getFavorite().length
      : appState.getActiveSection() === "LOG"
        ? exchangeData.getLog().length
        : "";

  if (!document.getElementById("numBox").textContent.length) {
    document.getElementById("numBox").classList.add("hidden");
    document.getElementById("numBox").classList.remove("flex");
  } else {
    document.getElementById("numBox").classList.remove("hidden");
    document.getElementById("numBox").classList.add("flex");
  }
};

const buildCompareItem = (forexObj, currency, amount, exchangeData) => {
  const flagObj = {
    src: `img/flags/${currency.code.toLowerCase().slice(0, 2)}.webp`,
    width: "200",
    height: "200",
    altText: `${getCountryName(currency.name)} flag`,
    classArray: ["flag"],
  };
  const flag = buildIcon(flagObj);
  const code = createElem("div", ["name-abbr"], currency.code);
  const name = createElem("div", ["name-full"], currency.name);
  const value = createElem("div", ["value"], amount);
  const rate = createElem("div", ["exchange-rate"], `@ ${forexObj.rate}`);
  const favPair = exchangeData
    .getFavorite()
    .find(
      (fav) =>
        fav.getId() ===
        `${exchangeData.getCurrentBase().code} ${forexObj.quote}`,
    );
  const src = favPair ? "img/icon-star-filled.svg" : "img/icon-star.svg";

  const favIcon = buildIcon({
    src: src,
    altText: "star icon",
    width: "16",
    height: "16",
    classArray: ["h-4", "w-4"],
  });
  const pairContainer = createCard("div", ["pair-container"], [code, name]);
  const exchangeCotainer = createCard(
    "div",
    ["exchange-container"],
    [value, rate],
  );
  const favBtn = createCard("button", ["fav-btn"], [favIcon]);
  if (favPair) {
    favBtn.ariaLabel = "remove pair from favorites";
    favBtn.classList.add("active");
  } else {
    favBtn.ariaLabel = "add pair to favorites";
    favBtn.classList.remove("active");
  }
  favBtn.title = "favorites button";
  const compareCurrency = createCard(
    "div",
    ["compare-currency"],
    [flag, pairContainer, exchangeCotainer, favBtn],
  );

  compareCurrency.setAttribute("tabindex", "1");
  compareCurrency.title = `load ${currency.code} into converter`;
  compareCurrency.ariaLabel = `load ${currency.name} into converter as receiving currency`;
  return compareCurrency;
};

export const renderCompareSection = (compareObj) => {
  const { baseValue, exchangeData, availableCurrencies, ratesData } =
    compareObj;
  let number = 0;
  const notEmpty = document.getElementById("notEmpty__compare");
  const emptyState = document.getElementById("emptyState__compare");
  const amountDisplay = document.getElementById("compare__amount");
  const baseScreenReader = document.getElementById("compare__base");
  const pairNumber = document.getElementById("compare__pairs");

  baseScreenReader.textContent = exchangeData.getCurrentBase().name;
  amountDisplay.textContent = `${baseValue} FROM ${exchangeData.getCurrentBase().code}`;
  const compareContainer = document.getElementById("compareContainer");
  clearElem(compareContainer);
  if (!baseValue || !Number(baseValue)) {
    hide(notEmpty);
    show(emptyState);
    return;
  } else {
    hide(emptyState);
    show(notEmpty);
  }
  availableCurrencies.forEach((currency) => {
    if (
      currency.code !== exchangeData.getCurrentBase().code &&
      currency.code !== exchangeData.getCurrentQuote().code
    ) {
      const forexObj = ratesData.find((data) => {
        return data.quote === currency.code;
      });
      if (!forexObj) return;

      const compareValue = Number.parseFloat(
        (forexObj.rate * baseValue).toFixed(4),
      );

      const compareItem = buildCompareItem(
        forexObj,
        currency,
        compareValue,
        exchangeData,
      );
      compareContainer.append(compareItem);
      number++;
    }
  });
  pairNumber.textContent = `${number} pairs`;
};

const show = (elem) => {
  elem.classList.add("flex");
  elem.classList.remove("hidden");
};

export const hide = (elem) => {
  elem.classList.remove("flex");
  elem.classList.add("hidden");
};

export const updateInputDisplay = (input, value) => {
  input.value = value;
};
export const buildPicker = (
  popularCurrencies,
  otherCurrencies,
  exchangeData,
) => {
  const recievePicker = document.getElementById("receivePicker");
  const sendPicker = document.getElementById("sendPicker");
  const sendObj = {
    elem: sendPicker,
    popularCurrencies: popularCurrencies,
    otherCurrencies: otherCurrencies,
    type: "base",
    exchangeData: exchangeData,
  };
  const receiveObj = {
    elem: recievePicker,
    popularCurrencies: popularCurrencies,
    otherCurrencies: otherCurrencies,
    type: "quote",
    exchangeData: exchangeData,
  };
  buildPickerItems(sendObj);
  buildPickerItems(receiveObj);
};
export const updateRateDisplay = (rateObj) => {
  const rateDisplay = document.getElementById("rateDisplay");
  rateDisplay.textContent = `${rateObj.base} = ${rateObj.rate} ${rateObj.quote}`;
};

export const buildPickerItems = (pickerObj) => {
  const { elem, popularCurrencies, otherCurrencies, type, exchangeData } =
    pickerObj;
  const popularNum = elem.querySelector(".popularNum");
  const popular = elem.querySelector(".popular");
  const otherNum = elem.querySelector(".otherNum");
  const other = elem.querySelector(".other");
  clearElem(popular);
  clearElem(other);

  popularCurrencies.forEach((currency) => {
    const pickerItem = createPickerItem(currency, type, exchangeData);
    popular.append(pickerItem);
  });

  otherCurrencies.forEach((currency) => {
    const pickerItem = createPickerItem(currency, type, exchangeData);
    other.append(pickerItem);
  });
  popularNum.textContent = popularCurrencies.length;
  otherNum.textContent = otherCurrencies.length;
};

const clearElem = (elem) => {
  while (elem.lastChild) {
    elem.lastChild.remove();
  }
};

export const renderFavoritesSection = (favoriteData) => {
  const favoritesContainer = document.getElementById("favoritesContainer");
  clearElem(favoritesContainer);
  const emptyState = document.getElementById("emptyState__favorites");
  const notEmpty = document.getElementById("notEmpty__favorites");
  if (!favoriteData.length) {
    hide(notEmpty);
    show(emptyState);
  } else {
    show(notEmpty);
    hide(emptyState);
  }
  favoriteData.forEach((favPair) => {
    const favItem = buildFavItem(favPair);
    favoritesContainer.append(favItem);
  });
};

const buildFavItem = (favPair) => {
  const baseDiv = createElem("div", ["currency"], favPair.getBase());
  const quoteDiv = createElem("div", ["currency"], favPair.getQuote());
  const exchangeRate = createElem("div", ["exch-rate"], `${favPair.getRate()}`);
  const percentageChange = createElem(
    "div",
    ["percent-change"],
    `${favPair.getChange()}%`,
  );

  if (favPair.getRate() > 0) {
    percentageChange.textContent = `▲ +${favPair.getChange()}%`;
    percentageChange.classList.add("up");
    percentageChange.classList.remove("down");
  } else if (favPair.getChange() < 0) {
    percentageChange.textContent = `▼ ${favPair.getChange()}%`;
    percentageChange.classList.add("down");
    percentageChange.classList.remove("up");
  }

  const arrowObj = {
    src: `img/icon-arrow-right.svg`,
    width: "11",
    height: "11",
    altText: "right arrow",
  };
  const arrow = buildIcon(arrowObj);
  const starObj = {
    src: `img/icon-star-filled.svg`,
    width: "16",
    height: "16",
    altText: "star",
  };
  const star = buildIcon(starObj);
  const pairContainer = createCard(
    "div",
    ["pair-container"],
    [baseDiv, arrow, quoteDiv],
  );
  const rateChangeDiv = createCard(
    "div",
    ["rate-change-container"],
    [exchangeRate, percentageChange],
  );
  const favBtn = createCard("button", ["fav-btn"], [star]);
  favBtn.title = "remove pair from favorites";
  favBtn.ariaLabel = `remove ${favPair.getBase()}/${favPair.getQuote()} pair from favorites`;

  const favItem = createCard(
    "div",
    ["fav-item"],
    [pairContainer, rateChangeDiv, favBtn],
  );

  favItem.ariaLabel = `load pair into the converter with base as ${favPair.getBase()} and quote as ${favPair.getQuote()}`;
  favItem.title = `load pair into the converter`;
  favItem.setAttribute("tabindex", "1");
  return favItem;
};

const getCountryName = (currencyName) => {
  const nameArray = currencyName.split(" ");
  nameArray.splice(nameArray.length - 1, 1);
  const countryName = nameArray.length ? nameArray.join(" ") : "European";
  return countryName;
};

export const updatePickerBtn = (btnId, currentCurrency) => {
  const pickerBtn = document.getElementById(btnId);
  clearElem(pickerBtn);
  const iconObj = {
    src: `img/flags/${currentCurrency.code.toLowerCase().slice(0, 2)}.webp`,
    width: "100",
    height: "100",
    altText: `${getCountryName(currentCurrency.name)} flag`,
    classArray: ["h-5", "w-5", "rounded-[50%]"],
  };
  const btnText = document.createTextNode(`${currentCurrency.code}`);
  const span = createElem("span", [], "▾");
  span.dataset.dropdown = "true";
  const icon = buildIcon(iconObj);
  const currentCurrencyArray = [icon, btnText, span];
  currentCurrencyArray.forEach((item) => {
    pickerBtn.append(item);
  });
};

const createPickerItem = (currencyObj, type, exchangeData) => {
  const nameArray = currencyObj.name.split(" ");
  nameArray.splice(nameArray.length - 1, 1);
  const countryName = nameArray.length ? nameArray.join(" ") : "European";
  const iconObj = {
    src: `img/flags/${currencyObj.code.toLowerCase().slice(0, 2)}.webp`,
    width: "100",
    height: "100",
    altText: `${countryName} flag`,
    classArray: ["flag"],
  };
  const checkObj = {
    src: `img/icon-check.svg`,
    width: "12",
    height: "12",
    altText: "checkmark",
  };
  const checkmark = buildIcon(checkObj);
  const flag = buildIcon(iconObj);
  const nameAbbr = createElem("div", ["name-abbr"], currencyObj.code);
  const nameFull = createElem("div", ["name-full"], currencyObj.name);
  const chilldrenArray = [flag, nameAbbr, nameFull];
  const pickerButton = createCard("button", ["picker-item"], chilldrenArray);
  const currentCurrency =
    type.toLowerCase().trim() === "base"
      ? exchangeData.getCurrentBase()
      : exchangeData.getCurrentQuote();
  currencyObj.code === currentCurrency.code
    ? pickerButton.append(checkmark)
    : pickerButton.remove(checkmark);

  pickerButton.ariaLabel = `select ${currencyObj.name} as ${type} currency`;
  return pickerButton;
};

const createElem = (elemType, classArray, textContent, id) => {
  const elem = document.createElement(elemType);
  if (classArray)
    classArray.forEach((className) => elem.classList.add(className));
  if (textContent) elem.textContent = textContent;
  if (id) elem.id = id;
  return elem;
};

const createCard = (elemType, classArray, chilldrenArray) => {
  const card = createElem(elemType, classArray);
  classArray.forEach((className) => card.classList.add(className));
  chilldrenArray.forEach((child) => {
    card.append(child);
  });
  return card;
};

const buildIcon = (iconObj) => {
  const { src, width, height, altText, classArray } = iconObj;
  const icon = document.createElement("img");
  icon.src = src;
  icon.width = width;
  icon.height = height;
  icon.alt = altText;
  if (classArray)
    classArray.forEach((className) => {
      icon.classList.add(className);
    });
  return icon;
};
