const originalImages = {
    product1: 'img/tenis 11.avif',
    product2: 'img/tenis 2 1.webp',
    product3: 'img/tenis 3 1.webp',
    product4: 'img/tenis 4 1.webp',
    product5: 'img/tenis 5 1.webp',
    product6: 'img/tenis 6 1.avif'
};

function changeImage(productId, isMouseOver) {
    const productImages = {
        product1: ['img/tenis 11.avif', 'img/tenis 12.avif', 'img/tenis 13.avif'],
        product2: ['img/tenis 2 1.webp', 'img/tenis 2 2.webp', 'img/tenis 2 3.webp'],
        product3: ['img/tenis 3 1.webp', 'img/tenis 3 2.webp', 'img/tenis 3 3.webp'],
        product4: ['img/tenis 4 1.webp', 'img/tenis 4 2.webp', 'img/tenis 4 3.webp'],
        product5: ['img/tenis 5 1.webp', 'img/tenis 5 2.webp', 'img/tenis 5 3.webp'],
        product6: ['img/tenis 6 1.avif', 'img/tenis 6 2.avif', 'img/tenis 6 3.avif']
    };

    const imgElement = document.querySelector(`#${productId} .product-img`);

    if (isMouseOver) {
        let index = 0;
        const images = productImages[productId];

        const interval = setInterval(() => {
            imgElement.src = images[index];
            imgElement.style.opacity = '0.5';
            setTimeout(() => { imgElement.style.opacity = '1'; }, 300);
            index = (index + 1) % images.length;
        }, 500);
        setTimeout(() => clearInterval(interval), 2000);
    } else {
        imgElement.src = originalImages[productId];
        imgElement.style.opacity = '1';
    }
}

document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('mouseover', function() {
        const productId = item.id;
        changeImage(productId, true);
    });

    item.addEventListener('mouseout', function() {
        const productId = item.id;
        changeImage(productId, false);
    });
});
let cart = JSON.parse(localStorage.getItem('cart')) || [];
function addToCart(productId, productName, productPrice, productImage) {
    const product = { id: productId, name: productName, price: productPrice, image: productImage };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();  
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;  
}

function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');
    const cartTable = document.getElementById('cart-table');
    const cartTotal = document.getElementById('cart-total');

    cartList.innerHTML = '';
    cartTable.innerHTML = '';

    const tableHeader = document.createElement('tr');
    tableHeader.innerHTML = `
        <th>Imagem</th>
        <th>Nome</th>
        <th>Preço</th>
        <th>Remover</th>
    `;
    cartTable.appendChild(tableHeader);

    let totalPrice = 0;
    cartItems.forEach((item, index) => {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" class="cart-item-image" /></td>
            <td>${item.name}</td>
            <td>R$${item.price.toFixed(2)}</td>
            <td><button class="remove-item" data-index="${index}">Remover</button></td>
        `;
        cartTable.appendChild(tableRow);
        totalPrice += item.price;
    });

    cartTotal.textContent = `Total: R$${totalPrice.toFixed(2)}`;

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removeFromCart(index);  
        });
    });
}

function removeFromCart(index) {
   
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart)); 
    displayCart();  
    updateCartCount();  
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.closest('.product-item').id;
        const productName = this.closest('.product-item').querySelector('p').textContent;
        const productPrice = parseFloat(this.closest('.product-item').querySelector('span').textContent.replace('Preço: R$', ''));
        const productImage = this.closest('.product-item').querySelector('img').src;

        addToCart(productId, productName, productPrice, productImage);  
    });
});
if (window.location.pathname.includes('carrinho.html')) {
    displayCart();  
}

updateCartCount();