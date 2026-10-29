import { INFO_ESTADOS } from './estadosOrden'
import '../../css/admin.css'

// Etiqueta de color con el estado de una orden
function EstadoOrden({ estado }) {
  const info = INFO_ESTADOS[estado] ?? { texto: estado, icono: 'bi-question-circle' }
  return (
    <span className={`adm-estado adm-estado-${estado}`}>
      <i className={`bi ${info.icono}`} aria-hidden="true"></i> {info.texto}
    </span>
  )
}

export default EstadoOrden
