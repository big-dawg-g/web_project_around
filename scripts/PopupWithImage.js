import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popup, popupImage, popupTitle) {
    super(popup);
    this.open = this.open.bind(this);
    this._popupImage = this._popup.querySelector(popupImage);
    this._popupTitle = this._popup.querySelector(popupTitle);
  }

  open(image, title) {
    super.open();
    this._popupImage.src = image;
    this._popupImage.alt = `Paisaje de ${title}`;
    this._popupTitle.textContent = title;
  }

  close() {
    super.close();
    this._popupImage.src = "";
  }
}
