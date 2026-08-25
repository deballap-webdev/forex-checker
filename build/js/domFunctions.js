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

export const applyDeleteHover = (deleteBtnArray, deleteBtn) => {
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

export const createMirror = (input) => {
  const mirror = document.createElement("span");
  mirror.style.position = "absolute";
  mirror.style.visibility = "hidden";
  mirror.style.whiteSpace = "pre";
  mirror.style.font = getComputedStyle(input).font;
  document.body.appendChild(mirror);
  return mirror;
};
