import { createContext, useContext, useEffect, useState } from 'react'
import { EVENTO_SESION_EXPIRADA } from '../services/api'
import { authService } from '../services'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  // Al abrir la app, valida el token con GET /auth/me (el interceptor renueva si venció)
  useEffect(() => {
    authService.obtenerSesion().then(setUsuario).finally(() => setCargando(false))
  }, [])

  useEffect(() => {
    const cerrar = () => setUsuario(null)
    window.addEventListener(EVENTO_SESION_EXPIRADA, cerrar)
    return () => window.removeEventListener(EVENTO_SESION_EXPIRADA, cerrar)
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
    const u = await authService.actualizarPerfil({ ...usuario, ...cambios })
    setUsuario(u)
    return u
  }

  const esAdmin = usuario?.rol === 'admin'
  const esVendedor = usuario?.rol === 'vendedor'
  const esPersonal = esAdmin || esVendedor

  const valor = {
    usuario,
    cargando,
    esAdmin,
    esVendedor,
    esPersonal,
    login,
    logout,
    registrar,
    actualizarPerfil,
  }
  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const contexto = useContext(AuthContext)
  if (!contexto) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return contexto
}

