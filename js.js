let search = document.querySelector('.search-box');

document.querySelector("#search-icon").onclick = () => {
    search.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () => {
    navbar.classList.toggle('active');
    search.classList.remove('active');
}
// Funkcija za dohvaćanje elemenata sa stranice, DOMContentLoaded se pokreće kad se stranica učita
document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll('.content a');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalElement = document.getElementById('cart-total');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            //Izbjegava se prelazak na na drugu stranicu
            event.preventDefault();
                //Trazi najblizi element sa roditeljski elementom sa klasom box
            const productBox = this.closest('.box');
            const productName = productBox.querySelector('.productName').textContent;
            const price = parseFloat(productBox.querySelector('.priceValue').textContent.replace('KM', ''));
            //Pozivanje funkcije za dodavanje elemenata u cart
            addToCart(productName, price);
        });
    });
    //Funckija za dodavanje elemenata 
    function addToCart(productName, price) {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.push({ name: productName, price: price });
        localStorage.setItem('cart', JSON.stringify(cartItems));

        updateCartDisplay();
        alert(`Added to cart: ${productName}  ${price} KM`);
    }

    function updateCartDisplay() {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsList.innerHTML = '';

        let total = 0;
            //Prolazi kroz  svaku stavku u cart-u
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${item.name}</span> - ${item.price.toFixed(2)} KM`;
            //Dodaj <li> element u listu  u cartu
            cartItemsList.appendChild(li);
            total += item.price;
        });

        cartTotalElement.textContent = total.toFixed(2) + ' KM';
    }
    updateCartDisplay();
});

function checkout() {
    alert('Thank you for shopping!');
    localStorage.removeItem('cart');
    updateCartDisplay();
}






