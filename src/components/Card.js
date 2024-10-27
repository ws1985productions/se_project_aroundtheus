export default class Card {
    constructor(
      data,
      cardSelector,
      handleImageClick,
      handleDeleteCard,
      handleLikeToggle,
      userId
    ) {
      this.name = data.name;
      this.link = data.link;
      this._id = data._id;
      this._isLiked = data.isLiked;
      this._userId = userId;
      this._cardSelector = cardSelector;
      this._handleImageClick = handleImageClick;
      this._handleDeleteCard = handleDeleteCard;
      this._handleLikeToggle = handleLikeToggle;
    }
  
    _isLikedByUser() {
      return this._isLiked.some((like) => like._id === this._userId);
    }
  
    _updateLikeStatus() {
      const likeButton = this._cardElement.querySelector(".card__heart");
  
      if (this._isLiked) {
        likeButton.classList.add("card__heart-active");
      } else {
        likeButton.classList.remove("card__heart-active");
      }
    }
  
    _setEventListeners() {
      // Add event listeners for like and delete buttons
      this._cardElement
        .querySelector(".card__heart")
        .addEventListener("click", () => {
          this._handleLikeToggle(this, this._id, this._isLiked);
        });
  
      this._cardElement
        .querySelector(".card__trash")
        .addEventListener("click", () => {
          this._handleDeleteCard(this._id);
        });
  
      // Add event listener for image click
      this._cardImageElement.addEventListener("click", () => {
        this._handleImageClick({ name: this.name, link: this.link });
      });
    }
  
    handleLikeButton() {
      this._cardElement
        .querySelector(".card__heart")
        .classList.toggle("card__heart-active");
    }
  
    handleTrashButton() {
      this._cardElement.remove();
      this._cardElement = null;
    }
  
    getView() {
      // Create the card element
      this._cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector(".card")
        .cloneNode(true);
  
      // Get references to the image and title elements
      this._cardImageElement = this._cardElement.querySelector(".card__image");
  
      this._cardElement.querySelector(".card__title").textContent = this.name;
      this._cardElement.querySelector(".card__image").src = this.link;
      this._cardElement.querySelector(".card__image").alt = this.name;
  
      this._updateLikeStatus();
  
      // Set event listeners
      this._setEventListeners();
  
      // Return the card element
      return this._cardElement;
    }
  }