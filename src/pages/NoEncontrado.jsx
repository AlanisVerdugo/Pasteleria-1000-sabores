import { Link } from 'react-router-dom'
import '../css/no-encontrado.css'

function NoEncontrado() {
  return (
    <main className="no-encontrado container">
      <p className="ne-codigo" aria-hidden="true">
        4<i className="bi bi-cake2 ne-torta"></i>4
      </p>
      <h1 className="ne-titulo">¡Ups! Esta página no salió del horno</h1>
      <p className="ne-texto">
        Puede que el enlace esté mal escrito o que la página ya no exista.
        Pero tranquilo, todavía quedan muchas tortas por descubrir.
      </p>
      <div className="ne-acciones">
        <Link to="/" className="ne-boton ne-boton-principal">
          <i className="bi bi-house-heart"></i> Volver al inicio
        </Link>
        <Link to="/productos" className="ne-boton ne-boton-secundario">
          <i className="bi bi-shop"></i> Ver catálogo
        </Link>
      </div>
    </main>
  )
}

export default NoEncontrado


