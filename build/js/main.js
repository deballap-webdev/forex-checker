import {
  toggleNavSection,
  applyDeleteHover,
  dropDownDisplay,
  toggleIntervalBtn,
  underlineActiveNav,
  favBtnDisplay,
  favConvBtnDisplay,
  logConvBtnDisplay,
} from "./domFunctions.js";

import { AppState, ExchangeData, FavPair, LoggedConv } from "./State.js";

const appState = new AppState();
const exchangeData = new ExchangeData();
const availableCurrencies = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "NZD",
  "HKD",
  "SGD",
  "SEK",
  "NOK",
  "DKK",
  "KRW",
  "INR",
  "BRL",
  "ZAR",
  "MXN",
  "IDR",
  "TRY",
  "SAR",
  "AED",
  "THB",
  "MYR",
  "PHP",
  "PLN",
  "ILS",
  "ARS",
  "CLP",
  "COP",
  "EGP",
  "NGN",
  "PKR",
  "VND",
  "TWD",
  "CZK",
  "HUF",
  "RON",
  "BGN",
  "ISK",
  "HRK",
  "UAH",
  "KWD",
  "QAR",
  "OMR",
  "BHD",
  "KZT",
  "MAD",
  "PEN",
  "UYU",
  "CRC",
  "JOD",
  "LBP",
  "RUB",
];

const popularCurrencies = ["USD", "EUR", "JPY", "GBP", "CNY"];

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
      document.getElementById("sendPicker"),
      sendCurrencyBtn,
    );
  });

  sendWrapper.addEventListener("keydown", (event) => {
    dropDownDisplay(
      event,
      document.getElementById("receivePicker"),
      receiveCurrencyBtn,
    );
  });

  sendWrapper.addEventListener("click", handleConvAreaClick);
  receiveWrapper.addEventListener("click", handleConvAreaClick);
  intervalContainer.addEventListener("click", intervalBtnDisplay);
  logContainer.addEventListener("mouseover", addHoverEffect);
  logContainer.addEventListener("mouseout", addHoverEffect);

  loadThePage();
};

const loadThePage = () => {};

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

const handleConvAreaClick = (event) => {
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
    toggleNavSection(event, navSectionArray);
  }
  dropDownDisplay(event, mobileNav, mobileNavBtn);
};

document.addEventListener("DOMContentLoaded", initApp);
