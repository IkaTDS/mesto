export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  initial() {
    this._renderer();
  }

  addItem(item) {
    this._containerSelector.prepend(item);
  }
}
