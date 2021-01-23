// Объявление переменных
let profileEditButton = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
let editForm = document.querySelector('.edit-form'); // попап редактирования профиля
let editFormCloseButton = document.querySelector('.edit-form__close-button'); // закрыть попап редактирования профиля
let editFormWindow = document.querySelector('.edit-form__window'); // форма редактирования
let editFormFieldName = document.querySelector('.edit-form__field[name="name"]'); // ввод имени в редактировании
let editFormFieldSubline = document.querySelector('.edit-form__field[name="subline"]'); // ввод деятельности в редактировании
let profileName = document.querySelector('.profile__name'); // имя на главной странице
let profileSubline = document.querySelector('.profile__name-subline'); // деятельность на главной странице
let elements = document.querySelector('.elements'); // список карточек

let itemAddButton = document.querySelector('.profile__button') // кнопка по открытию попап добавление карточек
let itemForm = document.querySelector('.item-form'); // попап добавления карточек
let itemFormCloseButton = document.querySelector('.item-form__close-button'); // закрытие папап по добавлению карточек
let itemFormWindow = document.querySelector('.item-form__window'); // форма дообавления карточек
let itemFormFieldName = document.querySelector('.item-form__field[name="name"]'); // ввод названия для карточки
let itemFormFieldImage = document.querySelector('.item-form__field[name="image"]'); // ввод ссылки для карточки

let imagePopupCloseButton = document.querySelector('.image-popup__close-button'); // закрытие по крестику
let imagePopup = document.querySelector('.image-popup'); // открытие попап
let imagePopupCaption = document.querySelector('.image-popup__caption'); // подпись картинки
let imagePopupImage = document.querySelector('.image-popup__image'); // сама картинка в попап

// Массив
let initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.reverse ();

// Создание нового элемента с классом
function createElem(tag, className) {
  let cardElement = document.createElement(tag);
  cardElement.classList.add(className);

  return cardElement;
}

// Создание карточки
function createCard(name, link) {
  let element = createElem('div', 'element');
  let image = createElem('div', 'element__image');
  let caption = createElem('caption', 'element__caption');
  let header = createElem('header', 'element__title');
  let like = createElem('button', 'element__like-button');
  let trashbutton = createElem('button', 'element__trash-button');

  trashbutton.addEventListener('click', function () {
    element.remove();
  });

  like.addEventListener('click', function () {
    like.classList.toggle('element__like-button_active')
  });

  image.addEventListener('click', function () {
    showImagePopup (name, link);
  });

  image.setAttribute('alt', name);
  image.style.backgroundImage = `url(${link})`;
  element.append(image);

  header.textContent = name;
  caption.append(header);

  caption.append(like);

  element.prepend(trashbutton);

  element.append(caption);

  elements.prepend(element);
}

// Инициализация карточек
function initial() {
  initialCards.forEach(function (card) {    
    createCard(card.name, card.link);
  });
}

// Редактирование профиля
function showForm() {
  editForm.classList.remove('edit-form_closed');
  getValues();
};

function closeForm() {
  editForm.classList.add('edit-form_closed');
};

function getValues() {
  editFormFieldName.value = profileName.textContent;
  editFormFieldSubline.value = profileSubline.textContent;
};

function saveValues() {
  profileName.textContent = editFormFieldName.value;
  profileSubline.textContent = editFormFieldSubline.value;
};

function formSubmit(evt) {
  evt.preventDefault();
  saveValues();
  closeForm();
};

profileEditButton.addEventListener('click', showForm);

editFormCloseButton.addEventListener('click', closeForm);

editFormWindow.addEventListener('submit', formSubmit);

// Добавление "нового места" //

// Открытие формы
function showItemForm() {
  itemForm.classList.remove('item-form_closed');
  itemFormWindow.reset();
};

// Закрытие формы
function closeItemForm() {
  itemForm.classList.add('item-form_closed');  
};

// Отправка формы
function formItemSubmit(evt) {
  evt.preventDefault();
  createCard(itemFormFieldName.value, itemFormFieldImage.value);
  closeItemForm();
};

// Попап с просмотром картинки по клику //

// Открытие попап
function showImagePopup(name, link) {
  imagePopup.classList.remove('image-popup_closed');
  imagePopupImage.setAttribute('src', link);
  imagePopupImage.setAttribute('alt', name);
  imagePopupCaption.textContent = name;
};

// Закрытие попап
function closeImagePopup() {
  imagePopup.classList.add('image-popup_closed');  
};

itemAddButton.addEventListener('click', showItemForm); // Открытие попап (добавление карточки) по клику

itemFormCloseButton.addEventListener('click', closeItemForm); // Закрытие по клику (добавление карточки)

itemFormWindow.addEventListener('submit', formItemSubmit); // Отправка по клику (добавление карточки)

imagePopupCloseButton.addEventListener('click', closeImagePopup); // Закрытие по клику (просмотр карточки)

initial(); // Вызов функции