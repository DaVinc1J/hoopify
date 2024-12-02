import { products } from "./products-data.js";

const featuredContainer = document.querySelector(".featured-products");
const latestContainer = document.querySelector(".latest-products");

// Parse date strings into actual Date objects for comparison
function parseDate(dateStr) {
	const [day, month, year] = dateStr.split("/").map(Number);
	return new Date(year, month - 1, day);
}

// Render products dynamically
function renderProducts(container, productList) {
	container.innerHTML = ""; // Clear existing content
	productList.forEach((product) => {
		const stars = Array.from({ length: 5 }, (_, i) =>
			i < Math.floor(product.rating)
				? '<i class="fa fa-star"></i>'
				: i < product.rating
					? '<i class="fa fa-star-half-o"></i>'
					: '<i class="fa fa-star-o"></i>',
		).join("");

		container.innerHTML += `
      <div class="col-4">
				<a href="${product.link}?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" />
        </a>
        <h4>${product.name}</h4>
        <div class="rating">${stars}</div>
        <p>$${product.price.toFixed(2)}</p>
      </div>
    `;
	});
}

// Fetch featured products
function getFeaturedProducts() {
	return products.filter((product) => product.featured).slice(0, 4);
}

// Fetch latest products
function getLatestProducts() {
	return [...products]
		.sort((a, b) => parseDate(b.dateAdded) - parseDate(a.dateAdded))
		.slice(0, 4);
}

// Render sections
renderProducts(featuredContainer, getFeaturedProducts());
renderProducts(latestContainer, getLatestProducts());
