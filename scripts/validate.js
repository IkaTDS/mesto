// Показать ошибку поля ввода
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__field_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_active');
  };

// Спрятать ошибку поля ввода
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__field_error');
    errorElement.classList.remove('popup__error_active');
    errorElement.textContent = '';
  };

// Общая проверка на валидность
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

// Установка обработчика событий
 const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
    const buttonElement = formElement.querySelector('.popup__button');
  
    // toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

// Включение валидации
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__window'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement);
     });
  };

// Проверка одного поля на валидность
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }
  
// Делает активной или не активной кнопку в зависимости от валидности
  function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_disabled');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__button_disabled');
    buttonElement.disabled = false;
  }
  }
  
  enableValidation();