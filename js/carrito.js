// =========================================================
// CARRITO.JS
// Hace funcionales los controles del carrito:
// - Botones + / - de cantidad
// - Botón de eliminar producto
// - Botón "Vaciar" carrito completo
// - Botón "Confirmar Pedido"
// - Recalcula Subtotal, Descuento y Total cada vez que algo cambia,
//   aplicando el descuento según el usuario logueado (si hay uno)
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

  // ----- Configuración -----
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
  const btnConfirmar = document.getElementById("btnConfirmarPedido");

  // Convierte un número a formato de precio chileno: 45000 -> "$45.000"
  function formatearPrecio(numero) {
    return "$" + Math.round(numero).toLocaleString("es-CL");
  }

  // Calcula qué porcentaje de descuento le corresponde al usuario activo (si hay uno)
  function obtenerPorcentajeDescuento() {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo) return 0;

    // El 50% (mayores de 50) tiene prioridad sobre el 10% del código FELICES50
    if (usuarioActivo.esMayor50) return 0.5;
    if (usuarioActivo.tieneDescuento10) return 0.1;
    return 0;
  }

  // Recorre TODAS las tarjetas de producto que sigan en el carrito y recalcula todo
  function recalcularTotales() {

    const items = listaCarrito.querySelectorAll(".producto-card-fila");

    let subtotal = 0;
    let totalUnidades = 0;

    items.forEach(function (item) {
      const precioUnitario = Number(item.dataset.precio);
      const cantidad = Number(item.dataset.cantidad);
      subtotal += precioUnitario * cantidad;
      totalUnidades += cantidad;

      // Actualiza el precio total que se muestra dentro de la tarjeta
      const precioMostrado = item.querySelector(".producto-precio");
      if (precioMostrado) precioMostrado.textContent = formatearPrecio(precioUnitario * cantidad);
    });

    const porcentajeDescuento = obtenerPorcentajeDescuento();
    const descuento = subtotal * porcentajeDescuento;
    const despacho = items.length > 0 ? COSTO_DESPACHO : 0;
    const total = subtotal - descuento + despacho;

    // Pinta los números en el panel de Resumen
    subtotalTexto.textContent = formatearPrecio(subtotal);
    descuentoTexto.textContent = "-" + formatearPrecio(descuento);
    despachoTexto.textContent = formatearPrecio(despacho);
    totalTexto.textContent = formatearPrecio(total);

    // Actualiza "(X artículos)" arriba de la lista, y el numerito rojo del header
    cantidadArticulos.textContent = items.length;
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
  listaCarrito.querySelectorAll(".producto-card-fila").forEach(activarControlesDeItem);

  // Botón "Vaciar": pide confirmación antes de borrar todo
  btnVaciar.addEventListener("click", function (evento) {
    evento.preventDefault();
    const confirmado = confirm("¿Seguro que quieres vaciar todo el carrito?");
    if (confirmado) {
      listaCarrito.innerHTML = "";
      recalcularTotales();
    }
  });

  // Botón "Confirmar Pedido"
  btnConfirmar.addEventListener("click", function () {
    const items = listaCarrito.querySelectorAll(".producto-card-fila");

    if (items.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo) {
      alert("Debes iniciar sesión para confirmar tu pedido.");
      window.location.href = "login.html";
      return;
    }

    alert("¡Pedido confirmado! Te redirigiremos a tu boleta.");
    window.location.href = "boletas.html";
  });

  // Calcula los totales una vez apenas carga la página, por si acaso
  recalcularTotales();

});