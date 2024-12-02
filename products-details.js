// products-details.js
import { products } from "./products-data.js";
import { addToCart, updateCartCount } from "./cart.js";

// Function to get query parameters from the URL
function getQueryParam(param) {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(param);
}

// Get the 'id' parameter from the URL
const productId = getQueryParam("id");

// Find the product with the matching id
const product = products.find((p) => p.id == productId);

if (product) {
	// Update the product image
	const productImg = document.getElementById("productImg");
	productImg.src = product.image;

	// Update the small images
	const smallImgRow = document.getElementById("smallImgRow");
	smallImgRow.innerHTML = ""; // Clear existing images
	product.images.forEach((imgSrc) => {
		const div = document.createElement("div");
		div.classList.add("small-img-col");
		const img = document.createElement("img");
		img.src = imgSrc;
		img.width = 100;
		img.classList.add("small-img");
		div.appendChild(img);
		smallImgRow.appendChild(div);
	});

	// Update product details
	document.getElementById("productName").textContent = product.name;
	document.getElementById("productPrice").textContent =
		`$${product.price.toFixed(2)}`;
	document.getElementById("productDescription").textContent =
		product.description;

	// Update the rating stars
	const ratingContainer = document.createElement("div");
	ratingContainer.classList.add("rating");
	const fullStars = Math.floor(product.rating);
	const halfStar = product.rating % 1 >= 0.5;
	const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

	for (let i = 0; i < fullStars; i++) {
		const star = document.createElement("i");
		star.classList.add("fa", "fa-star");
		ratingContainer.appendChild(star);
	}
	if (halfStar) {
		const star = document.createElement("i");
		star.classList.add("fa", "fa-star-half-o");
		ratingContainer.appendChild(star);
	}
	for (let i = 0; i < emptyStars; i++) {
		const star = document.createElement("i");
		star.classList.add("fa", "fa-star-o");
		ratingContainer.appendChild(star);
	}

	// Insert the rating into the page
	document.querySelector(".col-2 h1").after(ratingContainer);

	// Add click events to small images to change the main image
	const smallImages = document.querySelectorAll(".small-img");
	smallImages.forEach((img) => {
		img.addEventListener("click", () => {
			productImg.src = img.src;
		});
	});

	// Add event listener for the "Add to Cart" button
	const addToCartBtn = document.getElementById("addToCartBtn");
	addToCartBtn.addEventListener("click", () => {
		// Gather product details
		const productName = product.name;
		const productPrice = product.price;
		const productImgSrc = product.image;

		// Get selected size
		const productSize = document.getElementById("productSize").value;

		// Get quantity
		const quantityInput = document.querySelector('input[type="number"]');
		const productQuantity = parseInt(quantityInput.value, 10);

		// Validate inputs
		if (productSize === "Select Size") {
			alert("Please select a size.");
			return;
		}

		if (productQuantity < 1 || isNaN(productQuantity)) {
			alert("Please enter a valid quantity.");
			return;
		}

		// Create product object
		const productToAdd = {
			id: productId,
			name: productName,
			price: productPrice,
			size: productSize,
			quantity: productQuantity,
			img: productImgSrc,
		};

		// Add product to cart
		addToCart(productToAdd);

		alert("Product added to cart!");

		// Update cart count
		updateCartCount();

		// Optionally, redirect to the cart page
		// window.location.href = "cart.html";
	});
} else {
	// If product not found, display an error or redirect
	alert("Product not found");
	// Optionally, redirect to products page
	window.location.href = "products.html";
}
