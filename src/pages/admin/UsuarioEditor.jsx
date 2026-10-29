import { useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { usuariosService } from '../../services'
import { useAuth } from '../../context/AuthContext'
import { useListado } from '../../hooks/useListado'
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin'
import UsuarioForm from '../../components/admin/UsuarioForm'

// /admin/usuarios/nuevo y /admin/usuarios/:id/editar
function UsuarioEditor() {
  const { id } = useParams()
  const esEdicion = Boolean(id)
  const { usuario: yo } = useAuth()
  const navigate = useNavigate()

  const cargar = useCallback(() => (id ? usuariosService.obtenerPorId(id) : Promise.resolve(null)), [id])
  const { datos: usuario, cargando, error } = useListado(cargar, null)

  const guardar = async (datos) => {
    if (esEdicion) {
      // el correo tiene que seguir siendo único
      const otro = await usuariosService.obtenerPorEmail(datos.email)
      if (otro && otro.id !== Number(id)) throw new Error('El correo ya está registrado')
      await usuariosService.actualizar(id, datos)
    } else {
      await usuariosService.crear({ ...datos, codigoDescuento: null, fechaRegistro: new Date().toISOString().slice(0, 10) })
    }
    navigate('/admin/usuarios', {
      state: { mensaje: esEdicion ? `Se guardaron los cambios de ${datos.nombre}` : `Se creó el usuario ${datos.nombre}` },
    })
  }

  if (cargando) return <p>Cargando...</p>
  if (error) return <Alert variant="danger">{error}</Alert>
  if (esEdicion && !usuario) {
    return (
      <Alert variant="warning">
        No existe el usuario {id}. <Link to="/admin/usuarios">Volver a usuarios</Link>
      </Alert>
    )
  }

  return (
    <>
      <EncabezadoAdmin titulo={esEdicion ? 'Editar usuario' : 'Nuevo usuario'}
        subtitulo={esEdicion ? `${usuario.nombre} ${usuario.apellidos} · ${usuario.email}` : 'Completa los datos del usuario'}>
        <Link to="/admin/usuarios" className="adm-btn-secundario">
          <i className="bi bi-arrow-left" aria-hidden="true"></i> Volver
        </Link>
      </EncabezadoAdmin>
      <UsuarioForm inicial={usuario} esEdicion={esEdicion} bloquearRol={esEdicion && usuario.id === yo?.id}
        onGuardar={guardar} />
    </>
  )
}

export default UsuarioEditor
