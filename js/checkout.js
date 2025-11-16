const container = document.querySelector("#checkout-list");
const totalDisplay = document.querySelector("#checkout-total");
const checkoutButton = document.querySelector("#checkout-btn");

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    container.innerHTML = `<p class="empty-cart">Your basket is empty.</p>`;
    totalDisplay.textContent = "$0.00";
    checkoutButton.disabled = true;
    return;
  }

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const image = item.images?.[0]?.url || "/movieshopjt/img/placeholder.jpg";
    const price = (item.price / 5).toFixed(2); // match pricing from home.js

    total += Number(price);

    container.innerHTML += `
      <div class="checkout-item">
        <div class="item-info">
          <img src="${image}" alt="${item.title}" class="checkout-img" />
          <div>
            <h3>${item.title}</h3>
            <p>${item.genre || "General"}</p>
            <p>$${price}</p>
          </div>
        </div>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;
  });

  totalDisplay.textContent = `$${total.toFixed(2)}`;

  document.querySelectorAll(".remove-btn").forEach(btn =>
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      removeFromCart(index);
    })
  );

  checkoutButton.disabled = false;
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

checkoutButton.addEventListener("click", () => {
  localStorage.removeItem("cart");
  window.location.href = "./confirmation/index.html";
});

document.addEventListener("DOMContentLoaded", loadCart);
