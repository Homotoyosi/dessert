const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountContainer = document.getElementById('cart-count');
const cartTotalContainer = document.getElementById('cart-total');
const confirmOrderContainer = document.getElementById('confirm-order');

let cart = [];

// Function to handle "Add to Cart"
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const itemId = button.dataset.id;
        const itemName = button.dataset.name;
        const itemPrice = parseFloat(button.dataset.price.replace('$', ''));

        const existingItem = cart.find(item => item.id === itemId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: itemId,
                name: itemName,
                price: itemPrice,
                quantity: 1
            });
        }

        saveCart();
        renderCartSection(); 
        updateCartItemCount(); 
    });
});

// Function to render cart items
function renderCartSection() {
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;
    cart.forEach(item => {
        // Create a div to wrap the cart item and remove button
        const cartItemDiv = document.createElement('div');
        cartItemDiv.style.display = 'flex'; 
        cartItemDiv.style.justifyContent = 'space-between';
        cartItemDiv.style.alignItems = 'center';
        cartItemDiv.style.marginBottom = '10px';

        // Create an element for the item name and price
        const itemInfo = document.createElement('span');
        itemInfo.textContent = `${item.name}  $${item.price.toFixed(2)} (${item.quantity}x)`;
        itemInfo.style.flex = '1';  
        itemInfo.style.textAlign = 'left'; 

        // Create the remove button for each item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.style.marginLeft = 'auto'; 
        removeButton.style.backgroundColor = '#bb4f32';
        removeButton.style.color = 'white';
        removeButton.style.border = '1px solid #bb4f32';
        removeButton.style.borderRadius = '10px';
        removeButton.style.padding = '5px 10px';
        removeButton.style.cursor = 'pointer';
        removeButton.style.fontSize = '12px'
        removeButton.addEventListener('click', () => removeItemFromCart(item.id)); 

      
        cartItemDiv.appendChild(itemInfo);
        cartItemDiv.appendChild(removeButton);

        cartItemsContainer.appendChild(cartItemDiv);
    
        totalPrice += item.price * item.quantity; 
    });

    // Update total price in UI
    cartTotalContainer.textContent = totalPrice.toFixed(2);
    confirmOrderContainer.disabled = cart.length === 0;
}

// Function to remove an item from the cart
function removeItemFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    
    saveCart();
    renderCartSection();
    updateCartItemCount();
}

// Function to update cart item count
function updateCartItemCount() {
    let totalItems = 0;
    cart.forEach(item => {
        totalItems += item.quantity; 
    });
    cartCountContainer.textContent = totalItems; 
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        renderCartSection();
        updateCartItemCount();
    }
});
