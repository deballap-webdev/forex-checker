import {
  toggleNavSection,
  applyDeleteHover,
  dropDownDisplay,
  toggleIntervalBtn,
  underlineActiveNav,
  createMirror,
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
  const sendMirror = createMirror(sendInput);
  const receiveMirror = createMirror(receiveInput);
  mobileNav.addEventListener("click", handleMobileNav);
  sendInput.addEventListener("input", (event) => {
    resizeInput(event, sendMirror);
  });
  receiveInput.addEventListener("input", (event) => {
    resizeInput(event, receiveMirror);
  });
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

const resizeInput = (event, mirror) => {
  mirror.textContent = event.target.value;
  event.target.style.width = `${mirror.offsetWidth + 10}px`;
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

const handleMobileNav = () => {};

document.addEventListener("DOMContentLoaded", initApp);
