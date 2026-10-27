import { Link } from 'react-router-dom'
import '../css/terminos.css'
import { COSTO_DESPACHO, CODIGO_FELICES } from '../utils/constantes'
import { formatearPrecio } from '../utils/formato'

const SECCIONES = [
  {
    titulo: 'Uso del sitio',
    parrafos: [
      'Al navegar y comprar en Pastelería 1000 Sabores aceptas estos términos. El sitio es para uso personal y no comercial.',
    ],
  },
  {
    titulo: 'Cuentas de usuario',
    parrafos: [
      'Para comprar y ver tus pedidos necesitas una cuenta con datos reales. Eres responsable de mantener tu contraseña en privado.',
      'Los beneficios para estudiantes Duoc solo aplican a cuentas registradas con un correo @duocuc.cl.',
    ],
  },
  {
    titulo: 'Precios y ofertas',
    parrafos: [
      'Los precios están en pesos chilenos e incluyen IVA. Las ofertas son válidas mientras se muestren en el sitio o hasta agotar stock.',
    ],
  },
  {
    titulo: 'Descuentos y beneficios',
    parrafos: [
      'Las personas mayores de 50 años tienen un 50% de descuento en sus compras.',
      `Quienes se registren con el código ${CODIGO_FELICES} obtienen un 10% de descuento en sus compras.`,
      'Los estudiantes Duoc reciben gratis la primera torta que agreguen al carrito el día de su cumpleaños.',
      'Los descuentos no son acumulables: si tienes más de uno, se aplica automáticamente el de mayor porcentaje.',
    ],
  },
  {
    titulo: 'Pedidos y anticipación',
    parrafos: [
      'Las tortas del catálogo requieren entre 24 y 48 horas de anticipación, y las personalizadas un mínimo de 72 horas.',
    ],
  },
  {
    titulo: 'Despacho y retiro',
    parrafos: [
      `El despacho refrigerado tiene un costo de ${formatearPrecio(COSTO_DESPACHO)} dentro de la Región Metropolitana. El retiro en tienda es gratis.`,
      'Al recibir tu pedido, revisa que esté en buen estado y guárdalo refrigerado.',
    ],
  },
  {
    titulo: 'Cambios y reclamos',
    parrafos: [
      'Por ser productos frescos, no aceptamos devoluciones una vez entregados. Si tu pedido llegó dañado o con un error, escríbenos dentro de las 24 horas siguientes desde Contacto.',
    ],
  },
  {
    titulo: 'Datos personales',
    parrafos: [
      'Usamos tus datos solo para gestionar tu cuenta, tus pedidos y tus descuentos. No los compartimos con terceros.',
    ],
  },
]

function Terminos() {
  return (
    <main className="tc container">
      <header className="tc-encabezado text-center">
        <span className="tc-eyebrow">Información legal</span>
        <h1 className="tc-titulo">Términos y Condiciones</h1>
        <p className="tc-actualizacion">Última actualización: octubre de 2026</p>
      </header>

      <ol className="tc-lista">
        {SECCIONES.map((seccion, i) => (
          <li key={seccion.titulo} className="tc-seccion">
            <h2 className="tc-titulo-seccion">
              <span className="tc-numero">{i + 1}</span> {seccion.titulo}
            </h2>
            {seccion.parrafos.map((texto) => (
              <p key={texto} className="tc-texto">{texto}</p>
            ))}
          </li>
        ))}
      </ol>

      <p className="tc-pie text-center">
        ¿Tienes dudas? Revisa las <Link to="/preguntas-frecuentes">Preguntas Frecuentes</Link> o
        escríbenos desde <Link to="/contacto">Contacto</Link>.
      </p>
    </main>
  )
}

export default Terminos

