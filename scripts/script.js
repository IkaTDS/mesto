let profileEditButton = document.querySelector('.profile__edit-button');
let editForm = document.querySelector('.edit-form');
let editFormCloseButton = document.querySelector('.edit-form__close-button');
let editFormWindow = document.querySelector('.edit-form__window');
let editFormFieldName = document.querySelector('.edit-form__field[name="name"]');
let editFormFieldSubline = document.querySelector('.edit-form__field[name="subline"]');
let profileName = document.querySelector('.profile__name');
let profileSubline = document.querySelector('.profile__name-subline');

function showForm () {
    editForm.classList.remove('edit-form_closed');
    getValues();
};

function closeForm () {
    editForm.classList.add('edit-form_closed');
};

function getValues () {
    editFormFieldName.value = profileName.textContent;
    editFormFieldSubline.value = profileSubline.textContent;
};

function saveValues () {
    profileName.textContent = editFormFieldName.value;
    profileSubline.textContent = editFormFieldSubline.value;
}

function formSubmit (evt) {
    evt.preventDefault();
    saveValues();
    closeForm();
}

profileEditButton.addEventListener('click', showForm);

editFormCloseButton.addEventListener('click', closeForm);

editFormWindow.addEventListener('submit', formSubmit);