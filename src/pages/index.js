import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";
import "../pages/index.css";
import {
  cardSelector,
  profileEditForm,
  addCardForm,
  profileEditBtn,
  addNewCardButton,
  validationConfig,
  editAvatar,
  editAvatarForm,
  // avatarInput,
  // avatarImage,
  profileNameInput,
  profileDescriptionInput,
} from "../utils/constants.js";

/**************************************************************************
 *                            RENDERING CARDS                             *
 **************************************************************************/

// Function to handle image click
function handleImageClick(data) {
  previewPopup.open(data.name, data.link);
}

const cardSection = new Section(
  {
    renderer: (data) => {
      const card = renderCard(data);
      cardSection.addItem(card);
    },
  },
  ".cards__list"
);

// Function to render a card
function renderCard(data) {
  const card = new Card(
    data,
    cardSelector,
    () => handleImageClick(data),
    (cardId) => handleDeleteCard(card, cardId),
    (card, cardId, isLiked) => handleLikeToggle(card, cardId, isLiked)
  );
  return card.getView();
}

/**************************************************************************
 *                               VALIDATION                               *
 **************************************************************************/

const profileFormValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
const cardFormValidator = new FormValidator(validationConfig, addCardForm);
const editAvatarValidator = new FormValidator(validationConfig, editAvatarForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
editAvatarValidator.enableValidation();

/**************************************************************************
 *                                  API                                   *
 **************************************************************************/

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "57a80a94-8586-44af-a2df-e7b970827f66",
    "Content-Type": "application/json"
  }
});

/**************************************************************************
 *                                 CARDS                                  *
 **************************************************************************/

// API call to get the initial cards
api
  .getInitialCards()
  .then((cardsData) => {
    cardSection.renderItems(cardsData);
  })
  .catch((err) => console.log(err));

function handleAddCardFormSubmit(inputValues) {
  addCardPopup.setLoadingState(true);

  const { title, url } = inputValues;
  api
    .uploadCard({ name: title, link: url })
    .then((newCard) => {
      cardSection.addItem(renderCard(newCard));
      cardFormValidator.disableSubmitButton();
      addCardPopup.close();
      addCardPopup.resetForm();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      addCardPopup.setLoadingState(false);
    });
}

/**************************************************************************
 *                                 POPUPS                                 *
 **************************************************************************/

// Edit Profile Popup
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditPopup.setEventListeners();

// Edit Button Modal
profileEditBtn.addEventListener("click", () => {
  const currentUserInfo = profileInfo.getUserInformation();
  profileNameInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.job;
  profileEditPopup.open();
});

// Add Card Popup
const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();
addNewCardButton.addEventListener("click", () => addCardPopup.open());

// Image Preview Popup
const previewPopup = new PopupWithImage("#preview-modal");
previewPopup.setEventListeners();

// Delete Confirmation Popup
const deletePopup = new PopupWithConfirmation(
  "#delete-picture-modal",
  handleDeleteCard
);
deletePopup.setEventListeners();

// Change Avatar Popup
const changeProfilePopup = new PopupWithForm(
  "#avatar-modal",
  handleAvatarEditSubmit
);
changeProfilePopup.setEventListeners();
editAvatar.addEventListener("click", () => changeProfilePopup.open());

/**************************************************************************
 *                               USER INFO                                *
 **************************************************************************/

const profileInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

api
  .getUserInfo()
  .then((userData) => {
    profileInfo.setUserInformation({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
  })
  .catch((err) => console.error(err));

function handleProfileEditSubmit(formValues) {
  profileEditPopup.setLoadingState(true);

  api
    .setUserInfo({ name: formValues.name, about: formValues.description })
    .then((updatedUserData) => {
      profileInfo.setUserInformation({
        name: updatedUserData.name,
        job: updatedUserData.about,
      });
      profileEditPopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      profileEditPopup.setLoadingState(false);
    });
}

/**************************************************************************
 *                             CHANGE AVATAR                              *
 **************************************************************************/

function handleAvatarEditSubmit(formValues) {
  changeProfilePopup.setLoadingState(true);

  api
    .setUserAvatar(formValues.avatar)
    .then((data) => {
      profileInfo.setUserAvatar(data.avatar)
      editAvatarValidator.disableSubmitButton();
      changeProfilePopup.close();
      changeProfilePopup.resetForm();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      changeProfilePopup.setLoadingState(false);
    });
}

/**************************************************************************
 *                               FUNCTIONS                                *
 **************************************************************************/

function handleDeleteCard(card, cardId) {
  if (!cardId) {
    console.error("card._id is undefined");
    return;
  }

  deletePopup.setSubmitAction(() => {
    api
      .deleteCard({ cardId })
      .then(() => {
        card.handleTrashButton();
        console.log(`Successfully deleted card with ID: ${cardId}`);
        deletePopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });

  deletePopup.open();
}

function handleLikeToggle(card, cardId, isLiked) {
  if (isLiked) {
    api
      .dislikeCard(cardId)
      .then((updatedCardData) => {
        card.handleLikeButton(updatedCardData.likes);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .likeCard(cardId)
      .then((updatedCardData) => {
        card.handleLikeButton(updatedCardData.likes);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}