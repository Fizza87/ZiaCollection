// Open/Close Cart
const sideCart = document.getElementById("sideCart");
const closeCart = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

let cart = [];

// Open Cart
function openCart() {
  sideCart.classList.add("active");
}

// Close Cart
closeCart.addEventListener("click", () => {
  sideCart.classList.remove("active");
});

// Add to Cart Button Click
function addToCart(name, price, img) {
  // Check if item already exists
  let existing = cart.find(item => item.name === name);
  if(existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, img, quantity: 1 });
  }
  renderCart();
  openCart();
}
// Render Items in Cart
function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <p>${item.name}</p>
          <p>Rs.${item.price}</p>
          <div class="quantity-controls">
            <button onclick="decreaseQty(${index})">-</button>
            <span>${item.quantity}</span>
            <button onclick="increaseQty(${index})">+</button>
          </div>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">×</button>
      </div>
    `;
  });


  cartTotal.textContent = "Total: Rs." + total;
  cartCount.textContent = `(${cart.length} items)`;
}

// Add quantity functions
function increaseQty(index) {
  cart[index].quantity++;
  renderCart();
}

function decreaseQty(index) {
  if(cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    // agar 1 hai to remove kar de
    removeItem(index);
    return;
  }
  renderCart();
}


// Remove Item
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}



// Event listener for add-to-cart buttons
document.querySelectorAll(".add-to-cart-btn").forEach(button => {
  button.addEventListener("click", function () {
      let productCard = this.closest(".product-card");
      let name = productCard.querySelector(".product-name").innerText;
      let priceText = productCard.querySelector(".price-amount").innerText.replace("Rs. ", "").replace(",", "");
      let price = parseInt(priceText);
      let img = productCard.querySelector("img").src;

      addToCart(name, price, img);
  });
});