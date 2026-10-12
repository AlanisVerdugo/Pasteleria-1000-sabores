

document.addEventListener("DOMContentLoaded", function () {

  // ----- Elementos -----
  const grilla = document.getElementById("grillaProductos");
  const contador = document.getElementById("contadorProductos");
  const mensajeSinProductos = document.getElementById("mensajeSinProductos");
  const inputBuscar = document.getElementById("inputBuscarProducto");
  const selectOrdenar = document.getElementById("selectOrdenar");
  const btnLimpiar = document.getElementById("btnLimpiarFiltros");
  const botonesForma = document.querySelectorAll(".btn-forma");

  // Mapa entre el id del checkbox de categoría y el valor que usamos en data-categoria
  const checkboxesCategoria = {
    catPostres: "postres-individuales",
    catSinAzucar: "sin-azucar",
    catVegana: "vegana",
    catSinGluten: "sin-gluten",
    catEspeciales: "especiales"
  };

  // Mapa entre el id del checkbox de tamaño y el número de personas que representa
  const checkboxesTamano = {
    tam1: "1",
    tam15: "15",
    tam20: "20"
  };

  // Guarda el orden ORIGINAL de las tarjetas (para poder volver a "Recomendados")
  const ordenOriginal = Array.from(grilla.querySelectorAll(".col"));

  // ----- Función principal: aplica filtros + orden + recuenta -----
  function actualizarCatalogo() {

    // 1. Averigua qué categorías están marcadas actualmente
    const categoriasActivas = Object.keys(checkboxesCategoria)
      .filter(id => document.getElementById(id).checked)
      .map(id => checkboxesCategoria[id]);

    // 2. Averigua qué tamaños están marcados actualmente
    const tamanosActivos = Object.keys(checkboxesTamano)
      .filter(id => document.getElementById(id).checked)
      .map(id => checkboxesTamano[id]);

    // 3. Averigua qué formas están activas (botones con la clase "active")
    const formasActivas = Array.from(botonesForma)
      .filter(boton => boton.classList.contains("active"))
      .map(boton => boton.dataset.forma);

    // 4. Texto de búsqueda, en minúsculas para comparar sin importar mayúsculas
    const textoBusqueda = inputBuscar.value.trim().toLowerCase();

    // ----- Ordena una COPIA del arreglo original según el select -----
    let tarjetasOrdenadas = [...ordenOriginal];
    const criterioOrden = selectOrdenar.value;

    if (criterioOrden === "precio-asc") {
      tarjetasOrdenadas.sort((a, b) => Number(a.dataset.precio) - Number(b.dataset.precio));
    } else if (criterioOrden === "precio-desc") {
      tarjetasOrdenadas.sort((a, b) => Number(b.dataset.precio) - Number(a.dataset.precio));
    }
    // Si es "recomendados", se queda con el orden original tal cual

    // Vuelve a insertar las tarjetas en la grilla en el nuevo orden
    tarjetasOrdenadas.forEach(tarjeta => grilla.appendChild(tarjeta));

    // ----- Filtra: muestra u oculta cada tarjeta según si cumple TODOS los filtros activos -----
    let visibles = 0;

    tarjetasOrdenadas.forEach(tarjeta => {
      const categoriaProducto = tarjeta.dataset.categoria;
      const formaProducto = tarjeta.dataset.forma;
      const tamanoProducto = tarjeta.dataset.tamano;
      const textoCompleto = tarjeta.textContent.toLowerCase();

      // Si no hay categorías marcadas, este filtro no restringe nada (coincideCategoria = true)
      const coincideCategoria = categoriasActivas.length === 0 || categoriasActivas.includes(categoriaProducto);

      const coincideForma = formasActivas.length === 0 || formasActivas.includes(formaProducto);

      const coincideTamano = tamanosActivos.length === 0 || tamanosActivos.includes(tamanoProducto);

      const coincideBusqueda = textoBusqueda === "" || textoCompleto.includes(textoBusqueda);

      const debeMostrarse = coincideCategoria && coincideForma && coincideTamano && coincideBusqueda;

      tarjeta.classList.toggle("d-none", !debeMostrarse);
      if (debeMostrarse) visibles++;
    });

    // Actualiza el contador y el mensaje de "sin resultados"
    contador.textContent = visibles;
    mensajeSinProductos.classList.toggle("d-none", visibles > 0);
  }

  // ----- Eventos -----

  // Cualquier checkbox de categoría o tamaño, al cambiar, vuelve a filtrar
  Object.keys(checkboxesCategoria).forEach(id => {
    document.getElementById(id).addEventListener("change", actualizarCatalogo);
  });
  Object.keys(checkboxesTamano).forEach(id => {
    document.getElementById(id).addEventListener("change", actualizarCatalogo);
  });

  // Botones de forma: alternan su propio estado "active" y luego filtran
  botonesForma.forEach(boton => {
    boton.addEventListener("click", () => {
      boton.classList.toggle("active");
      actualizarCatalogo();
    });
  });

  // Buscador: filtra mientras el usuario escribe
  inputBuscar.addEventListener("input", actualizarCatalogo);

  // Select de orden: reordena apenas cambia
  selectOrdenar.addEventListener("change", actualizarCatalogo);

  // Botón "Limpiar": resetea todo a su estado inicial
  btnLimpiar.addEventListener("click", (evento) => {
    evento.preventDefault();
    Object.keys(checkboxesCategoria).forEach(id => document.getElementById(id).checked = false);
    Object.keys(checkboxesTamano).forEach(id => document.getElementById(id).checked = false);
    botonesForma.forEach(boton => boton.classList.remove("active"));
    inputBuscar.value = "";
    selectOrdenar.value = "recomendados";
    actualizarCatalogo();
  });

  // Aplica el estado inicial apenas carga la página (por si quedó algo marcado por defecto)
  actualizarCatalogo();

});