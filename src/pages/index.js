// Объявление переменных
const profileEditButton = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const profileName = document.querySelector(".profile__name"); // имя на главной странице
const profileSubline = document.querySelector(".profile__name-subline"); // деятельность на главной странице
const editForm = document.querySelector(".popup_edit-form"); // попап профиля
const editFormFieldName = document.querySelector(".popup__field_name"); // ввод имени в редактировании
const editFormFieldSubline = document.querySelector(".popup__field_subline"); // ввод деятельности в редактировании
const itemForm = document.querySelector(".popup_item-form"); // попап профиля
const itemFormFieldTitle = document.querySelector(".popup__field_title"); // ввод названия для карточки
const itemFormFieldImage = document.querySelector(".popup__field_image"); // ввод ссылки для карточки
const itemAddButton = document.querySelector(".profile__button"); // кнопка по открытию попап добавление карточек
const itemFormWindow = document.querySelector(".popup__window_item-form"); // форма редактирования
const elementsList = document.querySelector(".elements");
const imagePopup = document.querySelector(".popup_image-popup");
const popupsList = document.querySelectorAll(".popup"); // список переменных

import "../pages/index.css";
import { FormValidator, configValidation } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { initialCards } from "../components/initial-cards.js";

const cardsList = new Section(
  {
    items: initialCards,
    renderer: () => {
      initialCards.forEach((item) => {
        const card = new Card(item.name, item.link, () => {
          let popup = new PopupWithImage(imagePopup);
          popup.open(item.name, item.link);
          popup.setEventListners();
        });
        const itemElement = card.generateCard();
        cardsList.addItem(itemElement);
      });
    },
  },
  ".elements"
);

cardsList.initial();

// Открытие попап
function openPopup(popup) {
  const popupButton = popup.querySelector(".popup__button");
  let popupWindow = popup.querySelector(".popup__window");
  popupWindow = new FormValidator(configValidation, popupWindow);
  if (popupButton) {
    popupWindow.toggleButtonState();
  }

  let popupForm = new Popup(popup);
  popupForm.open();

  popupForm.setEventListners();
}

// Закрытие попап
function closePopup(popup) {
  const popupField = popup.querySelector(".popup__field");
  let popupForm = popup.querySelector(".popup__window");
  popupForm = new FormValidator(configValidation, popupForm);
  if (popupField) {
    popupForm.clearError();
  }

  popup = new Popup(popup);
  popup.close();
}

// Закрытие попапа кликом на оверлей
popupsList.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

// Открытие попап (добавление карточки) по клику
itemAddButton.addEventListener("click", function () {
  openItemForm(itemForm);
});

// Открытие попап редактирования профиля
profileEditButton.addEventListener("click", openEditForm);

// Функция открытия редактирования профиля
function openEditForm() {
  getValues();
  openPopup(editForm);
}

// Получение значений в редактирование профиля
function getValues() {
  const profile = user.getUserInfo();
  editFormFieldName.value = profile.name;
  editFormFieldSubline.value = profile.subline;
}

// Открытие формы с добавлением картинки
function openItemForm() {
  itemFormWindow.reset();
  openPopup(itemForm);
}

const itemWindow = new PopupWithForm(itemForm, () => {
  const card = new Card(
    itemFormFieldTitle.value,
    itemFormFieldImage.value,
    () => {
      let popupWithImage = new PopupWithImage(imagePopup);
      popupWithImage.open(itemFormFieldTitle.value, itemFormFieldImage.value);
      popupWithImage.setEventListners();
    }
  );
  const itemElement = card.generateCard();

  elementsList.prepend(itemElement);

  closePopup(itemForm);
});

itemWindow.setEventListners();

const user = new UserInfo({
  userNameSelector: profileName,
  userSublineSelector: profileSubline,
});

const editWindow = new PopupWithForm(editForm, (item) => {
  user.setUserInfo(item);
  closePopup(editForm);
});

editWindow.setEventListners();

const formList = Array.from(
  document.querySelectorAll(configValidation.formSelector)
);
formList.forEach((form) => {
  form = new FormValidator(configValidation, form);
  form.enableValidation();
});
