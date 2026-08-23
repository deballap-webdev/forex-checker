export const toggleNavSection = (event, navSectionArray, navLinkArray) => {
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
