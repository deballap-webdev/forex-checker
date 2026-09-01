import {
  toggleNavSection,
  applyDeleteHover,
  dropDownDisplay,
  toggleIntervalBtn,
  underlineActiveNav,
  favConvBtnDisplay,
  logConvBtnDisplay,
  updateMobileNavBtn,
  buildPicker,
  buildPickerItems,
  updatePickerBtn,
  updateRateDisplay,
  updateInputDisplay,
  renderFavoritesSection,
  renderCompareSection,
  renderLogSection,
} from "./domFunctions.js";

import { AppState, ExchangeData, FavPair, LoggedConv } from "./State.js";

import {
  storeExchangeData,
  getStoredExchangeData,
  getRatesData,
  availableCurrencies,
  popularCurrencies,
  otherCurrencies,
  filterCurrencies,
  setRatesData,
  getCachedRates,
  convertCurrency,
  getPercentageChangeFromApi,
} from "./dataFunctions.js";

const appState = new AppState();
const exchangeData = new ExchangeData();

const initApp = () => {
  const compareContainer = document.getElementById("compareContainer");
  compareContainer.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) return;
    const base = exchangeData.getCurrentBase().code;
    const quote = event.target
      .closest(".compare-currency")
      .querySelector(".name-abbr").textContent;
    if (event.target.closest("button")) {
      if (event.target.closest("button").classList.contains("fav-btn"))
        handleFavorites(base, quote);
    } else {
      loadIntoConverter(base, quote);
    }
    loadThePage();
  });

  const clearLogBtn = document.getElementById("clearLog");
  const mainNav = document.getElementById("mainNav");
  mainNav.addEventListener("click", displaySections);
  const logContainer = document.getElementById("logContainer");
  const sendCurrencyBtn = document.getElementById("sendBtn");
  const receiveCurrencyBtn = document.getElementById("receiveBtn");
  const mobileNav = document.getElementById("mobileNav");
  const intervalContainer = document.getElementById("intervalContainer");
  const convArea = document.getElementById("convArea");
  const sendWrapper = document.getElementById("sendWrapper");
  const receiveWrapper = document.getElementById("receiveWrapper");
  const mobileNavBtn = document.getElementById("mobileNavBtn");
  const sendInput = document.getElementById("sendInput");
  const receiveInput = document.getElementById("receiveInput");
  const mobileNavWrapper = document.getElementById("mobileNavWrapper");
  const compareSection = document.getElementById("compare");
  const favConvBtn = document.getElementById("favConv");
  const swapBtn = document.getElementById("swapBtn");
  const favoritesContainer = document.getElementById("favoritesContainer");
  sendInput.addEventListener("input", (event) => {
    convertAndDisplay("send", receiveInput, sendInput.value);
  });
  receiveInput.addEventListener("input", (event) => {
    convertAndDisplay("receive", sendInput, receiveInput.value);
  });
  swapBtn.addEventListener("click", swapCurrencies);

  favConvBtn.addEventListener("click", (event) => {
    handleFavorites(
      exchangeData.getCurrentBase().code,
      exchangeData.getCurrentQuote().code,
    );
  });
  logContainer.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) return;
    if (event.target.closest("button")) {
      if (event.target.closest("button").classList.contains("delete-btn")) {
        exchangeData.removeConvFromLog(event.target.closest("button").id);
      }
    } else {
      const convItem = event.target.closest(".conv-log-item");
      sendInput.value = convItem.querySelector(".send-price").textContent;
      const base = convItem.querySelector(".logBase").textContent;
      const quote = convItem.querySelector(".logQuote").textContent;
      loadIntoConverter(base, quote);
    }
    loadThePage();
  });
  mobileNavWrapper.addEventListener("click", handleMobileNav);
  mobileNavWrapper.addEventListener("focusout", (event) => {
    dropDownDisplay(
      event,
      document.getElementById("mobileNav"),
      document.getElementById("mobileNavBtn"),
    );
  });
  favoritesContainer.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) return;
    const base = event.target
      .closest(".fav-item")
      .querySelector(".favBase").textContent;
    const quote = event.target
      .closest(".fav-item")
      .querySelector(".favQuote").textContent;
    if (event.target.closest("button")) {
      if (event.target.closest("button").classList.contains("fav-btn"))
        handleFavorites(base, quote);
    } else {
      loadIntoConverter(base, quote);
    }
    loadStoredData();
    loadThePage();
  });

  const loadStoredData = () => {
    if (getStoredExchangeData() !== "string" || !getStoredExchangeData())
      return;
    const storedData = JSON.parse(getStoredExchangeData());
    console.log(storedData);
    exchangeData.setExhangeData(storedData);
    console.log(exchangeData);
  };

  clearLogBtn.addEventListener("click", (event) => {
    if (confirm("are you sure you want to clear your entire log?")) {
      exchangeData.clearLog();
      loadThePage();
    }
  });
  mobileNavWrapper.addEventListener("keydown", (event) => {
    dropDownDisplay(
      event,
      document.getElementById("mobileNav"),
      document.getElementById("mobileNavBtn"),
    );
  });

  const logConvBtn = document.getElementById("logConv");
  logConvBtn.addEventListener("click", (event) => {
    logConvBtnDisplay(event);
    createAndSetLogObj();
    loadThePage();
  });
  sendWrapper.addEventListener("focusout", (event) => {
    dropDownDisplay(
      event,
      document.getElementById("sendPicker"),
      sendCurrencyBtn,
    );
  });

  sendWrapper.addEventListener("input", handleFilter);
  receiveWrapper.addEventListener("input", handleFilter);
  receiveWrapper.addEventListener("focusout", (event) => {
    dropDownDisplay(
      event,
      document.getElementById("receivePicker"),
      receiveCurrencyBtn,
    );
  });

  receiveWrapper.addEventListener("keydown", (event) => {
    dropDownDisplay(
      event,
      document.getElementById("receivePicker"),
      receiveCurrencyBtn,
    );
  });

  sendWrapper.addEventListener("keydown", (event) => {
    dropDownDisplay(
      event,
      document.getElementById("sendPicker"),
      sendCurrencyBtn,
    );
  });

  sendWrapper.addEventListener("click", (event) => {
    toggleDropDownDisplay(event);
    updateCurrentCurrency(event);
  });

  receiveWrapper.addEventListener("click", (event) => {
    toggleDropDownDisplay(event);
    updateCurrentCurrency(event);
  });
  intervalContainer.addEventListener("click", intervalBtnDisplay);
  logContainer.addEventListener("mouseover", addHoverEffect);
  logContainer.addEventListener("mouseout", addHoverEffect);
  loadThePage();
};

/* const handleSectionClick = (sectionObj) => {
  const { btnClass, base, quote, event, containerId } = sectionObj;
  if (event.target.closest("button")) {
    if (event.target.closest("button").classList.contains(btnClass))
      handleFavorites(base, quote);
  } 
  loadThePage();
}; */

const createAndSetLogObj = () => {
  const sendInput = document.getElementById("sendInput");
  const receiveInput = document.getElementById("receiveInput");
  const logObj = {
    id: Date.now(),
    date: Date.now(),
    receive: receiveInput.value,
    send: sendInput.value,
    base: exchangeData.getCurrentBase().code,
    quote: exchangeData.getCurrentQuote().code,
  };
  const log = new LoggedConv();
  log.setLoggedConv(logObj);
  exchangeData.addConvToLog(log);
};

const loadIntoConverter = (base, quote) => {
  const quoteName = availableCurrencies.find(
    (currency) => currency.code === quote,
  ).name;
  const baseName = availableCurrencies.find(
    (currency) => currency.code === base,
  ).name;
  exchangeData.setExhangeData({
    currentQuote: { code: quote, name: quoteName },
    currentBase: { code: base, name: baseName },
  });
};

const handleFavorites = (base, quote) => {
  const id = `${base} ${quote}`;
  if (exchangeData.getFavorite().find((favPair) => favPair.getId() === id)) {
    exchangeData.removePairFromFavorite(`${base} ${quote}`);
  } else {
    const favPair = new FavPair();
    const favObj = {
      base: base,
      quote: quote,
      id: id,
    };
    favPair.setFavPair(favObj);
    exchangeData.addPairToFavorite(favPair);
  }

  loadThePage();
};

const convertAndDisplay = (inputType, convInput, value) => {
  const rate = JSON.parse(getCachedRates()).find((data) => {
    return data.quote === exchangeData.getCurrentQuote().code;
  }).rate;
  const convertedValue = convertCurrency(rate, value, inputType);
  if (isNaN(convertedValue)) return;
  const ratesData = JSON.parse(getCachedRates());
  updateInputDisplay(convInput, parseFloat(convertedValue.toFixed(4)));
  const baseValue = document.getElementById("sendInput").value;
  const compareObj = {
    baseValue: baseValue,
    exchangeData: exchangeData,
    availableCurrencies: availableCurrencies,
    ratesData: ratesData,
  };
  renderCompareSection(compareObj);
};

const updateCurrentCurrency = (event) => {
  if (event.type !== "click") return;
  const pickerItem = event.target.closest("button");
  if (!pickerItem) return;
  if (!pickerItem.classList.contains("picker-item")) return;
  const filteredCurrencies = filterCurrencies(
    pickerItem.querySelector(".name-abbr").textContent,
  );

  if (event.currentTarget.id === "sendWrapper") {
    exchangeData.setExhangeData({
      currentBase: filteredCurrencies.all[0],
    });
  } else {
    exchangeData.setExhangeData({
      currentQuote: filteredCurrencies.all[0],
    });
  }
  loadThePage();
};

const swapCurrencies = (event) => {
  exchangeData.setExhangeData({
    currentQuote: exchangeData.getCurrentBase(),
    currentBase: exchangeData.getCurrentQuote(),
  });
  loadThePage();
};

const loadThePage = async () => {
  if (getCachedRates() === "undefined" || !getCachedRates()) {
    const ratesData = await getRatesData(exchangeData.getCurrentBase().code);
    setRatesData(ratesData);
  } else if (
    typeof getCachedRates() !== "string" ||
    JSON.parse(getCachedRates())[0].base !== exchangeData.getCurrentBase().code
  ) {
    const ratesData = await getRatesData(exchangeData.getCurrentBase().code);
    setRatesData(ratesData);
  }
  const favConvBtn = document.getElementById("favConv");
  favConvBtnDisplay(favConvBtn, exchangeData);
  const sendInput = document.getElementById("sendInput");
  const receiveInput = document.getElementById("receiveInput");
  const ratesData = JSON.parse(getCachedRates());
  buildPicker(popularCurrencies, otherCurrencies, exchangeData);
  updatePickerBtn("sendBtn", exchangeData.getCurrentBase());
  updatePickerBtn("receiveBtn", exchangeData.getCurrentQuote());
  const ratesObj = ratesData.find((data) => {
    return data.quote === exchangeData.getCurrentQuote().code;
  });
  await setFavRateandChange();
  updateRateDisplay(ratesObj);
  convertAndDisplay("send", receiveInput, sendInput.value);
  convertAndDisplay("receive", sendInput, receiveInput.value);
  renderFavoritesSection(exchangeData.getFavorite());
  renderLogSection(exchangeData.getLog());
  storeExchangeData(exchangeData);
};

const setFavRateandChange = async () => {
  for (let i = 0; i < exchangeData.getFavorite().length; i++) {
    const apiData = await getPercentageChangeFromApi(
      exchangeData.getFavorite()[i].getBase(),
      exchangeData.getFavorite()[i].getQuote(),
    );
    const change = apiData.change;
    const rate = apiData.currentRate;
    exchangeData.getFavorite()[i].setFavPair({ change: change, rate: rate });
  }
};

const displaySections = (event) => {
  if (!event.target.closest("a")) return;
  const navSectionArray = document.querySelectorAll(".navSection");
  const navLinkArray = document.querySelectorAll(".nav-link");
  toggleNavSection(event, navSectionArray);
  underlineActiveNav(event, navLinkArray);
  const appStateObj = {
    activeSection: event.target.closest("a").hash.slice(1).toUpperCase(),
  };
  appState.setAppState(appStateObj);
};

const addHoverEffect = (event) => {
  if (!event.target.closest("button")) return;
  const deleteBtnArray = document.querySelectorAll(".delete-btn");
  applyDeleteHover(event, deleteBtnArray, event.target.closest("button"));
};

const intervalBtnDisplay = (event) => {
  const intervalBtn = event.target.closest("button");
  if (!intervalBtn) return;
  toggleIntervalBtn(intervalBtn, document.querySelectorAll(".interval-btn"));
};

const toggleDropDownDisplay = (event) => {
  if (!event.target.closest("button")) return;
  const sendCurrencyBtn = document.getElementById("sendBtn");
  const receiveCurrencyBtn = document.getElementById("receiveBtn");
  const key = event.target.closest("button").id;
  const keyLookup = {
    sendBtn: () => {
      dropDownDisplay(
        event,
        document.getElementById("sendPicker"),
        sendCurrencyBtn,
      );
    },
    receiveBtn: () => {
      dropDownDisplay(
        event,
        document.getElementById("receivePicker"),
        receiveCurrencyBtn,
      );
    },
  };
  const action = keyLookup[key];
  if (!action) return;
  action();
};

const handleFilter = (event) => {
  const text = event.target.value;
  const filteredCurrencies = filterCurrencies(text);
  const picker =
    event.currentTarget.id === "receiveWrapper"
      ? document.getElementById("receivePicker")
      : document.getElementById("sendPicker");

  const type = event.currentTarget.id === "receiveWrapper" ? "quote" : "base";
  const pickerObj = {
    elem: picker,
    popularCurrencies: filteredCurrencies.popular,
    otherCurrencies: filteredCurrencies.other,
    type: type,
    exchangeData: exchangeData,
  };
  buildPickerItems(pickerObj);
};

const handleMobileNav = (event) => {
  if (!event.target.closest("button") && !event.target.closest("a")) return;
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavBtn = document.getElementById("mobileNavBtn");
  const key = event.target.closest("button") || event.target.closest("a");
  if (key === event.target.closest("a")) {
    const navSectionArray = document.querySelectorAll(".navSection");
    const navLinkArray = document.querySelectorAll(".nav-link");
    const appStateObj = {
      activeSection: event.target.closest("a").hash.slice(1).toUpperCase(),
    };
    appState.setAppState(appStateObj);
    const navObj = {
      navLink: event.target.closest("a"),
      navLinkArray: document.querySelectorAll(".nav-link"),
      navSectionArray: document.querySelectorAll(".navSection"),
      appState: appState,
      exchangeData: exchangeData,
    };
    updateMobileNavBtn(navObj);
    toggleNavSection(event, navSectionArray);
  }
  dropDownDisplay(event, mobileNav, mobileNavBtn);
};

document.addEventListener("DOMContentLoaded", initApp);
