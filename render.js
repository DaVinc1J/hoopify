export function renderProducts(productList, container) {
	container.innerHTML = ""; // Clear existing content

	productList.forEach((product) => {
		const stars = Array.from({ length: 5 }, (_, i) =>
			i < Math.floor(product.rating)
				? '<i class="fa fa-star"></i>'
				: i < product.rating
					? '<i class="fa fa-star-half-o"></i>'
					: '<i class="fa fa-star-o"></i>',
		).join("");

		const productHTML = `
      <div class="col-4">
				<a href="${product.link}?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" />
        </a>
        <h4>${product.name}</h4>
        <div class="rating">${stars}</div>
        <p>$${product.price.toFixed(2)}</p>
      </div>
    `;
		container.insertAdjacentHTML("beforeend", productHTML);
	});
}
