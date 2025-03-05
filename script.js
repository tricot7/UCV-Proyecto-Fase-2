let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(id, nombre, precio, imagen = 'img/placeholder.jpg') {
    // Buscar si el producto ya está en el carrito
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
    
    // Guardar en localStorage y actualizar contadores
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadoresGlobales();
}

// Función para actualizar contadores en todas las páginas
function actualizarContadoresGlobales() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.querySelectorAll('#cantidad-carrito').forEach(element => {
        element.textContent = totalItems;
    });
}
