import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useFormulario } from '../hooks/useFormulario'
import { validarPerfil } from '../utils/validaciones'
import '../css/perfil.css'
import { calcularDescuento } from '../utils/descuentos'

function Perfil() {
  const { usuario, actualizarPerfil } = useAuth()
  const [mensaje, setMensaje] = useState('')

  const { valores, errores, manejarCambio, manejarEnvio } = useFormulario(
    {
      nombre: usuario.nombre ?? '',
      apellidos: usuario.apellidos ?? '',
      direccion: usuario.direccion ?? '',
      comuna: usuario.comuna ?? '',
      telefono: usuario.telefono ?? '',
    },
    validarPerfil
  )

  const alCambiar = (e) => {
    setMensaje('')
    manejarCambio(e)
  }

  const guardar = async (v) => {
    await actualizarPerfil({
      nombre: v.nombre.trim(),
      apellidos: v.apellidos.trim(),
      direccion: v.direccion.trim(),
      comuna: v.comuna.trim(),
      telefono: v.telefono.trim(),
    })
    setMensaje('Tus datos se guardaron correctamente')
  }

  const campo = (id, label, tipo = 'text') => (
    <div className="col-md-6">
      <label htmlFor={id} className="form-label">{label}</label>
      <input
        id={id} name={id} type={tipo}
        className={`form-control ${errores[id] ? 'is-invalid' : ''}`}
        value={valores[id]} onChange={alCambiar}
      />
      <div className="invalid-feedback">{errores[id]}</div>
    </div>
  )

    const descuento = calcularDescuento(usuario, usuario.codigoDescuento)
  return (
    <main className="pagina-perfil">
      <div className="perfil-cabecera">
        <h1>Mi perfil</h1>
        <p>Mantén tus datos al día para que tus pedidos lleguen sin problemas.</p>
      </div>

      <div className="perfil-card">
        <aside className="perfil-lateral">
          <div className="perfil-avatar" aria-hidden="true">
            {usuario.nombre?.charAt(0).toUpperCase()}
          </div>
          <h2>{usuario.nombre} {usuario.apellidos}</h2>
          <p className="perfil-email">{usuario.email}</p>
          {usuario.esDuoc && <span className="perfil-chip">Duoc UC</span>}

          <div className="perfil-beneficios">
            <h3>Tus beneficios</h3>
            {descuento.porcentaje > 0 && (
              <p><i className="fa-solid fa-percent"></i> {descuento.porcentaje}% de descuento</p>
            )}
            {usuario.esDuoc && (
              <p><i className="fa-solid fa-cake-candles"></i> Torta gratis en tu cumpleaños</p>
            )}
            {descuento.porcentaje === 0 && !usuario.esDuoc && (
              <p className="perfil-sin">Por ahora no tienes beneficios activos.</p>
            )}
          </div>
        </aside>

        <form onSubmit={manejarEnvio(guardar)} noValidate className="perfil-form">
          <h2>Datos personales y despacho</h2>
          <div className="row g-3">
            {campo('nombre', 'Nombre')}
            {campo('apellidos', 'Apellidos')}
            {campo('direccion', 'Dirección (opcional)')}
            {campo('comuna', 'Comuna (opcional)')}
            {campo('telefono', 'Teléfono (opcional)', 'tel')}
          </div>

          {mensaje && <div className="alert alert-success mt-3 mb-0" role="status">{mensaje}</div>}

          <button type="submit" className="perfil-btn">
            Guardar cambios <i className="fa-solid fa-check"></i>
          </button>
        </form>
      </div>
    </main>
  )
}

export default Perfil