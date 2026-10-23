import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFormulario } from '../hooks/useFormulario'
import { validarRegistro } from '../utils/validaciones'
import { calcularDescuento, esCorreoDuoc } from '../utils/descuentos'
import { CODIGO_FELICES } from '../utils/constantes'
import Beneficio from '../components/Beneficio'
import '../css/registro.css'

const INICIALES = {
  run: '', nombre: '', apellidos: '', email: '', fechaNacimiento: '',
  password: '', confirmar: '', codigo: '', terminos: false,
}


function Campo({ id, label, icono, error, ...props }) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrapper">
        <i className={icono}></i>
        <input id={id} name={id} {...props} />
      </div>
      <span className="error-mensaje">{error}</span>
    </div>
  )
}

function Registro() {
  const { registrar } = useAuth()
  const navigate = useNavigate()
  const { valores, errores, manejarCambio, manejarEnvio } = useFormulario(INICIALES, validarRegistro)
  const [errorRegistro, setErrorRegistro] = useState('')

  // Vista previa en vivo de los beneficios 
  const codigo = valores.codigo.trim().toUpperCase()
  const descuento = valores.fechaNacimiento
    ? calcularDescuento({ fechaNacimiento: valores.fechaNacimiento }, codigo)
    : calcularDescuento({}, codigo)
  const esDuoc = esCorreoDuoc(valores.email)

  const misBeneficios = []
  if (descuento.porcentaje > 0) {
    misBeneficios.push({ icono: 'fa-solid fa-percent', texto: `${descuento.porcentaje}% de descuento (${descuento.motivo})` })
  }

  if (esDuoc) {
    misBeneficios.push({ icono: 'fa-solid fa-cake-candles', texto: 'Torta gratis A ELECCIÓN en tu cumpleaños (Duoc)' })
  }

  const alCambiar = (e) => {
    setErrorRegistro('')
    manejarCambio(e)
  }

  const crearCuenta = async (v) => {
    try {
      await registrar({
        run: v.run.replace(/[.\-\s]/g, '').toUpperCase(),
        nombre: v.nombre.trim(),
        apellidos: v.apellidos.trim(),
        email: v.email.trim().toLowerCase(),
        fechaNacimiento: v.fechaNacimiento,
        password: v.password,
        codigoDescuento: codigo === CODIGO_FELICES ? CODIGO_FELICES : null,
      })
      navigate('/')
    } catch (error) {
      setErrorRegistro(error.message) 
    }
  }

  return (
    <div className="pagina-registro">
      <Link to="/" className="btn-back">
        <i className="fa-solid fa-arrow-left"></i> Regresar
      </Link>

      <i className="fa-solid fa-bread-slice bg-decor bg-top-left"></i>
      <i className="fa-solid fa-cake-candles bg-decor bg-bottom-right"></i>

      <div className="header-container">
        <h1>Únete a la familia</h1>
        <p>Crea tu cuenta para acceder a beneficios exclusivos, celebrar nuestra historia y disfrutar de los mejores sabores artesanales.</p>
      </div>

      <main className="card">
        <section className="benefits-panel">
          <h2>Beneficios Exclusivos</h2>
          <Beneficio icono="fa-solid fa-heart" titulo="50 Años de Tradición">
            Mayores de 50 años: 50% de descuento automático en tus compras.
          </Beneficio>
          <Beneficio icono="fa-solid fa-tag" titulo="Código Especial">
            Usa el código <span className="highlight-text">FELICES50</span> para un 10% de descuento de por vida.
          </Beneficio>
          <Beneficio icono="fa-solid fa-graduation-cap" titulo="Comunidad Duoc UC">
            Regístrate con tu correo @duocuc.cl y recibe una torta gratis en tu cumpleaños.
          </Beneficio>

          <div className="mis-beneficios" data-testid="mis-beneficios">
            <h3>Tus beneficios</h3>
            {misBeneficios.length === 0 ? (
              <p className="sin-beneficios">Completa tus datos para ver qué beneficios obtienes.</p>
            ) : (
              <ul>
                {misBeneficios.map((b) => (
                  <li key={b.texto}>
                    <i className={b.icono}></i> {b.texto}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="form-panel">
          <form onSubmit={manejarEnvio(crearCuenta)} noValidate>
            <div className="form-grid">
              <Campo id="run" label="RUN" icono="fa-regular fa-id-card" placeholder="12345678-5"
                value={valores.run} onChange={alCambiar} error={errores.run} />
              <Campo id="nombre" label="Nombre" icono="fa-regular fa-user" placeholder="Freddy"
                value={valores.nombre} onChange={alCambiar} error={errores.nombre} />
              <Campo id="apellidos" label="Apellidos" icono="fa-regular fa-user" placeholder="Campos Soto"
                value={valores.apellidos} onChange={alCambiar} error={errores.apellidos} />
              <Campo id="email" label="Correo Electrónico" icono="fa-regular fa-envelope" type="email"
                placeholder="freddy@ejemplo.com" value={valores.email} onChange={alCambiar} error={errores.email} />
              <Campo id="fechaNacimiento" label="Fecha de Nacimiento" icono="fa-regular fa-calendar" type="date"
                value={valores.fechaNacimiento} onChange={alCambiar} error={errores.fechaNacimiento} />
              <Campo id="codigo" label="Código de Descuento (Opcional)" icono="fa-solid fa-tag"
                placeholder="EJ: FELICES50" value={valores.codigo} onChange={alCambiar} error={errores.codigo} />
              <Campo id="password" label="Contraseña" icono="fa-solid fa-lock" type="password"
                placeholder="••••••••" value={valores.password} onChange={alCambiar} error={errores.password} />
              <Campo id="confirmar" label="Confirmar Contraseña" icono="fa-solid fa-lock" type="password"
                placeholder="••••••••" value={valores.confirmar} onChange={alCambiar} error={errores.confirmar} />
            </div>

            <div className="checkbox-group">
              <input type="checkbox" id="terminos" name="terminos"
                checked={valores.terminos} onChange={alCambiar} />
              <label htmlFor="terminos">Acepto los Términos y Condiciones y la Política de Privacidad.</label>
            </div>
            <span className="error-mensaje">{errores.terminos}</span>

            {errorRegistro && (
              <div className="alert alert-danger py-2 text-center my-3" role="alert">{errorRegistro}</div>
            )}

            <button type="submit" className="btn-submit">
              Registrarse <i className="fa-solid fa-arrow-right"></i>
            </button>

            <div className="login-link">
              ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}

export default Registro




