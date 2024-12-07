import { products } from "./products-data.js";
import { renderProducts } from "./render.js";

const paginationContainer = document.getElementById("pagination");
const allProductsContainer = document.getElementById("all-products");
const sortDropdown = document.getElementById("sort-options");

let maxProductsPerPage = window.innerWidth <= 768 ? 15 : 16;
let sortedProducts = [...products];

const queryParams = new URLSearchParams(window.location.search);
const currentPage = parseInt(queryParams.get("page"), 10) || 1;

window.addEventListener("resize", () => {
  maxProductsPerPage = window.innerWidth <= 768 ? 15 : 16;
  loadPage(currentPage);
});

function renderPagination(totalProducts) {
  const totalPages = Math.ceil(totalProducts / maxProductsPerPage);

  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const activeClass = i === currentPage ? "active" : "";
    paginationContainer.innerHTML += `
      <a href="products.html?page=${i}" class="${activeClass}">${i}</a>
    `;
  }
}

function loadPage(page, productsToLoad = sortedProducts) {
  const start = (page - 1) * maxProductsPerPage;
  const end = start + maxProductsPerPage;

  const pageProducts = productsToLoad.slice(start, end);
  renderProducts(pageProducts, allProductsContainer);

  renderPagination(productsToLoad.length);
}

function sortProducts(criteria) {
  switch (criteria) {
    case "price-asc":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case "rating-desc":
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;
    case "popularity":
      sortedProducts.sort((a, b) => b.popularity - a.popularity);
      break;
    default:
      sortedProducts = [...products];
  }

  loadPage(1);
}

sortDropdown.addEventListener("change", (event) => {
  sortProducts(event.target.value);
});

loadPage(currentPage);
