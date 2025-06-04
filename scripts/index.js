const popupEditer = document.getElementById("popup__editer");
const popupAdd = document.getElementById("popup__add");
const popupImageViewer = document.getElementById("popup__image-viewer");
const closeEditer = popupEditer.querySelector(".popup__close-button");
const closeAdd = popupAdd.querySelector(".popup__close-button");
const openDescription = document.querySelector(".profile__edit-button");
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

const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
];

function addCard(title, src) {
  const cardTemplate = document.querySelector(".landscapes__template").content;
  const cardElement = cardTemplate
    .querySelector(".landscapes__card")
    .cloneNode(true);
  const image = cardElement.querySelector(".landscapes__image");
  image.alt = `paisaje de ${title}`;
  image.src = src;
  cardElement.querySelector(".landscapes__card-title").textContent = title;
  const deleteButton = cardElement.querySelector(".landscapes__card-trash");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });
  const likeButton = cardElement.querySelector(".landscapes__card-icon");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("liked");
  });

  image.addEventListener("click", () => {
    popupImage.src = src;
    popupImage.alt = `Paisaje de ${title}`;
    popupTitle.textContent = title;
    popupImageViewer.classList.add("popup__open");
  });

  cardContainer.prepend(cardElement);
}

initialCards.forEach((card) => addCard(card.name, card.link));

closeImageViewer.addEventListener("click", () => {
  popupImageViewer.classList.remove("popup__open");
  popupImage.src = "";
});

openDescription.addEventListener("click", function () {
  popupEditer.classList.add("popup__open");
});

closeEditer.addEventListener("click", function () {
  popupEditer.classList.remove("popup__open");
});

function updateButtonStateEditer() {
  const hasText = inputName.value.trim() || inputJob.value.trim();

  if (hasText) {
    saveButtonEditer.classList.add("popup__button-active");
    saveButtonEditer.removeAttribute("disabled");
  } else {
    saveButtonEditer.classList.remove("popup__button-active");
    saveButtonEditer.setAttribute("disabled", true);
  }
}

inputName.addEventListener("input", updateButtonStateEditer);
inputJob.addEventListener("input", updateButtonStateEditer);
saveButtonEditer.addEventListener("click", function (e) {
  e.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  popupEditer.classList.remove("popup__open");
  inputName.value = "";
  inputJob.value = "";
  updateButtonStateEditer();
});

openUpdater.addEventListener("click", function () {
  popupAdd.classList.add("popup__open");
});

closeAdd.addEventListener("click", function () {
  popupAdd.classList.remove("popup__open");
});

saveButtonAdd.addEventListener("click", function (e) {
  e.preventDefault();
  addCard(inputTitle.value, inputURL.value);
  popupAdd.classList.remove("popup__open");
  inputTitle.value = "";
  inputURL.value = "";
  updateButtonStateAdd();
});

function updateButtonStateAdd() {
  const containsText = inputTitle.value.trim() || inputURL.value.trim();
  if (containsText) {
    saveButtonAdd.classList.add("popup__button-active");
    saveButtonAdd.removeAttribute("disabled");
  } else {
    saveButtonAdd.classList.remove("popup__button-active");
    saveButtonAdd.setAttribute("disabled", true);
  }
}

inputTitle.addEventListener("input", updateButtonStateAdd);
inputURL.addEventListener("input", updateButtonStateAdd);
