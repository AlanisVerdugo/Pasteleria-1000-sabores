// Componente: un producto dentro del carrito (fila con foto, nombre, precio, cantidad y boton eliminar).
function ItemCarrito({ imagen, nombre, detalle, precio, cantidad, onSumar, onRestar, onEliminar }) {

    return (
        <>
            <div className="card producto-card producto-card-fila">
                <div className="d-flex align-items-center gap-3 p-3">
                    <img src={imagen} alt={nombre} className="producto-carrito-img" />
                    <div className="flex-grow-1">
                        <h3 className="producto-titulo mb-1">{nombre}</h3>
                        <p className="producto-detalle mb-1">{detalle}</p>
                        <span className="producto-precio">{precio}</span>
                    </div>
                    <div className="cantidad-stepper">
                        <button type="button" className="btn-cantidad btn-restar" onClick={onRestar}><i className="bi bi-dash"></i></button>
                        <span className="cantidad-valor">{cantidad}</span>
                        <button type="button" className="btn-cantidad btn-sumar" onClick={onSumar}><i className="bi bi-plus"></i></button>
                    </div>
                    <button type="button" className="btn-eliminar-item" aria-label="Eliminar producto" onClick={onEliminar}>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </>
    );
}

export default ItemCarrito;