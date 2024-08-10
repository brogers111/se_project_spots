const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

// Edit Profile Modal Selectors
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseModal =
  editProfileModal.querySelector(".modal__close-btn");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const profileForm = editProfileModal.querySelector(".modal__form");

// New Post Modal Selectors
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseModal = newPostModal.querySelector(".modal__close-btn");
const editPostImageInput = newPostModal.querySelector("#new-post-url-input");
const editPostCaptionInput = newPostModal.querySelector(
  "#new-post-caption-input"
);
const cardForm = newPostModal.querySelector(".modal__form");
const cardNameInput = newPostModal.querySelector("#new-post-caption-input");
const cardLinkInput = newPostModal.querySelector("#new-post-url-input");

// Preview Modal Selectors
const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__card-img");
const previewModalCaption = previewModal.querySelector(".modal__card-caption");
const previewCloseModalButton = previewModal.querySelector(".modal__close-btn");

// HTML Element Selectors
const editProfileButton = document.querySelector(".profile__button-edit");
const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__desc");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const newPostButton = document.querySelector(".profile__button-new");

// Modal Open/Close Functions
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

// Modal Submit Functions
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileNameInput.value;
  profileDesc.textContent = editProfileDescInput.value;
  closeModal(editProfileModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  cardsList.prepend(getCardElement(inputValues));
  evt.target.reset();
  closeModal(newPostModal);
}

// Edit Profile Modal Event Listeners
editProfileButton.addEventListener("click", () => {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescInput.value = profileDesc.textContent;
  openModal(editProfileModal);
});

editProfileCloseModal.addEventListener("click", () => {
  closeModal(editProfileModal);
});

profileForm.addEventListener("submit", handleEditProfileSubmit);

// New Post Modal Event Listeners
newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

newPostCloseModal.addEventListener("click", () => {
  closeModal(newPostModal);
});

cardForm.addEventListener("submit", handleAddCardSubmit);

// Card Functionality
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__caption");
  const cardImgEl = cardElement.querySelector(".card__img");
  const cardLikeButton = cardElement.querySelector(".card__button-like");
  const cardDeleteButton = cardElement.querySelector(".card__button-delete");

  cardNameEl.textContent = data.name;
  cardImgEl.src = data.link;
  cardImgEl.alt = data.name;

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__button-like_active");
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImgEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImage.src = data.link;
    previewModalCaption.textContent = data.name;
    previewModalImage.alt = data.name;
  });

  return cardElement;
}

initialCards.forEach((card) => {
  cardsList.append(getCardElement(card));
});

previewCloseModalButton.addEventListener("click", () => {
  closeModal(previewModal);
});
