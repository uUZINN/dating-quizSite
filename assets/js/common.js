// 모달
const modalBtns = document.querySelectorAll(".modal__btn");
const modalConts = document.querySelectorAll(".modal__cont");

modalBtns.forEach((modalBtn) => {
  modalBtn.addEventListener("click", () => {
    const modalId = modalBtn.getAttribute("data-modal");
    
    const modalCont = document.querySelector(`.modal__cont[data-modal="${modalId}"]`);
    
    modalCont.classList.add("show");
    modalCont.classList.remove("hide");
  });
});

modalConts.forEach((modalCont) => {
  const modalClose = modalCont.querySelector(".modal__close");
  modalClose.addEventListener("click", () => {
    modalCont.classList.add("hide");
    modalCont.classList.remove("show");
  });
});