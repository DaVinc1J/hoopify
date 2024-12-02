import { products } from "./products-data.js";
import { renderProducts } from "./render.js";

const maxProductsPerPage = 16;
const paginationContainer = document.getElementById("pagination");
const allProductsContainer = document.getElementById("all-products");
const sortDropdown = document.getElementById("sort-options");

let sortedProducts = [...products]; // Create a copy to apply sorting

// Get the current page number from the query string
const queryParams = new URLSearchParams(window.location.search);
const currentPage = parseInt(queryParams.get("page"), 10) || 1;

// Function to render pagination buttons
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

// Function to load products for the current page
function loadPage(page, productsToLoad = sortedProducts) {
	const start = (page - 1) * maxProductsPerPage;
	const end = start + maxProductsPerPage;

	const pageProducts = productsToLoad.slice(start, end);
	renderProducts(pageProducts, allProductsContainer);

	renderPagination(productsToLoad.length);
}

// Function to sort products based on selected criteria
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
			// Assuming products have a "popularity" field
			sortedProducts.sort((a, b) => b.popularity - a.popularity);
			break;
		default:
			sortedProducts = [...products]; // Reset to default order
	}

	loadPage(1); // Reload the first page after sorting
}

// Event listener for the sorting dropdown
sortDropdown.addEventListener("change", (event) => {
	sortProducts(event.target.value);
});

// Load the current page initially
loadPage(currentPage);
