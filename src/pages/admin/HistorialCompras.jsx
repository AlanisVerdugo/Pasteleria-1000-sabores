import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { usuariosService, ordenesService } from '../../services'
import { useListado } from '../../hooks/useListado'
import { formatearPrecio, formatearFecha } from '../../utils/formato'
import { sumarTotales, ultimasOrdenes } from '../../components/admin/calculosAdmin'
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin'
import TarjetaContador from '../../components/admin/TarjetaContador'
import MisPedidos from '../../components/MisPedidos'

// Historial de compras de un usuario (/admin/usuarios/:id/compras).
// Reutiliza MisPedidos({ usuarioId }), el mismo componente que ve el cliente en /mis-pedidos (D13).
function HistorialCompras() {
  const { id } = useParams()
  const usuarioId = Number(id) // las órdenes guardan usuarioId como número

  const cargar = useCallback(async () => {
    const [usuario, ordenes] = await Promise.all([
      usuariosService.obtenerPorId(usuarioId),
      ordenesService.listarPorUsuario(usuarioId),
    ])
    return { usuario, ordenes }
  }, [usuarioId])
  const { datos, cargando, error } = useListado(cargar, null)

  if (cargando) return <p>Cargando historial...</p>
  if (error) return <Alert variant="danger">{error}</Alert>
  if (!datos.usuario) {
    return (
      <Alert variant="warning">
        No existe el usuario {id}. <Link to="/admin/usuarios">Volver a usuarios</Link>
      </Alert>
    )
  }

  const { usuario, ordenes } = datos
  const ultima = ultimasOrdenes(ordenes, 1)[0]

  return (
    <>
      <EncabezadoAdmin titulo="Historial de compras" subtitulo={`${usuario.nombre} ${usuario.apellidos} · ${usuario.email}`}>
        <Link to={`/admin/usuarios/${usuario.id}`} className="adm-btn-secundario">
          <i className="bi bi-arrow-left" aria-hidden="true"></i> Volver al usuario
        </Link>
      </EncabezadoAdmin>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <TarjetaContador titulo="Compras" valor={ordenes.length} icono="bi-bag" />
        </div>
        <div className="col-md-4">
          <TarjetaContador titulo="Total gastado" valor={formatearPrecio(sumarTotales(ordenes))} icono="bi-cash-coin" />
        </div>
        <div className="col-md-4">
          <TarjetaContador titulo="Última compra" valor={ultima ? formatearFecha(ultima.fecha) : '—'} icono="bi-calendar-check" />
        </div>
      </div>

      <div className="adm-caja">
        <MisPedidos usuarioId={usuarioId} />
      </div>
    </>
  )
}

export default HistorialCompras
