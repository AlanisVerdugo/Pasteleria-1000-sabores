import { useState } from 'react'
import { Form, Row, Col, Alert } from 'react-bootstrap'
import { useFormulario } from '../../hooks/useFormulario'
import { validarUsuario } from './validacionesAdmin'

// Formulario de usuario para el admin (nuevo y editar).
// - bloquearRol: true cuando el admin se edita a sí mismo (no puede quitarse el rol de admin)
function UsuarioForm({ inicial, esEdicion = false, bloquearRol = false, onGuardar }) {
  const { valores, errores, manejarCambio, manejarEnvio } = useFormulario(
    {
      run: inicial?.run ?? '',
      nombre: inicial?.nombre ?? '',
      apellidos: inicial?.apellidos ?? '',
      email: inicial?.email ?? '',
      fechaNacimiento: inicial?.fechaNacimiento ?? '',
      telefono: inicial?.telefono ?? '',
      rol: inicial?.rol ?? 'cliente',
      password: '',
    },
    (v) => validarUsuario(v, esEdicion)
  )
  const [errorGeneral, setErrorGeneral] = useState('')

  const guardar = async (v) => {
    const usuario = {
      run: v.run.replace(/[.\-\s]/g, '').toUpperCase(), // se guarda sin puntos ni guion
      nombre: v.nombre.trim(),
      apellidos: v.apellidos.trim(),
      email: v.email.trim().toLowerCase(),
      fechaNacimiento: v.fechaNacimiento,
      telefono: v.telefono.trim(),
      rol: v.rol,
    }
    if (v.password) usuario.password = v.password // en edición, vacía = no se cambia
    try {
      await onGuardar(usuario)
    } catch (err) {
      setErrorGeneral(err.message)
    }
  }

  const campo = (name, label, tipo = 'text', extra = {}) => (
    <Form.Group controlId={`usu-${name}`}>
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
        <Col md={4}>{campo('run', 'RUN', 'text', { placeholder: '12345678-5' })}</Col>
        <Col md={4}>{campo('nombre', 'Nombre')}</Col>
        <Col md={4}>{campo('apellidos', 'Apellidos')}</Col>
        <Col md={6}>{campo('email', 'Correo electrónico', 'email')}</Col>
        <Col md={6}>{campo('fechaNacimiento', 'Fecha de nacimiento', 'date')}</Col>
        <Col md={4}>{campo('telefono', 'Teléfono (opcional)', 'tel')}</Col>
        <Col md={4}>
          <Form.Group controlId="usu-rol">
            <Form.Label>Rol</Form.Label>
            <Form.Select name="rol" value={valores.rol} onChange={manejarCambio} disabled={bloquearRol}
              isInvalid={Boolean(errores.rol)}>
              <option value="cliente">Cliente</option>
              <option value="admin">Administrador</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errores.rol}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          {campo('password', esEdicion ? 'Nueva contraseña (opcional)' : 'Contraseña', 'password')}
        </Col>
      </Row>
      <button type="submit" className="adm-btn-primario mt-4">
        <i className="bi bi-check-lg" aria-hidden="true"></i> {esEdicion ? 'Guardar cambios' : 'Crear usuario'}
      </button>
    </Form>
  )
}

export default UsuarioForm
