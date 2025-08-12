export class Popup {
  constructor(popup) {
    this._popup = document.getElementById(popup);
    this.open = this.open.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup__open");
  }

  close() {
    this._popup.classList.remove("popup__open");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape" && this._popup.classList.contains("popup__open")) {
      this.close();
    }
  }

  setEventListeners() {
    const popupContainer = this._popup.querySelector(".popup__container");
    popupContainer.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    this._popup.addEventListener("click", () => {
      this.close();
    });
    const popupCloser = this._popup.querySelector(".popup__close-button");
    popupCloser.addEventListener("click", () => {
      this.close();
    });
    document.addEventListener("keydown", this._handleEscClose);
  }
}
