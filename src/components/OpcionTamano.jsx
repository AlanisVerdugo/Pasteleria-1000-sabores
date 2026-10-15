// Componente: boton para elegir el tamaño de la torta en el detalle del producto.
// "activa" es true/false: si es true se le agrega la clase "activa" (queda marcada).
function OpcionTamano({ personas, precio, activa }) {

    return (
        <>
            <div className="col-4">
                <button type="button" className={activa ? "opcion-tamano activa" : "opcion-tamano"}>
                    <span className="opcion-tamano-personas">{personas}</span>
                    <span className="opcion-tamano-precio">{precio}</span>
                </button>
            </div>
        </>
    );
}

export default OpcionTamano;
