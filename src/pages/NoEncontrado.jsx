import { Link } from 'react-router-dom'

function NoEncontrado() {
  return (
    <section className="container py-5 text-center">
      <h2>Página no encontrada</h2>
      <Link to="/" className="btn btn-outline-secondary">Volver al inicio</Link>
    </section>
  )
}
export default NoEncontrado