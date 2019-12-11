
//Попап картинки
class PopupImage {
    constructor(container) {
      this.container = container;
    }
  
    open(event) {
      if (event.target.classList.contains("place-card__image")) {
        //Замена картинки в попапе на картинку в карточке
        this.container.querySelector(".image-popup__image").setAttribute(
          "src",
          event.target.style.backgroundImage.slice(5, -2)
        );
    
        //Открытие попапа
        this.container.classList.add("popup_is-opened");
      }
    }
  
    close(event) {
      if(event.target.classList.contains("image-popup__close")) {
        this.container.classList.remove("popup_is-opened");
      }
    }
  }

  