const element = `
  <style>
    .header-wrapper {
      background-color: var(--primary);
      border-bottom: 1.5px solid var(--primaryLight);
    }

    .header-wrapper * {
      color: var(--white);
    }

    #header-logo__text {
  color: var(--white);
  font-size: 16px;
}

.header-logo:hover {
cursor: pointer;
}

  </style>
  <header class="header-wrapper py-1">
  <div class="container">
  <div class="flex-row justify-content-center">      
    <div class="flex-row justify-content-between">      
      <div class="flex-row align-items-center header-logo" onClick="window.location.href = '/'">
        <img src="/images/logo.png" id="header-logo__img" width="48px" class="mr-2"></img> 
        <span id="header-logo__text"><strong>Tazirah's</strong><br/>Car Rental</span>
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
