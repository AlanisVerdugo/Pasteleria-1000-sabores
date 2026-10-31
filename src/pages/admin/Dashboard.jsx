import { Link } from 'react-router-dom'
import { Table, Alert } from 'react-bootstrap'
import {
  productosService, categoriasService, usuariosService, ordenesService, contactoService,
} from '../../services'
import { useListado } from '../../hooks/useListado'
import { formatearPrecio, formatearFecha } from '../../utils/formato'
import { ventasDelMes, ultimasOrdenes } from '../../components/admin/calculosAdmin'
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin'
import TarjetaContador from '../../components/admin/TarjetaContador'
import EstadoOrden from '../../components/admin/EstadoOrden'

// Pide todo a los services al mismo tiempo (Promise.all). Está FUERA del componente
// para que useListado reciba siempre la misma función.
async function cargarDashboard() {
  const [productos, categorias, usuarios, ordenes, criticos, mensajes] = await Promise.all([
    productosService.listarTodos(),
    categoriasService.listar(),
    usuariosService.listar(),
    ordenesService.listar(),
    productosService.listarCriticos(),
    contactoService.listar(),
  ])
  return { productos, categorias, usuarios, ordenes, criticos, mensajes }
}

// Dashboard DINÁMICO: nada está escrito a mano, todo se cuenta desde los services.
// Si se crea un producto o una orden, el número cambia solo.
function Dashboard() {
  const { datos, cargando, error } = useListado(cargarDashboard, null)

  if (cargando) return <p>Cargando panel...</p>
  if (error) return <Alert variant="danger">No se pudo cargar el panel: {error}</Alert>

  const { productos, categorias, usuarios, ordenes, criticos, mensajes } = datos
  const recientes = ultimasOrdenes(ordenes, 5)

  return (
    <>
      <EncabezadoAdmin titulo="Dashboard" subtitulo="Resumen en vivo de la pastelería" />

      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-xl-4">
          <TarjetaContador titulo="Productos" valor={productos.length} icono="bi-box-seam" link="/admin/productos" />
        </div>
        <div className="col-sm-6 col-xl-4">
          <TarjetaContador titulo="Categorías" valor={categorias.length} icono="bi-tags" link="/admin/categorias" />
        </div>
        <div className="col-sm-6 col-xl-4">
          <TarjetaContador titulo="Usuarios" valor={usuarios.length} icono="bi-people" link="/admin/usuarios" />
        </div>
        <div className="col-sm-6 col-xl-4">
          <TarjetaContador titulo="Órdenes" valor={ordenes.length} icono="bi-receipt" link="/admin/ordenes" />
        </div>
        <div className="col-sm-6 col-xl-4">
          <TarjetaContador titulo="Ventas del mes" valor={formatearPrecio(ventasDelMes(ordenes))}
            icono="bi-cash-coin" link="/admin/reportes" />
        </div>
        <div className="col-sm-6 col-xl-4">
          <TarjetaContador titulo="Productos críticos" valor={criticos.length} icono="bi-exclamation-triangle"
            link="/admin/productos/criticos" alerta={criticos.length > 0} />
        </div>
        <div className="col-sm-6 col-xl-4">
          <TarjetaContador titulo="Mensajes de contacto" valor={mensajes.length} icono="bi-envelope" link="/admin/mensajes" />
        </div>
      </div>

      <section className="adm-caja">
        <h2 className="adm-caja-titulo">Últimas órdenes</h2>
        {recientes.length === 0 ? (
          <p className="mb-0">Todavía no hay órdenes.</p>
        ) : (
          <Table responsive hover className="adm-tabla mb-0">
            <thead>
              <tr><th>N°</th><th>Fecha</th><th>Total</th><th>Estado</th><th></th></tr>
            </thead>
            <tbody>
              {recientes.map((o) => (
                <tr key={o.id} data-testid="orden-reciente">
                  <td>{o.numero}</td>
                  <td>{formatearFecha(o.fecha)}</td>
                  <td>{formatearPrecio(o.total)}</td>
                  <td><EstadoOrden estado={o.estado} /></td>
                  <td><Link to={`/admin/ordenes/${o.id}`}>Ver boleta</Link></td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </section>
    </>
  )
}

export default Dashboard
