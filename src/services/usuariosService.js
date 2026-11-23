import { api, nuloSiNoExiste } from './api'

export const usuariosService = {
  async listar() {
    return (await api.get('/usuarios')).data
  },
  async obtenerPorId(id) {
    return api.get(`/usuarios/${id}`).then((r) => r.data).catch(nuloSiNoExiste)
  },
  async crear(datos) {
    return (await api.post('/usuarios', datos)).data
  },
  async actualizar(id, cambios) {
    return (await api.put(`/usuarios/${id}`, cambios)).data
  },
  async eliminar(id) {
    await api.delete(`/usuarios/${id}`)
  },
}