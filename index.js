import { products } from "./products-data.js";
import { initializeCart } from "./cart.js";

const featuredContainer = document.querySelector(".featured-products");
const latestContainer = document.querySelector(".latest-products");

function parseDate(dateStr) {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}

function renderProducts(container, productList) {
  container.innerHTML = "";
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

function getFeaturedProducts() {
  return products.filter((product) => product.featured).slice(0, 4);
}

function getLatestProducts() {
  return [...products]
    .sort((a, b) => parseDate(b.dateAdded) - parseDate(a.dateAdded))
    .slice(0, 4);
}

async function loadContent() {
  const headerResponse = await fetch("header.html");
  const headerHtml = await headerResponse.text();
  document.getElementById("header").innerHTML = headerHtml;

  const customContent = `
    <div class="row">
      <div class="col-2">
        <h1>High Quality <br /> Low Price</h1>
        <p>Discover our expansive range in one click.</p>
        <a href="products.html" class="btn">Explore Now &#8594;</a>
      </div>
      <div class="col-2">
        <img src="images/image1.png" />
      </div>
    </div>
  `;
  document
    .querySelector(".header .container")
    .insertAdjacentHTML("beforeend", customContent);

  const footerResponse = await fetch("footer.html");
  const footerHtml = await footerResponse.text();
  document.getElementById("footer").innerHTML = footerHtml;

  const menuToggle = document.getElementById("menu-toggle");
  const menuItems = document.getElementById("MenuItems");

  if (menuItems) {
    menuItems.style.maxHeight = "0px";
  }

  if (menuToggle && menuItems) {
    menuToggle.addEventListener("click", () => {
      if (menuItems.style.maxHeight === "0px") {
        menuItems.style.maxHeight = "200px";
      } else {
        menuItems.style.maxHeight = "0px";
      }
      console.log("Menu toggled:", menuItems.style.maxHeight);
    });
  } else {
    console.error("Menu toggle or MenuItems not found.");
  }
}

loadContent();
renderProducts(featuredContainer, getFeaturedProducts());
renderProducts(latestContainer, getLatestProducts());
