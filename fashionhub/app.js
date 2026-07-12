const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    category: "T-Shirts",
    price: 29,
    rating: 4.8,
    image: "images/p1.jpg",
    description: "Premium cotton t-shirt for everyday comfort.",
  },
  {
    id: 2,
    name: "Blue Denim Jeans",
    category: "Jeans",
    price: 49,
    rating: 4.7,
    image: "images/p2.jpg",
    description: "Slim fit denim jeans with stretch fabric.",
  },
  {
    id: 3,
    name: "Black Hoodie",
    category: "Hoodies",
    price: 59,
    rating: 4.9,
    image: "images/p3.jpg",
    description: "Soft fleece hoodie for winter.",
  },
  {
    id: 4,
    name: "Running Sneakers",
    category: "Shoes",
    price: 79,
    rating: 4.9,
    image: "images/p4.jpg",
    description: "Lightweight sports sneakers.",
  },
  {
    id: 5,
    name: "Leather Jacket",
    category: "Jackets",
    price: 120,
    rating: 5,
    image: "images/p5.jpg",
    description: "Premium leather jacket.",
  },
  {
    id: 6,
    name: "Luxury Watch",
    category: "Accessories",
    price: 140,
    rating: 4.8,
    image: "images/p6.jpg",
    description: "Elegant wrist watch.",
  },
  {
    id: 7,
    name: "Casual Shirt",
    category: "Shirts",
    price: 42,
    rating: 4.7,
    image: "images/p7.jpg",
    description: "Stylish casual shirt.",
  },
  {
    id: 8,
    name: "White Sneakers",
    category: "Shoes",
    price: 75,
    rating: 4.8,
    image: "images/p8.jpg",
    description: "Fashion sneakers.",
  },
  {
    id: 9,
    name: "Women's Dress",
    category: "Women",
    price: 68,
    rating: 4.9,
    image: "images/p9.jpg",
    description: "Beautiful party dress.",
  },
  {
    id: 10,
    name: "Hand Bag",
    category: "Accessories",
    price: 55,
    rating: 4.6,
    image: "images/p10.jpg",
    description: "Elegant handbag.",
  },
  {
    id: 11,
    name: "Sunglasses",
    category: "Accessories",
    price: 35,
    rating: 4.5,
    image: "images/p11.jpg",
    description: "UV protected sunglasses.",
  },
  {
    id: 12,
    name: "Baseball Cap",
    category: "Accessories",
    price: 20,
    rating: 4.4,
    image: "images/p12.jpg",
    description: "Comfortable adjustable cap.",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = document.getElementById("cartCount");
  if (!count) return;

  let total = 0;

  cart.forEach((item) => {
    total += item.quantity;
  });

  count.innerHTML = total;
}

function displayProducts(list = products) {
  const container = document.querySelector(".products");

  if (!container) return;

  container.innerHTML = "";

  list.forEach((product) => {
    container.innerHTML += `

<div class="card">

<img src="${product.image}" alt="${product.name}">

<div class="card-content">

<h3>${product.name}</h3>

<p class="category">${product.category}</p>

<p class="price">$${product.price}</p>

<p class="rating">

⭐ ${product.rating}

</p>

<div class="card-buttons">

<button class="add-cart"

onclick="addToCart(${product.id})">

Add to Cart

</button>

<a

href="product-detail.html?id=${product.id}"

class="details-btn">

View Details

</a>

</div>

</div>

</div>

`;
  });
}

function searchProducts() {
  const input = document.getElementById("searchInput");

  if (!input) return;

  const value = input.value.toLowerCase();

  const filtered = products.filter(
    (product) =>
      product.name.toLowerCase().includes(value) ||
      product.category.toLowerCase().includes(value),
  );

  displayProducts(filtered);
}

function addToCart(id) {
  const product = products.find((item) => item.id === id);

  if (!product) return;

  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      description: product.description,
      quantity: 1,
    });
  }

  saveCart();

  alert(product.name + " added to cart.");
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");

  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `

<div class="empty-cart">

<h2>Your cart is empty.</h2>

<a href="index.html" class="btn">

Continue Shopping

</a>

</div>

`;

    if (cartTotal) {
      cartTotal.innerHTML = "$0";
    }

    return;
  }

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    cartItems.innerHTML += `

<div class="cart-card">

<div class="cart-image">

<img src="${item.image}" alt="${item.name}">

</div>

<div class="cart-info">

<h3>${item.name}</h3>

<p>${item.category}</p>

<h4>$${item.price}</h4>

<div class="quantity">

<button onclick="decreaseQuantity(${item.id})">

-

</button>

<span>

${item.quantity}

</span>

<button onclick="increaseQuantity(${item.id})">

+

</button>

</div>

<button

class="remove-btn"

onclick="removeFromCart(${item.id})">

Remove

</button>

</div>

</div>

`;
  });

  if (cartTotal) {
    cartTotal.innerHTML = "$" + total.toFixed(2);
  }
}

function increaseQuantity(id) {
  const item = cart.find((product) => product.id === id);

  if (item) {
    item.quantity++;

    saveCart();

    renderCart();
  }
}

function decreaseQuantity(id) {
  const item = cart.find((product) => product.id === id);

  if (!item) return;

  item.quantity--;

  if (item.quantity <= 0) {
    cart = cart.filter((product) => product.id !== id);
  }

  saveCart();

  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter((product) => product.id !== id);

  saveCart();

  renderCart();
}

function clearCart() {
  cart = [];

  saveCart();

  renderCart();
}

function getCartTotal() {
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
  });

  return total;
}

function loadProductDetails() {
  const container = document.getElementById("productDetail");

  if (!container) return;

  const params = new URLSearchParams(window.location.search);

  const id = parseInt(params.get("id"));

  const product = products.find((item) => item.id === id);

  if (!product) {
    container.innerHTML = "<h2>Product Not Found</h2>";

    return;
  }

  container.innerHTML = `

<div class="detail-image">

<img src="${product.image}" alt="${product.name}">

</div>

<div class="detail-content">

<h2>${product.name}</h2>

<p class="category">${product.category}</p>

<h3>$${product.price}</h3>

<p>${product.description}</p>

<p class="rating">⭐ ${product.rating}</p>

<div class="detail-buttons">

<button onclick="addToCart(${product.id})">

Add to Cart

</button>

<button onclick="buyNow(${product.id})">

Buy Now

</button>

</div>

</div>

`;
}

function buyNow(id) {
  addToCart(id);

  window.location.href = "checkout.html";
}

function displayCheckout() {
  const summary = document.getElementById("orderSummary");

  const total = document.getElementById("checkoutTotal");

  if (!summary) return;

  summary.innerHTML = "";

  let grandTotal = 0;

  if (cart.length === 0) {
    summary.innerHTML = "<p>Your cart is empty.</p>";

    if (total) {
      total.innerHTML = "$0";
    }

    return;
  }

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;

    grandTotal += itemTotal;

    summary.innerHTML += `

<div class="checkout-item">

<span>

${item.name} × ${item.quantity}

</span>

<span>

$${itemTotal.toFixed(2)}

</span>

</div>

`;
  });

  if (total) {
    total.innerHTML = "$" + grandTotal.toFixed(2);
  }
}

function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty.");

    return;
  }

  const name = document.getElementById("name");

  const email = document.getElementById("email");

  const phone = document.getElementById("phone");

  const address = document.getElementById("address");

  if (
    !name.value.trim() ||
    !email.value.trim() ||
    !phone.value.trim() ||
    !address.value.trim()
  ) {
    alert("Please fill all required fields.");

    return;
  }

  alert("Order placed successfully!");

  cart = [];

  saveCart();

  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  displayProducts();

  renderCart();

  loadProductDetails();

  displayCheckout();
});
