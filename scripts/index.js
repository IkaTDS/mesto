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

const imagePopupImage = document.querySelector(".popup__image");
const imagePopupCaption = document.querySelector(".popup__caption");

const imagePopup = document.querySelector(".popup_image-popup"); // попап с картинкой

const editCloseButton = document.querySelector(
  ".popup__close-button_edit-form"
); // закрытие по крестику формы редактирования
const itemCloseButton = document.querySelector(
  ".popup__close-button_item-form"
); // закрытие по крестику формы добавления
const imageCloseButton = document.querySelector(
  ".popup__close-button_image-popup"
); // закрытие по крестику просмотра картинки

const popupsList = document.querySelectorAll(".popup"); // список переменных

import { FormValidator, configValidation } from "./FormValidator.js";
import { Card } from "./Card.js";

// Инициализация карточек
function initial() {
  initialCards.forEach(function (card) {
    const item = new Card(card.name, card.link, () => {
      showImagePopup(card.name, card.link);
      handlePopupEscape();
    });
    const itemElement = item.generateCard();
    elementsList.prepend(itemElement);
  });
}

function showImagePopup(name, link) {
  imagePopup.classList.add("popup_opened");
  imagePopupImage.setAttribute("src", link);
  imagePopupImage.setAttribute("alt", name);
  imagePopupCaption.textContent = name;
}

function handlePopupEscape() {
  document.addEventListener("keydown", closePopupEsc);
}

// Открытие попап
function openPopup(popup) {
  const popupButton = popup.querySelector(".popup__button");
  let popupForm = popup.querySelector(".popup__window");
  popupForm = new FormValidator(configValidation, popupForm);
  if (popupButton) {
    popupForm.toggleButtonState();
  }

  popup.classList.add("popup_opened");

  document.addEventListener("keydown", closePopupEsc);
}

// Закрытие попап
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  const popupField = popup.querySelector(".popup__field");
  let popupForm = popup.querySelector(".popup__window");
  popupForm = new FormValidator(configValidation, popupForm);
  if (popupField) {
    popupForm.clearError();
  }

  document.removeEventListener("keydown", closePopupEsc);
}

// Закрытие попап по кнопке Esc
function closePopupEsc(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }
}

// Закрытие попап с редактированием профиля
editCloseButton.addEventListener("click", function () {
  closePopup(editForm);
});

// Закрытие попапа кликом на оверлей
popupsList.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

// Закрытие попап с добавлением карточки
itemCloseButton.addEventListener("click", function () {
  closePopup(itemForm);
});

// Закрытие попап с картинкой
imageCloseButton.addEventListener("click", function () {
  closePopup(imagePopup);
});

// Открытие попап (добавление карточки) по клику
itemAddButton.addEventListener("click", function () {
  openItemForm(itemForm);
});

// Обработчик формы по редактированию профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editFormFieldName.value;
  profileSubline.textContent = editFormFieldSubline.value;
  closePopup(editForm);
}

// Открытие попап редактирования профиля
profileEditButton.addEventListener("click", openEditForm);

// Функция открытия редактирования профиля
function openEditForm() {
  getValues();
  openPopup(editForm);
}

// Получение значений в редактирование профиля
function getValues() {
  editFormFieldName.value = profileName.textContent;
  editFormFieldSubline.value = profileSubline.textContent;
}

// Обработчик формы по добавлению картинки
function handleItemFormSubmit(evt) {
  evt.preventDefault();
  const item = new Card(
    itemFormFieldTitle.value,
    itemFormFieldImage.value,
    () => {
      showImagePopup(itemFormFieldTitle.value, itemFormFieldImage.value);
      handlePopupEscape();
    }
  );
  const itemElement = item.generateCard();

  elementsList.prepend(itemElement);

  closePopup(itemForm);
}

// Открытие формы с добавлением картинки
function openItemForm() {
  itemFormWindow.reset();
  openPopup(itemForm);
}

itemFormWindow.addEventListener("submit", handleItemFormSubmit); // Отправка по клику (добавление карточки)

editFormWindow.addEventListener("submit", handleEditFormSubmit); // Отправка по клику (редактирование профиля)

initial(); // Вызов функции

const formList = Array.from(
  document.querySelectorAll(configValidation.formSelector)
);
formList.forEach((form) => {
  form = new FormValidator(configValidation, form);
  form.enableValidation();
});
