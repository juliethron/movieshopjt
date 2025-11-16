const container = document.querySelector("#movie-details");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function fetchProduct() {
  container.innerHTML = `<p class="loading">Loading product...</p>`;

  try {
    const res = await fetch(`https://api.noroff.dev/api/v1/square-eyes/${id}`);
    if (!res.ok) throw new Error("Product not found.");

    const product = await res.json();

    // Create image name from product title
    const cleanedTitle = product.title.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const image = `../img/${cleanedTitle}.jpg`; 
    const altText = `Poster for ${product.title}`;

    container.innerHTML = `
      <img src="${image}" alt="${altText}" />
      <h1>${product.title}</h1>
      <p><strong>Genre:</strong> ${product.genre || "N/A"}</p>
      <p>${product.description || "No description available."}</p>
      <p class="price"><strong>Price:</strong> $${product.price?.toFixed(2) || "N/A"}</p>
      <button id="addToCart" class="btn">Add to Basket</button>
    `;

    document.querySelector("#addToCart").addEventListener("click", () => addToCart(product));

  } catch (error) {
    container.innerHTML = `<p class="error">⚠️ ${error.message}</p>`;
  }
}

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`"${product.title}" has been added to your basket!`);
}

document.addEventListener("DOMContentLoaded", fetchProduct);
