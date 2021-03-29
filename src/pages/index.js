// Объявление переменных
const profileEditButton = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const profileName = document.querySelector(".profile__name"); // имя на главной странице
const avatarEditButton = document.querySelector(".profile__avatar-edit");
const avatarPopup = document.querySelector(".popup_avatar-edit");
const profileSubline = document.querySelector(".profile__name-subline"); // деятельность на главной странице
const editForm = document.querySelector(".popup_edit-form"); // попап профиля
const editFormFieldName = document.querySelector(".popup__field_name"); // ввод имени в редактировании
const editFormFieldSubline = document.querySelector(".popup__field_subline"); // ввод деятельности в редактировании
const editFormWindow = document.querySelector(".popup__window_edit-form"); // форма редактирования
const itemForm = document.querySelector(".popup_item-form"); // попап профиля
const itemAddButton = document.querySelector(".profile__button"); // кнопка по открытию попап добавление карточек
const itemFormWindow = document.querySelector(".popup__window_item-form"); // форма редактирования
const elementsList = document.querySelector(".elements");
const imagePopup = document.querySelector(".popup_image-popup");
const template = document.querySelector(".element-template");
const deletePopup = document.querySelector(".popup_item-delete");
const avatarFormWindow = document.querySelector(
  ".popup__window_avatar-edit-form"
);

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
import { initialCards } from "../utils/initial-cards.js";
import { Api } from "../components/Api.js";
import { PopupWithDelete } from "../components/PopupWithDelete";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-21",
  headers: {
    authorization: "98f5c354-4da5-403d-9b43-a5547d84374c",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  userNameSelector: profileName,
  userSublineSelector: profileSubline,
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, data]) => {
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user.avatar);
    cardsList.initial(data);
  })
  .catch((err) => {
    console.log(`${err}`);
  });

function createCard(cardInfo) {
  const card = new Card(
    cardInfo,
    template,
    () => {
      popupWithImage.open(cardInfo);
    },
    () => {
      handleDeleteItem(card);
    },
    userInfo.userId,
    () => {
      handleCardLike(card, cardInfo);
    }
  );

  const newCard = card.generateCard();
  card.addLike(cardInfo);

  return newCard;
}

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const itemElement = createCard(item);
      cardsList.addItem(itemElement);
    },
  },
  elementsList
);

// Открытие попап (добавление карточки) по клику
itemAddButton.addEventListener("click", () => {
  popupAddCard.open();
  addCardFormValidator.toggleButtonState();
  addCardFormValidator.clearError();
});

// Открытие попап редактирования профиля
profileEditButton.addEventListener("click", () => {
  setValues();
  editWindow.open();
  editProfileFormValidator.toggleButtonState();
  editProfileFormValidator.clearError();
});

avatarEditButton.addEventListener("click", () => {
  popupAvatar.open();
  avatarEditFormValidator.toggleButtonState();
  avatarEditFormValidator.clearError();
});

// Получение значений в редактирование профиля
function setValues() {
  const profile = userInfo.getUserInfo();
  editFormFieldName.value = profile.name;
  editFormFieldSubline.value = profile.about;
}

function handleDeleteItem(card) {
  popupDeleteItem.open(() => {
    api
      .deleteCard(card._cardInfo._id)
      .then(() => {
        card.handleDeleteCard();
        popupDeleteItem.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  });
}

function handleCardLike(card, data) {
  const like = card.likeCheck()
    ? api.deleteLike(data._id)
    : api.addLike(data._id);

  like
    .then((data) => {
      card.addLike(data);
    })
    .catch((err) => {
      console.log(`${err}`);
    });
}

const popupWithImage = new PopupWithImage(".popup_image-popup");

popupWithImage.setEventListners();

const popupDeleteItem = new PopupWithDelete(".popup_item-delete");

popupDeleteItem.setEventListners();

const popupAddCard = new PopupWithForm(".popup_item-form", (card) => {
  popupAddCard.loading(true);
  api
    .addCard(card)
    .then((res) => {
      const itemElement = createCard(res);
      cardsList.addItem(itemElement);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(`${err}`);
    });
});

popupAddCard.setEventListners();

const editWindow = new PopupWithForm(".popup_edit-form", (item) => {
  editWindow.loading(true);
  api
    .editProfile(item)
    .then((data) => {
      userInfo.setUserInfo(data);
      editWindow.close();
    })
    .catch((err) => {
      console.log(`${err}`);
    });
});

editWindow.setEventListners();

const popupAvatar = new PopupWithForm(".popup_avatar-edit", (item) => {
  popupAvatar.loading(true);
  api
    .editAvatar(item)
    .then((data) => {
      userInfo.setUserAvatar(data.avatar);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(`${err}`);
    });
});

popupAvatar.setEventListners();

const avatarEditFormValidator = new FormValidator(
  configValidation,
  avatarFormWindow
);

avatarEditFormValidator.enableValidation();

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
