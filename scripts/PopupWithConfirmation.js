import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popup, button) {
    super(popup);
    this.open = this.open.bind(this);
    this._confirmButton = this._popup.querySelector(button);
  }

  open(deleteCard) {
    super.open();
    this._deleteCard = deleteCard;
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this._deleteCard();
      this.close();
    });
  }
}
