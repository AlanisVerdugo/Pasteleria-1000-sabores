import { useEffect, useState } from 'react'
import '../css/catalogo.css'
import TarjetaProducto from '../components/TarjetaProducto'
import { productosService } from '../services/productosService'
import { Link } from 'react-router-dom'
import '../css/catalogo.css'

function Ofertas() {
    const [productos, setProductos] = useState([])
    const [minimo, setMinimo] = useState(0)

    const mejor = productos[0]
    const porcentajes = [...new Set(productos.map((p) => p.oferta))].sort((a, b) => a - b)
    const visibles = productos.filter((p) => p.oferta >= minimo)

    useEffect(() => {
        productosService.listarOfertas().then(setProductos)
    }, [])

    return (
        <main>
            <section className="container py-5">

                <div className="mb-4">
                {mejor && (
                    <div className="banner-oferta mb-4">
                        <div>
                            <p className="banner-oferta-eyebrow mb-1">Mejor oferta</p>
                            <h2 className="banner-oferta-titulo">¡Hasta {mejor.oferta}% de descuento!</h2>
                            <p className="mb-0">en {mejor.nombre}</p>
                        </div>
                        <Link to={`/producto/${mejor.codigo}`} className="btn-banner-oferta">Ver producto</Link>
                    </div>
                )}

                {porcentajes.length > 1 && (
                    <div className="d-flex flex-wrap gap-2 mb-4" role="group" aria-label="Filtrar por descuento">
                        <button type="button" className={`btn-filtro-oferta ${minimo === 0 ? 'activo' : ''}`} onClick={() => setMinimo(0)}>Todas</button>
                        {porcentajes.map((n) => (
                            <button key={n} type="button" className={`btn-filtro-oferta ${minimo === n ? 'activo' : ''}`} onClick={() => setMinimo(n)}>
                                {n}% o más
                            </button>
                        ))}
                    </div>
                )}
                    <h1 style={{ fontFamily: "'Caveat',cursive", color: '#7B4B2A' }}>Ofertas de Aniversario</h1>
                    <p className="text-muted">Precios especiales por tiempo limitado, aprovecha antes de que se acaben.</p>
                </div>

                {visibles.length > 0 ? (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                        {visibles.map((p) => (
                            <TarjetaProducto key={p.codigo} producto={p} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted mt-4">
                        No hay ofertas disponibles en este momento.
                    </p>
                )}

            </section>
        </main>
    )
}

export default Ofertas