document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const itemsCarrito = document.getElementById('items-carrito');
    
    const renderCarrito = () => {
        itemsCarrito.innerHTML = '';
        let subtotal = 0;
        let totalItems = 0;

        carrito.forEach((item, index) => {
            subtotal += item.precio * item.cantidad;
            totalItems += item.cantidad;

            itemsCarrito.innerHTML += `
                <div class="item-carrito">
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <div class="info-producto">
                        <h3>${item.nombre}</h3>
                        <button onclick="eliminarProducto(${index})">Eliminar</button>
                    </div>
                    <span>$${item.precio.toFixed(2)}</span>
                    <input type="number" value="${item.cantidad}" min="1" 
                           onchange="actualizarCantidad(${index}, this.value)">
                    <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
                </div>
            `;
        });

        document.getElementById('total-items').textContent = totalItems;
        document.getElementById('total-items-carrito').textContent = totalItems;
        document.querySelector('.precio-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    };

    renderCarrito();
});

function eliminarProducto(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    location.reload();
}

function actualizarCantidad(index, cantidad) {
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito[index].cantidad = parseInt(cantidad);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    location.reload();
}

document.querySelector('.btn-pagar').addEventListener('click', () => {
    localStorage.removeItem('carrito');
    document.querySelectorAll('#cantidad-carrito').forEach(span => span.textContent = '0');
    window.location.href = 'index.html';
});