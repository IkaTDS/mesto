// Объявление переменных
const profileEditButton = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const profileName = document.querySelector(".profile__name"); // имя на главной странице
const profileSubline = document.querySelector(".profile__name-subline"); // деятельность на главной странице
const editForm = document.querySelector(".popup_edit-form"); // попап профиля
const editFormFieldName = document.querySelector(".popup__field_name"); // ввод имени в редактировании
const editFormFieldSubline = document.querySelector(".popup__field_subline"); // ввод деятельности в редактировании
const editFormWindow = document.querySelector(".popup__window_edit-form"); // форма редактирования
const itemForm = document.querySelector(".popup_item-form"); // попап профиля
const itemFormFieldTitle = document.querySelector(".popup__field_title"); // ввод названия для карточки
const itemFormFieldImage = document.querySelector(".popup__field_image"); // ввод ссылки для карточки
const itemAddButton = document.querySelector(".profile__button"); // кнопка по открытию попап добавление карточек
const itemFormWindow = document.querySelector(".popup__window_item-form"); // форма редактирования
const elementsList = document.querySelector(".elements");
const imagePopup = document.querySelector(".popup_image-popup");
const template = document.querySelector(".element-template");

import "../pages/index.css";
import {
  FormValidator,
  configValidation,
} from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { initialCards } from "../components/initial-cards.js";

const popupWithImage = new PopupWithImage(imagePopup);
popupWithImage.setEventListners();

function createCard(name, link) {
  const card = new Card(name, link, template, () => {
    popupWithImage.open(name, link);
  });
  return card.generateCard();
}

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const itemElement = createCard(item.name, item.link);
      cardsList.addItem(itemElement);
    },
  },
  elementsList
);

cardsList.initial();

// Открытие попап (добавление карточки) по клику
itemAddButton.addEventListener("click", () => {
  popupAddCard.open();
  addCardFormValidator.toggleButtonState();
  addCardFormValidator.clearError();
});

// Открытие попап редактирования профиля
profileEditButton.addEventListener("click", () => {
  getValues();
  editWindow.open();
  editProfileFormValidator.toggleButtonState();
  editProfileFormValidator.clearError();
});

// Получение значений в редактирование профиля
function getValues() {
  const profile = user.getUserInfo();
  editFormFieldName.value = profile.name;
  editFormFieldSubline.value = profile.subline;
}

const popupAddCard = new PopupWithForm(itemForm, () => {
  const itemElement = createCard(
    itemFormFieldTitle.value,
    itemFormFieldImage.value
  );

  elementsList.prepend(itemElement);

  popupAddCard.close();
});

popupAddCard.setEventListners();

const user = new UserInfo({
  userNameSelector: profileName,
  userSublineSelector: profileSubline,
});

const editWindow = new PopupWithForm(editForm, (item) => {
  user.setUserInfo(item);
  editWindow.close();
});

editWindow.setEventListners();

const editProfileFormValidator = new FormValidator(
  configValidation,
  editFormWindow
);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  configValidation,
  itemFormWindow
);
addCardFormValidator.enableValidation();
