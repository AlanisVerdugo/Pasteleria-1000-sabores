import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alert, Badge } from 'react-bootstrap'
import { usuariosService } from '../../services'
import { useListado } from '../../hooks/useListado'
import { calcularEdad, calcularDescuento, esCumpleanos } from '../../utils/descuentos'
import { formatearFecha } from '../../utils/formato'
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin'

// Mostrar usuario (/admin/usuarios/:id): datos + beneficios calculados (D6/D7)
function UsuarioDetalle() {
  const { id } = useParams()
  const cargar = useCallback(() => usuariosService.obtenerPorId(id), [id])
  const { datos: u, cargando, error } = useListado(cargar, null)

  if (cargando) return <p>Cargando...</p>
  if (error) return <Alert variant="danger">{error}</Alert>
  if (!u) {
    return (
      <Alert variant="warning">
        No existe el usuario {id}. <Link to="/admin/usuarios">Volver a usuarios</Link>
      </Alert>
    )
  }

  const descuento = calcularDescuento(u, u.codigoDescuento)

  return (
    <>
      <EncabezadoAdmin titulo={`${u.nombre} ${u.apellidos}`} subtitulo={u.email}>
        <Link to="/admin/usuarios" className="adm-btn-secundario">
          <i className="bi bi-arrow-left" aria-hidden="true"></i> Volver
        </Link>
        <Link to={`/admin/usuarios/${u.id}/compras`} className="adm-btn-secundario">
          <i className="bi bi-bag" aria-hidden="true"></i> Historial de compras
        </Link>
        <Link to={`/admin/usuarios/${u.id}/editar`} className="adm-btn-primario">
          <i className="bi bi-pencil" aria-hidden="true"></i> Editar
        </Link>
      </EncabezadoAdmin>

      <div className="row g-3">
        <div className="col-lg-7">
          <div className="adm-caja h-100">
            <h2 className="adm-caja-titulo">Datos personales</h2>
            <ul className="list-unstyled mb-0">
              <li><strong>RUN:</strong> {u.run}</li>
              <li>
                <strong>Fecha de nacimiento:</strong>{' '}
                {u.fechaNacimiento ? `${formatearFecha(u.fechaNacimiento)} (${calcularEdad(u.fechaNacimiento)} años)` : '—'}
              </li>
              <li><strong>Teléfono:</strong> {u.telefono || '—'}</li>
              <li><strong>Rol:</strong> {u.rol === 'admin' ? 'Administrador' : 'Cliente'}</li>
              <li><strong>Tipo:</strong> {u.esDuoc ? 'Estudiante Duoc UC' : 'Normal'}</li>
              <li><strong>Registrado el:</strong> {u.fechaRegistro ? formatearFecha(u.fechaRegistro) : '—'}</li>
            </ul>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="adm-caja h-100">
            <h2 className="adm-caja-titulo">Beneficios</h2>
            {descuento.porcentaje > 0
              ? <p><Badge bg="success">{descuento.porcentaje}%</Badge> {descuento.motivo}</p>
              : <p>Sin descuento.</p>}
            {u.esDuoc && (
              <p className="mb-0">
                Torta gratis en su cumpleaños {esCumpleanos(u.fechaNacimiento) && <Badge bg="warning" text="dark">¡Es hoy!</Badge>}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default UsuarioDetalle
