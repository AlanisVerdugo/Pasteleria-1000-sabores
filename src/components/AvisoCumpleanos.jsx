import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { esCumpleanos } from '../utils/descuentos'

// solo aparece el día del cumpleaños de un usuario Duoc (torta gratis)
function AvisoCumpleanos({ conLink = true }) {
  const { usuario } = useAuth()
  if (!usuario?.esDuoc || !esCumpleanos(usuario.fechaNacimiento)) return null

  return (
    <div className="aviso-cumpleanos" role="status">
      <i className="bi bi-gift-fill"></i>
      <span>
        ¡Feliz cumpleaños, {usuario.nombre}! Por ser estudiante Duoc, hoy tu primera torta es gratis.
        {conLink && <> <Link to="/categorias">Elige tu torta</Link></>}
      </span>
    </div>
  )
}

export default AvisoCumpleanos

