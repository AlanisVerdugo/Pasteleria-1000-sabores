// =========================================================
// CARRITO.JS
// Hace funcionales los controles del carrito:
// - Botones + / - de cantidad
// - Botón de eliminar producto
// - Botón "Vaciar" carrito completo
// - Recalcula Subtotal, Descuento y Total cada vez que algo cambia
// =========================================================
 
document.addEventListener("DOMContentLoaded", function () {
 
  // ----- Configuración -----
  const PORCENTAJE_DESCUENTO = 0.10; // 10%, mismo código FELICES50 del proyecto
  const COSTO_DESPACHO = 3500;
 
  // ----- Elementos que vamos a necesitar varias veces -----
  const listaCarrito = document.getElementById("listaCarrito");
  const subtotalTexto = document.getElementById("subtotalTexto");
  const descuentoTexto = document.getElementById("descuentoTexto");
  const despachoTexto = document.getElementById("despachoTexto");
  const totalTexto = document.getElementById("totalTexto");
  const cantidadArticulos = document.getElementById("cantidadArticulos");
  const badgeCarrito = document.getElementById("badgeCarrito");
  const mensajeVacio = document.getElementById("mensajeCarritoVacio");
  const btnVaciar = document.getElementById("btnVaciarCarrito");
 
  // Convierte un número a formato de precio chileno: 45000 -> "$45.000"
  function formatearPrecio(numero) {
    return "$" + numero.toLocaleString("es-CL");
  }
 
  // Recorre TODAS las tarjetas de producto que sigan en el carrito y recalcula todo
  function recalcularTotales() {
 
    const items = listaCarrito.querySelectorAll(".producto-card-carrito");
 
    let subtotal = 0;
    let totalUnidades = 0;
 
    items.forEach(function (item) {
      const precioUnitario = Number(item.dataset.precio);
      const cantidad = Number(item.dataset.cantidad);
      subtotal += precioUnitario * cantidad;
      totalUnidades += cantidad;
 
      // Actualiza el precio total que se muestra dentro de la tarjeta (ej: "2 unidades ($5.500 c/u)" -> $11.000)
      const precioMostrado = item.querySelector(".producto-carrito-precio");
      if (precioMostrado) precioMostrado.textContent = formatearPrecio(precioUnitario * cantidad);
    });
 
    const descuento = Math.round(subtotal * PORCENTAJE_DESCUENTO);
    const despacho = items.length > 0 ? COSTO_DESPACHO : 0;
    const total = subtotal - descuento + despacho;
 
    // Pinta los números en el panel de Resumen
    subtotalTexto.textContent = formatearPrecio(subtotal);
    descuentoTexto.textContent = "-" + formatearPrecio(descuento);
    despachoTexto.textContent = formatearPrecio(despacho);
    totalTexto.textContent = formatearPrecio(total);
 
    // Actualiza "(X artículos)" arriba de la lista, y el numerito rojo del ícono del carrito en el header
    cantidadArticulos.textContent = totalUnidades;
    if (badgeCarrito) badgeCarrito.textContent = totalUnidades;
 
    // Si ya no queda ningún producto, muestra el mensaje de "carrito vacío"
    mensajeVacio.classList.toggle("d-none", items.length > 0);
  }
 
  // Le da funcionalidad a los botones + / - y eliminar DE UNA tarjeta de producto
  function activarControlesDeItem(item) {
 
    const btnSumar = item.querySelector(".btn-sumar");
    const btnRestar = item.querySelector(".btn-restar");
    const btnEliminar = item.querySelector(".btn-eliminar-item");
    const valorCantidad = item.querySelector(".cantidad-valor");
 
    btnSumar.addEventListener("click", function () {
      const nuevaCantidad = Number(item.dataset.cantidad) + 1;
      item.dataset.cantidad = nuevaCantidad;
      valorCantidad.textContent = nuevaCantidad;
      recalcularTotales();
    });
 
    btnRestar.addEventListener("click", function () {
      const cantidadActual = Number(item.dataset.cantidad);
      // No deja bajar de 1 con el botón "-"; para sacarlo del todo está el ícono de basurero
      if (cantidadActual <= 1) return;
      const nuevaCantidad = cantidadActual - 1;
      item.dataset.cantidad = nuevaCantidad;
      valorCantidad.textContent = nuevaCantidad;
      recalcularTotales();
    });
 
    btnEliminar.addEventListener("click", function () {
      item.remove();
      recalcularTotales();
    });
  }
 
  // Activa los controles en TODAS las tarjetas que ya vienen en el HTML al cargar la página
  listaCarrito.querySelectorAll(".producto-card-carrito").forEach(activarControlesDeItem);
 
  // Botón "Vaciar": borra todas las tarjetas de una vez
  btnVaciar.addEventListener("click", function (evento) {
    evento.preventDefault();
    listaCarrito.innerHTML = "";
    recalcularTotales();
  });
 
  // Calcula los totales una vez apenas carga la página, por si acaso
  recalcularTotales();
 
});