import '../css/catalogo.css';
import '../css/carrito.css';

// componentes
import ItemCarrito from '../components/ItemCarrito';

function Carrito() {

    return (
        <>
            <main>
                <section className="container py-5">

                    {/* Encabezado de la página: título a la izq, "seguir comprando" a la derecha */}
                    <div className="d-flex flex-wrap justify-content-between align-items-start mb-2">
                        <div>
                            <h1 style={{ fontFamily: "'Caveat',cursive", color: '#7B4B2A' }}>Mi Carrito</h1>
                            <p className="text-muted">Revisa tus delicias seleccionadas antes de continuar</p>
                        </div>
                        <a href="/catalogo" className="link-seguir-comprando">
                            <i className="bi bi-arrow-left"></i> Seguir comprando
                        </a>
                    </div>

                    <hr className="my-4" />

                    <div className="row g-4">

                        {/* ===== COLUMNA IZQUIERDA: lista de productos en el carrito ===== */}
                        <div className="col-lg-8">

                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h2 className="titulo-seccion-carrito mb-0">
                                    Productos en tu canasta <span className="text-muted fw-normal">(<span id="cantidadArticulos">3</span> artículos)</span>
                                </h2>
                                <a href="#" className="link-vaciar" id="btnVaciarCarrito">
                                    <i className="bi bi-trash"></i> Vaciar
                                </a>
                            </div>

                            {/* Lista de items: cada uno es el componente ItemCarrito */}
                            <div id="listaCarrito" className="d-flex flex-column gap-3">

                                <ItemCarrito
                                    imagen="/img/Torta cuadrada de chocolate.jpg"
                                    nombre="Torta Cuadrada de Chocolate"
                                    detalle="Ganache 60% cacao y trufas"
                                    precio="$45.000"
                                    cantidad={1}
                                />

                                <ItemCarrito
                                    imagen="/img/Torta circular manjar.jpg"
                                    nombre="Torta Circular de Manjar"
                                    detalle="Hojarasca crocante y manjar de campo"
                                    precio="$42.000"
                                    cantidad={1}
                                />

                                <ItemCarrito
                                    imagen="/img/Tiramisu clasico.jpg"
                                    nombre="Tiramisú Clásico Individual"
                                    detalle="2 unidades ($5.500 c/u)"
                                    precio="$11.000"
                                    cantidad={2}
                                />

                            </div>

                            {/* Mensaje que aparece solo cuando el carrito queda vacío */}
                            <p id="mensajeCarritoVacio" className="text-center text-muted mt-4 d-none">Tu carrito está vacío. <a href="/catalogo">Ir al catálogo</a></p>

                        </div>

                        {/* ===== COLUMNA DERECHA: resumen de totales ===== */}
                        <div className="col-lg-4">
                            <div className="panel-resumen">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h2 className="titulo-resumen mb-0">Resumen</h2>
                                    <i className="bi bi-receipt fs-4"></i>
                                </div>

                                <div className="d-flex justify-content-between resumen-linea">
                                    <span>Subtotal productos</span>
                                    <span id="subtotalTexto">$98.000</span>
                                </div>
                                <div className="d-flex justify-content-between resumen-linea resumen-descuento">
                                    <span>Descuento aplicado</span>
                                    <span id="descuentoTexto">-$9.800</span>
                                </div>
                                <div className="d-flex justify-content-between resumen-linea">
                                    <span>Despacho</span>
                                    <span id="despachoTexto">$3.500</span>
                                </div>

                                <hr />

                                <div className="d-flex justify-content-between align-items-center resumen-total">
                                    <div>
                                        <span className="d-block">TOTAL A PAGAR</span>
                                        <span className="resumen-iva">IVA incluido</span>
                                    </div>
                                    <span className="resumen-total-monto" id="totalTexto">$91.700</span>
                                </div>

                                <button type="button" className="btn-confirmar-pedido" id="btnConfirmarPedido">
                                    Confirmar Pedido <i className="bi bi-arrow-right"></i>
                                </button>

                                <p className="texto-seguridad"><i className="bi bi-lock-fill"></i> Compra 100% segura y encriptada</p>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </>
    )

}

export default Carrito;
