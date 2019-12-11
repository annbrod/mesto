//Попап добавления карточки
class PopupPlace extends Popup {
    constructor(container, list) {
      super(container);
      this.list = list;
    }
  
    open(event) {
      super.open(event);
    }

    close(event) {
      super.close(event);
    }
  
    submit(event) {
      event.preventDefault();
      const [name, link] = this.form.elements;
      this.list.addCard(name.value, link.value);
      this.container.classList.remove("popup_is-opened");
    }
  }