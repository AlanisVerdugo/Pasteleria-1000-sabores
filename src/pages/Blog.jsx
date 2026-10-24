import { useEffect, useState } from 'react'
import '../css/blog.css'
import TarjetaBlog from '../components/TarjetaBlog'
import { blogService } from '../services/otrosService'
import { CATEGORIAS_BLOG } from '../data/semillas/blog'

const TODOS = 'Todos'

function Blog() {
  const [articulos, setArticulos] = useState([])
  const [categoria, setCategoria] = useState(TODOS)

  useEffect(() => {
    blogService.listar().then((lista) =>
      setArticulos([...lista].sort((a, b) => b.fecha.localeCompare(a.fecha)))
    )
  }, [])

  const visibles =
    categoria === TODOS ? articulos : articulos.filter((a) => a.categoria === categoria)

  return (
    <main className="blog-main-container">
     
      <section className="blog-intro container text-center">
        <h1>Nuestro blog &amp; saberes</h1>
        <p>
          Historias, técnicas tradicionales y secretos de repostería chilena compartidos con pasión
          <br />
          desde nuestro horno.
        </p>
      </section>

      {/* SECCIÓN FILTROS */}
      <section className="blog-filters container" aria-label="Filtrar por categoría">
        {[TODOS, ...CATEGORIAS_BLOG].map((c) => (
          <button
            key={c}
            type="button"
            className={`filter-btn ${categoria === c ? 'active' : ''}`}
            aria-pressed={categoria === c}
            onClick={() => setCategoria(c)}
          >
            {c}
          </button>
        ))}
      </section>

      {/* SECCIÓN GRILLA */}
      <section className="blog-grid container">
        {visibles.map((a) => (
          <TarjetaBlog key={a.id} articulo={a} />
        ))}
      </section>

      {articulos.length > 0 && visibles.length === 0 && (
        <p className="text-center text-muted">Aún no hay artículos en esta categoría.</p>
      )}
    </main>
  )
}

export default Blog