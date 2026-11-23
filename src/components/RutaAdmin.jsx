import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RutaAdmin({ children, roles = ['admin'] }) {
  const { usuario, cargando } = useAuth()
  if (cargando) return <p className="text-center py-5">Cargando...</p>
  if (!usuario || !roles.includes(usuario.rol)) return <Navigate to="/" replace />
  return children
}
export default RutaAdmin