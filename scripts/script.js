// Объявление переменных
const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const profileName = document.querySelector('.profile__name'); // имя на главной странице
const profileSubline = document.querySelector('.profile__name-subline'); // деятельность на главной странице
const elementsList = document.querySelector('.elements'); // список карточек

const editForm = document.querySelector('.popup_edit-form'); // попап профиля
const editFormFieldName = document.querySelector('.popup__field_name'); // ввод имени в редактировании
const editFormFieldSubline = document.querySelector('.popup__field_subline'); // ввод деятельности в редактировании
const editFormWindow = document.querySelector('.popup__window_edit-form'); // форма редактирования

const itemForm = document.querySelector('.popup_item-form'); // попап профиля
const itemFormFieldTitle = document.querySelector('.popup__field_title'); // ввод названия для карточки
const itemFormFieldImage = document.querySelector('.popup__field_image'); // ввод ссылки для карточки
const itemAddButton = document.querySelector('.profile__button') // кнопка по открытию попап добавление карточек
const itemFormWindow = document.querySelector('.popup__window_item-form'); // форма редактирования

const imagePopup = document.querySelector('.popup_image-popup'); // попап с картинкой
const imagePopupCaption = document.querySelector('.popup__caption'); // подпись картинки
const imagePopupImage = document.querySelector('.popup__image'); // сама картинка в попап

const editCloseButton = document.querySelector('.popup__close-button_edit-form'); // закрытие по крестику формы редактирования
const itemCloseButton = document.querySelector('.popup__close-button_item-form'); // закрытие по крестику формы добавления
const imageCloseButton = document.querySelector('.popup__close-button_image-popup'); // закрытие по крестику просмотра картинки

const templ = document.querySelector('.element-template'); // шаблон

const popupsList = document.querySelectorAll('.popup'); // список переменных

// Создание по шаблону карточек и слушателей
function createCard(name, link) {
  const newCard = templ.content.cloneNode(true);

  newCard.querySelector('.element__image').style.backgroundImage = `url(${link})`;
  newCard.querySelector('.element__title').textContent = name;

  // Лайк
  newCard.querySelector('.element__like-button').addEventListener('click', toggleLike);

  // Корзина
  newCard.querySelector('.element__trash-button').addEventListener('click', deleteCard);

  // Увеличить картинку
  newCard.querySelector('.element__image').addEventListener('click', function () {
    showImagePopup(name, link);
  });

  return newCard;
};

// Переключение лайка
function toggleLike() {
  this.classList.toggle('element__like-button_active')
};

// Удаление карточки
function deleteCard() {
  this.closest('.element').remove();
};

// Добавление карточки в DOM
function addCard(card, container) {
  container.prepend(card);
};

// Инициализация карточек
function initial() {
  initialCards.forEach(function (card) {
    addCard(createCard(card.name, card.link), elementsList);
  });
};

// Попап с просмотром картинки по клику //

// Открытие попап с картинкой
function showImagePopup(name, link) {
  openPopup(imagePopup);
  imagePopupImage.setAttribute('src', link);
  imagePopupImage.setAttribute('alt', name);
  imagePopupCaption.textContent = name;
};

// Открытие попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  const inputList = Array.from(popup.querySelectorAll('.popup__field'));
  const popupbutton = popup.querySelector('.popup__button');
  if (popup.querySelector('.popup__button')) {  
  toggleButtonState(inputList, popupbutton, configValidation.inactiveButtonClass);
  }
};

// Закрытие попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  clearError(popup);
};

// Закрытие попап с редактированием профиля
editCloseButton.addEventListener('click', function () {
  closePopup(editForm);
});

// Закрытие попапа кликом на оверлей
popupsList.forEach((popup) => {
  popup.addEventListener('click', function(evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  })
});

// Закрытие попап с добавлением карточки
itemCloseButton.addEventListener('click', function () {
  closePopup(itemForm);
});

// Закрытие попап с картинкой
imageCloseButton.addEventListener('click', function () {
  closePopup(imagePopup);
});

// Открытие попап (добавление карточки) по клику
itemAddButton.addEventListener('click', function () {
  openItemForm(itemForm);
});

// Обработчик формы по редактированию профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editFormFieldName.value;
  profileSubline.textContent = editFormFieldSubline.value;
  closePopup(editForm);
};

// Открытие попап редактирования профиля
profileEditButton.addEventListener('click', openEditForm);

// Функция открытия редактирования профиля
function openEditForm() {
  getValues();
  openPopup(editForm);  
};

// Получение значений в редактирование профиля
function getValues() {
  editFormFieldName.value = profileName.textContent;
  editFormFieldSubline.value = profileSubline.textContent;
};

// Обработчик формы по добавлению картинки
function handleItemFormSubmit(evt) {
  evt.preventDefault();
  addCard(createCard(itemFormFieldTitle.value, itemFormFieldImage.value), elementsList);
  closePopup(itemForm);
  itemFormWindow.reset();
};

// Открытие формы с добавлением картинки
function openItemForm() {
  itemFormWindow.reset();
  openPopup(itemForm);
}

// Закрытие формы
document.addEventListener('keydown', function (evt) {
  if (evt.key === "Escape") {
  popupsList.forEach((popup) => {
    closePopup(popup);
  });
}
});

itemFormWindow.addEventListener('submit', handleItemFormSubmit); // Отправка по клику (добавление карточки)

editFormWindow.addEventListener('submit', handleEditFormSubmit);// Отправка по клику (редактирование профиля)

initial(); // Вызов функции