import { formatearPrecio, formatearFecha } from '../utils/formato'
import '../css/boletas.css'

const TEXTO_ESTADO = {
  preparacion: 'En preparación',
  en_camino: 'En camino',
  entregado: 'Entregado',
}

// IVA incluido en el total (Chile 19%): parte del total que corresponde al impuesto
const ivaIncluido = (total) => Math.round(total - total / 1.19)

// Documento de boleta de una orden (forma D19).
// Lo usa el admin (Mostrar boleta) y p2 en Pago correcto.
// Las órdenes semilla solo traen id, numero, usuarioId, estado, fecha, items y total,
// por eso cliente, despacho, subtotal y descuento son opcionales (?. y ??).
function BoletaDetalle({ orden }) {
  if (!orden) return <p className="text-center py-4">No se encontró la boleta.</p>

  const items = orden.items ?? []
  const subtotal = orden.subtotal ?? orden.total
  const descuento = orden.descuento ?? 0
  const detalleDescuento = orden.detalleDescuento ?? []

  return (
    <div className="bol-doc" data-testid="boleta">
      <div className="bol-doc-header">
        <div>
          <span className="bol-marca">Pastelería 1000 Sabores</span>
          <p className="bol-eslogan mb-1">Tradición Pastelera Chilena desde 1974</p>
          <p className="bol-direccion mb-0">Av. Providencia 1234, Providencia, Santiago &bull; contacto@1000sabores.cl</p>
        </div>
        <div className="bol-rut-box">
          <p className="bol-rut mb-0">R.U.T. 76.543.210-K</p>
          <p className="bol-tipo-doc mb-0">BOLETA ELECTRÓNICA</p>
          <p className="bol-folio-grande mb-0">N° {orden.numero}</p>
        </div>
      </div>

      <div className="row g-4 bol-datos">
        <div className="col-md-6">
          <p className="bol-label-seccion">Receptor</p>
          {orden.cliente ? (
            <>
              <p className="bol-dato-fuerte mb-1">{orden.cliente.nombre}</p>
              {orden.cliente.email && <p className="bol-dato-chico mb-1">{orden.cliente.email}</p>}
              {orden.cliente.telefono && <p className="bol-dato-chico mb-0">{orden.cliente.telefono}</p>}
            </>
          ) : (
            <p className="bol-dato mb-0">
              {orden.usuarioId ? `Cliente N° ${orden.usuarioId}` : 'Compra como invitado'}
            </p>
          )}
        </div>
        <div className="col-md-6 text-md-end">
          <p className="bol-label-seccion">Detalles de compra</p>
          <p className="bol-dato mb-1">Fecha: <span className="bol-dato-fuerte">{formatearFecha(orden.fecha)}</span></p>
          <p className="bol-dato mb-1">Estado: <span className="bol-dato-fuerte">{TEXTO_ESTADO[orden.estado] ?? orden.estado}</span></p>
          {orden.despacho && (
            <>
              <p className="bol-dato mb-1">
                Despacho: <span className="bol-dato-fuerte">{orden.despacho.calle}, {orden.despacho.comuna}</span>
              </p>
              {orden.despacho.fechaEntrega && (
                <p className="bol-dato mb-0">
                  Entrega: <span className="bol-dato-fuerte">{formatearFecha(orden.despacho.fechaEntrega)}</span>
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="table-responsive bol-tabla-wrap">
        <table className="table bol-tabla">
          <thead>
            <tr>
              <th>Detalle del producto</th>
              <th className="text-center">Cant.</th>
              <th className="text-end">Precio</th>
              <th className="text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={`${item.codigo ?? item.nombre}-${i}`}>
                <td>
                  <div className="bol-dato-fuerte">{item.nombre}</div>
                  {(item.tamano || item.mensaje) && (
                    <div className="bol-dato-chico">
                      {item.tamano && `Tamaño: ${item.tamano}`}
                      {item.tamano && item.mensaje && ' • '}
                      {item.mensaje && `Mensaje: "${item.mensaje}"`}
                    </div>
                  )}
                </td>
                <td className="text-center">{item.cantidad}</td>
                <td className="text-end">{formatearPrecio(item.precio)}</td>
                <td className="text-end bol-dato-fuerte">{formatearPrecio(item.precio * item.cantidad)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-end">
        <div className="bol-totales">
          <div className="d-flex justify-content-between">
            <span className="bol-dato">Subtotal:</span>
            <span className="bol-dato-fuerte">{formatearPrecio(subtotal)}</span>
          </div>
          {descuento > 0 && (
            <div className="d-flex justify-content-between bol-descuento">
              <span>{detalleDescuento.map((d) => d.motivo).join(', ') || 'Descuento'}:</span>
              <span className="fw-bold">-{formatearPrecio(descuento)}</span>
            </div>
          )}
          <div className="d-flex justify-content-between">
            <span className="bol-dato">I.V.A. incluido (19%):</span>
            <span className="bol-dato">{formatearPrecio(ivaIncluido(orden.total))}</span>
          </div>
          <div className="d-flex justify-content-between bol-total-final">
            <span>TOTAL:</span>
            <span>{formatearPrecio(orden.total)}</span>
          </div>
        </div>
      </div>

      <p className="bol-despedida">
        ¡Gracias por su compra! &bull; Pastelería 1000 Sabores &bull; Horneando con amor desde 1974
      </p>
    </div>
  )
}

export default BoletaDetalle
