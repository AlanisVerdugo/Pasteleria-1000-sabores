
import { Link } from 'react-router-dom'
import { formatearFecha } from '../utils/formato'

function TarjetaBlog({ articulo }) {
  const { id, titulo, categoria, fecha, autor, imagen, resumen } = articulo

  return (
    <article className="blog-card" data-testid="tarjeta-blog">
      <div className="card-image">
        <img src={imagen} alt={titulo} />
      </div>
      <div className="card-content">
        <p className="card-meta">
          {formatearFecha(fecha)} &bull; {categoria}
        </p>
        <h2 className="card-title">{titulo}</h2>
        <p className="card-excerpt">{resumen}</p>

        <div className="card-footer">
          <span className="card-author">Por {autor}</span>
          <Link to={`/blog/${id}`} className="card-link" aria-label={`Leer ${titulo}`}>
            Leer &rarr;
          </Link>
        </div>
      </div>
    </article>
  )
}

export default TarjetaBlog