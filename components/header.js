const element = `
  <style>
    .header-wrapper {
      background-color: var(--primary);
      border-bottom: 1.5px solid var(--primaryLight);
    }

    .header-wrapper > p, strong {
      color: var(--white);
    }

    input::placeholder {
      color: var(--neutralColorDark);
    }

    .accent-button-style {
      background-color: var(--accentColor);
      color: var(--neutralColorDarker);
      font-weight: bold;
    }

    .accent-button-style:hover {
      cursor: pointer;
    background-color: var(--primaryLight);
    color: var(--neutralColorLighter);
  }

.header__reservation-btn {
  border: none;
  border-radius: 4px;
}

.search-box {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  width: 320px;
  border-left: none;
}

.search-box__btn {
  width: auto;
  height: 48px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin: 0;
}
  </style>
  <header class="header-wrapper py-1">
  <div class="container">
  <div class="flex-row justify-content-between">      
  <div>
  <p>logo</p>  
  <strong>Zira's Car Rental</strong>
  </div>
  <form name="car__search-form" method="get">
			<input
      type="text"
      placeholder="Search car by name or brand..."
				name="search"
								list="search-list"
				aria-label="searchbox-input"
				class="input__style search-box"
				onKeyDown={handleSearchKeyDown}
			/>
							<datalist id="search-list">
									<option value="Tesla Model S"></option>
									<option value="Tesla Model 3"></option>
									<option value="Tesla Model X"></option>
									<option value="Tesla Model Y"></option>
									<option value="Toyota Camry"></option>
									<option value="Toyota Crown"></option>
									<option value="Toyota bZ4X"></option>
									<option value="Subaru Crosstek Hybrid"></option>
									<option value="Subaru Forester Hybrid"></option>
									<option value="Subaru Solterra"></option>
									<option value="Mazda CX-30"></option>
								</datalist>
			<button
      is="my-button"
				type="submit"
				aria-label="search-icon"
				class="search-box__btn accent-button-style"
			>
				Search
			</button>
		</form>
  <button class="header__reservation-btn py-1 px-2 accent-button-style" onClick="window.location.href = '/reservation-summary'">Reservation</button> 
  </div>
  </div>
  </header>
  `;

function redirectToSearch(query) {
  window.location.href = `/?search=${query}`;
}

function handleSearch(formData) {
  const searchQuery = formData.get("search") || "";
  if (searchQuery !== "") {
    redirectToSearch(searchQuery);
  }
}

function handleSearchKeyDown(e) {
  const { value } = e.target;
  if (e.key === "Enter" && value !== "") {
    redirectToSearch(value.trim());
  }
}

// Reservation button redirect ke halaman reservation, nampilin dari local storage klo ada data, kalo gaada diapus.
class MyHeader extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = element;
  }

  connectedCallback() {
    const searchBox = this.querySelector("[name='search']");
    searchBox.addEventListener("keydown", handleSearchKeyDown);
    document.forms["car__search-form"].addEventListener("submit", handleSearch);
  }
}

customElements.define("my-header", MyHeader);
