import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/preguntas-frecuentes.css'
import PreguntaFrecuente from '../components/PreguntaFrecuente'
import { COSTO_DESPACHO, CODIGO_FELICES } from '../utils/constantes'
import { formatearPrecio } from '../utils/formato'

const GRUPOS = [
  {
    titulo: 'Pedidos',
    icono: 'bi-bag-heart',
    preguntas: [
      { id: 'anticipacion', pregunta: '¿Con cuánta anticipación debo hacer mi pedido?', respuesta: 'Las tortas del catálogo necesitan entre 24 y 48 horas. Las tortas personalizadas, un mínimo de 72 horas.' },
      { id: 'personalizada', pregunta: '¿Puedo pedir una torta personalizada?', respuesta: '¡Sí! Escríbenos desde Contacto eligiendo "Pedido de torta personalizada" y coordinamos el diseño, el tamaño y los sabores.' },
      { id: 'mensaje', pregunta: '¿Puedo agregar un mensaje a mi torta?', respuesta: 'Sí. En el detalle de cada torta puedes escribir un mensaje personalizado antes de agregarla al carrito.' },
    ],
  },
  {
    titulo: 'Despacho',
    icono: 'bi-truck',
    preguntas: [
      { id: 'costo', pregunta: '¿Cuánto cuesta el despacho?', respuesta: `El despacho refrigerado cuesta ${formatearPrecio(COSTO_DESPACHO)} dentro de la Región Metropolitana. El retiro en tienda es gratis.` },
      { id: 'horarios', pregunta: '¿En qué horarios entregan?', respuesta: 'Entregamos en dos bloques: mañana (10:00 a 14:00) y tarde (15:00 a 19:00).' },
      { id: 'cuidados', pregunta: '¿Cómo cuido la torta al recibirla?', respuesta: 'Guárdala refrigerada, sácala unos 15 minutos antes de servir y disfrútala dentro de 3 días.' },
    ],
  },
  {
    titulo: 'Descuentos',
    icono: 'bi-percent',
    preguntas: [
      { id: 'mayores', pregunta: '¿Hay descuento para mayores de 50 años?', respuesta: 'Sí. Si tienes más de 50 años, obtienes un 50% de descuento en tus compras.' },
      { id: 'codigo', pregunta: `¿Para qué sirve el código ${CODIGO_FELICES}?`, respuesta: `Si te registras con el código ${CODIGO_FELICES}, obtienes un 10% de descuento en tus compras.` },
      { id: 'duoc', pregunta: '¿Qué beneficio tienen los estudiantes Duoc?', respuesta: 'Si te registras con tu correo @duocuc.cl, el día de tu cumpleaños la primera torta que agregues al carrito es gratis.' },
      { id: 'acumulables', pregunta: '¿Los descuentos se suman?', respuesta: 'No. Si tienes más de uno, se aplica automáticamente el de mayor porcentaje.' },
    ],
  },
  {
    titulo: 'Mi cuenta',
    icono: 'bi-person-heart',
    preguntas: [
      { id: 'pedidos', pregunta: '¿Dónde veo mis pedidos?', respuesta: 'Inicia sesión y entra a "Mis pedidos" desde el menú de usuario. Ahí ves cada pedido y su estado.' },
      { id: 'datos', pregunta: '¿Cómo cambio mis datos o mi foto?', respuesta: 'Desde "Mi perfil", en el menú de usuario, puedes editar tus datos y subir o quitar tu foto.' },
    ],
  },
]

function PreguntasFrecuentes() {
  const [abierta, setAbierta] = useState(null)

  const alternar = (id) => setAbierta((actual) => (actual === id ? null : id))

  return (
    <main className="pf container">
      <header className="pf-encabezado">
        <span className="pf-eyebrow">Te ayudamos</span>
        <h1 className="pf-titulo">Preguntas Frecuentes</h1>
      </header>

      {GRUPOS.map((grupo) => (
        <section key={grupo.titulo} className="pf-grupo">
          <h2 className="pf-titulo-grupo">
            <i className={`bi ${grupo.icono}`} aria-hidden="true"></i> {grupo.titulo}
          </h2>
          <ul className="pf-lista">
            {grupo.preguntas.map((p) => (
              <PreguntaFrecuente
                key={p.id}
                {...p}
                abierta={abierta === p.id}
                onAlternar={() => alternar(p.id)}
              />
            ))}
          </ul>
        </section>
      ))}

      <section className="pf-cta text-center">
        <h2>¿No encontraste tu respuesta?</h2>
        <p>Escríbenos y te respondemos lo antes posible.</p>
        <Link to="/contacto" className="pf-cta-boton">
          <i className="bi bi-envelope-heart"></i> Ir a Contacto
        </Link>
      </section>
    </main>
  )
}

export default PreguntasFrecuentes

