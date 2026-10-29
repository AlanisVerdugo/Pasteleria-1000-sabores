import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Form, Alert } from 'react-bootstrap'
import { ordenesService, usuariosService } from '../../services'
import { useListado } from '../../hooks/useListado'
import { formatearPrecio, formatearFecha } from '../../utils/formato'
import { ESTADOS_ORDEN } from '../../utils/constantes'
import { INFO_ESTADOS } from '../../components/admin/estadosOrden'
import { nombreCliente } from '../../components/admin/calculosAdmin'
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin'
import EstadoOrden from '../../components/admin/EstadoOrden'
import SelectorEstado from '../../components/admin/SelectorEstado'

async function cargarOrdenes() {
  const [ordenes, usuarios] = await Promise.all([ordenesService.listar(), usuariosService.listar()])
  return { ordenes, usuarios }
}

// Órdenes/Boletas (reemplaza al Boletas.jsx estático):
// tabla con filtro por estado, búsqueda y cambio de estado de despacho (D3)
function OrdenesLista() {
  const { datos, cargando, error, recargar } = useListado(cargarOrdenes, null)
  const [filtro, setFiltro] = useState('todos')
  const [texto, setTexto] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [errorAccion, setErrorAccion] = useState('')

  if (cargando) return <p>Cargando órdenes...</p>
  if (error) return <Alert variant="danger">{error}</Alert>

  const busqueda = texto.trim().toLowerCase()
  const visibles = [...datos.ordenes]
    .sort((a, b) => b.fecha.localeCompare(a.fecha)) // la más nueva primero
    .filter((o) => filtro === 'todos' || o.estado === filtro)
    .filter((o) => o.numero.toLowerCase().includes(busqueda) ||
      nombreCliente(o, datos.usuarios).toLowerCase().includes(busqueda))

  const cambiarEstado = async (orden, estado) => {
    try {
      await ordenesService.cambiarEstado(orden.id, estado)
      setMensaje(`La orden ${orden.numero} quedó "${INFO_ESTADOS[estado].texto}"`)
      setErrorAccion('')
      recargar()
    } catch (err) {
      setErrorAccion(err.message)
    }
  }

  const cantidadPorEstado = (estado) => datos.ordenes.filter((o) => o.estado === estado).length

  return (
    <>
      <EncabezadoAdmin titulo="Órdenes y boletas" subtitulo={`${datos.ordenes.length} órdenes en total`} />

      {mensaje && <Alert variant="success" onClose={() => setMensaje('')} dismissible>{mensaje}</Alert>}
      {errorAccion && <Alert variant="danger">{errorAccion}</Alert>}

      <div className="adm-caja">
        <div className="d-flex flex-wrap gap-2 mb-3">
          <button type="button" className={filtro === 'todos' ? 'adm-btn-primario' : 'adm-btn-secundario'}
            onClick={() => setFiltro('todos')}>
            Todas ({datos.ordenes.length})
          </button>
          {ESTADOS_ORDEN.map((e) => (
            <button key={e} type="button" className={filtro === e ? 'adm-btn-primario' : 'adm-btn-secundario'}
              onClick={() => setFiltro(e)}>
              {INFO_ESTADOS[e].texto} ({cantidadPorEstado(e)})
            </button>
          ))}
        </div>
        <Form.Control className="mb-3" type="search" placeholder="Buscar por N° de boleta o cliente..."
          aria-label="Buscar orden" value={texto} onChange={(e) => setTexto(e.target.value)} />

        {visibles.length === 0 ? (
          <p className="mb-0">No hay órdenes que coincidan.</p>
        ) : (
          <Table responsive hover className="adm-tabla align-middle mb-0">
            <thead>
              <tr><th>N°</th><th>Fecha</th><th>Cliente</th><th>Productos</th><th>Total</th><th>Estado</th><th>Cambiar</th><th></th></tr>
            </thead>
            <tbody>
              {visibles.map((o) => (
                <tr key={o.id} data-testid="fila-orden">
                  <td>{o.numero}</td>
                  <td>{formatearFecha(o.fecha)}</td>
                  <td>{nombreCliente(o, datos.usuarios)}</td>
                  <td>{o.items.reduce((suma, i) => suma + i.cantidad, 0)}</td>
                  <td>{formatearPrecio(o.total)}</td>
                  <td><EstadoOrden estado={o.estado} /></td>
                  <td>
                    <SelectorEstado estado={o.estado} etiqueta={`Estado de ${o.numero}`}
                      onCambiar={(estado) => cambiarEstado(o, estado)} />
                  </td>
                  <td>
                    <Link to={`/admin/ordenes/${o.id}`} className="btn btn-sm btn-outline-secondary text-nowrap">
                      <i className="bi bi-receipt" aria-hidden="true"></i> Ver boleta
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  )
}

export default OrdenesLista
