import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useFormulario } from '../hooks/useFormulario'
import { validarContacto, MAX_MENSAJE } from '../utils/validaciones'
import { TIPOS_CONSULTA } from '../utils/constantes'
import { contactoService } from '../services/otrosService'
import '../css/contacto.css'

const INICIALES = { tipo: '', nombre: '', email: '', mensaje: '' }

function Contacto() {
  const { usuario } = useAuth()
  const { valores, errores, manejarCambio, manejarEnvio, reiniciar, establecer } =
    useFormulario(INICIALES, validarContacto)
  const [usarMisDatos, setUsarMisDatos] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [errorEnvio, setErrorEnvio] = useState('')

  const alCambiar = (e) => {
    setEnviado(false)
    setErrorEnvio('')
    manejarCambio(e)
  }

  // Marca y desmarca.
  const alternarMisDatos = (e) => {
    const usar = e.target.checked
    setUsarMisDatos(usar)
    establecer(
      usar
        ? { nombre: `${usuario.nombre} ${usuario.apellidos ?? ''}`.trim(), email: usuario.email }
        : { nombre: '', email: '' }
    )
  }

  const enviar = async (v) => {
    try {
      await contactoService.enviar({
        tipo: v.tipo,
        nombre: v.nombre.trim(),
        email: v.email.trim().toLowerCase(),
        mensaje: v.mensaje.trim(),
        usuarioId: usuario?.id ?? null,
      })
      reiniciar()
      setUsarMisDatos(false)
      setEnviado(true)
    } catch (error) {
      setErrorEnvio(error.message)
    }
  }

  // Clase del recuadro
  const clases = (campo, extra = '') =>
    `contacto-input ${extra} ${errores[campo] ? 'con-error' : ''}`

  return (
    <main className="pagina-contacto">
      <section className="contacto-card">
        <h1>Contáctanos</h1>
        <p className="contacto-intro">
          ¿Tienes dudas sobre un pedido o quieres una torta especial? Escríbenos y te responderemos pronto.
        </p>

        <form onSubmit={manejarEnvio(enviar)} noValidate>
        <div className="contacto-columnas">
            {/* IZQUIERDA: tipo de consulta + usar mis datos */}
            <aside className="contacto-lateral">
            <fieldset className="contacto-campo">
                <legend>Tipo de consulta</legend>
                <div className="contacto-tipos">
                {TIPOS_CONSULTA.map((t) => (
                    <label key={t} className={`chip-tipo ${valores.tipo === t ? 'activo' : ''}`}>
                    <input type="radio" name="tipo" value={t}
                        checked={valores.tipo === t} onChange={alCambiar} />
                    {t}
                    </label>
                ))}
                </div>
                <span className="error-mensaje">{errores.tipo}</span>
            </fieldset>

            {usuario && (
                <label className="contacto-mis-datos">
                <input type="checkbox" checked={usarMisDatos} onChange={alternarMisDatos} />
                Usar los datos de mi cuenta
                </label>
            )}
            </aside>

            {/* DERECHA: datos y mensaje */}
            <div className="contacto-principal">
            <div className="contacto-campo">
                <label htmlFor="nombre">Nombre</label>
                <div className={clases('nombre', usarMisDatos ? 'bloqueado' : '')}>
                <i className="bi bi-person"></i>
                <input id="nombre" name="nombre" placeholder="Tu nombre" readOnly={usarMisDatos}
                    value={valores.nombre} onChange={alCambiar} />
                </div>
                <span className="error-mensaje">{errores.nombre}</span>
            </div>

            <div className="contacto-campo">
                <label htmlFor="email">Correo electrónico</label>
                <div className={clases('email', usarMisDatos ? 'bloqueado' : '')}>
                <i className="bi bi-envelope"></i>
                <input id="email" name="email" type="email" placeholder="tucorreo@ejemplo.com"
                    readOnly={usarMisDatos} value={valores.email} onChange={alCambiar} />
                </div>
                <span className="error-mensaje">{errores.email}</span>
            </div>

            <div className="contacto-campo">
                <label htmlFor="mensaje">Mensaje</label>
                <div className={clases('mensaje', 'area')}>
                <i className="bi bi-chat-heart"></i>
                <textarea id="mensaje" name="mensaje" rows="5" placeholder="Cuéntanos en qué te podemos ayudar"
                    value={valores.mensaje} onChange={alCambiar} />
                </div>
                <div className="contacto-pie-campo">
                <span className="error-mensaje">{errores.mensaje}</span>
                <span className={`contador ${valores.mensaje.length > MAX_MENSAJE ? 'excedido' : ''}`}>
                    {valores.mensaje.length}/{MAX_MENSAJE}
                </span>
                </div>
            </div>

            {enviado && (
                <div className="alert alert-success text-center" role="status">
                ¡Gracias! Recibimos tu mensaje.
                </div>
            )}
            {errorEnvio && (
                <div className="alert alert-danger text-center" role="alert">{errorEnvio}</div>
            )}

            <button type="submit" className="btn-contacto">
                Enviar mensaje <i className="bi bi-send"></i>
            </button>
            </div>
        </div>
        </form>
      </section>
    </main>
  )
}

export default Contacto


