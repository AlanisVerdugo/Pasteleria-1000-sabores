import { useState } from 'react'
import { Form, Row, Col, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { useFormulario } from '../../hooks/useFormulario'
import { validarPerfil } from '../../utils/validaciones'
import { achicarImagen } from '../../utils/imagen'
import { formatearFecha } from '../../utils/formato'
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin'

// Perfil del administrador (/admin/perfil). Usa lo mismo que el perfil del cliente:
// useAuth().actualizarPerfil + validarPerfil + achicarImagen (D14).
function PerfilAdmin() {
  const { usuario, actualizarPerfil } = useAuth()
  const [mensaje, setMensaje] = useState('')
  const [errorGeneral, setErrorGeneral] = useState('')

  const { valores, errores, manejarCambio, manejarEnvio } = useFormulario(
    { nombre: usuario.nombre ?? '', apellidos: usuario.apellidos ?? '', telefono: usuario.telefono ?? '' },
    validarPerfil
  )

  const alCambiar = (e) => {
    setMensaje('')
    manejarCambio(e)
  }

  const guardar = async (v) => {
    try {
      await actualizarPerfil({ nombre: v.nombre.trim(), apellidos: v.apellidos.trim(), telefono: v.telefono.trim() })
      setErrorGeneral('')
      setMensaje('Tus datos se guardaron correctamente')
    } catch (err) {
      setErrorGeneral(err.message)
    }
  }

  const cambiarFoto = async (e) => {
    const archivo = e.target.files[0]
    if (!archivo) return
    try {
      await actualizarPerfil({ foto: await achicarImagen(archivo) })
      setErrorGeneral('')
      setMensaje('Tu foto se actualizó')
    } catch (err) {
      setErrorGeneral(err.message)
    }
  }

  const campo = (name, label, tipo = 'text') => (
    <Form.Group controlId={`perfil-${name}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type={tipo} name={name} value={valores[name]} onChange={alCambiar} isInvalid={Boolean(errores[name])} />
      <Form.Control.Feedback type="invalid">{errores[name]}</Form.Control.Feedback>
    </Form.Group>
  )

  return (
    <>
      <EncabezadoAdmin titulo="Mi perfil" subtitulo="Datos de tu cuenta de administrador" />

      <div className="row g-3">
        <div className="col-lg-4">
          <div className="adm-caja text-center h-100">
            {usuario.foto ? (
              <img src={usuario.foto} alt={`Foto de ${usuario.nombre}`} className="rounded-circle mb-3" width="120" height="120" />
            ) : (
              <div className="adm-contador-icono mx-auto mb-3" style={{ width: 120, height: 120, fontSize: '3rem', borderRadius: '50%' }}
                aria-hidden="true">
                {usuario.nombre?.charAt(0).toUpperCase()}
              </div>
            )}
            <h2 className="h5 mb-1">{usuario.nombre} {usuario.apellidos}</h2>
            <p className="text-muted mb-1">{usuario.email}</p>
            <p className="mb-3"><span className="badge bg-dark">Administrador</span></p>
            {usuario.fechaRegistro && <p className="small text-muted">Desde el {formatearFecha(usuario.fechaRegistro)}</p>}
            <Form.Group controlId="perfil-foto">
              <Form.Label className="adm-btn-secundario mb-0" role="button">
                <i className="bi bi-camera" aria-hidden="true"></i> Cambiar foto
              </Form.Label>
              <Form.Control type="file" accept="image/*" className="d-none" onChange={cambiarFoto} />
            </Form.Group>
          </div>
        </div>

        <div className="col-lg-8">
          <Form noValidate onSubmit={manejarEnvio(guardar)} className="adm-caja h-100">
            {mensaje && <Alert variant="success" role="status">{mensaje}</Alert>}
            {errorGeneral && <Alert variant="danger">{errorGeneral}</Alert>}
            <Row className="g-3">
              <Col md={6}>{campo('nombre', 'Nombre')}</Col>
              <Col md={6}>{campo('apellidos', 'Apellidos')}</Col>
              <Col md={6}>{campo('telefono', 'Teléfono (opcional)', 'tel')}</Col>
              <Col md={6}>
                <Form.Group controlId="perfil-email">
                  <Form.Label>Correo (no se puede cambiar)</Form.Label>
                  <Form.Control value={usuario.email} readOnly plaintext />
                </Form.Group>
              </Col>
            </Row>
            <button type="submit" className="adm-btn-primario mt-4">
              <i className="bi bi-check-lg" aria-hidden="true"></i> Guardar cambios
            </button>
          </Form>
        </div>
      </div>
    </>
  )
}

export default PerfilAdmin
