// products-details.js
import { products } from "./products-data.js";
import { addToCart, updateCartCount } from "./cart.js";

function getQueryParam(param) {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(param);
}

const productId = getQueryParam("id");

const product = products.find((p) => p.id == productId);

if (product) {
	const productImg = document.getElementById("productImg");
	productImg.src = product.image;

	const smallImgRow = document.getElementById("smallImgRow");
	smallImgRow.innerHTML = "";
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

	document.getElementById("productName").textContent = product.name;
	document.getElementById("productPrice").textContent =
		`$${product.price.toFixed(2)}`;
	document.getElementById("productDescription").textContent =
		product.description;

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

	document.querySelector(".col-2 h1").after(ratingContainer);

	const smallImages = document.querySelectorAll(".small-img");
	smallImages.forEach((img) => {
		img.addEventListener("click", () => {
			productImg.src = img.src;
		});
	});

	const addToCartBtn = document.getElementById("addToCartBtn");
	addToCartBtn.addEventListener("click", () => {
		const productName = product.name;
		const productPrice = product.price;
		const productImgSrc = product.image;

		const productSize = document.getElementById("productSize").value;

		const quantityInput = document.querySelector('input[type="number"]');
		const productQuantity = parseInt(quantityInput.value, 10);

		if (productSize === "Select Size") {
			alert("Please select a size.");
			return;
		}

		if (productQuantity < 1 || isNaN(productQuantity)) {
			alert("Please enter a valid quantity.");
			return;
		}

		const productToAdd = {
			id: productId,
			name: productName,
			price: productPrice,
			size: productSize,
			quantity: productQuantity,
			img: productImgSrc,
		};

		addToCart(productToAdd);

		alert("Product added to cart!");

		updateCartCount();
	});
} else {
	alert("Product not found");
	window.location.href = "products.html";
}
