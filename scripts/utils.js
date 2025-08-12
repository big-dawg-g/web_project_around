import { Card, popupHandlerViewer, cardRenderer } from "./Card.js";
import { UserInfo } from "./UserInfo.js";
import { PopupWithForm } from "./PopupWithForm.js";

openEditer.addEventListener("click", function () {
  popupEditer.classList.add("popup__open");
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  saveButtonEditer.disabled = false;
  saveButtonEditer.classList.remove("popup__button_inactive");
});

openUpdater.addEventListener("click", function () {
  popupAdd.classList.add("popup__open");
  inputTitle.value = "";
  inputURL.value = "";
});

closeAdd.addEventListener("click", function (evt) {
  popupAdd.classList.remove("popup__open");
});

popupViewerContainer.addEventListener("click", (event) => {
  event.stopPropagation();
});

popupImageViewer.addEventListener("click", () => {
  popupImageViewer.classList.remove("popup__open");
});

const userDetails = new UserInfo({
  name: ".profile__info-name",
  job: ".profile__info-description",
});

const popupHandlerEditer = new PopupWithForm("popup__editer", (data) => {
  userDetails.setUserInfo(data.name, data.job);
});
popupHandlerEditer.setEventListeners();

const popupHandlerAdd = new PopupWithForm("popup__add", () => {
  const cardElement = new Card(
    inputTitle.value,
    inputURL.value,
    popupHandlerViewer.open
  ).generateCard();
  cardRenderer.addItem(cardElement);
  popupAdd.classList.remove("popup__open");
  inputTitle.value = "";
  inputURL.value = "";
  saveButtonAdd.disabled = false;
  saveButtonAdd.classList.add("popup__button_inactive");
});
popupHandlerAdd.setEventListeners();
