let popup = document.querySelector(".popup");
let close = popup.querySelector(".popup__close-button");
let open = document.querySelector(".profile__edit-button");
let inputName = document.querySelector(".popup__field-name");
let inputJob = document.querySelector(".popup__field-job");
let saveButton = document.querySelector(".popup__button");

close.addEventListener("click", function () {
  popup.classList.remove("popup__open");
});

open.addEventListener("click", function () {
  popup.classList.add("popup__open");
});

function updateButtonState() {
  let hasText = inputName.value.trim() !== "" || inputJob.value.trim() !== "";

  if (hasText) {
    saveButton.classList.add("popup__button-active");
    saveButton.removeAttribute("disabled");
  } else {
    saveButton.classList.remove("popup__button-active");
    saveButton.setAttribute("disabled", true);
  }
}

inputName.addEventListener("input", updateButtonState);
inputJob.addEventListener("input", updateButtonState);
