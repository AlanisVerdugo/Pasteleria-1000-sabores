import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../css/catalogo.css'
import TarjetaProducto from '../components/TarjetaProducto'
import { categoriasService } from '../services/categoriasService'
import { productosService } from '../services/productosService'

function CategoriaDetalle() {
    const { id } = useParams()
    const [categoria, setCategoria] = useState(null)
    const [productos, setProductos] = useState([])

    useEffect(() => {
        categoriasService.obtenerPorId(id).then(setCategoria)
        productosService.listarPorCategoria(id).then(setProductos)
    }, [id])

    if (!categoria) {
        return (
            <main>
                <section className="container py-5 text-center">
                    <p className="text-muted">Cargando categoría...</p>
                </section>
            </main>
        )
    }

    return (
        <main>
            <section className="container py-5">

                <nav aria-label="breadcrumb" className="mb-3">
                    <Link to="/categorias" className="text-decoration-none">
                        <i className="bi bi-arrow-left"></i> Volver a Categorías
                    </Link>
                </nav>

                <div className="mb-4">
                    <h1 style={{ fontFamily: "'Caveat',cursive", color: '#7B4B2A' }}>{categoria.nombre}</h1>
                    <p className="text-muted">{categoria.descripcion}</p>
                </div>

                {productos.length > 0 ? (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                        {productos.map((p) => (
                            <TarjetaProducto key={p.codigo} producto={p} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted mt-4">
                        Todavía no hay productos en esta categoría.
                    </p>
                )}

            </section>
        </main>
    )
}

export default CategoriaDetalle