import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RutaAdmin({ children }) {
  const { esAdmin, cargando } = useAuth()
  if (cargando) return <p className="text-center py-5">Cargando...</p>
  if (!esAdmin) return <Navigate to="/" replace />
  return children
}
export default RutaAdmin