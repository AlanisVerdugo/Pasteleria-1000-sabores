import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RutaProtegida({ children }) {
  const { usuario, cargando } = useAuth()
  if (cargando) return <p className="text-center py-5">Cargando...</p>
  if (!usuario) return <Navigate to="/login" replace />
  return children
}
export default RutaProtegida