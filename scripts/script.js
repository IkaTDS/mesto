let profileEditButton = document.querySelector('.profile__edit-button');
let editForm = document.querySelector('.edit-form');
let editFormCloseButton = document.querySelector('.edit-form__close-button');
let editFormSaveButton = document.querySelector('.edit-form__button');
let editFormFieldName = document.querySelector('.edit-form__field-name');
let editFormFieldSubline = document.querySelector('.edit-form__field-subline');
let profileName = document.querySelector('.profile__name');
let profileSubline = document.querySelector('.profile__name-subline');

profileEditButton.addEventListener('click', function () {
    editForm.classList.remove('hidden');
});

editFormCloseButton.addEventListener('click', function () {
    editForm.classList.add('hidden');
});

editFormFieldName.setAttribute('value', profileName.textContent);
editFormFieldSubline.setAttribute('value', profileSubline.textContent);

editFormSaveButton.addEventListener('click', function () {
    profileName.textContent = editFormFieldName.value;
    profileSubline.textContent = editFormFieldSubline.value;
    editForm.classList.add('hidden');
});

document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
        evt.preventDefault();
        profileName.textContent = editFormFieldName.value;
        profileSubline.textContent = editFormFieldSubline.value;
        editForm.classList.add('hidden');
    }  
});