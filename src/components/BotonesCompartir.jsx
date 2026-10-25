import { useState } from 'react'
import '../css/compartir.css'

function BotonesCompartir({ titulo, url = window.location.href }) {
  const [copiado, setCopiado] = useState(false)

  const texto = encodeURIComponent(titulo)
  const enlace = encodeURIComponent(url)

  const redes = [
    { nombre: 'Facebook', icono: 'bi-facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enlace}` },
    { nombre: 'X', icono: 'bi-twitter-x', href: `https://twitter.com/intent/tweet?text=${texto}&url=${enlace}` },
    { nombre: 'WhatsApp', icono: 'bi-whatsapp', href: `https://wa.me/?text=${texto}%20${enlace}` },
  ]

  async function copiarEnlace() {
    try {
      await navigator.clipboard.writeText(url)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      setCopiado(false)
    }
  }

  return (
    <div className="compartir">
      <span className="compartir-titulo">Compartir:</span>

      {redes.map((r) => (
        <a
          key={r.nombre}
          href={r.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-compartir"
          aria-label={`Compartir en ${r.nombre}`}
        >
          <i className={`bi ${r.icono}`}></i>
        </a>
      ))}

      <button type="button" className="btn-compartir" onClick={copiarEnlace} aria-label="Copiar enlace">
        <i className={`bi ${copiado ? 'bi-check-lg' : 'bi-link-45deg'}`}></i>
      </button>

      {copiado && <span className="compartir-aviso" role="status">¡Enlace copiado!</span>}
    </div>
  )
}

export default BotonesCompartir