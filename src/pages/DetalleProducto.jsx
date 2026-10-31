import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../css/catalogo.css';
import '../css/detalle-producto.css';

// componentes
import OpcionTamano from '../components/OpcionTamano';

// servicios y utilidades
import { productosService } from '../services/productosService'
import { categoriasService } from '../services/categoriasService'
import { useCarrito } from '../context/CarritoContext'
import { precioConOferta } from '../utils/descuentos'
import { formatearPrecio } from '../utils/formato'

function DetalleProducto() {
    const { codigo } = useParams()
    const { agregar } = useCarrito()

    const [producto, setProducto] = useState(null)
    const [categoria, setCategoria] = useState(null)
    const [tamanoId, setTamanoId] = useState(null)
    const [cantidad, setCantidad] = useState(1)
    const [mensaje, setMensaje] = useState('')
    const [agregado, setAgregado] = useState(false)

    useEffect(() => {
        productosService.obtenerPorId(codigo).then((p) => {
            setProducto(p)
            if (p?.tamanos?.length > 0) setTamanoId(p.tamanos[0].id)
        })
    }, [codigo])

    useEffect(() => {
        if (producto?.categoriaId) {
            categoriasService.obtenerPorId(producto.categoriaId).then(setCategoria)
        }
    }, [producto])

    if (!producto) {
        return (
            <main>
                <section className="container py-5 text-center">
                    <p className="text-muted">Cargando producto...</p>
                </section>
            </main>
        )
    }

    const agotado = producto.stock <= 0
    const precioFinal = precioConOferta(producto, tamanoId)

    const handleAgregar = () => {
        const exito = agregar(producto, { cantidad, tamano: tamanoId, mensaje })
        if (exito) {
            setAgregado(true)
            setTimeout(() => setAgregado(false), 2000)
        }
    }

    return (
        <>
            <main>
                <section className="container py-5">

                    {/* Breadcrumb (izq) + etiqueta de oferta/agotado (der) */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb-detalle mb-0">
                                <li><a href="/"><i className="bi bi-house-door-fill"></i> Inicio</a></li>
                                {categoria && <li><Link to={`/categorias/${categoria.id}`}>{categoria.nombre}</Link></li>}
                                <li className="activo">{producto.nombre}</li>
                            </ol>
                        </nav>
                        {agotado ? (
                            <span className="badge-producto badge-tradicional">Agotado</span>
                        ) : producto.oferta > 0 && (
                            <span className="badge-producto badge-tradicional badge-edicion">
                                <i className="bi bi-stars"></i> {producto.oferta}% de descuento
                            </span>
                        )}
                    </div>

                    <div className="row g-5 align-items-start">

                        {/* ===== COLUMNA IZQUIERDA: foto grande ===== */}
                        <div className="col-lg-6">
                            <img src={producto.imagen} alt={producto.nombre} className="foto-producto-detalle" />
                        </div>

                        {/* ===== COLUMNA DERECHA: info + acciones ===== */}
                        <div className="col-lg-6">

                            {categoria && <p className="eyebrow-detalle">{categoria.nombre}</p>}
                            <h1 className="titulo-detalle" style={{ fontFamily: "'Caveat',cursive", color: '#7B4B2A' }}>{producto.nombre}</h1>
                            <p className="precio-detalle">{formatearPrecio(precioFinal)} <span className="precio-moneda">CLP</span></p>

                            <p className="descripcion-detalle">{producto.descripcion}</p>

                            {/* Opciones de tamaño: solo se muestran si el producto tiene tamaños */}
                            {producto.tamanos?.length > 0 && (
                                <>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="label-tamano">Tamaño:</span>
                                        <span className="tamano-elegido">
                                            {producto.tamanos.find((t) => t.id === tamanoId)?.personas} Personas
                                        </span>
                                    </div>

                                    <div className="row g-2 mb-4">
                                        {producto.tamanos.map((t) => (
                                            <OpcionTamano
                                                key={t.id}
                                                personas={`${t.personas} Personas`}
                                                precio={formatearPrecio(producto.precio + t.extra)}
                                                activa={tamanoId === t.id}
                                                onClick={() => setTamanoId(t.id)}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Mensaje personalizado: solo si el producto lo permite (ej. tortas) */}
                            {producto.permiteMensaje && (
                                <div className="mb-3">
                                    <label className="form-label label-tamano">Mensaje para la torta (opcional)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej: Feliz cumpleaños Ana"
                                        maxLength={40}
                                        value={mensaje}
                                        onChange={(e) => setMensaje(e.target.value)}
                                    />
                                </div>
                            )}

                            {/* Cantidad + botón de añadir al carrito */}
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <div className="cantidad-stepper">
                                    <button type="button" className="btn-cantidad" onClick={() => setCantidad((c) => Math.max(1, c - 1))}>
                                        <i className="bi bi-dash"></i>
                                    </button>
                                    <span className="cantidad-valor">{cantidad}</span>
                                    <button type="button" className="btn-cantidad" onClick={() => setCantidad((c) => c + 1)}>
                                        <i className="bi bi-plus"></i>
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    className="btn-carrito btn-anadir-carrito flex-grow-1"
                                    onClick={handleAgregar}
                                    disabled={agotado}
                                >
                                    <i className="bi bi-cart-fill"></i> {agotado ? 'Agotado' : agregado ? '¡Agregado!' : 'Añadir al Carrito'}
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