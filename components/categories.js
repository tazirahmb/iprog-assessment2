const categoriesList = [
  { label: "Cat 1", value: "1" },
  { label: "Cat 2", value: "2" },
  { label: "Cat 3", value: "3" },
  { label: "Cat 4", value: "4" },
];

// Reservation button redirect ke halaman reservation, nampilin dari local storage klo ada data, kalo gaada diapus.
class Categories extends HTMLElement {
  constructor() {
    super();
    // get categories ID
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const selectedCategory = params.get("category");

    this.innerHTML = `
  <style>
    .category-wrapper {
      background-color: var(--primaryLight);
      border-bottom: 1.5px solid var(--primary);
      height: 40px;
    }

.category-item {
  height: 40px;

}

.category-active {
  background-color: var(--accentColor);
  color: var(--neutralColorDarker);
}

.category-link{
  height: 100%;
  display: inline-block;
}

.category-link:hover{
  border-bottom: 4px solid var(--accentColor) !important;
  cursor: pointer;
  transition: 0.25s;
}

  </style>
  <nav class="category-wrapper">
    <div class="container flex-row justify-content-between g-1">
      ${categoriesList.map(
        (category) => `<div class="py-1 px-1 category-item ${
          category.value === selectedCategory ? "category__active" : ""
        }">
            <a class="link-reset category-link" href="?category=${
              category.value
            }">${category.label}</a>
          </div>`
      )}
    </div>
  </nav>
  `;
  }
}

customElements.define("category-list", Categories);
