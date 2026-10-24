import { useEffect, useState } from 'react'
import '../css/catalogo.css'
import TarjetaProducto from '../components/TarjetaProducto'
import { productosService } from '../services/productosService'

function Catalogo() {
    const [productos, setProductos] = useState([])

    useEffect(() => {
        productosService.listar().then(setProductos)
    }, [])

    return (
        <>
            <main>
                <section className="container py-5">

                    <div className="d-flex flex-wrap justify-content-between align-items-start mb-4">
                        <div>
                            <h1 style={{ fontFamily: "'Caveat',cursive", color: '#7B4B2A' }}>Nuestro Catálogo</h1>
                            <p className="text-muted">Descubre la tradición en cada bocado.</p>
                        </div>
                        
                        <div className="input-group catalogo-buscador">
                            <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
                            <input type="text" className="form-control" id="inputBuscarProducto" placeholder="Buscar productos..." />
                        </div>
                    </div>

                    <div className="row">

                        {/* Columna izquierda: panel de filtros */}
                        <aside className="col-lg-3 mb-4">
                            <div className="bg-white rounded-4 p-4 shadow-sm">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="mb-0" style={{ color: '#7B4B2A' }}>Filtros</h5>
                                    <a href="#" className="small text-muted text-decoration-none" id="btnLimpiarFiltros">
                                        <i className="bi bi-x-lg"></i> Limpiar
                                    </a>
                                </div>

                                <p className="text-uppercase small text-muted mb-2">Categorías</p>

                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="checkbox" id="catPostres" />
                                    <label className="form-check-label" htmlFor="catPostres">Postres Individuales</label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="checkbox" id="catSinAzucar" />
                                    <label className="form-check-label" htmlFor="catSinAzucar">Sin Azúcar</label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="checkbox" id="catVegana" />
                                    <label className="form-check-label" htmlFor="catVegana">Vegana</label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="checkbox" id="catSinGluten" />
                                    <label className="form-check-label" htmlFor="catSinGluten">Sin Gluten</label>
                                </div>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" id="catEspeciales" />
                                    <label className="form-check-label" htmlFor="catEspeciales">Especiales</label>
                                </div>

                                <p className="text-uppercase small text-muted mb-2">Forma</p>

                                <div className="d-flex gap-2 mb-3">
                                    <button className="btn btn-outline-secondary btn-sm rounded-pill btn-forma" type="button" data-forma="cuadrada">Cuadrada</button>
                                    <button className="btn btn-outline-secondary btn-sm rounded-pill btn-forma" type="button" data-forma="circular">Circular</button>
                                </div>

                                <p className="text-uppercase small text-muted mb-2">Tamaño (Personas)</p>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="checkbox" id="tam1" />
                                    <label className="form-check-label" htmlFor="tam1">1 Persona</label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="checkbox" id="tam15" />
                                    <label className="form-check-label" htmlFor="tam15">15 Personas</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="tam20" />
                                    <label className="form-check-label" htmlFor="tam20">20 Personas</label>
                                </div>
                            </div>
                        </aside>

                        {/* Columna derecha: grilla de productos */}
                        <div className="col-lg-9">
                            <div className="d-flex justify-content-between align-items-center bg-white rounded-4 p-3 mb-4 shadow-sm">

                                <span>Mostrando <strong id="contadorProductos">{productos.length}</strong> productos</span>

                                <div className="d-flex align-items-center gap-2 catalogo-ordenar">
                                    <span className="text-muted small">Ordenar por:</span>
                                    <select className="form-select form-select-sm border-0" id="selectOrdenar" style={{ color: '#7B4B2A', fontWeight: 600 }}>
                                        <option value="recomendados">Recomendados</option>
                                        <option value="precio-asc">Precio: menor a mayor</option>
                                        <option value="precio-desc">Precio: mayor a menor</option>
                                    </select>
                                </div>
                            </div>

                            {/* GRILLA DE CARDS */}
                            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4" id="grillaProductos">

                                {productos.map((p) => (
                                    <TarjetaProducto key={p.codigo} producto={p} />
                                ))}
                            </div>

                            <p className="text-center text-muted mt-4 d-none" id="mensajeSinProductos">
                                No se encontraron productos que coincidan con los filtros seleccionados.
                            </p>

                            {/* PAGINACION */}
                            <nav aria-label="Paginación de productos" className="mt-5">
                                <ul className="pagination justify-content-center paginacion-custom">
                                    <li className="page-item disabled">
                                        <a className="page-link" href="#" aria-label="Anterior">
                                            <i className="bi bi-chevron-left"></i>
                                        </a>
                                    </li>
                                    <li className="page-item active" aria-current="page">
                                        <a className="page-link" href="#">1</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">2</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">3</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Siguiente">
                                            <i className="bi bi-chevron-right"></i>
                                        </a>
                                    </li>
                                </ul>
                            </nav>

                        </div>
                    </div>
                </section>
            </main>
        </>
    )

}

export default Catalogo;
