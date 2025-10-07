export class Card {
  constructor(
    title,
    image,
    handleCardClick,
    openConfirmation,
    activeCardLike,
    inactiveCardLike
  ) {
    this._title = title;
    this._image = image;
    this._handleCardClick = handleCardClick;
    this._openConfirmation = openConfirmation;
    this._activeCardLike = activeCardLike;
    this._inactiveCardLike = inactiveCardLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(".landscapes__template")
      .content.querySelector(".landscapes__card")
      .cloneNode(true);
    return cardElement;
  }

  _popupRemoverViewer(evt) {
    if (
      evt.key === "Escape" &&
      popupImageViewer.classList.contains("popup__open")
    ) {
      popupImageViewer.classList.remove("popup__open");
    }
  }

  removeCard() {
    this._element.remove();
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".landscapes__card-icon");
    likeButton.addEventListener("click", () => {
      if (!likeButton.classList.contains("liked")) {
        this._activeCardLike();
      } else {
        this._inactiveCardLike();
      }
      likeButton.classList.toggle("liked");
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._image, this._title);
    });
    document.addEventListener("keydown", this._popupRemoverViewer);
    const deleteButton = this._element.querySelector(".landscapes__card-trash");
    deleteButton.addEventListener("click", () => {
      this._openConfirmation();
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
