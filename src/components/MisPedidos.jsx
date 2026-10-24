import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ordenesService } from '../services'
import ProductoPedido from './ProductoPedido'
import '../css/pedidos.css'

const ESTADOS = {
  preparacion: { texto: 'En preparación', icono: 'bi bi-fire', clase: 'ped-estado-horno' },
  en_camino: { texto: 'En camino', icono: 'bi bi-scooter', clase: 'ped-estado-ruta' },
  entregado: { texto: 'Entregado', icono: 'bi bi-patch-check-fill', clase: 'ped-estado-entregado' },
}

const FILTROS = [
  { valor: 'todos', texto: 'Todos' },
  { valor: 'preparacion', texto: 'En preparación' },
  { valor: 'en_camino', texto: 'En camino' },
  { valor: 'entregado', texto: 'Entregados' },
]

const pesos = (n) => '$' + n.toLocaleString('es-CL')
const fechaLarga = (iso) =>
  new Date(iso).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })

function MisPedidos({ usuarioId }) {
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [filtro, setFiltro] = useState('todos')

  
  useEffect(() => {
    ordenesService
      .listarPorUsuario(usuarioId)
      .then((lista) => setPedidos([...lista].sort((a, b) => b.fecha.localeCompare(a.fecha))))
      .finally(() => setCargando(false))
  }, [usuarioId])

  const visibles = filtro === 'todos' ? pedidos : pedidos.filter((p) => p.estado === filtro)

  if (cargando) return <p>Cargando pedidos...</p>

  if (pedidos.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="ped-subtitulo">Aún no tienes pedidos.</p>
        <Link to="/productos" className="ped-btn-primario">Ver productos</Link>
      </div>
    )
  }

  return (
    <section>
      <div className="d-flex gap-2 flex-wrap mb-4">
        {FILTROS.map((f) => (
          <button
            key={f.valor} type="button"
            className={`ped-filtro ${filtro === f.valor ? 'ped-filtro-activo' : ''}`}
            onClick={() => setFiltro(f.valor)}
          >
            {f.texto}
            {f.valor === 'todos' && ` (${pedidos.length})`}
          </button>
        ))}
      </div>

      {visibles.length === 0 && <p className="ped-sin-resultados">No tienes pedidos en este estado.</p>}

      {visibles.map((p, i) => {
        const estado = ESTADOS[p.estado]
        return (
          <article key={`${filtro}${p.id}`} className="ped-card mb-4" data-testid="pedido"
                   style={{ animationDelay: `${i * 0.2}s` }}>
            <div className="ped-card-header">
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <span className="ped-codigo">#{p.numero}</span>
                <span className="text-muted">•</span>
                <span className="ped-fecha">{fechaLarga(p.fecha)}</span>
              </div>
              <span className={`ped-estado ${estado.clase}`}>
                <i className={estado.icono}></i> {estado.texto}
              </span>
            </div>
            <div className="ped-card-body">
              <div className="row g-4 align-items-center">
                <div className="col-lg-8">
                  {p.items.map((item) => (
                    <ProductoPedido
                      key={item.nombre}
                      imagen={item.imagen}
                      titulo={item.nombre}
                      detalle={`${item.cantidad}x • ${pesos(item.precio)} c/u`}
                    />
                  ))}
                </div>
                <div className="col-lg-4">
                  <div className="ped-resumen">
                    <div className="d-flex justify-content-between">
                      <span className="ped-label">Total:</span>
                      <span className="ped-total">{pesos(p.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}

export default MisPedidos

