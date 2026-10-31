import { useState } from 'react'
import { Form, Row, Col, Alert } from 'react-bootstrap'
import { useFormulario } from '../../hooks/useFormulario'
import { validarProducto } from './validacionesAdmin'
import { achicarImagen } from '../../utils/imagen'

const IMAGEN_POR_DEFECTO = '/img/logo-pasteleria-1000-sabores.png'
// Tamaños que reciben las tortas nuevas (los mismos de las semillas)
const TAMANOS_BASE = [
  { id: 'chica', personas: 8, extra: 0 },
  { id: 'mediana', personas: 15, extra: 10000 },
  { id: 'grande', personas: 25, extra: 20000 },
]

// Pasa un producto a los valores del formulario (los inputs trabajan con texto)
const aValores = (p) => ({
  codigo: p?.codigo ?? '',
  nombre: p?.nombre ?? '',
  categoriaId: p?.categoriaId ? String(p.categoriaId) : '',
  descripcion: p?.descripcion ?? '',
  precio: p?.precio != null ? String(p.precio) : '',
  stock: p?.stock != null ? String(p.stock) : '',
  oferta: String(p?.oferta ?? 0),
  forma: p?.forma ?? '',
  imagen: p?.imagen ?? '',
  permiteMensaje: p?.permiteMensaje ?? false,
  activo: p?.activo ?? true,
})

// Formulario de producto: sirve para NUEVO y para EDITAR.
// - inicial: el producto a editar (o nada si es nuevo)
// - esEdicion: bloquea el código, que es el id del producto
// - onGuardar(producto): función async del padre que llama al service
function ProductoForm({ inicial, categorias, esEdicion = false, onGuardar }) {
  const { valores, errores, manejarCambio, manejarEnvio, establecer } = useFormulario(aValores(inicial), validarProducto)
  const [errorGeneral, setErrorGeneral] = useState('')
  const [guardando, setGuardando] = useState(false)

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
    // Del texto del formulario a la forma del producto del Contrato (4.2)
    const producto = {
      codigo: v.codigo.trim().toUpperCase(),
      nombre: v.nombre.trim(),
      categoriaId: Number(v.categoriaId),
      descripcion: v.descripcion.trim(),
      precio: Number(v.precio),
      stock: Number(v.stock),
      oferta: Number(v.oferta),
      forma: v.forma || null,
      tamanos: v.forma ? (inicial?.tamanos?.length ? inicial.tamanos : TAMANOS_BASE) : [],
      imagen: v.imagen.trim() || IMAGEN_POR_DEFECTO,
      permiteMensaje: v.permiteMensaje,
      activo: v.activo,
    }
    setGuardando(true)
    try {
      await onGuardar(producto)
    } catch (err) {
      setErrorGeneral(err.message)
      setGuardando(false)
    }
  }

  // Atajo para no repetir cada input de texto/número
  const campo = (name, label, tipo = 'text', extra = {}) => (
    <Form.Group controlId={`prod-${name}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type={tipo} name={name} value={valores[name]} onChange={manejarCambio}
        isInvalid={Boolean(errores[name])} {...extra} />
      <Form.Control.Feedback type="invalid">{errores[name]}</Form.Control.Feedback>
    </Form.Group>
  )

  return (
    <Form noValidate onSubmit={manejarEnvio(guardar)} className="adm-caja">
      {errorGeneral && <Alert variant="danger">{errorGeneral}</Alert>}

      <Row className="g-3">
        <Col md={4}>
          {campo('codigo', 'Código', 'text', { readOnly: esEdicion, placeholder: 'TC003' })}
        </Col>
        <Col md={8}>{campo('nombre', 'Nombre')}</Col>

        <Col md={6}>
          <Form.Group controlId="prod-categoriaId">
            <Form.Label>Categoría</Form.Label>
            <Form.Select name="categoriaId" value={valores.categoriaId} onChange={manejarCambio}
              isInvalid={Boolean(errores.categoriaId)}>
              <option value="">— Selecciona —</option>
              {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errores.categoriaId}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="prod-forma">
            <Form.Label>Forma</Form.Label>
            <Form.Select name="forma" value={valores.forma} onChange={manejarCambio}>
              <option value="">No es torta (sin tamaños)</option>
              <option value="cuadrada">Cuadrada</option>
              <option value="circular">Circular</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={4}>{campo('precio', 'Precio base (CLP)', 'number', { min: 1 })}</Col>
        <Col md={4}>{campo('stock', 'Stock', 'number', { min: 0 })}</Col>
        <Col md={4}>{campo('oferta', 'Oferta (%)', 'number', { min: 0, max: 90 })}</Col>

        <Col md={12}>{campo('descripcion', 'Descripción', 'text', { as: 'textarea', rows: 3 })}</Col>

        <Col md={8}>{campo('imagen', 'Ruta de la imagen', 'text', { placeholder: '/img/mi-torta.jpg' })}</Col>
        <Col md={4}>
          <Form.Group controlId="prod-archivo">
            <Form.Label>…o sube una foto</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={cambiarImagen} />
          </Form.Group>
        </Col>
        {valores.imagen && (
          <Col md={12}>
            <img src={valores.imagen} alt="Vista previa" style={{ maxHeight: 120, borderRadius: 12 }} />
          </Col>
        )}

        <Col md={6}>
          <Form.Check type="checkbox" id="prod-permiteMensaje" name="permiteMensaje" label="Permite mensaje personalizado"
            checked={valores.permiteMensaje} onChange={manejarCambio} />
        </Col>
        <Col md={6}>
          <Form.Check type="checkbox" id="prod-activo" name="activo" label="Activo (se ve en la tienda)"
            checked={valores.activo} onChange={manejarCambio} />
        </Col>
      </Row>

      <button type="submit" className="adm-btn-primario mt-4" disabled={guardando}>
        <i className="bi bi-check-lg" aria-hidden="true"></i> {esEdicion ? 'Guardar cambios' : 'Crear producto'}
      </button>
    </Form>
  )
}

export default ProductoForm
