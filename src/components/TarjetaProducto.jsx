// Componente: tarjeta de un producto del catalogo.
// Se repetia 6 veces en catalogo.html, cambiando solo imagen, nombre, detalle, precio, etiqueta y comentarios.
// "badge" es opcional: si no se lo pasamos, no se muestra la etiqueta sobre la foto.
function TarjetaProducto({ imagen, nombre, detalle, precio, comentarios, badge, badgeClase }) {

    return (
        <>
            <div className="col">
                <div className="card producto-card h-100">

                    <a href="/detalle-producto" className="producto-imagen-wrap">
                        <img src={imagen} className="card-img-top" alt={nombre} />
                        {badge && <span className={"badge-producto " + badgeClase}>{badge}</span>}
                    </a>

                    <div className="card-body d-flex flex-column">
                        <a href="/detalle-producto" className="producto-titulo-link">
                            <h3 className="producto-titulo">{nombre}</h3>
                        </a>

                        <p className="producto-detalle">{detalle}</p>

                        <div className="mt-auto d-flex justify-content-between align-items-center">
                            <span className="producto-precio">{precio}</span>
                            <button className="btn-carrito" type="button"><i className="bi bi-cart-fill"></i></button>
                        </div>

                        <div className="d-flex justify-content-between align-items-center producto-footer mt-2">
                            <span className="text-muted small"><i className="bi bi-chat"></i> {comentarios}</span>
                            <a href="#" className="text-muted small text-decoration-none"><i className="bi bi-share"></i> Compartir</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TarjetaProducto;
