import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../css/catalogo.css'
import TarjetaProducto from '../components/TarjetaProducto'
import FiltrosCatalogo from '../components/FiltrosCatalogo'
import { useProductos } from '../hooks/useProductos'

const POR_PAGINA = 6

function Catalogo() {
    const [searchParams, setSearchParams] = useSearchParams()

    const [texto, setTexto] = useState(searchParams.get('q') ?? '')
    const [categoriaId, setCategoriaId] = useState(
        searchParams.get('categoria') ? Number(searchParams.get('categoria')) : undefined
    )
    const [forma, setForma] = useState(undefined)
    const [personas, setPersonas] = useState(undefined)
    const [orden, setOrden] = useState('recomendados')
    const [pagina, setPagina] = useState(1)

    const { productos, cargando } = useProductos({ texto, categoriaId, forma, personas })

    const cambiarFiltro = (campo, valor) => {
        setPagina(1)
        if (campo === 'categoriaId') setCategoriaId(valor)
        if (campo === 'forma') setForma(valor)
        if (campo === 'personas') setPersonas(valor)

        const params = new URLSearchParams(searchParams)
        if (campo === 'categoriaId') {
            if (valor) params.set('categoria', valor); else params.delete('categoria')
        }
        setSearchParams(params)
    }

    const cambiarTexto = (valor) => {
        setPagina(1)
        setTexto(valor)
        const params = new URLSearchParams(searchParams)
        if (valor) params.set('q', valor); else params.delete('q')
        setSearchParams(params)
    }

    const limpiarFiltros = () => {
        setTexto('')
        setCategoriaId(undefined)
        setForma(undefined)
        setPersonas(undefined)
        setOrden('recomendados')
        setPagina(1)
        setSearchParams({})
    }

    let productosOrdenados = productos
    if (orden === 'precio-asc') productosOrdenados = [...productos].sort((a, b) => a.precio - b.precio)
    if (orden === 'precio-desc') productosOrdenados = [...productos].sort((a, b) => b.precio - a.precio)

    const totalPaginas = Math.max(1, Math.ceil(productosOrdenados.length / POR_PAGINA))
    const paginaActual = Math.min(pagina, totalPaginas)
    const productosPagina = productosOrdenados.slice((paginaActual - 1) * POR_PAGINA, paginaActual * POR_PAGINA)

    return (
        <main>
            <section className="container py-5">

                <div className="d-flex flex-wrap justify-content-between align-items-start mb-4">
                    <div>
                        <h1 style={{ fontFamily: "'Caveat',cursive", color: '#7B4B2A' }}>Nuestro Catálogo</h1>
                        <p className="text-muted">Descubre la tradición en cada bocado.</p>
                    </div>

                    <div className="input-group catalogo-buscador">
                        <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
                        <input
                            type="text"
                            className="form-control"
                            id="inputBuscarProducto"
                            placeholder="Buscar productos..."
                            value={texto}
                            onChange={(e) => cambiarTexto(e.target.value)}
                        />
                    </div>
                </div>

                <div className="row">

                    <aside className="col-lg-3 mb-4">
                        <FiltrosCatalogo
                            categoriaId={categoriaId}
                            forma={forma}
                            personas={personas}
                            onCambiar={cambiarFiltro}
                            onLimpiar={limpiarFiltros}
                        />
                    </aside>

                    <div className="col-lg-9">
                        <div className="d-flex justify-content-between align-items-center bg-white rounded-4 p-3 mb-4 shadow-sm">

                            <span>Mostrando <strong>{productosOrdenados.length}</strong> productos</span>

                            <div className="d-flex align-items-center gap-2 catalogo-ordenar">
                                <span className="text-muted small">Ordenar por:</span>
                                <select
                                    className="form-select form-select-sm border-0"
                                    style={{ color: '#7B4B2A', fontWeight: 600 }}
                                    value={orden}
                                    onChange={(e) => setOrden(e.target.value)}
                                >
                                    <option value="recomendados">Recomendados</option>
                                    <option value="precio-asc">Precio: menor a mayor</option>
                                    <option value="precio-desc">Precio: mayor a menor</option>
                                </select>
                            </div>
                        </div>

                        {cargando ? (
                            <p className="text-center text-muted mt-4">Cargando productos...</p>
                        ) : productosPagina.length > 0 ? (
                            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                                {productosPagina.map((p) => (
                                    <TarjetaProducto key={p.codigo} producto={p} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-muted mt-4">
                                No se encontraron productos que coincidan con los filtros seleccionados.
                            </p>
                        )}

                        {totalPaginas > 1 && (
                            <nav aria-label="Paginación de productos" className="mt-5">
                                <ul className="pagination justify-content-center paginacion-custom">
                                    <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => setPagina((p) => Math.max(1, p - 1))} aria-label="Anterior">
                                            <i className="bi bi-chevron-left"></i>
                                        </button>
                                    </li>
                                    {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                                        <li key={n} className={`page-item ${paginaActual === n ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => setPagina(n)}>{n}</button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))} aria-label="Siguiente">
                                            <i className="bi bi-chevron-right"></i>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        )}

                    </div>
                </div>
            </section>
        </main>
    )
}

export default Catalogo