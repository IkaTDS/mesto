import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".popup__image");
    this._caption = this._popupElement.querySelector(".popup__caption");
  }

  open(cardInfo) {
    this._image.setAttribute("alt", cardInfo.name);
    this._image.setAttribute("src", cardInfo.link);
    this._caption.textContent = cardInfo.name;
    super.open();
  }
}
