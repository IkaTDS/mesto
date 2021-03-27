export class Card {
  constructor(
    cardInfo,
    cardTemplate,
    handleCardClick,
    handleDeleteItem,
    userId,
    handleCardLike
  ) {
    this._name = cardInfo.name;
    this._link = cardInfo.link;
    this._handleCardClick = handleCardClick;
    this._cardTemplate = cardTemplate;
    this._handleDeleteItem = handleDeleteItem;
    this._cardInfo = cardInfo;
    this._userId = userId;
    this._handleCardLike = handleCardLike;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._likeCounter = this._element.querySelector(".element__like-counter");
    this._likeButton = this._element.querySelector(".element__like-button");
    this._cardImage.style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".element__title").textContent = this._name;
    this._setEventListeners();
    this._showDeleteButton();
    return this._element;
  }

  _showDeleteButton() {
    if (this._cardInfo.owner._id !== this._userId) {
      this._element
        .querySelector(".element__trash-button")
        .classList.add("element__trash-button_hidden");
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleCardLike();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._cardInfo);
    });
    this._element
      .querySelector(".element__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteItem();
      });
  }

  likeCheck() {
    return this._likeCheck;
  }

  addLike(data) {
    this._likeCheck =
      data.likes.filter((item) => {
        return (item._id == this._userId);
      }).length > 0;

    this._likeCounter.textContent = data.likes.length;
    this._likeCheck
      ? this._likeButton.classList.add("element__like-button_active")
      : this._likeButton.classList.remove("element__like-button_active");
  }

  _handleLikeCard() {
    this._element
      .querySelector(".element__like-button")
      .classList.toggle("element__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.content
      .querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }
}
