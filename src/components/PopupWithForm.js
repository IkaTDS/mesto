import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormHandler) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._form = this._popupSelector.querySelector(".popup__window");
    this._inputsList = this._popupSelector.querySelectorAll(".popup__field");
    this._submitButton = this._popupSelector.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputArray = Array.from(this._inputsList);
    this._inputsValues = {};
    this._inputArray.forEach(
      (input) => (this._inputsValues[input.name] = input.value)
    );
    return this._inputsValues;
  }

  setEventListners() {
    super.setEventListners();
    this._popupSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFormHandler(this._getInputValues());
    });
  }

  loading(loadingCheck) {
    this._loadingText = "Сохранение...";

    loadingCheck
      ? (this._submitButton.textContent = this._loadingText)
      : (this._submitButton.textContent = this._submitButtonText);
  }

  close() {
    super.close();
    this.loading(false);
    this._form.reset();
  }
}
