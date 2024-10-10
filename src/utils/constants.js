/**************************************************************************
 *                               CONSTANTS                                *
 **************************************************************************/

export const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
    }
]

// Find all close buttons
export const closeButtons = document.querySelectorAll(".modal__close");

// Profile Edit
export const profileEditBtn = document.querySelector("#profile__edit");
export const profileEditModal = document.querySelector("#profile-edit-modal");

export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__description");

export const profileNameInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector("#profile-description-input");

export const profileEditForm = profileEditModal.querySelector("#profile-edit");

// Card Template
export const cardSelector = "#card-template";
export const cardListEl = document.querySelector(".cards__list");

// Add Card
export const addNewCardButton = document.querySelector(".profile__add-button");
export const addCardModal = document.querySelector("#add-card-modal");

export const cardTitleInput = document.querySelector("#add-title-input");
export const cardUrlInput = document.querySelector("#add-url-input");

export const addCardForm = addCardModal.querySelector("#add-card-form");

// Preview Modal
export const previewModal = document.querySelector("#preview-modal");
export const previewModalImageEl = previewModal.querySelector(".modal__image");
export const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

// Validation Config
export const validationConfig = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
};