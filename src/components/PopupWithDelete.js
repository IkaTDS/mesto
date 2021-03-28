import { Popup } from "./Popup";

export class PopupWithDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(handler) {
        this.handler = handler;
        super.open();
    }

    setEventListners() {
        super.setEventListners();

        this._popupElement.addEventListener("submit", (evt) => {
          evt.preventDefault();
          this.handler();
        });
      }
}