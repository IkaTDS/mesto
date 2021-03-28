export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(
      ".popup__close-button"
    );
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closePopupOverlay = this._closePopupOverlay.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("click", this._closePopupOverlay);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener("click", this._closePopupOverlay);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _closePopupOverlay(evt) {
    if (evt.target === this._popupElement) {
      this.close();
    }
  }

  setEventListners() {
    this._closeButton.addEventListener("click", () => this.close());
  }
}
