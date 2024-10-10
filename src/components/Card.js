export default class Card {
    constructor(data, cardSelector, handleImageClick) {
        this.name = data.name;
        this.link = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    _setEventListeners() {
        // Add event listeners for like and delete buttons
        this._cardElement.querySelector(".card__heart").addEventListener("click", () => {
            this._handleLikeButton();
        });

        this._cardElement.querySelector(".card__trash").addEventListener("click", () => {
            this._handleTrashButton();
        });

        // Add event listener for image click
        this._cardImageElement.addEventListener("click", () => {
            this._handleImageClick(this);
        });
    }

    _handleLikeButton() {
        this._cardElement.querySelector(".card__heart").classList.toggle("card__heart-active");
    }

    _handleTrashButton() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    getView() {
        // Create the card element
        this._cardElement = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);

        // Get references to the image and title elements
        this._cardImageElement = this._cardElement.querySelector(".card__image");
        const cardTitleEl = this._cardElement.querySelector(".card__title");

        // Set the path to the image and alt text
        this._cardImageElement.src = this.link;
        this._cardImageElement.alt = this.name;

        // Set the card title
        cardTitleEl.textContent = this.name;

        // Set event listeners
        this._setEventListeners();

        // Return the card element
        return this._cardElement;
    }
}