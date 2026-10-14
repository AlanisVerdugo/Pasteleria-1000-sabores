import '../css/catalogo.css';
import '../css/detalle-producto.css';

// componentes
import OpcionTamano from '../components/OpcionTamano';

function DetalleProducto() {

    return (
        <>
            <main>
                <section className="container py-5">

                    {/* Breadcrumb (izq) + etiqueta de edición especial (der) */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb-detalle mb-0">
                                <li><a href="/"><i className="bi bi-house-door-fill"></i> Inicio</a></li>
                                <li><a href="/catalogo">Tortas Artesanales</a></li>
                                <li className="activo">Torta Cuadrada de Chocolate</li>
                            </ol>
                        </nav>
                        <span className="badge-producto badge-tradicional badge-edicion"><i className="bi bi-stars"></i> Edición Aniversario 50 Años</span>
                    </div>

                    <div className="row g-5 align-items-start">

                        {/* ===== COLUMNA IZQUIERDA: foto grande ===== */}
                        <div className="col-lg-6">
                            <img src="/img/Torta cuadrada de chocolate.jpg" alt="Torta Cuadrada de Chocolate" className="foto-producto-detalle" />
                        </div>

                        {/* ===== COLUMNA DERECHA: info + acciones ===== */}
                        <div className="col-lg-6">

                            <p className="eyebrow-detalle">Pastelería Tradicional</p>
                            <h1 className="titulo-detalle" style={{ fontFamily: "'Caveat',cursive", color: '#7B4B2A' }}>Torta Cuadrada de Chocolate</h1>
                            <p className="precio-detalle">$<span id="precioMostrado">45.000</span> <span className="precio-moneda">CLP</span></p>

                            <p className="descripcion-detalle">
                                Capas de bizcocho húmedo de chocolate embebido en almíbar ligero, relleno de manjar
                                artesanal de campo y trufa suave, cubierta con ganache de chocolate belga 60% cacao.
                            </p>

                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-tamano">Tamaño:</span>
                                <span className="tamano-elegido" id="tamanoElegidoTexto">20 Personas</span>
                            </div>

                            {/* Opciones de tamaño: cada botón es el componente OpcionTamano */}
                            <div className="row g-2 mb-4" id="opcionesTamano">
                                <OpcionTamano personas="15 Personas" precio="$35.000" activa={false} />
                                <OpcionTamano personas="20 Personas" precio="$45.000" activa={true} />
                                <OpcionTamano personas="30 Personas" precio="$60.000" activa={false} />
                            </div>

                            {/* Cantidad + botón de añadir al carrito */}
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <div className="cantidad-stepper">
                                    <button type="button" className="btn-cantidad"><i className="bi bi-dash"></i></button>
                                    <span className="cantidad-valor">1</span>
                                    <button type="button" className="btn-cantidad"><i className="bi bi-plus"></i></button>
                                </div>
                                <button type="button" className="btn-carrito btn-anadir-carrito flex-grow-1">
                                    <i className="bi bi-cart-fill"></i> Añadir al Carrito
                                </button>
                            </div>

                            <div className="info-extra-detalle d-flex flex-wrap gap-4">
                                <span><i className="bi bi-truck"></i> Despacho refrigerado 24-48 hrs</span>
                                <span><i className="bi bi-check-circle"></i> Elaboración fresca diaria</span>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </>
    )

}

export default DetalleProducto;
