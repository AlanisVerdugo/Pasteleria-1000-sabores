import { Form } from 'react-bootstrap'
import { ESTADOS_ORDEN } from '../../utils/constantes'
import { INFO_ESTADOS } from './estadosOrden'

// Desplegable para cambiar el estado de despacho de una orden (D3).
// Las opciones salen de ESTADOS_ORDEN: nunca se escriben a mano.
function SelectorEstado({ estado, onCambiar, etiqueta = 'Cambiar estado' }) {
  return (
    <Form.Select size="sm" value={estado} aria-label={etiqueta}
      onChange={(e) => onCambiar(e.target.value)} style={{ minWidth: 150 }}>
      {ESTADOS_ORDEN.map((e) => (
        <option key={e} value={e}>{INFO_ESTADOS[e].texto}</option>
      ))}
    </Form.Select>
  )
}

export default SelectorEstado
