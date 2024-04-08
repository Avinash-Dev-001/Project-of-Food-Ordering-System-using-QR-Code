
function toggleCart() {
    const cart = document.querySelector('.cart');
    cart.classList.toggle('open');
}
window.onload=function(){

    const addedItems = JSON.parse(localStorage.getItem('items')) || [];
    const cartItemsList = document.getElementById('addedItemsList');

    addedItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItemsList.appendChild(li);
    });
}
window.onload = function () {
updateCart();
};

function updateCart() {
const addedItems = JSON.parse(localStorage.getItem('items')) || [];
const cartItemsList = document.getElementById('addedItemsList');
let totalCost = 0;

cartItemsList.innerHTML = '';

addedItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - $${item.price} 
        <input type="number" min="0" value="${item.quantity}" data-item-name="${item.name}" onchange="updateQuantity(${item.price}, this)">
        <button onclick="removeItem('${item.name}')">Remove</button>`;
    cartItemsList.appendChild(li);
    totalCost += item.price * item.quantity;
});

const totalBillElement = document.getElementById('totalBill');
totalBillElement.textContent = `Total bill: $${totalCost.toFixed(2)}`;
}
function updateQuantity(price, quantityInput) {
const addedItems = JSON.parse(localStorage.getItem('items')) || [];
let totalCost = 0;

const itemName = quantityInput.dataset.itemName; 

addedItems.forEach(item => {
    if (item.price === price && item.name === itemName) { 
        const quantity = parseInt(quantityInput.value);
        if (quantity >= 1) {
            item.quantity = quantity;
        } else {
            item.quantity = 1;
            quantityInput.value = 1;
        }
    }
    totalCost += item.price * item.quantity;
});

localStorage.setItem('items', JSON.stringify(addedItems));
updateCart();
}



function removeItem(name) {
let addedItems = JSON.parse(localStorage.getItem('items')) || [];
addedItems = addedItems.filter(item => item.name !== name);
localStorage.setItem('items', JSON.stringify(addedItems));
updateCart();
}

function clearCart() {
localStorage.removeItem('items');
updateCart();
}
function addToCart(item) {
    var itemCountSpan = document.querySelector(".cart-item-count");
    var currentCount = parseInt(itemCountSpan.textContent);
    itemCountSpan.textContent = currentCount + 1;
}

function proceedToPayment() {
    // Get the total amount
    const totalBill = document.getElementById('totalBill').textContent;
    // Extract the amount from the totalBill string
    const amount = parseFloat(totalBill.replace('Total bill: $', ''));
    // Redirect to the payment page with the amount as a query parameter
    window.location.href = `http://127.0.0.1:5500/payment.html?amount=${amount}`;
}
let cartItemCount = document.querySelector('.cart-item-count');
function addToCart(itemId) {
    let cartItemCountValue = parseInt(cartItemCount.textContent, 10);
    cartItemCount.textContent = cartItemCountValue + 1;

  }






