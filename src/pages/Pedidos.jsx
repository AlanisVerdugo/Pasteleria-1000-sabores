import { useAuth } from '../context/AuthContext'
import MisPedidos from '../components/MisPedidos'
import '../css/pedidos.css'

function Pedidos() {
  const { usuario } = useAuth()

  return (
    <main>
      <div className="container ped-seccion">
        <div className="mb-4">
          <span className="ped-badge-vivo">
            <i className="bi bi-cookie"></i> Taller Pastelero en Vivo
          </span>
          <h1 className="ped-titulo">Seguimiento de Mis Pedidos</h1>
          <p className="ped-subtitulo mb-0">Revisa el avance de tus órdenes y el estado del horneado.</p>
        </div>
        <MisPedidos usuarioId={usuario.id} />
      </div>
    </main>
  )
}

export default Pedidos