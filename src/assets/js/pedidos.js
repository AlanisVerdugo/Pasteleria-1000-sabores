

// Referencias a los elementos que necesitamos
const buscador = document.getElementById('buscadorPedidos');
const botonesFiltro = document.querySelectorAll('#filtrosPedidos .ped-filtro');
const tarjetasPedido = document.querySelectorAll('.ped-card');
const mensajeSinResultados = document.getElementById('mensajeSinResultados');

// Guarda cuál filtro está activo actualmente (arranca en "todos")
let filtroActivo = 'todos';

// Revisa cada tarjeta y decide si debe mostrarse u ocultarse
function aplicarFiltros() {
    const textoBusqueda = buscador.value.trim().toLowerCase();
    let coincidencias = 0;

    tarjetasPedido.forEach(tarjeta => {
        const codigo = tarjeta.dataset.codigo.toLowerCase();
        const estado = tarjeta.dataset.estado;
        const contenidoCompleto = tarjeta.textContent.toLowerCase();

        // Coincide con la búsqueda si el texto está vacío, o si aparece en el código o en cualquier parte de la tarjeta
        const coincideBusqueda = textoBusqueda === '' || codigo.includes(textoBusqueda) || contenidoCompleto.includes(textoBusqueda);

        // Coincide con el filtro si está en "todos", o si el estado de la tarjeta es igual al filtro elegido
        const coincideFiltro = filtroActivo === 'todos' || estado === filtroActivo;

        if (coincideBusqueda && coincideFiltro) {
            tarjeta.classList.remove('d-none');
            coincidencias++;
        } else {
            tarjeta.classList.add('d-none');
        }
    });

    // Muestra el mensaje de "sin resultados" solo si ninguna tarjeta coincidió
    mensajeSinResultados.classList.toggle('d-none', coincidencias > 0);
}

// Escucha cada vez que el usuario escribe en el buscador
buscador.addEventListener('input', aplicarFiltros);

// Escucha el clic en cada botón de filtro
botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
        // Actualiza cuál botón se ve "activo" visualmente
        botonesFiltro.forEach(b => b.classList.remove('ped-filtro-activo'));
        boton.classList.add('ped-filtro-activo');

        // Guarda el nuevo filtro elegido y vuelve a aplicar
        filtroActivo = boton.dataset.filtro;
        aplicarFiltros();
    });
});



