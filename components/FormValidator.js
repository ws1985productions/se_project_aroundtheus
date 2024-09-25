export default class FormValidator {
    constructor(validationConfig, formElement) {
        this._formElement = formElement;
        this._inputSelector = validationConfig.inputSelector;
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass;
        this._inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    }

    _showInputError(inputElement) {
        const errorMessageElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorMessageElement.textContent = inputElement.validationMessage;
        errorMessageElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorMessageElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorMessageElement.textContent = "";
        errorMessageElement.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputElements.some(inputElement => !inputElement.validity.valid);
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        }
        if (this._hasInvalidInput()) {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;}
    } 
    
   
    _setEventListeners() {
        this._inputElements.forEach(inputElement => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
        this._toggleButtonState();
    }

    resetValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideError(inputElement)
        });
        
        this._toggleButtonState();
    }

    enableValidation() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();
        this._toggleButtonState(); // Initial state check
    }
    disableButton() {
        this._submitButton.classList.add(this._settings.inactiveButtonClass);
        this._submitButton.disabled = true;
      }
    
}
