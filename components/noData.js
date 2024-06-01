const template = `
  <style>
   .no-data {
      width: 100%;
      text-align: center;
      margin-top: 172px;
      }

      .no-data__icon {
        font-size: 60px;
        font-weight: bold;
      }
  </style>
 <div
		class="no-data my-5 flex-column justify-content-center align-items-center text-center"
	>
		<span class="no-data__icon mb-2">{icon}</span>
		<h1 class="no-data__text text-size-md mb-1">Not Found</h1>
		<span class="no-data__message">{message}</span>
	</div>
`;

class NoData extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = template;
  }
}

customElements.define("no-data", NoData);
