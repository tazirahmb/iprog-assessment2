const template = document.createElement('template');
template.innerHTML = `
  <style>
    .header-wrapper {
      background-color: var(--white);
      border-bottom: 1.5px solid var(--neutralColorLight);
    }
  </style>
  <header class="header-wrapper">
    <strong>Zira's Car Rental</strong>
  </header>
`;

class MyHeader extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('my-header', MyHeader);
