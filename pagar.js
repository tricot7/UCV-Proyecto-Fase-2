// pagar.js
document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const listaPago = document.getElementById('lista-pago');
    const precioTotal = document.querySelector('.precio-total');
    const btnConfirmar = document.getElementById('btn-pagar');

    // Mostrar productos
    let total = 0;
    carrito.forEach(item => {
        listaPago.innerHTML += `
            <div class="producto-pago">
                <span>${item.nombre} x${item.cantidad}</span>
                <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
            </div>
        `;
        total += item.precio * item.cantidad;
    });

    precioTotal.textContent = `$${total.toFixed(2)}`;

    // Confirmar compra con mensaje
    btnConfirmar.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Crear mensaje flotante
        const mensajeExito = document.createElement('div');
        mensajeExito.className = 'mensaje-exito';
        mensajeExito.innerHTML = `
            <p>✅ Compra realizada con éxito!</p>
            <p>Redirigiendo a inicio en 3 segundos...</p>
        `;
        document.body.appendChild(mensajeExito);

        // Limpiar carrito y redirigir
        setTimeout(() => {
            localStorage.removeItem('carrito');
            window.location.href = 'index.html';
        }, 3000);
    });
});