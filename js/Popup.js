//Общий класс для попапа добавления карточки и попапа изменения профиля
class Popup {
    constructor(container){
      this.container = container;
      this.form = this.container.querySelector("form");
    }
    open(event){
      this.container.classList.add("popup_is-opened");
    }
  
    close(event) {
      this.container.classList.remove("popup_is-opened");
    }
  
  }