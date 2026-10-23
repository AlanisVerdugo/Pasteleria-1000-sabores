import { createContext, useContext, useEffect, useState } from 'react'
import { authService, usuariosService } from '../services'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  // Al abrir la app, revisa si había una sesión guardada
  useEffect(() => {
    authService.obtenerSesion().then(setUsuario).finally(() => setCargando(false))
  }, [])

  const login = async (email, password) => {
    const u = await authService.login(email, password)
    setUsuario(u)
    return u
  }
  const logout = async () => {
    await authService.logout()
    setUsuario(null)
  }
  const registrar = async (datos) => {
    const u = await authService.registrar(datos)
    setUsuario(u)
    return u
  }
  const actualizarPerfil = async (cambios) => {
    const u = await usuariosService.actualizar(usuario.id, cambios)
    setUsuario(u)
    return u
  }

  const valor = { usuario, cargando, esAdmin: usuario?.rol === 'admin', login, logout, registrar, actualizarPerfil }
  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const contexto = useContext(AuthContext)
  if (!contexto) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return contexto
}

