import {
  toggleNavSection,
  applyDeleteHover,
  dropDownDisplay,
  toggleIntervalBtn,
  underlineActiveNav,
  favBtnDisplay,
  favConvBtnDisplay,
  logConvBtnDisplay,
  updateMobileNavBtn,
  buildPicker,
  buildPickerItems,
  updatePickerBtn,
  updateRateDisplay,
} from "./domFunctions.js";

import { AppState, ExchangeData, FavPair, LoggedConv } from "./State.js";

import {
  getRatesData,
  popularCurrencies,
  otherCurrencies,
  filterCurrencies,
  setRatesData,
  getCachedRates,
} from "./dataFunctions.js";

const appState = new AppState();
const exchangeData = new ExchangeData();
const initApp = () => {
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
  swapBtn.addEventListener("click", swapCurrencies);
  favConvBtn.addEventListener("click", favConvBtnDisplay);
  compareSection.addEventListener("click", favBtnDisplay);
  mobileNavWrapper.addEventListener("click", handleMobileNav);
  mobileNavWrapper.addEventListener("focusout", (event) => {
    dropDownDisplay(
      event,
      document.getElementById("mobileNav"),
      document.getElementById("mobileNavBtn"),
    );
  });

  mobileNavWrapper.addEventListener("keydown", (event) => {
    dropDownDisplay(
      event,
      document.getElementById("mobileNav"),
      document.getElementById("mobileNavBtn"),
    );
  });

  const logConvBtn = document.getElementById("logConv", (event) => {});
  logConvBtn.addEventListener("mousedown", logConvBtnDisplay);
  logConvBtn.addEventListener("mouseup", logConvBtnDisplay);

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

const updateCurrentCurrency = (event) => {
  if (event.type !== "click") return;
  const pickerItem = event.target.closest("button");
  if (!pickerItem) return;
  if (!pickerItem.classList.contains("picker-item")) return;
  const filteredCurrencies = filterCurrencies(
    pickerItem.querySelector(".name-abbr").textContent,
  );

  event.currentTarget.id === "sendWrapper"
    ? exchangeData.setExhangeData({
        currentBase: filteredCurrencies.all[0],
      })
    : exchangeData.setExhangeData({
        currentQuote: filteredCurrencies.all[0],
      });

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
  if (!(
    getCachedRates() &&
    typeof getCachedRates !== "string" &&
    JSON.parse(getCachedRates())[0].base === exchangeData.getCurrentBase().code
  )) {
    const ratesData = await getRatesData(exchangeData.getCurrentBase().code);
    setRatesData(ratesData);
  } /* else if (
  
  ) {
    const ratesData = await getRatesData(exchangeData.getCurrentBase().code);
    setRatesData(ratesData);
  } */
  const ratesData = JSON.parse(getCachedRates());
  buildPicker(popularCurrencies, otherCurrencies, exchangeData);
  updatePickerBtn("sendBtn", exchangeData.getCurrentBase());
  updatePickerBtn("receiveBtn", exchangeData.getCurrentQuote());
  const ratesObj = ratesData.find((data) => {
    return data.quote === exchangeData.getCurrentQuote().code;
  });
  updateRateDisplay(ratesObj);
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
  const deleteBtnArray = document.querySelectorAll(".delete-btn");
  if (!event.target.closest("button")) return;
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

//This is very bad and temporary i'll actually store active section and number and other stuff in data storage rather than use dom as source of truth, and this should'nt  be in main.js anyways
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
