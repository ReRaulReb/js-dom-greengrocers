const store = document.querySelector("#store");
const cart = document.querySelector("#cart");

store.addEventListener("click", handleStoreClick)
cart.addEventListener("click", handleCartClick)

function handleStoreClick(event){
  if(event.target.tagName !== "BUTTON") return;

  const li = event.target.closest("li");
  const id = li.dataset.id;

  addToCart(id);
  render();
}

function handleCartClick(event){
  if(event.target.classList.contains("remove-btn")){
    const li = event.target.closest("li");
    const id = li.dataset.id;
    removeFromCart(id);
  }
  else if(event.target.classList.contains("add-btn")){
    const li = event.target.closest("li");
    const id = li.dataset.id;
    addToCart(id);
  }
  else if(event.target.tagName !== "BUTTON") return;

  render();

}

function addToCart(id){
  const existing = state.cart.find(item => item.id === id);

  if (existing){
    existing.quantity++;
  }
  else{
    state.cart.push({id, quantity: 1});
  }

}

function removeFromCart(id){
  const existing = state.cart.find(item => item.id === id);

  if(existing){
    existing.quantity--;
  }
  if(existing.quantity === 0){
    state.cart = state.cart.filter(item => item.id !== id);
  }
  else return;
}


function renderStore() {
  store.querySelector(".store--item-list").innerHTML = state.items
    .map(item => `
      <li data-id="${item.id}">
        <div class="store--item-icon">
          <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
        </div>
        <button>Add to cart</button>
      </li>
    `)
    .join("");
}

function renderCart() {
  const cartList = cart.querySelector(".cart--item-list");

  cartList.innerHTML = state.cart
    .map(cartItem => {
      const item = state.items.find(i => i.id === cartItem.id);
      return `
        <li data-id="${item.id}">
          <img class="cart--item-icon" src="assets/icons/${item.id}.svg" alt="${item.name}" />
          <p>${item.name}</p>
          <button class="quantity-btn remove-btn center">-</button>
          <span class="quantity-text center">${cartItem.quantity}</span>
          <button class="quantity-btn add-btn center">+</button>
        </li>
      `;
    })
    .join("");

  updateTotal();
}

function updateTotal() {
  const total = state.cart.reduce((sum, cartItem) => {
    const item = state.items.find(i => i.id === cartItem.id);
    return sum + item.price * cartItem.quantity;
  }, 0);

  document.querySelector(".total-number").textContent = `£${total.toFixed(2)}`;
}

function render() {
  renderCart();
}

const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};

renderStore();
render();
