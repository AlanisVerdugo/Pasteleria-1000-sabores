import { useCallback, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { ordenesService } from '../../services'
import { useListado } from '../../hooks/useListado'
import { INFO_ESTADOS } from '../../components/admin/estadosOrden'
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin'
import EstadoOrden from '../../components/admin/EstadoOrden'
import SelectorEstado from '../../components/admin/SelectorEstado'
import BoletaDetalle from '../../components/BoletaDetalle'

// Mostrar boleta (/admin/ordenes/:id): reutiliza BoletaDetalle (el mismo que usa p2 en Pago correcto)
function OrdenDetalle() {
  const { id } = useParams()
  const cargar = useCallback(() => ordenesService.obtenerPorId(id), [id])
  const { datos: orden, cargando, error, recargar } = useListado(cargar, null)
  const [mensaje, setMensaje] = useState('')
  const [errorAccion, setErrorAccion] = useState('')

  if (cargando) return <p>Cargando boleta...</p>
  if (error) return <Alert variant="danger">{error}</Alert>
  if (!orden) {
    return (
      <Alert variant="warning">
        No existe la orden {id}. <Link to="/admin/ordenes">Volver a órdenes</Link>
      </Alert>
    )
  }

  const cambiarEstado = async (estado) => {
    try {
      await ordenesService.cambiarEstado(orden.id, estado)
      setMensaje(`Estado actualizado a "${INFO_ESTADOS[estado].texto}"`)
      setErrorAccion('')
      recargar()
    } catch (err) {
      setErrorAccion(err.message)
    }
  }

  return (
    <>
      <EncabezadoAdmin titulo={`Boleta ${orden.numero}`} subtitulo={<EstadoOrden estado={orden.estado} />}>
        <Link to="/admin/ordenes" className="adm-btn-secundario">
          <i className="bi bi-arrow-left" aria-hidden="true"></i> Volver
        </Link>
        {orden.usuarioId && (
          <Link to={`/admin/usuarios/${orden.usuarioId}/compras`} className="adm-btn-secundario">
            <i className="bi bi-clock-history" aria-hidden="true"></i> Historial del cliente
          </Link>
        )}
        {/* onClick con una función (en JSX no se escribe onclick="..." como en el HTML viejo) */}
        <button type="button" className="adm-btn-primario" onClick={() => window.print()}>
          <i className="bi bi-printer" aria-hidden="true"></i> Imprimir
        </button>
      </EncabezadoAdmin>

      <div className="adm-caja adm-no-imprimir d-flex flex-wrap align-items-center gap-3">
        <strong>Estado de despacho:</strong>
        <SelectorEstado estado={orden.estado} onCambiar={cambiarEstado} />
        {mensaje && <span className="text-success" role="status">{mensaje}</span>}
        {errorAccion && <span className="text-danger" role="alert">{errorAccion}</span>}
      </div>

      <BoletaDetalle orden={orden} />
    </>
  )
}

export default OrdenDetalle
