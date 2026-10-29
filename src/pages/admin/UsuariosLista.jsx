import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Table, Form, Badge, Alert } from 'react-bootstrap'
import { usuariosService } from '../../services'
import { useAuth } from '../../context/AuthContext'
import { useListado } from '../../hooks/useListado'
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin'
import ModalConfirmar from '../../components/admin/ModalConfirmar'

// Listar usuarios. usuariosService nunca devuelve el password (sinPassword).
// El admin NO se puede eliminar a sí mismo: se compara con useAuth().usuario.id
function UsuariosLista() {
  const { usuario: yo } = useAuth()
  const { datos: usuarios, cargando, error, recargar } = useListado(usuariosService.listar)
  const location = useLocation()
  const [texto, setTexto] = useState('')
  const [rol, setRol] = useState('')
  const [aEliminar, setAEliminar] = useState(null)
  const [mensaje, setMensaje] = useState(location.state?.mensaje ?? '')
  const [errorAccion, setErrorAccion] = useState('')

  if (cargando) return <p>Cargando usuarios...</p>
  if (error) return <Alert variant="danger">{error}</Alert>

  const busqueda = texto.trim().toLowerCase()
  const visibles = usuarios.filter((u) =>
    `${u.nombre} ${u.apellidos} ${u.email}`.toLowerCase().includes(busqueda) && (!rol || u.rol === rol)
  )

  const eliminar = async () => {
    try {
      await usuariosService.eliminar(aEliminar.id)
      setMensaje(`Se eliminó a ${aEliminar.nombre} ${aEliminar.apellidos}`)
      setErrorAccion('')
      recargar()
    } catch (err) {
      setErrorAccion(err.message)
    }
    setAEliminar(null)
  }

  return (
    <>
      <EncabezadoAdmin titulo="Usuarios" subtitulo={`${usuarios.length} usuarios registrados`}>
        <Link to="/admin/usuarios/nuevo" className="adm-btn-primario">
          <i className="bi bi-person-plus" aria-hidden="true"></i> Nuevo usuario
        </Link>
      </EncabezadoAdmin>

      {mensaje && <Alert variant="success" onClose={() => setMensaje('')} dismissible>{mensaje}</Alert>}
      {errorAccion && <Alert variant="danger">{errorAccion}</Alert>}

      <div className="adm-caja">
        <div className="row g-2 mb-3">
          <div className="col-md-8">
            <Form.Control type="search" placeholder="Buscar por nombre o correo..." aria-label="Buscar usuario"
              value={texto} onChange={(e) => setTexto(e.target.value)} />
          </div>
          <div className="col-md-4">
            <Form.Select aria-label="Filtrar por rol" value={rol} onChange={(e) => setRol(e.target.value)}>
              <option value="">Todos los roles</option>
              <option value="cliente">Clientes</option>
              <option value="admin">Administradores</option>
            </Form.Select>
          </div>
        </div>

        {visibles.length === 0 ? (
          <p className="mb-0">No hay usuarios que coincidan.</p>
        ) : (
          <Table responsive hover className="adm-tabla align-middle mb-0">
            <thead>
              <tr><th>ID</th><th>Nombre</th><th>Correo</th><th>RUN</th><th>Rol</th><th>Tipo</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {visibles.map((u) => {
                const soyYo = u.id === yo?.id
                return (
                  <tr key={u.id} data-testid="fila-usuario">
                    <td>{u.id}</td>
                    <td>{u.nombre} {u.apellidos} {soyYo && <Badge bg="info">Tú</Badge>}</td>
                    <td>{u.email}</td>
                    <td>{u.run}</td>
                    <td>{u.rol === 'admin' ? <Badge bg="dark">Admin</Badge> : <Badge bg="secondary">Cliente</Badge>}</td>
                    <td>{u.esDuoc ? <Badge bg="warning" text="dark">Duoc UC</Badge> : 'Normal'}</td>
                    <td className="text-nowrap">
                      <Link to={`/admin/usuarios/${u.id}`} className="btn btn-sm btn-outline-secondary me-1"
                        aria-label={`Ver ${u.nombre}`}><i className="bi bi-eye"></i></Link>
                      <Link to={`/admin/usuarios/${u.id}/editar`} className="btn btn-sm btn-outline-primary me-1"
                        aria-label={`Editar ${u.nombre}`}><i className="bi bi-pencil"></i></Link>
                      <Link to={`/admin/usuarios/${u.id}/compras`} className="btn btn-sm btn-outline-secondary me-1"
                        aria-label={`Compras de ${u.nombre}`}><i className="bi bi-bag"></i></Link>
                      <button type="button" className="btn btn-sm btn-outline-danger" aria-label={`Eliminar ${u.nombre}`}
                        disabled={soyYo} title={soyYo ? 'No puedes eliminarte a ti mismo' : undefined}
                        onClick={() => setAEliminar(u)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        )}
      </div>

      <ModalConfirmar
        mostrar={Boolean(aEliminar)}
        titulo="Eliminar usuario"
        mensaje={`¿Seguro que quieres eliminar a ${aEliminar?.nombre} ${aEliminar?.apellidos}?`}
        onConfirmar={eliminar}
        onCancelar={() => setAEliminar(null)}
      />
    </>
  )
}

export default UsuariosLista
