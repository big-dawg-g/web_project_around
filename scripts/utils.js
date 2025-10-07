import { Card } from "./Card.js";
import { UserInfo } from "./UserInfo.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithConfirmation } from "./PopupWithConfirmation.js";
import { Api } from "./Api.js";
import { Section } from "./Section.js";
import { FormValidator } from "./FormValidator.js";

const api = new Api({
  url: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "76d459b7-56a0-4e9b-9682-4a793e0f8ee5",
    "Content-Type": "application/json",
  },
});

const popupConfirmation = new PopupWithConfirmation(
  "popup__confirmation",
  ".popup__button"
);
popupConfirmation.setEventListeners();

let cardRenderer;
api
  .getCompleteData()
  .then(([resInfo, resCards]) => {
    userName.textContent = resInfo.name;
    userJob.textContent = resInfo.about;
    userPic.src = resInfo.avatar;
    resCards.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    cardRenderer = new Section(
      {
        items: resCards,
        renderer: (card) => {
          const cardID = card._id;

          const cardElement = new Card(
            card.name,
            card.link,
            popupHandlerViewer.open,
            () => {
              popupConfirmation.open(() =>
                api
                  .deleteCard(cardID)
                  .then(cardElement.remove())
                  .catch((err) => console.log(err))
              );
            },

            () => {
              api.addLike(cardID).catch((err) => console.log(err));
            },
            () => {
              api.removeLike(cardID).catch((err) => console.log(err));
            }
          ).generateCard();
          const likeButton = cardElement.querySelector(
            ".landscapes__card-icon"
          );
          if (card.isLiked) {
            likeButton.classList.add("liked");
          }

          cardRenderer.addItem(cardElement);
        },
      },
      ".landscapes"
    );

    cardRenderer.renderItems();
  })
  .catch((err) => console.log(err));

export const popupHandlerViewer = new PopupWithImage(
  "popup__image-viewer",
  ".popup__image",
  ".popup__title-viewer"
);

popupHandlerViewer.setEventListeners();

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
  saveButtonAdd.classList.add(".popup__button_inactive");
});

openAvatar.addEventListener("click", function () {
  popupAvatar.classList.add("popup__open");
  inputAvatar.value = "";
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
  imageURL: ".profile__image",
});

const popupHandlerEditer = new PopupWithForm(
  "popup__editer",
  (data) => {
    userDetails.setUserInfo(data.name, data.job);
    api
      .updateUserInfo(data.name, data.job)
      .catch((err) => console.log(err))
      .finally(() => {
        popupHandlerEditer.addLoadingText(false);
      });
  },
  "Guardar"
);
popupHandlerEditer.setEventListeners();

const popupHandlerAvatar = new PopupWithForm(
  "popup__profile-pic",
  (data) => {
    userDetails.setUserAvatar(data.imageURL);
    api
      .updateUserAvatar(data.imageURL)
      .catch((err) => console.log(err))
      .finally(() => {
        popupHandlerAvatar.addLoadingText(false);
        saveButtonAvatar.disabled = false;
        saveButtonAvatar.classList.add("popup__button_inactive");
      });
  },
  "Actualizar"
);
popupHandlerAvatar.setEventListeners();

const popupHandlerAdd = new PopupWithForm(
  "popup__add",
  () => {
    api
      .sendCardData(inputTitle.value, inputURL.value)
      .then((res) => {
        const cardID = res._id;
        const cardElement = new Card(
          res.name,
          res.link,
          popupHandlerViewer.open,
          () => {
            popupConfirmation.open(() =>
              api
                .deleteCard(cardID)
                .then(cardElement.remove())
                .catch((err) => console.log(err))
            );
          },

          () => {
            api.addLike(cardID).catch((err) => console.log(err));
          },
          () => {
            api.removeLike(cardID).catch((err) => console.log(err));
          }
        ).generateCard();
        cardRenderer.addItem(cardElement);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupHandlerAdd.addLoadingText(false);
        saveButtonAdd.disabled = false;
        saveButtonAdd.classList.add("popup__button_inactive");
      });
  },
  "Crear"
);
popupHandlerAdd.setEventListeners();

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__field-error_active",
};

const formEditer = popupEditer.querySelector(".popup__form");
const formAdd = popupAdd.querySelector(".popup__form");
const formAvatar = popupAvatar.querySelector(".popup__form");

new FormValidator(config, formEditer).enableValidation();
new FormValidator(config, formAdd).enableValidation();
new FormValidator(config, formAvatar).enableValidation();
