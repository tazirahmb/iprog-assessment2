class MyButton extends HTMLButtonElement {
  constructor() {
    super();

    this.classList.add("my-btn");
  }
}

customElements.define("my-button", MyButton, { extends: "button" });
