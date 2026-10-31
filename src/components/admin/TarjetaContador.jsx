import { Link } from 'react-router-dom'
import '../../css/admin.css'

// Tarjeta del dashboard: ícono + número + título.
// Si recibe "link", toda la tarjeta lleva a esa ruta.
// "alerta" la pinta en rojo (por ejemplo, cuando hay productos críticos).
function TarjetaContador({ titulo, valor, icono, link, alerta = false }) {
  const contenido = (
    <>
      <div className="adm-contador-icono" aria-hidden="true">
        <i className={`bi ${icono}`}></i>
      </div>
      <div>
        <div className="adm-contador-valor">{valor}</div>
        <div className="adm-contador-titulo">{titulo}</div>
      </div>
    </>
  )
  const clase = `adm-contador ${alerta ? 'adm-contador-alerta' : ''}`

  if (link) return <Link to={link} className={clase} data-testid="contador">{contenido}</Link>
  return <div className={clase} data-testid="contador">{contenido}</div>
}

export default TarjetaContador
