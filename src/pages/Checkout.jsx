import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../css/catalogo.css'
import '../css/carrito.css'

import { useCarrito } from '../context/CarritoContext'
import { useAuth } from '../context/AuthContext'
import { productosService } from '../services/productosService'
import { ordenesService } from '../services/ordenesService'
import { formatearPrecio } from '../utils/formato'
import { COSTO_DESPACHO } from '../utils/constantes'

function Checkout() {
    const { items, subtotal, descuento, detalleDescuento, total, vaciar } = useCarrito()
    const { usuario } = useAuth()
    const navigate = useNavigate()

    const [nombre, setNombre] = useState(usuario?.nombre ?? '')
    const [calle, setCalle] = useState('')
    const [comuna, setComuna] = useState('')
    const [error, setError] = useState('')
    const [enviando, setEnviando] = useState(false)

    const totalFinal = total + COSTO_DESPACHO

    if (items.length === 0) {
        return (
            <main>
                <section className="container py-5 text-center">
                    <h1 style={{ fontFamily: "'Caveat',cursive", color: '#7B4B2A' }}>Checkout</h1>
                    <p className="text-muted">Tu carrito está vacío, no hay nada que pagar todavía.</p>
                    <Link to="/productos" className="link-seguir-comprando">Ir al catálogo</Link>
                </section>
            </main>
        )
    }

    const confirmarPedido = async (e) => {
        e.preventDefault()
        setError('')

        if (!nombre.trim() || !calle.trim() || !comuna.trim()) {
            setError('Completa tu nombre y la dirección de despacho.')
            return
        }

        setEnviando(true)
        try {
            await productosService.descontarStock(
                items.map((i) => ({ codigo: i.codigo, cantidad: i.cantidad, nombre: i.nombre }))
            )

            const orden = await ordenesService.crear({
                usuarioId: usuario?.id ?? null,
                cliente: usuario ? undefined : { nombre, email: '', telefono: '' },
                items: items.map((i) => ({
                    codigo: i.codigo,
                    nombre: i.nombre,
                    tamano: i.tamano,
                    mensaje: i.mensaje,
                    cantidad: i.cantidad,
                    precio: i.precioUnitario,
                })),
                despacho: { calle, comuna },
                subtotal,
                descuento,
                detalleDescuento,
                total: totalFinal,
            })

            vaciar()
            navigate(`/pago/exito/${orden.id}`)
        } catch (err) {
            navigate('/pago/error')
        } finally {
            setEnviando(false)
        }
    }

    return (
        <main>
            <section className="container py-5">

                <h1 className="mb-4" style={{ fontFamily: "'Caveat',cursive", color: '#7B4B2A' }}>Checkout</h1>

                <div className="row g-4">

                    {/* ===== COLUMNA IZQUIERDA: formulario de despacho ===== */}
                    <div className="col-lg-7">
                        <form onSubmit={confirmarPedido} className="panel-resumen">
                            <h2 className="titulo-resumen mb-3">Datos de despacho</h2>

                            {error && <p className="text-danger">{error}</p>}

                            <div className="mb-3">
                                <label className="form-label">Nombre completo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Calle y número</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={calle}
                                    onChange={(e) => setCalle(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Comuna</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={comuna}
                                    onChange={(e) => setComuna(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn-confirmar-pedido" disabled={enviando}>
                                {enviando ? 'Procesando...' : 'Confirmar y Pagar'} <i className="bi bi-arrow-right"></i>
                            </button>
                        </form>
                    </div>

                    {/* ===== COLUMNA DERECHA: resumen del pedido ===== */}
                    <div className="col-lg-5">
                        <div className="panel-resumen">
                            <h2 className="titulo-resumen mb-3">Resumen del pedido</h2>

                            {items.map((item) => (
                                <div key={item.clave} className="d-flex justify-content-between resumen-linea">
                                    <span>{item.cantidad}x {item.nombre}</span>
                                    <span>{formatearPrecio(item.precioUnitario * item.cantidad)}</span>
                                </div>
                            ))}

                            <hr />

                            <div className="d-flex justify-content-between resumen-linea">
                                <span>Subtotal</span>
                                <span>{formatearPrecio(subtotal)}</span>
                            </div>
                            <div className="d-flex justify-content-between resumen-linea resumen-descuento">
                                <span>Descuento</span>
                                <span>-{formatearPrecio(descuento)}</span>
                            </div>
                            <div className="d-flex justify-content-between resumen-linea">
                                <span>Despacho</span>
                                <span>{formatearPrecio(COSTO_DESPACHO)}</span>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between align-items-center resumen-total">
                                <span>TOTAL</span>
                                <span className="resumen-total-monto">{formatearPrecio(totalFinal)}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    )
}

export default Checkout