import { toggleNavSection, applyDeleteHover } from "./domFunctions.js";

const initApp = () => {
  const mainNav = document.getElementById("mainNav");
  mainNav.addEventListener("click", displaySections);
  const logContainer = document.getElementById("logContainer");
  console.log(logContainer);
  logContainer.addEventListener("mouseover", addHoverEffect);
  logContainer.addEventListener("mouseout", addHoverEffect);
};

const displaySections = (event) => {
  const navSectionArray = document.querySelectorAll(".navSection");
  const navLinkArray = document.querySelectorAll(".nav-link");
  toggleNavSection(event, navSectionArray, navLinkArray);
};

const addHoverEffect = (event) => {
  const deleteBtnArray = document.querySelectorAll(".delete-btn");
  if (!event.target.closest("button")) return;

  applyDeleteHover(deleteBtnArray, event.target.closest("button"));
};

document.addEventListener("DOMContentLoaded", initApp);
