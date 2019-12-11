class Card {
    constructor(){
      
    }
  //Создаёт DOM-элемент карточки
    create(name, link){   
      return `
          <div class="place-card">
              <div class="place-card__image" style="background-image: url(${link});">
                  <button class="place-card__delete-icon"></button>
              </div>
              <div class="place-card__description">
                  <h3 class="place-card__name">${name}</h3>
                  <button class="place-card__like-icon"></button>
              </div>
          </div>
          `;
    }
  
    like(event) {
      if (event.target.classList.contains("place-card__like-icon")) {
        event.target.classList.toggle("place-card__like-icon_liked");
      }
    }
  
    remove(event) {
      if (event.target.classList.contains("place-card__delete-icon")) {
           event.target.closest(".place-card").remove();
         }
    }
  }