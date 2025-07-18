const popupEditer = document.getElementById("popup__editer");
const popupAdd = document.getElementById("popup__add");
const popupImageViewer = document.getElementById("popup__image-viewer");
const closeEditer = popupEditer.querySelector(".popup__close-button");
const closeAdd = popupAdd.querySelector(".popup__close-button");
const openEditer = document.querySelector(".profile__edit-button");
const openUpdater = document.querySelector(".profile__add-button");
const userName = document.querySelector(".profile__info-name");
const userJob = document.querySelector(".profile__info-description");
const inputName = document.querySelector(".popup__field-name");
const inputJob = document.querySelector(".popup__field-job");
const inputTitle = document.querySelector(".popup__field-title");
const inputURL = document.querySelector(".popup__field-url");
const saveButtonEditer = popupEditer.querySelector(".popup__button");
const saveButtonAdd = popupAdd.querySelector(".popup__button");
const cardContainer = document.querySelector(".landscapes");
const popupImage = popupImageViewer.querySelector(".popup__image");
const popupTitle = popupImageViewer.querySelector(".popup__title-viewer");
const closeImageViewer = popupImageViewer.querySelector(
  ".popup__close-button-viewer"
);
const popupViewerContainer = popupImageViewer.querySelector(
  ".popup__container-viewer"
);
