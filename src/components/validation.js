export { clearValidation, enableValidation };

// Добавление класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const formErrorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add(config.inputErrorClass);
  formErrorElement.textContent = errorMessage; 
  formErrorElement.classList.add(config.errorClass);
};
  
  // Удаление класса с ошибкой
 const hideInputError = (formElement, inputElement, config) => {
  const formErrorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  formErrorElement.classList.remove(config.errorClass);
  formErrorElement.textContent = '';
};
   
function clearValidation(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, config);
    });
    formElement.reset();
    toggleButtonState(inputList, buttonElement, config);
  }


function isValid(formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.error);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = 'true';
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}
