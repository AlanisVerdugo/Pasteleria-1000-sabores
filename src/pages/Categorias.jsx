import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/catalogo.css'
import { categoriasService } from '../services/categoriasService'

function Categorias() {
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        categoriasService.listar().then(setCategorias)
    }, [])

    return (
        <main>
            <section className="container py-5">

                <div className="mb-4">
                    <h1 style={{ fontFamily: "'Caveat',cursive", color: '#7B4B2A' }}>Nuestras Categorías</h1>
                    <p className="text-muted">Explora la tradición por categoría.</p>
                </div>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                    {categorias.map((c) => (
                        <div className="col" key={c.id}>
                            <Link to={`/categorias/${c.id}`} className="text-decoration-none">
                                <div className="card producto-card h-100">
                                    <img src={c.imagen} className="card-img-top" alt={c.nombre} />
                                    <div className="card-body">
                                        <h3 className="producto-titulo">{c.nombre}</h3>
                                        <p className="producto-detalle mb-0">{c.descripcion}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

            </section>
        </main>
    )
}

export default Categorias