// cart-page.js
import {
  getCart,
  saveCart,
  removeFromCart,
  clearCart,
  updateCartCount,
} from "./cart.js";

function displayCartItems() {
  const cart = getCart();
  const cartItemsContainer = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("subtotal");
  const taxEl = document.getElementById("tax");
  const totalEl = document.getElementById("total");

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    subtotalEl.textContent = "$0.00";
    taxEl.textContent = "$0.00";
    totalEl.textContent = "$0.00";
    return;
  }

  let subtotal = 0;
  cartItemsContainer.innerHTML = ""; // Clear existing items

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <div class="cart-info">
        <img src="${item.img}" alt="${item.name}" />
        <div>
          <p>${item.name}</p>
          <p>Size: ${item.size}</p>
          <small>Price: $${item.price.toFixed(2)}</small><br />
          <a href="#" class="remove-btn" data-id="${item.id}" data-size="${item.size}">Remove</a>
        </div>
      </div>
      <div class="quantity">
        <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" data-size="${item.size}" />
      </div>
      <div class="subtotal">
        $${itemTotal.toFixed(2)}
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  // Calculate tax and total
  const taxRate = 0.1; // 10% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;

  // Add event listeners for quantity changes and remove buttons
  setupCartItemEventListeners();
}

function setupCartItemEventListeners() {
  // Handle quantity changes
  const quantityInputs = document.querySelectorAll(
    '.quantity input[type="number"]',
  );
  quantityInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const productId = e.target.dataset.id;
      const productSize = e.target.dataset.size;
      const newQuantity = parseInt(e.target.value, 10);

      if (newQuantity < 1 || isNaN(newQuantity)) {
        alert("Quantity must be at least 1");
        e.target.value = 1;
        return;
      }

      const cart = getCart();
      const itemIndex = cart.findIndex(
        (item) => item.id === productId && item.size === productSize,
      );

      if (itemIndex >= 0) {
        cart[itemIndex].quantity = newQuantity;
        saveCart(cart);
        displayCartItems();
      }
    });
  });

  // Handle remove buttons
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const productId = e.target.dataset.id;
      const productSize = e.target.dataset.size;
      removeFromCart(productId, productSize);
      displayCartItems();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayCartItems();
  updateCartCount();

  const checkoutBtn = document.getElementById("checkoutBtn");
  checkoutBtn.addEventListener("click", () => {
    // Implement checkout functionality
    alert("Proceeding to checkout...");
    // For example, you might clear the cart after checkout
    clearCart();
    displayCartItems();
  });
});
