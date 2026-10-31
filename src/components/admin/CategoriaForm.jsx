import { useState } from 'react'
import { Form, Alert } from 'react-bootstrap'
import { useFormulario } from '../../hooks/useFormulario'
import { validarCategoria } from './validacionesAdmin'
import { achicarImagen } from '../../utils/imagen'

// Formulario de categoría (nueva y editar). onGuardar es async y lo maneja el padre.
function CategoriaForm({ inicial, esEdicion = false, onGuardar }) {
  const { valores, errores, manejarCambio, manejarEnvio, establecer } = useFormulario(
    { nombre: inicial?.nombre ?? '', descripcion: inicial?.descripcion ?? '', imagen: inicial?.imagen ?? '' },
    validarCategoria
  )
  const [errorGeneral, setErrorGeneral] = useState('')

  const cambiarImagen = async (e) => {
    const archivo = e.target.files[0]
    if (!archivo) return
    try {
      establecer({ imagen: await achicarImagen(archivo, 400) })
      setErrorGeneral('')
    } catch (err) {
      setErrorGeneral(err.message)
    }
  }

  const guardar = async (v) => {
    try {
      await onGuardar({ nombre: v.nombre.trim(), descripcion: v.descripcion.trim(), imagen: v.imagen.trim() })
    } catch (err) {
      setErrorGeneral(err.message)
    }
  }

  return (
    <Form noValidate onSubmit={manejarEnvio(guardar)} className="adm-caja">
      {errorGeneral && <Alert variant="danger">{errorGeneral}</Alert>}
      <Form.Group className="mb-3" controlId="cat-nombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control name="nombre" value={valores.nombre} onChange={manejarCambio} isInvalid={Boolean(errores.nombre)} />
        <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="cat-descripcion">
        <Form.Label>Descripción</Form.Label>
        <Form.Control as="textarea" rows={2} name="descripcion" value={valores.descripcion} onChange={manejarCambio}
          isInvalid={Boolean(errores.descripcion)} />
        <Form.Control.Feedback type="invalid">{errores.descripcion}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="cat-imagen">
        <Form.Label>Ruta de la imagen (opcional)</Form.Label>
        <Form.Control name="imagen" value={valores.imagen} onChange={manejarCambio} placeholder="/img/mi-categoria.jpg" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="cat-archivo">
        <Form.Label>…o sube una foto</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={cambiarImagen} />
      </Form.Group>
      {valores.imagen && (
        <img src={valores.imagen} alt="Vista previa" className="adm-vista-previa mb-3" />
      )}
      <button type="submit" className="adm-btn-primario">
        <i className="bi bi-check-lg" aria-hidden="true"></i> {esEdicion ? 'Guardar cambios' : 'Crear categoría'}
      </button>
    </Form>
  )
}

export default CategoriaForm
