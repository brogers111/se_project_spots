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
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
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

// Modal selectors
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseModal =
  editProfileModal.querySelector(".modal__close-btn");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const saveModalButton = editProfileModal.querySelector(".modal__submit-btn");
const editModal = editProfileModal.querySelector(".modal__form");

// HTML Element Selectors
const editProfileButton = document.querySelector(".profile__button-edit");
const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__desc");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

// Modal Functions
function openModal() {
  editProfileModal.classList.add("modal-opened");
  editProfileNameInput.value = profileName.textContent;
  editProfileDescInput.value = profileDesc.textContent;
}

function closeModal() {
  editProfileModal.classList.remove("modal-opened");
}

function saveModal(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileNameInput.value;
  profileDesc.textContent = editProfileDescInput.value;
  closeModal();
}

// Modal Event Listeners
editProfileButton.addEventListener("click", openModal);

editProfileCloseModal.addEventListener("click", closeModal);

editModal.addEventListener("submit", saveModal);

// Card Functionality
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__caption");
  const cardImgEl = cardElement.querySelector(".card__img");

  cardNameEl.textContent = data.name;
  cardImgEl.src = data.link;
  cardImgEl.alt = data.name;

  return cardElement;
}

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.append(cardElement);
}
