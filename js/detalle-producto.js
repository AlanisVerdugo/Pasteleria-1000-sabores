// =========================================================
// DETALLE-PRODUCTO.JS
// Por ahora esta página NO lleva JS "de verdad" (así lo pide
// el PDF de organización del equipo). Este script es puramente
// visual: cambia el precio mostrado y marca la opción elegida
// al hacer clic en 15 / 20 / 30 Personas.
// No guarda nada, no valida nada, no afecta el carrito real.
// =========================================================
 
document.addEventListener("DOMContentLoaded", function () {
 
  // Selecciona los 3 botones de tamaño (15 / 20 / 30 Personas)
  const opcionesTamano = document.querySelectorAll(".opcion-tamano");
 
  // Selecciona los 2 textos que hay que actualizar cuando cambia el tamaño elegido
  const tamanoElegidoTexto = document.getElementById("tamanoElegidoTexto");
  const precioMostrado = document.getElementById("precioMostrado");
 
  opcionesTamano.forEach(function (boton) {
    boton.addEventListener("click", function () {
 
      // Le quita la clase "activa" a los 3 botones...
      opcionesTamano.forEach(function (b) { b.classList.remove("activa"); });
      // ...y se la vuelve a poner SOLO al que se acaba de clickear
      boton.classList.add("activa");
 
      // Actualiza el texto "Tamaño: X Personas"
      tamanoElegidoTexto.textContent = boton.dataset.personas;
 
      // Actualiza el precio grande de arriba, con el formato de precio chileno ($45.000)
      precioMostrado.textContent = Number(boton.dataset.precio).toLocaleString("es-CL");
    });
  });
 
});
 