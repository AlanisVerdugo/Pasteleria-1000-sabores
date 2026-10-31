import { Link } from 'react-router-dom'
import '../css/catalogo.css';
import '../css/carrito.css';

// componentes
import ItemCarrito from '../components/ItemCarrito';

// servicios y utilidades
import { useCarrito } from '../context/CarritoContext'
import { formatearPrecio } from '../utils/formato'
import { COSTO_DESPACHO } from '../utils/constantes'

function Carrito() {
    const { items, cambiarCantidad, quitar, vaciar, subtotal, descuento, total } = useCarrito()

    const totalFinal = items.length > 0 ? total + COSTO_DESPACHO : 0

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
                        <Link to="/productos" className="link-seguir-comprando">
                            <i className="bi bi-arrow-left"></i> Seguir comprando
                        </Link>
                    </div>

                    <hr className="my-4" />

                    <div className="row g-4">

                        {/* ===== COLUMNA IZQUIERDA: lista de productos en el carrito ===== */}
                        <div className="col-lg-8">

                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h2 className="titulo-seccion-carrito mb-0">
                                    Productos en tu canasta <span className="text-muted fw-normal">({items.length} artículos)</span>
                                </h2>
                                {items.length > 0 && (
                                    <a href="#" className="link-vaciar" onClick={(e) => { e.preventDefault(); vaciar() }}>
                                        <i className="bi bi-trash"></i> Vaciar
                                    </a>
                                )}
                            </div>

                            {/* Lista de items: cada uno es el componente ItemCarrito */}
                            <div className="d-flex flex-column gap-3">
                                {items.map((item) => (
                                    <ItemCarrito
                                        key={item.clave}
                                        imagen={item.imagen}
                                        nombre={item.nombre}
                                        detalle={`${item.cantidad} unidad(es) · ${formatearPrecio(item.precioUnitario)} c/u`}
                                        precio={formatearPrecio(item.precioUnitario * item.cantidad)}
                                        cantidad={item.cantidad}
                                        onSumar={() => cambiarCantidad(item.clave, item.cantidad + 1)}
                                        onRestar={() => cambiarCantidad(item.clave, item.cantidad - 1)}
                                        onEliminar={() => quitar(item.clave)}
                                    />
                                ))}
                            </div>

                            {/* Mensaje que aparece solo cuando el carrito queda vacío */}
                            {items.length === 0 && (
                                <p className="text-center text-muted mt-4">
                                    Tu carrito está vacío. <Link to="/productos">Ir al catálogo</Link>
                                </p>
                            )}

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
                                    <span>{formatearPrecio(subtotal)}</span>
                                </div>
                                <div className="d-flex justify-content-between resumen-linea resumen-descuento">
                                    <span>Descuento aplicado</span>
                                    <span>-{formatearPrecio(descuento)}</span>
                                </div>
                                <div className="d-flex justify-content-between resumen-linea">
                                    <span>Despacho</span>
                                    <span>{formatearPrecio(items.length > 0 ? COSTO_DESPACHO : 0)}</span>
                                </div>

                                <hr />

                                <div className="d-flex justify-content-between align-items-center resumen-total">
                                    <div>
                                        <span className="d-block">TOTAL A PAGAR</span>
                                        <span className="resumen-iva">IVA incluido</span>
                                    </div>
                                    <span className="resumen-total-monto">{formatearPrecio(totalFinal)}</span>
                                </div>

                                <button type="button" className="btn-confirmar-pedido" disabled={items.length === 0}>
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