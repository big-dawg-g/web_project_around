import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, callback) {
    super(popup);
    this._callback = callback;
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

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
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
