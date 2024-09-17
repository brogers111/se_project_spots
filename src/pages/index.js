import {
  enableValidation,
  settings,
  disableButton,
  resetValidation,
} from "../scripts/validation.js";
import "./index.css";
import spotsLogoSrc from "../images/logo.svg";
import editIconSrc from "../images/pencil-icon.svg";
import plusIconSrc from "../images/plus-icon.svg";
import editAvatarIconSrc from "../images/pencil-icon-light.svg";
import Api from "../utils/Api.js";
import { setButtonText } from "../utils/helpers.js";

// Edit Profile Modal Selectors
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const profileForm = document.forms["edit-profile-form"];
const profileSubmitButton =
  editProfileModal.querySelector(".modal__submit-btn");

// New Post Modal Selectors
const newPostModal = document.querySelector("#new-post-modal");
const cardForm = document.forms["new-post-form"];
const cardSubmitButton = newPostModal.querySelector(".modal__submit-btn");
const cardNameInput = newPostModal.querySelector("#new-post-caption-input");
const cardLinkInput = newPostModal.querySelector("#new-post-url-input");

// Preview Modal Selectors
const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__card-img");
const previewModalCaption = previewModal.querySelector(".modal__card-caption");

// HTML Element Selectors
const editProfileButton = document.querySelector(".profile__button-edit");
const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__desc");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const newPostButton = document.querySelector(".profile__button-new");

// Avatar Modal Selectors
const avatarModalButton = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#edit-avatar-modal");
const avatarForm = document.forms["edit-avatar-form"];
const avatarInput = avatarForm.querySelector("#profile-avatar-input");
const spotsProfileImage = document.getElementById("image-profile-photo");

// Delete Modal Selectors
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = document.forms["delete-form"];
const previewCloseButton = deleteModal.querySelector(
  ".modal__submit-btn_type_cancel"
);
let selectedCard;
let selectedCardId;

// All Modal Functions
const closeButtons = document.querySelectorAll(".modal__close-btn");
const allModals = document.querySelectorAll(".modal");

// All Images
const spotsLogoImage = document.getElementById("image-spots-logo");
spotsLogoImage.src = spotsLogoSrc;

const spotsPencilImage = document.getElementById("image-edit-icon");
spotsPencilImage.src = editIconSrc;

const spotsPlusImage = document.getElementById("image-plus-icon");
spotsPlusImage.src = plusIconSrc;

const spotsAvatarEditImage = document.getElementById("profile-avatar-edit");
spotsAvatarEditImage.src = editAvatarIconSrc;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "0e956782-5d73-43c9-b6c2-e03d98d0eba5",
    "Content-Type": "application/json",
  },
});

// Initial Setup
api
  .getAppInfo()
  .then(([cards, users]) => {
    cards.forEach((card) => {
      cardsList.append(getCardElement(card));
    });
    spotsProfileImage.src = users.avatar;
    profileName.textContent = users.name;
    profileDesc.textContent = users.about;
  })
  .catch((err) => {
    console.error(err);
  });

// Modal Functionality
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

previewCloseButton.addEventListener("click", () => closeModal(deleteModal));

allModals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

// Add Card Functions
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  setButtonText(submitButton, true);

  api
    .addCard({ name: cardNameInput.value, link: cardLinkInput.value })
    .then((data) => {
      cardsList.prepend(getCardElement(data));
      evt.target.reset();
      disableButton(cardSubmitButton, settings);
      closeModal(newPostModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(submitButton, false);
    });
}

// Delete Card Functions
function handleCardDelete(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  setButtonText(submitButton, true, "Delete", "Deleting...");

  api
    .removeCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(submitButton, false, "Delete", "Deleting...");
    });
}

// Modal Submit Functions
function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  setButtonText(submitButton, true);

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDesc.textContent = data.about;
      disableButton(profileSubmitButton, settings);
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(submitButton, false);
    });
}

// Profile Submit Functions
function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  setButtonText(submitButton, true);

  api
    .editAvatarInfo({ avatar: avatarInput.value })
    .then((data) => {
      spotsProfileImage.src = data.avatar;
      evt.target.reset();
      disableButton(profileSubmitButton, settings);
      closeModal(avatarModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(submitButton, false);
    });
}

function handleLike(evt, cardId) {
  const isLiked = evt.target.classList.contains("card__button-like_active");
  api
    .changeLike({ _id: cardId, isLiked: isLiked })
    .then(() => evt.target.classList.toggle("card__button-like_active"))
    .catch((err) => {
      console.error(err);
    });
}

// Click Event Listeners
editProfileButton.addEventListener("click", () => {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescInput.value = profileDesc.textContent;
  resetValidation(
    profileForm,
    [editProfileNameInput, editProfileDescInput],
    settings
  );
  openModal(editProfileModal);
});

avatarModalButton.addEventListener("click", () => {
  openModal(avatarModal);
});

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

// Submit Event Listeners
profileForm.addEventListener("submit", handleEditProfileSubmit);

avatarForm.addEventListener("submit", handleAvatarSubmit);

cardForm.addEventListener("submit", handleAddCardSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);

// Card Functionality
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardCaptionEl = cardElement.querySelector(".card__caption");
  const cardImgEl = cardElement.querySelector(".card__img");
  const cardLikeButton = cardElement.querySelector(".card__button-like");
  const cardDeleteButton = cardElement.querySelector(".card__button-delete");

  cardCaptionEl.textContent = data.name;
  cardImgEl.src = data.link;
  cardImgEl.alt = data.name;

  if (data.isLiked) {
    cardLikeButton.classList.add("card__button-like_active");
  }

  cardLikeButton.addEventListener("click", (evt) => {
    handleLike(evt, data._id);
  });

  cardDeleteButton.addEventListener("click", () =>
    handleCardDelete(cardElement, data._id)
  );

  cardImgEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImage.src = data.link;
    previewModalCaption.textContent = data.name;
    previewModalImage.alt = data.name;
  });

  return cardElement;
}

enableValidation(settings);
