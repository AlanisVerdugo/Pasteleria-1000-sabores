import { usuariosRepo } from '../data/usuarios'
import { usuariosService, sinPassword } from './usuariosService'

const CLAVE_SESION = 'pms_sesion'

export const authService = {
  async login(email, password) {
    const u = usuariosRepo.listar().find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!u) throw new Error('Credenciales inválidas')
    localStorage.setItem(CLAVE_SESION, JSON.stringify({ usuarioId: u.id }))
    return sinPassword(u)
  },
  async logout() {
    localStorage.removeItem(CLAVE_SESION)
  },
  async registrar(datos) {
    const usuario = await usuariosService.crear({
      ...datos, rol: 'cliente', fechaRegistro: new Date().toISOString().slice(0, 10),
    })
    localStorage.setItem(CLAVE_SESION, JSON.stringify({ usuarioId: usuario.id }))
    return usuario
  },
  async obtenerSesion() {
    const sesion = JSON.parse(localStorage.getItem(CLAVE_SESION))
    return sesion ? usuariosService.obtenerPorId(sesion.usuarioId) : null
  },
}