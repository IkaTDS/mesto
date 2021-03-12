const imagePopup = document.querySelector('.popup_image-popup');

export class Card {
    constructor(name, link) {
        this._name = name;
        this._link = link;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__image').style.backgroundImage = `url(${this._link})`;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
            this._handleLikeCard();
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._showImagePopup();            
        });
        this._element.querySelector('.element__trash-button').addEventListener('click', () => {
            this._handleDeleteCard();
        });
    }
    
    _handleLikeCard() {
        this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }

    _handleDeleteCard() {
        this._element.remove();
    }

    _showImagePopup() {
        imagePopup.classList.add('popup_opened');
        imagePopup.querySelector('.popup__image').setAttribute('src', this._link);
        imagePopup.querySelector('.popup__image').setAttribute('alt', this._name);
        imagePopup.querySelector('.popup__caption').textContent = this._name;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector('.element-template')
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }
};