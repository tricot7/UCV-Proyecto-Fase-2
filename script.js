let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(id, nombre, precio, imagen = 'img/placeholder.jpg') {
    const productoExistente = carrito.find(item => item.id === id);
    
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            id: id,
            nombre: nombre,
            precio: Number(precio),
            cantidad: 1,
            imagen: imagen
        });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadores();
}

function actualizarContadores() {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.querySelectorAll('#cantidad-carrito').forEach(span => {
        span.textContent = totalItems;
    });
}

document.addEventListener('DOMContentLoaded', actualizarContadores);