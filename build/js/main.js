import {
  toggleNavSection,
  applyDeleteHover,
  dropDownDisplay,
  toggleIntervalBtn,
  underlineActiveNav,
} from "./domFunctions.js";

const initApp = () => {
  const mainNav = document.getElementById("mainNav");
  mainNav.addEventListener("click", displaySections);
  const logContainer = document.getElementById("logContainer");
  const sendCurrencyBtn = document.getElementById("sendConv");
  const receiveCurrencyBtn = document.getElementById("receiveConv");
  const mobileNav = document.getElementById("mobileNav");
  const intervalContainer = document.getElementById("intervalContainer");

  sendCurrencyBtn.addEventListener("click", (event) => {
    dropDownDisplay(event, document.getElementById("send"));
  });

  sendCurrencyBtn.addEventListener("focusout", (event) => {
    dropDownDisplay(event, document.getElementById("send"));
  });

  sendCurrencyBtn.addEventListener("keydown", (event) => {
    dropDownDisplay(event, document.getElementById("send"));
  });

  receiveCurrencyBtn.addEventListener("click", (event) => {
    dropDownDisplay(event, document.getElementById("receive"));
  });

  receiveCurrencyBtn.addEventListener("focusout", (event) => {
    dropDownDisplay(event, document.getElementById("receive"));
  });

  receiveCurrencyBtn.addEventListener("keydown", (event) => {
    dropDownDisplay(event, document.getElementById("receive"));
  });

  intervalContainer.addEventListener("click", intervalBtnDisplay);

  logContainer.addEventListener("mouseover", addHoverEffect);
  logContainer.addEventListener("mouseout", addHoverEffect);
};

const displaySections = (event) => {
  const navSectionArray = document.querySelectorAll(".navSection");
  const navLinkArray = document.querySelectorAll(".nav-link");
  toggleNavSection(event, navSectionArray);
  underlineActiveNav(event, navLinkArray);
};

const addHoverEffect = (event) => {
  const deleteBtnArray = document.querySelectorAll(".delete-btn");
  if (!event.target.closest("button")) return;
  applyDeleteHover(deleteBtnArray, event.target.closest("button"));
};

const intervalBtnDisplay = (event) => {
  const intervalBtn = event.target.closest("button");
  if (!intervalBtn) return;
  toggleIntervalBtn(intervalBtn, document.querySelectorAll(".interval-btn"));
};

document.addEventListener("DOMContentLoaded", initApp);
