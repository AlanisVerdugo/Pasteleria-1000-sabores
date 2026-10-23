import { ordenesRepo } from '../data/ordenes'
import { ESTADOS_ORDEN } from '../utils/constantes'

export const ordenesService = {
  async listar() { return ordenesRepo.listar() },
  async obtenerPorId(id) { return ordenesRepo.buscarPorId(Number(id)) },
  async listarPorUsuario(usuarioId) {
    return ordenesRepo.listar().filter((o) => o.usuarioId === usuarioId)
  },
  async crear(datos) {
    const orden = ordenesRepo.agregar({ ...datos, estado: 'preparacion', fecha: new Date().toISOString() })
    return ordenesRepo.actualizar(orden.id, { numero: 'B-' + String(orden.id).padStart(6, '0') })
  },
  async actualizar(id, cambios) { return ordenesRepo.actualizar(Number(id), cambios) },
  async eliminar(id) { return ordenesRepo.eliminar(Number(id)) },
  async cambiarEstado(id, estado) {
    if (!ESTADOS_ORDEN.includes(estado)) throw new Error('Estado no válido')
    return ordenesRepo.actualizar(Number(id), { estado })
  },
}