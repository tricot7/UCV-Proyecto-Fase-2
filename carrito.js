// carrito.js
document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedorItems = document.getElementById('items-carrito');
    
    // Actualizar contadores
    const actualizarContadores = () => {
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        
        document.getElementById('total-items').textContent = totalItems;
        document.getElementById('total-items-carrito').textContent = totalItems;
        document.querySelector('.precio-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    };

    // Renderizar productos
    const renderCarrito = () => {
        contenedorItems.innerHTML = '';
        
        carrito.forEach((item, index) => {
            const itemHTML = `
                <div class="item-carrito">
                    <img src="${item.imagen || 'img/placeholder.jpg'}" alt="${item.nombre}">
                    <div class="info-producto">
                        <h3>${item.nombre}</h3>
                        <button class="btn-eliminar" onclick="eliminarItem(${index})">Eliminar</button>
                    </div>
                    <span class="precio">$${item.precio.toFixed(2)}</span>
                    <select class="cantidad-select" data-index="${index}">
                        ${Array.from({length: 10}, (_, i) => 
                            `<option ${i+1 === item.cantidad ? 'selected' : ''}>${i+1}</option>`
                        ).join('')}
                    </select>
                    <span class="total-item">$${(item.precio * item.cantidad).toFixed(2)}</span>
                </div>
            `;
            contenedorItems.innerHTML += itemHTML;
        });

        actualizarContadores();
    };

    // Event listeners para selects de cantidad
    document.querySelectorAll('.cantidad-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const index = e.target.dataset.index;
            carrito[index].cantidad = parseInt(e.target.value);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCarrito();
        });
    });

    renderCarrito();
});

// Función para eliminar items
function eliminarItem(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    location.reload(); // Recargar para actualizar vista
}