export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  initial(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._containerSelector.prepend(item);
  }
}
