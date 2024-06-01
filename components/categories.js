const categoriesList = [
  { label: "Tesla", value: "1" },
  { label: "Toyota", value: "2" },
  { label: "Subaru", value: "3" },
  { label: "Mazda", value: "4" },
];

// Reservation button redirect ke halaman reservation, nampilin dari local storage klo ada data, kalo gaada diapus.
class Categories extends HTMLElement {
  fetchData() {
    // const queryString = window.location.search;
    fetch(`/api/getCategories.php`)
      .then((res) => res.text())
      .then((res) => {
        this.categories = JSON.parse(res);
      })
      .catch((err) => console.error(err));
  }

  constructor() {
    super();
    this.categories = [];
    // get categories ID
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const selectedCategory = params.get("category");

    this.fetchData();

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
    <div class="container flex-row justify-content-around g-1">
      ${categoriesList.reduce(
        (accum, category) =>
          accum +
          `<div class="py-1 px-1 category-item ${
            category.value === selectedCategory ? "category__active" : ""
          }">
            <a class="link-reset category-link" href="?category=${
              category.value
            }">${category.label}</a>
          </div>`,
        ""
      )}
    </div>
  </nav>
  `;
  }
}

customElements.define("category-list", Categories);
