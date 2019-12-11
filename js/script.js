
/*Переменные*/

const newCardPopup = document.querySelector(".popup");
const editProfilePopup = document.querySelector(".profile-popup");
const imagePopup = document.querySelector(".image-popup");

const user= {};

const userName = document.querySelector('.user-info__name');
const userInfo = document.querySelector('.user-info__job');


//Форма изменения профиля

const editForm = document.forms.edit;
const name = editForm.elements.name;
const about = editForm.elements.about;



//Объект с текстом ошибок
const errorMessages = {
  emptyField: "Это обязательное поле",
  outOfRange: "Должно быть от 2 до 30 символов",
  invalidUrl: "Здесь должна быть ссылка",
  correctInput: ""
};

//Карточка
const card = new Card();


//Контейнер для карточек
const list = new CardList(document.querySelector(".places-list"), card);

//  list.render();

//Попап Place
const place = new PopupPlace(newCardPopup, list);

//попап Edit
const edit = new PopupEdit(editProfilePopup);

//Попап картинки
const image = new PopupImage(imagePopup);

/*Функции*/

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
place.form.addEventListener("input", validate);

//Слушатель валидации формы изменения профиля
edit.form.addEventListener("input", validate);

//Слушатель открытия попапа добавления карточки
document.querySelector(".user-info__button").addEventListener("click", event => {
  place.open(event);
});
//Слушатель закрытия попапа добавления карточки
document.querySelector(".popup__close").addEventListener("click", event => {
  place.close(event);
});

//Слушатель формы добавления карточки

place.form.addEventListener("submit", event => {
  place.submit(event);
});

//Слушатель открытия формы изменения профиля
document.querySelector(".user-info__edit").addEventListener("click", event => {
  edit.open(event);
});

//Слушатель закрытия формы изменения профиля
document.querySelector(".popup__close_type_edit").addEventListener("click", event => {
  edit.close(event);
});

//Слушатель формы измененния профиля
edit.form.addEventListener("submit", editUserInfo);


//Слушатель открытия попапа с картинкой
document.querySelector(".places-list").addEventListener("click", event => {
  image.open(event);
});

//Cлушатель закрытия попапа с картинкой
document.querySelector(".image-popup__close").addEventListener("click", event => {
  image.close(event);
});

//Слушатель лайка и удаления карточки
list.container.addEventListener("click", event => {
  card.like(event);
  card.remove(event);
});

//Загрузка информации профиля

api.getUserInfo()
  .then(data => {
    Object.assign(user, data)
      userName.textContent = data.name
      userInfo.textContent = data.about
    console.log(data)
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`)
  });

//Загрузка карточек с сервера

api.getInitialCards()
  .then(cards=> {
  const list = new CardList(document.querySelector('.places-list'), card)
  list.render(cards)
  console.log(cards)
})
  .catch(err => {
    console.log(`Ошибка: ${err}`)
});


//Функция изменения профиля

function editUserInfo (event){
  event.preventDefault();
 
  api.patchUserInfo(name.value, about.value)
    .then ( () => {
      
      userName.textContent = name.value;
      userInfo.textContent = about.value;
        edit.close()
    })
    .catch( (err) => {
      console.log(err);
    })
    
}


