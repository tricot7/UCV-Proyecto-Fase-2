// Datos simulados de productos
const productos = [
    { id: 1, nombre: "Laptop Gamer", imagen: "laptop.jpg" },
    { id: 2, nombre: "Smartphone", imagen: "smartphone.jpg" },
    { id: 3, nombre: "Auriculares", imagen: "auriculares.jpg" }
];

const storeContainer = document.getElementById("store-container");
const cartSection = document.getElementById("cart-section");
const cartItemsList = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const directPurchaseSection = document.getElementById("direct-purchase-section");
const purchaseItem = document.getElementById("purchase-item");
const clearCartButton = document.getElementById("clear-cart");

let cart = [];

// Función para generar la lista de productos
function renderizarProductos() {
    productos.forEach(producto => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <div class="product-buttons">
                <button onclick="comprarAhora('${producto.nombre}')">Comprar Ahora</button>
                <button onclick="agregarAlCarrito('${producto.nombre}')">Agregar al Carrito</button>
            </div>
        `;

        storeContainer.appendChild(productDiv);
    });
}

// Función para agregar producto al carrito
function agregarAlCarrito(nombre) {
    cart.push(nombre);
    actualizarCarrito();
}

// Función para actualizar la sección del carrito
function actualizarCarrito() {
    cartItemsList.innerHTML = "";
    cart.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("cart-item");
        li.textContent = item;
        cartItemsList.appendChild(li);
    });

    cartCount.textContent = cart.length;
    cartSection.style.display = "block";
}

// Función para comprar directamente
function comprarAhora(nombre) {
    purchaseItem.textContent = nombre;
    directPurchaseSection.style.display = "block";
}

// Función para cerrar la sección de compra directa
function closePurchaseSection() {
    directPurchaseSection.style.display = "none";
}

// Función para vaciar el carrito
clearCartButton.addEventListener("click", () => {
    cart = [];
    actualizarCarrito();
    cartSection.style.display = "none";
});

// Renderizar productos al cargar la página
renderizarProductos();
