const newCardForm = document.forms.new;
const newCardName = newCardForm.elements.title;
const newCardLink = newCardForm.elements.link;

const editProfileForm = document.forms.edit;
const editProfileName = editProfileForm.elements.name;
const editProfileAbout = editProfileForm.elements.about;

const newCardPopup = document.querySelector(".popup");
const editProfilePopup = document.querySelector(".profile-popup");
const imagePopup = document.querySelector(".image-popup");

const placesList = document.querySelector(".places-list");
const userName = document.querySelector(".user-info__name");
const userAbout = document.querySelector(".user-info__job");


 //Объект с текстом ошибок
 const errorMessages = {
  emptyField: "Это обязательное поле",
  outOfRange: "Должно быть от 2 до 30 символов",
  invalidUrl: "Здесь должна быть ссылка",
  correctInput: ""
};

/* Функции */

//Создаёт карточку и возвращает её

function createCard(nameValue, linkValue) {
  const placeCard = document.createElement("div");
  placeCard.classList.add("place-card");
  placeCard.insertAdjacentHTML(
    "beforeend",
    ` 
<div class="place-card__image"> 
<button class="place-card__delete-icon"></button> 
</div> 
<div class="place-card__description"> 
<h3 class="place-card__name"></h3> 
<button class="place-card__like-icon"></button> 
</div>`
  );
  placeCard.querySelector(".place-card__name").textContent = nameValue;
  placeCard.querySelector(
    ".place-card__image"
  ).style.backgroundImage = `url(${linkValue})`;

  return placeCard;
}

//Функция добавления карточки

function addCard(event) {
  event.preventDefault();
  const placeCard = createCard(newCardName.value, newCardLink.value);
  placesList.appendChild(placeCard);
  disableButton(event);
  newCardForm.reset();
  closeNewCardPopup();
}

//Функция валидации форм

function validate(event) {
  const [formInput1, formInput2] = event.currentTarget.elements;

  if (!formInput1.validity.valid || !formInput2.validity.valid) {
    //Если какое-то поле не валидно, проверить поля и вывести сообщение

    checkEmptyField(event, formInput1, formInput2);
    checkSymbols(event, formInput1);
    checkUrl(event, formInput2);
    checkIfCorrect(event, formInput1, formInput2);
    disableButton(event);
  } else {
    enableButton(event);
    checkIfCorrect(event, formInput1, formInput2);
  }
}

// Проверка на корректность ввода (убирает сообщения об ошибках)

function checkIfCorrect(event, ...inputsArr) {
  if (event.target.validity.valid) {
    inputsArr.forEach(input => {
      if (event.target.name === input.name) {
        document.querySelector(`#error-${input.name}`).textContent = errorMessages.correctInput;
      }
    });
  }
}

//Проверка на пустое поле
function checkEmptyField(event, ...inputsArr) {
  //inputsArr - все инпуты, которые передаются функции
  if (event.target.value == "") {
    inputsArr.forEach(input => {
      if (event.target.name === input.name) {
        document.querySelector(`#error-${input.name}`).textContent =
          errorMessages.emptyField;
      }
    });
  }
}

//Проверка количества символов

function checkSymbols(event, ...inputsArr) {
  if (event.target.value.length === 1 || event.target.value.length > 30) {
    inputsArr.forEach(input => {
      if (event.target.name === input.name && input.name !== "link") {
        document.querySelector(`#error-${input.name}`).textContent =
          errorMessages.outOfRange;
      }
    });
  }
}

//Проверка ссылки

function checkUrl(event, ...inputsArr) {
  if (!event.target.validity.valid && event.target.value.length !== 0) {
    inputsArr.forEach(input => {
      if (event.target.name === input.name && input.name == "link") {
        document.querySelector(`#error-${input.name}`).textContent =
          errorMessages.invalidUrl;
      } else if (input.name !== "link") {
        checkSymbols(event, input);
      }
    });
  }
}

//функция лайка
function likeHandler(event) {
  if (event.target.classList.contains("place-card__like-icon")) {
    event.target.classList.toggle("place-card__like-icon_liked");
  }
}

//функция открытия формы добавления карточки
function openNewCardPopup() {
  newCardPopup.classList.add("popup_is-opened");
}

//Функция закрытия формы добавления карточки
function closeNewCardPopup() {
  if (event.target.classList.contains("popup__close")) {
    newCardPopup.classList.remove("popup_is-opened");
}
}

// Функция удаления карточки
function deleteCard(event) {
  if (event.target.classList.contains("place-card__delete-icon")) {
    placesList.removeChild(event.target.closest(".place-card"));
  }
}

//Функция открытия попапа с картинкой
function openImagePopup(event) {
  if (event.target.classList.contains("place-card__image")) {
    //Замена картинки в попапе на картинку в карточке
    const popupImage = document.querySelector(".image-popup__image");
    popupImage.setAttribute(
      "src",
      event.target.style.backgroundImage.slice(5, -2)
    );

    //Открытие попапа
    imagePopup.classList.add("popup_is-opened");
  }
}

//Функция закрытия попапа с картинкой
function closeImagePopup() {
  imagePopup.classList.remove("popup_is-opened");
}

//функция открытия формы изменения профиля
function openEditProfilePopup() {
  editProfilePopup.classList.add("popup_is-opened");
}

//Функция закрытия формы изменения профиля
function closeEditProfilePopup() {
  if (event.target.classList.contains("popup__close")) {
    editProfilePopup.classList.remove("popup_is-opened");
}
}
//Функция изменения профиля

function editProfile() {
  event.preventDefault();
  userName.textContent = editProfileName.value;
  userAbout.textContent = editProfileAbout.value;
  editProfileForm.reset();
  disableButton(event);
  closeEditProfilePopup();
}

//Функция отключения кнопки формы
function disableButton(event) {
  const formButton = event.currentTarget.querySelector(".popup__button");

  formButton.setAttribute("disabled", true);
  formButton.classList.add("popup__button_disabled");
  formButton.classList.remove("popup__button_enabled");
}

//Функция включения кнопки формы
function enableButton(event) {
  const formButton = event.currentTarget.querySelector(".popup__button");

  formButton.removeAttribute("disabled");
  formButton.classList.remove("popup__button_disabled");
  formButton.classList.add("popup__button_enabled");
}

/* Слушатели */

//Слушатель валидации формы добавления карточки
newCardForm.addEventListener("input", validate);

//Слушатель валидации формы изменения профиля
editProfileForm.addEventListener("input", validate);

//Слушатель открытия попапа с картинкой
placesList.addEventListener("click", openImagePopup);

//Cлушатель закрытия попапа с картинкой
const closeImageButton = document.querySelector(".image-popup__close");
closeImageButton.addEventListener("click", closeImagePopup);

//Слушатель формы измененния профиля
editProfileForm.addEventListener("submit", editProfile);

//Слушатель открытия формы добавления карточки
const addButton = document.querySelector(".user-info__button");
addButton.addEventListener("click", openNewCardPopup);

//Слушатель формы добавления карточки
newCardForm.addEventListener("submit", addCard);

//Слушатель лайка
placesList.addEventListener("click", likeHandler);

//Слушатель кнопки закрытия формы добавления карточки
//const closeButtons = document.querySelectorAll(".popup__close");
newCardPopup.addEventListener("click", closeNewCardPopup);

//Слушатель кнопки удаления карточки
const deleteButton = document.querySelectorAll(".place-card__delete-icon");
placesList.addEventListener("click", deleteCard);

//Слушатель открытия формы изменения профиля
const editButton = document.querySelector(".user-info__edit");
editButton.addEventListener("click", openEditProfilePopup);

//Слушатель закрытия формы изменения профиля
editProfilePopup.addEventListener("click", closeEditProfilePopup);

