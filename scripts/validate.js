const showInputError = (popup, inputElement, errorMessage) => {
  const errorElement = popup.querySelector(`.popup__${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__field-error_active");
};

const hideInputError = (popup, inputElement) => {
  const errorElement = popup.querySelector(`.popup__${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__field-error_active");
};

const validityState = (popup, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(popup, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(popup, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__button_inactive");
    buttonElement.disabled = false;
  }
};

const setEventListeners = (popup) => {
  const inputList = Array.from(popup.querySelectorAll(".popup__field"));
  const buttonElement = popup.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputItem) => {
    inputItem.addEventListener("input", () => {
      toggleButtonState(inputList, buttonElement);
      validityState(popup, inputItem);
    });
  });
};

const enableValidation = () => {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  popupList.forEach((item) => {
    item.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(item);
  });
};

enableValidation();
