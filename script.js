let cantidadCarrito = 0;

// Función para agregar un producto al carrito
function agregarAlCarrito() {
    cantidadCarrito++;
    document.getElementById("cantidad-carrito").textContent = cantidadCarrito;
}
