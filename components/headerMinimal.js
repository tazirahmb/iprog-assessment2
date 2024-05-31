const element = `
  <style>
    .header-wrapper {
      background-color: var(--primary);
      border-bottom: 1.5px solid var(--primaryLight);
    }

    .header-wrapper * {
      color: var(--white);
    }

  </style>
  <header class="header-wrapper py-1">
  <div class="container">
  <div class="flex-row justify-content-center">      
  <div>
  <p>logo</p>  
  <strong>Zira's Car Rental</strong>
  </div>
  </div>
  </div>
  </header>
  `;

// Reservation button redirect ke halaman reservation, nampilin dari local storage klo ada data, kalo gaada diapus.
class MyHeader extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = element;
  }
}

customElements.define("my-header-minimal", MyHeader);
