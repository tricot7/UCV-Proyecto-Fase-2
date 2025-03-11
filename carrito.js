// carrito.js
document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedorItems = document.getElementById('items-carrito');
    
    const renderCarrito = () => {
        contenedorItems.innerHTML = '';
        let subtotal = 0;
        let totalItems = 0;

        carrito.forEach((item, index) => {
            subtotal += item.precio * item.cantidad;
            totalItems += item.cantidad;

            contenedorItems.innerHTML += `
                <div class="item-carrito">
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <div class="info-producto">
                        <h3>${item.nombre}</h3>
                        <button class="btn-eliminar matrix-btn" onclick="eliminarProducto(${index})">Eliminar</button>
                    </div>
                    <span>$${item.precio.toFixed(2)}</span>
                    <input type="number" min="1" value="${item.cantidad}" 
                           onchange="actualizarCantidad(${index}, this.value)">
                    <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
                </div>
            `;
        });

        document.getElementById('total-items').textContent = totalItems;
        document.getElementById('total-items-carrito').textContent = totalItems;
        document.querySelector('.precio-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    };

    // Redirección a página de pago conservando los productos
    document.querySelector('.btn-pagar').addEventListener('click', () => {
        localStorage.setItem('carrito', JSON.stringify(carrito)); // Guarda el carrito actual
        window.location.href = 'pagar.html'; // Redirige
    });

    renderCarrito();
});

function eliminarProducto(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    location.reload();
}

function actualizarCantidad(index, nuevaCantidad) {
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito[index].cantidad = parseInt(nuevaCantidad);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    location.reload();
}