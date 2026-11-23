import { api, nuloSiNoExiste } from './api'

export const ordenesService = {
  async listar() {
    return (await api.get('/boletas')).data
  },
  async obtenerPorId(id) {
    return api.get(`/boletas/${id}`).then((r) => r.data).catch(nuloSiNoExiste)
  },
  async listarPorUsuario(usuarioId) {
    return (await api.get(`/boletas/usuario/${usuarioId}`)).data
  },
  async listarMias() {
    return (await api.get('/boletas/mis-boletas')).data
  },
  async crear(datos) {
    return (await api.post('/boletas', datos)).data
  },
  async cambiarEstado(id, estado) {
    return (await api.patch(`/boletas/${id}/estado`, { estado })).data
  },
}