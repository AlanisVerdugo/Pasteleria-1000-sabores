import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../css/blog.css'
import { blogService } from '../services/otrosService'
import { formatearFecha } from '../utils/formato'

function DetalleBlog() {
  const { id } = useParams() 
  const [articulo, setArticulo] = useState(undefined)

  useEffect(() => {
    blogService
      .obtenerPorId(id)
      .then((a) => setArticulo(a ?? null))
      .catch(() => setArticulo(null))
  }, [id])

  if (articulo === undefined) {
    return <main className="blog-main-container text-center">Cargando…</main>
  }

  if (articulo === null) {
    return (
      <main className="blog-main-container">
        <section className="blog-detalle container text-center">
          <h1 className="blog-detalle-titulo">Artículo no encontrado</h1>
          <p>Puede que el artículo se haya movido o que el enlace esté mal escrito.</p>
          <Link to="/blog" className="blog-volver">&larr; Volver al blog</Link>
        </section>
      </main>
    )
  }

  const { titulo, categoria, fecha, autor, imagen, contenido } = articulo

  return (
    <main className="blog-main-container">
      <article className="blog-detalle container">
        <Link to="/blog" className="blog-volver">&larr; Volver al blog</Link>

        <p className="card-meta">
          {formatearFecha(fecha)} &bull; {categoria}
        </p>
        <h1 className="blog-detalle-titulo">{titulo}</h1>
        <p className="card-author">Por {autor}</p>

        <img className="blog-detalle-imagen" src={imagen} alt={titulo} />

        <div className="blog-detalle-contenido">
          {contenido.map((parrafo, i) => (
            <p key={i}>{parrafo}</p>
          ))}
        </div>

        {/* Aquí irán los BotonesCompartir */}
      </article>
    </main>
  )
}

export default DetalleBlog