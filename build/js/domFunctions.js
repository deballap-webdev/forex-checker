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
        .querySelector('[data-dropDown="true"]')
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
  btn.querySelector('[data-dropDown="true"]').classList.remove("rotate-180");
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
// still bad should have state to know favorites and work with that, this is just for posting sake
export const favBtnDisplay = (event) => {
  const favBtn = event.target.closest("button");
  if (!favBtn) return;
  if (!favBtn.classList.contains("fav-btn")) return;
  favBtn.classList.toggle("active");
  favBtn.querySelector("img").src = favBtn.classList.contains("active")
    ? "img/icon-star-filled.svg"
    : "img/icon-star.svg";
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

export const buildPicker = (popularCurrencies, otherCurrencies) => {
  const recievePicker = document.getElementById("receivePicker");
  const sendPicker = document.getElementById("sendPicker");
  const popularNum = document.getElementById("popularNum");
  const popular = document.getElementById("popular");
  clearElem(popular);

  popularCurrencies.forEach((currency) => {
    console.log(currency);
    const pickerItem = createPickerItem(currency, "base");
    popular.append(pickerItem);
  });

  otherCurrencies.forEach((currency) => {});

  popularNum.textContent = popularCurrencies.length;
};

const clearElem = (elem) => {
  while (elem.lastElementChild) {
    elem.lastElementChild.remove();
  }
};

const createPickerItem = (currencyObj, type) => {
  //const popularDivsArray = [];
  const nameArray = currencyObj.name.split(" ");
  nameArray.splice(nameArray.length - 1, 1);
  const countryName = nameArray.length ? nameArray.join(" ") : "European";
  const iconObj = {
    src: `img/flags/${currencyObj.code.toLowerCase().slice(0, 2)}.webp`,
    width: "200",
    height: "200",
    altText: `${countryName} flag`,
    className: "flag",
  };
  const flag = buildIcon(iconObj);
  const nameAbbr = createElem("div", ["name-abbr"], currencyObj.code);
  const nameFull = createElem("div", ["name-full"], currencyObj.name);
  const chilldrenArray = [flag, nameAbbr, nameFull];
  const pickerButton = createCard("button", ["picker-item"], chilldrenArray);
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
  const { src, width, height, altText, className } = iconObj;
  const icon = document.createElement("img");
  icon.src = src;
  icon.width = width;
  icon.height = height;
  icon.alt = altText;
  if (className) icon.className = className;
  return icon;
};
