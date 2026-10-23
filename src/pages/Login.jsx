import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFormulario } from '../hooks/useFormulario'
import { validarLogin } from '../utils/validaciones'
import '../css/login.css'


function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { valores, errores, manejarCambio, manejarEnvio } = useFormulario(
    { email: '', password: '' },
    validarLogin
  )
  const [errorLogin, setErrorLogin] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [verPassword, setVerPassword] = useState(false)

  const alCambiar = (e) => {
    setErrorLogin('')
    manejarCambio(e)
  }
  const alEnviar = (e) => {
    setErrorLogin('')
    manejarEnvio(ingresar)(e)
  }

  const ingresar = async ({ email, password }) => {
    setErrorLogin('')
    setEnviando(true)
    try {
      const usuario = await login(email, password)
      navigate(usuario.rol === 'admin' ? '/admin' : '/') // D8: mismo login, distinto destino
    } catch (error) {
      setErrorLogin(error.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="login-page">
      <Link to="/" className="btn-back">
        <i className="fa-solid fa-arrow-left"></i> Regresar
      </Link>

      <div className="login-wrapper">
        <div className="top-badge badge-tradicion">
          <i className="fa-solid fa-cake-candles"></i> TRADICIÓN & SABOR CHILENO
        </div>

        <main className="login-card">
          <header className="card-header">
            <h1>Iniciar Sesión</h1>
            <p>Bienvenido nuevamente a <strong>Pastelería 1000 Sabores</strong>. Disfruta de la dulzura tradicional y tus beneficios exclusivos.</p>
          </header>

          <form onSubmit={alEnviar} noValidate>
            <div className="input-group">
              <div className="label-row">
                <label htmlFor="email">Correo Electrónico</label>
              </div>
              <div className="input-wrapper">
                <i className="fa-regular fa-envelope icon-left"></i>
                <input type="email" id="email" name="email" placeholder="freddy@ejemplo.com"
                  value={valores.email} onChange={alCambiar} />
              </div>
              <span className="error-mensaje">{errores.email}</span>
            </div>

            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-lock icon-left"></i>
                <input type={verPassword ? 'text' : 'password'} id="password" name="password" placeholder="••••••••"
                  value={valores.password} onChange={alCambiar} />
                <i className={`fa-regular ${verPassword ? 'fa-eye-slash' : 'fa-eye'} icon-right`}
                  style={{ cursor: 'pointer' }} onClick={() => setVerPassword(!verPassword)}
                  aria-label="Mostrar contraseña"></i>
              </div>
              <span className="error-mensaje">{errores.password}</span>
            </div>

            {errorLogin && (
                <div className="alert alert-danger py-2 text-center mb-3" role="alert">
                    <i className="fa-solid fa-circle-exclamation me-2"></i>{errorLogin}
                </div>
            )}

            <button type="submit" className="btn-primary" disabled={enviando}>
              {enviando ? 'Ingresando...' : 'Iniciar Sesión'} <i className="fa-solid fa-arrow-right"></i>
            </button>

            <div className="register-link">
              ¿Aún no tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
            </div>
          </form>
        </main>

        <div className="benefits-card">
          <div className="benefit-icon regalo-box">
            <i className="fa-solid fa-gift"></i>
          </div>
          <div className="benefit-content">
            <div className="benefit-header">
              <h3>Beneficios Activos</h3>
              <span className="badge-50 badge-anios">50 AÑOS</span>
            </div>
            <p>Recuerda: <strong>50% de descuento</strong> para mayores de 50 años y beneficios para la comunidad <strong>Duoc UC</strong> con tu correo @duocuc.cl.</p>
          </div>
        </div>

        <div className="footer-text">
          <i className="fa-solid fa-bread-slice"></i> RECETAS ARTESANALES DESDE 1974
        </div>
      </div>
    </div>
  )
}

export default Login


