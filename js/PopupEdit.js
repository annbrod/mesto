//Попап редактирования профиля
class PopupEdit extends Popup {
    constructor(container){
      super(container);
    }

    open(event) {
      super.open(event);
    }

    close(event) {
      super.close(event);
    }
   
    edit(event) {
      event.preventDefault();
      const name = this.form.elements.name;
      const about = this.form.elements.about;
      document.querySelector(".user-info__name").textContent = name.value;
      document.querySelector(".user-info__job").textContent = about.value;
      this.container.classList.remove("popup_is-opened");
    }
  }