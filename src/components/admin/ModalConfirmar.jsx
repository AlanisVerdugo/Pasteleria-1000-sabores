import { Modal, Button } from 'react-bootstrap'

// Ventana para confirmar acciones peligrosas (eliminar).
// Es controlada: el padre decide si se ve (mostrar) y qué pasa al confirmar o cancelar.
function ModalConfirmar({ mostrar, titulo, mensaje, textoConfirmar = 'Eliminar', onConfirmar, onCancelar }) {
  return (
    <Modal show={mostrar} onHide={onCancelar} centered>
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensaje}</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onCancelar}>Cancelar</Button>
        <Button variant="danger" onClick={onConfirmar}>{textoConfirmar}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalConfirmar
