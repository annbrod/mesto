
//Контейнер с карточками
class CardList {
    constructor(container, cardElement) { //передаём  шаблон карточки
      this.container = container;
      this.cardElement = cardElement;
    }
    
    //создаёт карточку
    addCard(name, link) {
      const card = this.cardElement.create(name, link); //из шаблона делаем DOM-элемент
      this.container.insertAdjacentHTML("beforeend", card); //добавляем карточку в cardList
    }
  
    //добавляет карточки при загрузке
    render(cards) {
        cards.forEach(item => {
        this.addCard(item.name, item.link);
      });
    }
  
  }