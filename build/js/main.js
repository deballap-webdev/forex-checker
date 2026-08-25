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
      document.getElementById("receivePicker"),
      receiveCurrencyBtn,
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
};

const displaySections = (event) => {
  if (!event.target.closest("a")) return;
  const navSectionArray = document.querySelectorAll(".navSection");
  const navLinkArray = document.querySelectorAll(".nav-link");
  toggleNavSection(event, navSectionArray);
  underlineActiveNav(event, navLinkArray);
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
    document.getElementById("activeSection").textContent =
      key.querySelector(".sectionName").textContent;
    document.getElementById("numBox").textContent = key.querySelector(".number")
      ? key.querySelector(".number").textContent
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
