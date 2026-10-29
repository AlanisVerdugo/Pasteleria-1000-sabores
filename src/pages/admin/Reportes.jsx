import { Table, Alert, ProgressBar } from 'react-bootstrap'
import { ordenesService, productosService, categoriasService } from '../../services'
import { useListado } from '../../hooks/useListado'
import { formatearPrecio } from '../../utils/formato'
import { ESTADOS_ORDEN } from '../../utils/constantes'
import {
  sumarTotales, ventasDelMes, ticketPromedio, ordenesPorEstado, ventasPorCategoria, topProductos,
} from '../../components/admin/calculosAdmin'
import { INFO_ESTADOS } from '../../components/admin/estadosOrden'
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin'
import TarjetaContador from '../../components/admin/TarjetaContador'

async function cargarReportes() {
  const [ordenes, productos, categorias] = await Promise.all([
    ordenesService.listar(), productosService.listarTodos(), categoriasService.listar(),
  ])
  return { ordenes, productos, categorias }
}

// Reportes: todo se calcula con reduce / map / filter desde los services (nada escrito a mano)
function Reportes() {
  const { datos, cargando, error } = useListado(cargarReportes, null)

  if (cargando) return <p>Cargando reportes...</p>
  if (error) return <Alert variant="danger">{error}</Alert>

  const { ordenes, productos, categorias } = datos
  const porEstado = ordenesPorEstado(ordenes, ESTADOS_ORDEN)
  const porCategoria = ventasPorCategoria(ordenes, productos, categorias)
  const maximoCategoria = Math.max(1, ...porCategoria.map((c) => c.total))
  const top = topProductos(ordenes, 5)

  return (
    <>
      <EncabezadoAdmin titulo="Reportes" subtitulo="Ventas calculadas desde las órdenes registradas" />

      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-xl-3">
          <TarjetaContador titulo="Ventas totales" valor={formatearPrecio(sumarTotales(ordenes))} icono="bi-cash-stack" />
        </div>
        <div className="col-sm-6 col-xl-3">
          <TarjetaContador titulo="Ventas del mes" valor={formatearPrecio(ventasDelMes(ordenes))} icono="bi-calendar-month" />
        </div>
        <div className="col-sm-6 col-xl-3">
          <TarjetaContador titulo="Órdenes" valor={ordenes.length} icono="bi-receipt" link="/admin/ordenes" />
        </div>
        <div className="col-sm-6 col-xl-3">
          <TarjetaContador titulo="Ticket promedio" valor={formatearPrecio(ticketPromedio(ordenes))} icono="bi-graph-up" />
        </div>
      </div>

      {ordenes.length === 0 ? (
        <div className="adm-caja"><p className="mb-0">Todavía no hay ventas para mostrar reportes.</p></div>
      ) : (
        <div className="row g-3">
          <div className="col-lg-5">
            <section className="adm-caja h-100" aria-label="Órdenes por estado">
              <h2 className="adm-caja-titulo">Órdenes por estado</h2>
              {ESTADOS_ORDEN.map((e) => (
                <div key={e} className="mb-3" data-testid={`estado-${e}`}>
                  <div className="d-flex justify-content-between">
                    <span>{INFO_ESTADOS[e].texto}</span><strong>{porEstado[e]}</strong>
                  </div>
                  <ProgressBar now={(porEstado[e] / ordenes.length) * 100} variant="warning"
                    aria-label={`Órdenes ${INFO_ESTADOS[e].texto}`} />
                </div>
              ))}
            </section>
          </div>

          <div className="col-lg-7">
            <section className="adm-caja h-100" aria-label="Ventas por categoría">
              <h2 className="adm-caja-titulo">Ventas por categoría</h2>
              {porCategoria.map((c) => (
                <div key={c.nombre} className="mb-3" data-testid="venta-categoria">
                  <div className="d-flex justify-content-between">
                    <span>{c.nombre}</span><strong>{formatearPrecio(c.total)}</strong>
                  </div>
                  <ProgressBar now={(c.total / maximoCategoria) * 100} style={{ height: 10 }}
                    aria-label={`Ventas de ${c.nombre}`} />
                </div>
              ))}
            </section>
          </div>

          <div className="col-12">
            <section className="adm-caja" aria-label="Productos más vendidos">
              <h2 className="adm-caja-titulo">Top 5 productos más vendidos</h2>
              <Table responsive hover className="adm-tabla mb-0">
                <thead><tr><th>#</th><th>Producto</th><th>Unidades</th><th>Total vendido</th></tr></thead>
                <tbody>
                  {top.map((p, i) => (
                    <tr key={p.nombre} data-testid="top-producto">
                      <td>{i + 1}</td><td>{p.nombre}</td><td>{p.cantidad}</td><td>{formatearPrecio(p.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </section>
          </div>
        </div>
      )}
    </>
  )
}

export default Reportes
