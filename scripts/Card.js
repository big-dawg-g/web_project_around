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

class Card {
  constructor(title, image) {
    (this._title = title), (this._image = image);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(".landscapes__template")
      .content.querySelector(".landscapes__card")
      .cloneNode(true);
    return cardElement;
  }

  _handleImagePopupOpen() {
    popupImage.src = this._image;
    popupImage.alt = `Paisaje de ${this._title}`;
    popupTitle.textContent = this._title;
    popupImageViewer.classList.add("popup__open");
  }

  _popupRemoverViewer(evt) {
    if (
      evt.key === "Escape" &&
      popupImageViewer.classList.contains("popup__open")
    ) {
      popupImageViewer.classList.remove("popup__open");
    }
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".landscapes__card-icon");
    likeButton.addEventListener("click", function () {
      likeButton.classList.toggle("liked");
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImagePopupOpen();
    });
    document.addEventListener("keydown", this._popupRemoverViewer);
    const deleteButton = this._element.querySelector(".landscapes__card-trash");
    deleteButton.addEventListener("click", () => {
      this._element.remove();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".landscapes__image");
    this._cardImage.alt = `paisaje de ${this._title}`;
    this._cardImage.src = this._image;
    this._element.querySelector(".landscapes__card-title").textContent =
      this._title;
    this._setEventListeners();
    return this._element;
  }
}

initialCards.forEach((card) => {
  const cardElement = new Card(card.name, card.link).generateCard();
  cardContainer.prepend(cardElement);
});
