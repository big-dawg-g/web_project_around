import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, callback, buttonText) {
    super(popup);
    this._callback = callback;
    this._buttonText = buttonText;
  }

  _getInputValues() {
    const dataObject = this._popup.querySelectorAll(".popup__field");
    const fieldsObject = [];

    dataObject.forEach((field) => {
      fieldsObject[field.id] = field.value;
      return fieldsObject;
    });

    return fieldsObject;
  }

  addLoadingText(isLoading) {
    if (isLoading) {
      this._popup.querySelector(".popup__button").textContent = "Guardando...";
    } else {
      this._popup.querySelector(".popup__button").textContent =
        this._buttonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.addLoadingText(true);
      this._callback(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    const popupFields = Array.from(
      this._popup.querySelectorAll(".popup__field")
    );
    popupFields.forEach((field) => {
      field.value = "";
    });
  }
}
