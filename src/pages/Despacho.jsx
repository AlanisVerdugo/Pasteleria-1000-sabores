import { Link } from 'react-router-dom'
import '../css/despacho.css'
import PasoDespacho from '../components/PasoDespacho'
import { COSTO_DESPACHO } from '../utils/constantes'
import { formatearPrecio } from '../utils/formato'

const PASOS = [
  { icono: 'bi-bag-heart', titulo: 'Haces tu pedido', texto: 'Eliges tu torta, el tamaño y el día de entrega.' },
  { icono: 'bi-fire', titulo: 'La horneamos', texto: 'Se prepara fresca, el mismo día o el día anterior.' },
  { icono: 'bi-truck', titulo: 'Va en camino', texto: 'Viaja en un vehículo refrigerado para llegar perfecta.' },
  { icono: 'bi-house-heart', titulo: 'Llega a tu mesa', texto: 'Lista para celebrar con los tuyos.' },
]

const CUIDADOS = [
  { icono: 'bi-snow', texto: 'Guárdala en el refrigerador apenas la recibas.' },
  { icono: 'bi-car-front', texto: 'Si la trasladas, llévala plana en el piso del auto, nunca en el asiento.' },
  { icono: 'bi-clock-history', texto: 'Sácala 15 minutos antes de servir para que recupere su sabor.' },
  { icono: 'bi-calendar-check', texto: 'Disfrútala dentro de 3 días para que esté en su mejor momento.' },
]

function Despacho() {
  return (
    <main className="despacho container">
      <header className="despacho-encabezado text-center">
        <span className="despacho-eyebrow">Del horno a tu mesa</span>
        <h1 className="despacho-titulo">Despacho y envíos</h1>
        <p className="despacho-subtitulo mx-auto">
          Cuidamos cada torta desde que sale del horno hasta que llega a tus manos.
        </p>
      </header>

      <section aria-labelledby="titulo-recorrido" className="despacho-seccion">
        <h2 id="titulo-recorrido" className="despacho-titulo-seccion">¿Cómo llega tu pedido?</h2>
        <ol className="despacho-pasos">
          {PASOS.map((p, i) => (
            <PasoDespacho key={p.titulo} numero={i + 1} {...p} />
          ))}
        </ol>
      </section>

      <section aria-labelledby="titulo-opciones" className="despacho-seccion">
        <h2 id="titulo-opciones" className="despacho-titulo-seccion">Opciones de entrega</h2>
        <div className="row g-4">
          <div className="col-md-6">
            <article className="despacho-opcion h-100">
              <i className="bi bi-truck despacho-opcion-icono"></i>
              <h3>Despacho refrigerado</h3>
              <p className="despacho-precio">{formatearPrecio(COSTO_DESPACHO)}</p>
              <p>A domicilio en la Región Metropolitana, en 24 a 48 horas.</p>
            </article>
          </div>
          <div className="col-md-6">
            <article className="despacho-opcion h-100">
              <i className="bi bi-shop despacho-opcion-icono"></i>
              <h3>Retiro en tienda</h3>
              <p className="despacho-precio">Gratis</p>
              <p>Pasa a buscarla a nuestra pastelería cuando esté lista.</p>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="titulo-plazos" className="despacho-seccion">
        <h2 id="titulo-plazos" className="despacho-titulo-seccion">Plazos y horarios</h2>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="despacho-info h-100">
              <h3><i className="bi bi-hourglass-split"></i> Anticipación</h3>
              <ul>
                <li><strong>Tortas del catálogo:</strong> 24 a 48 horas.</li>
                <li><strong>Tortas personalizadas:</strong> mínimo 72 horas.</li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="despacho-info h-100">
              <h3><i className="bi bi-clock"></i> Bloques de entrega</h3>
              <ul>
                <li><strong>Mañana:</strong> 10:00 a 14:00 hrs.</li>
                <li><strong>Tarde:</strong> 15:00 a 19:00 hrs.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="titulo-cuidados" className="despacho-seccion">
        <h2 id="titulo-cuidados" className="despacho-titulo-seccion">Cuidados al recibir tu torta</h2>
        <ul className="despacho-cuidados">
          {CUIDADOS.map((c) => (
            <li key={c.texto}>
              <i className={`bi ${c.icono}`}></i>
              <span>{c.texto}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="despacho-cta text-center">
        <h2>¿Tienes dudas con tu pedido?</h2>
        <p>Escríbenos y te ayudamos con gusto.</p>
        <Link to="/contacto" className="despacho-cta-boton">Ir a Contacto</Link>
      </section>
    </main>
  )
}

export default Despacho