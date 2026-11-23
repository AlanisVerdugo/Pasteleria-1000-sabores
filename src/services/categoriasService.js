import { api, nuloSiNoExiste } from './api'

export const categoriasService = {
  async listar() {
    return (await api.get('/categorias')).data
  },
  async obtenerPorId(id) {
    return api.get(`/categorias/${id}`).then((r) => r.data).catch(nuloSiNoExiste)
  },
  async crear(categoria) {
    return (await api.post('/categorias', categoria)).data
  },
  async actualizar(id, cambios) {
    return (await api.put(`/categorias/${id}`, cambios)).data
  },
  async eliminar(id) {
    await api.delete(`/categorias/${id}`)
  },
}