import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super({ popupSelector});
        this.popupForm = this._popupElement.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;

    }
    
    close() {
        this.popupForm.reset();
        super.close();
    }
}

const newCardPopup = new PopupWithForm('#new-card-popup', () => {});
newCardPopup.open()

newCardPopup.close();