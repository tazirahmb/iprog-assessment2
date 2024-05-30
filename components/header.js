const element = `
  <style>
    .header-wrapper {
      background-color: var(--primary);
      border-bottom: 1.5px solid var(--primaryLight);
    }

    .header-wrapper * {
      color: var(--white);
    }

    input::placeholder {
      color: var(--neutralColorDark);
    }

.header__reservation-btn {
  border: none;
  border-radius: 4px;
  background-color: var(--accentColor);
  color: var(--neutralColorDarker);
  font-weight: bold;
}

.header__reservation-btn:hover {
  cursor: pointer;
  background-color: var(--primaryLight);
  color: var(--neutralColorLighter);
}
  </style>
  <header class="header-wrapper py-1">
  <div class="container">
  <div class="flex-row justify-content-between">      
  <div>
  <p>logo</p>  
  <strong>Zira's Car Rental</strong>
  </div>
  <input type="text" class="py-1 px-2" placeholder="Search car here..." />
  <button class="header__reservation-btn py-1 px-2" onClick="window.location.href = '/reservation-summary'">Reservation</button> 
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

customElements.define("my-header", MyHeader);
