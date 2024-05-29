const element = `
  <style>
    .header-wrapper {
      background-color: var(--white);
      border-bottom: 1.5px solid var(--neutralColorLight);
    }
  </style>
  <header class="header-wrapper container py-1">
    <div class="flex-row justify-content-between">      
      <div>
        <p>logo</p>  
        <strong>Zira's Car Rental</strong>
      </div>
      <input type="text" placeholder="Search car here..." />
      <button>Reservation</button> 
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

customElements.define("my-header", MyHeader);
