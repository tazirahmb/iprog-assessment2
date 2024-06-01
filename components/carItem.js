const productDummyImage =
  "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Range-Desktop-LHD.jpg";

class CarItem extends HTMLElement {
  constructor() {
    super();

    this.item = JSON.parse(this.getAttribute("data")) || {};
    const { stock = 0 } = this.item;
    const isSoldOut = stock === 0;

    this.innerHTML = `    
    <style>
    .car-item {
      border: 1px solid var(--neutralColor);
      border-radius: 12px;
      height: auto;
      width: auto;
    }

    .car-item:hover {
      border-color: var(--primary);
    }

    .car-item__img-wrapper {
      height: 200px;
      display: flex;
      align-items: center;
    }

    .car-item__img {
      width: 100%;
      height: auto;
    }

    .car-item__content {
      height: 100px;
    }

    .car-item__content h2 {
      font-weight: normal;
    }

    .car-item__price {
      font-weight: bold;
    }

    .car-item__unit {
      color: var(--neutralColorDark);
    }
  </style>
  <div class="car-item p-2">
    <div class="car-item__img-wrapper">
      <img
      src="${this.item.image || productDummyImage}"
      alt="${this.item.name}"
      class="mx-auto car-item__img"
      />
    </div>
			<div class="car-item__content my-1">
				<h2 class="text-size-md mt-2 mb-1">${this.item.name}</h2>
				<p class="mt-2 mb-1">
					<span class="text-size-sm car-item__price">
						A$${this.item.price}
					</span>&nbsp;
					<span class="text-size-xs car-item__unit">
						/ day
					</span>
				</p>
			</div>
			<button is="my-button" class="car-item__btn" ${isSoldOut ? "disabled" : ""}>
				${isSoldOut ? "Not Available" : "Rent this Car"}
			</button>
		</div>`;
  }

  handleClickReserveCar(item) {
    console.log("function");
    console.log(item);

    // save data to localstorage
    window.localStorage.setItem("car", JSON.stringify(item)); // still not work...
    window.localStorage.setItem("qty", 1);

    window.location.href = "/reservation-summary";
  }

  connectedCallback() {
    // Add event listener to the button
    this.querySelector(".car-item__btn").addEventListener("click", () => {
      // Call your custom function here
      this.handleClickReserveCar(this.item);
    });
  }
}

customElements.define("car-item", CarItem);
