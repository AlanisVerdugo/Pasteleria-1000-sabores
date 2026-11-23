import { api, borrarTokens, guardarTokens, hayToken } from './api'

export const authService = {
  async login(email, password) {
    const { data } = await api.post('/auth/login', { email, password })
    guardarTokens(data)
    return data.usuario
  },
  async logout() {
    borrarTokens()
  },
  async registrar(datos) {
    const { data } = await api.post('/auth/registro', datos)
    guardarTokens(data)
    return data.usuario
  },
  async obtenerSesion() {
    if (!hayToken()) return null
    try {
      return (await api.get('/auth/me')).data
    } catch {
      borrarTokens()
      return null
    }
  },
  async actualizarPerfil(datos) {
    const cuerpo = {
      nombre: datos.nombre,
      apellidos: datos.apellidos,
      direccion: datos.direccion ?? '',
      comuna: datos.comuna ?? '',
      region: datos.region ?? '',
      telefono: datos.telefono ?? '',
      foto: datos.foto ?? null,
    }
    return (await api.put('/auth/perfil', cuerpo)).data
  },
}