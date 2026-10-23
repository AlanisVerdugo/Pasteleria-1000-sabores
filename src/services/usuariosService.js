import { usuariosRepo } from '../data/usuarios'

// Nunca devolvemos la contraseña hacia los componentes
export const sinPassword = (usuario) => {
  if (!usuario) return null
  const { password, ...resto } = usuario
  return resto
}

export const usuariosService = {
  async listar() { return usuariosRepo.listar().map(sinPassword) },
  async obtenerPorId(id) { return sinPassword(usuariosRepo.buscarPorId(Number(id))) },
  async obtenerPorEmail(email) {
    const u = usuariosRepo.listar().find((u) => u.email.toLowerCase() === email.toLowerCase())
    return sinPassword(u)
  },
  async crear(datos) {
    if (await usuariosService.obtenerPorEmail(datos.email)) throw new Error('El correo ya está registrado')
    return sinPassword(usuariosRepo.agregar(datos))
  },
  async actualizar(id, cambios) { return sinPassword(usuariosRepo.actualizar(Number(id), cambios)) },
  async eliminar(id) { return usuariosRepo.eliminar(Number(id)) },
}