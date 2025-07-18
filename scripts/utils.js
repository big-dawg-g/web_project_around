closeImageViewer.addEventListener("click", () => {
  popupImageViewer.classList.remove("popup__open");
  popupImage.src = "";
});

openEditer.addEventListener("click", function () {
  popupEditer.classList.add("popup__open");
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  saveButtonEditer.disabled = false;
  saveButtonEditer.classList.remove("popup__button_inactive");
});

closeEditer.addEventListener("click", function () {
  popupEditer.classList.remove("popup__open");
});

saveButtonEditer.addEventListener("click", function (e) {
  e.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  popupEditer.classList.remove("popup__open");
});

openUpdater.addEventListener("click", function () {
  popupAdd.classList.add("popup__open");
  inputTitle.value = "";
  inputURL.value = "";
});

closeAdd.addEventListener("click", function (evt) {
  popupAdd.classList.remove("popup__open");
});

const clickOutside = () => {
  const popupArray = Array.from(document.querySelectorAll(".popup"));
  popupArray.forEach((popup) => {
    const popupContainer = popup.querySelector(".popup__container");
    popupContainer.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    popup.addEventListener("click", () => {
      popup.classList.remove("popup__open");
    });
    const popupRemoverEsc = (evt) => {
      if (evt.key === "Escape" && popup.classList.contains("popup__open")) {
        popup.classList.remove("popup__open");
      }
    };
    document.addEventListener("keydown", popupRemoverEsc);
  });
};

clickOutside();

popupViewerContainer.addEventListener("click", (event) => {
  event.stopPropagation();
});

popupImageViewer.addEventListener("click", () => {
  popupImageViewer.classList.remove("popup__open");
});

saveButtonAdd.addEventListener("click", function (e) {
  e.preventDefault();

  const cardElement = new Card(inputTitle.value, inputURL.value).generateCard();
  cardContainer.prepend(cardElement);

  popupAdd.classList.remove("popup__open");
  inputTitle.value = "";
  inputURL.value = "";
  saveButtonAdd.disabled = false;
  saveButtonAdd.classList.add("popup__button_inactive");
});
