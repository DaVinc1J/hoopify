export function getCart() {
	const cart = localStorage.getItem("cart");
	return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart) {
	localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product) {
	const cart = getCart();

	const existingProductIndex = cart.findIndex(
		(item) => item.id === product.id && item.size === product.size,
	);

	if (existingProductIndex >= 0) {
		cart[existingProductIndex].quantity += product.quantity;
	} else {
		cart.push(product);
	}

	saveCart(cart);
	updateCartCount();
}

export function removeFromCart(productId, size) {
	let cart = getCart();
	cart = cart.filter((item) => !(item.id === productId && item.size === size));
	saveCart(cart);
	updateCartCount();
}

export function clearCart() {
	localStorage.removeItem("cart");
	updateCartCount();
}

export function updateCartCount() {
	const cart = getCart();
	const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
	const cartCountEl = document.getElementById("cartCount");
	if (cartCountEl) {
		cartCountEl.textContent = cartCount;
	}
}

export function initializeCart() {
	updateCartCount();
}

document.addEventListener("DOMContentLoaded", () => {
	updateCartCount();
});
