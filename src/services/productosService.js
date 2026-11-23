import { api, nuloSiNoExiste } from './api'

export const productosService = {
  async listar() {
    return (await api.get('/productos')).data
  },
  async listarTodos() {
    return (await api.get('/productos/todos')).data
  },
  async obtenerPorId(codigo) {
    return api.get(`/productos/${codigo}`).then((r) => r.data).catch(nuloSiNoExiste)
  },
  async crear(producto) {
    return (await api.post('/productos', producto)).data
  },
  async actualizar(codigo, cambios) {
    return (await api.put(`/productos/${codigo}`, cambios)).data
  },
  async eliminar(codigo) {
    await api.delete(`/productos/${codigo}`)
  },
  async listarPorCategoria(categoriaId) {
    return (await api.get('/productos', { params: { categoriaId } })).data
  },
  async buscar(params = {}) {
    return (await api.get('/productos', { params })).data
  },
  async listarDestacados() {
    return (await api.get('/productos/destacados')).data
  },
  async listarOfertas() {
    return (await api.get('/productos/ofertas')).data
  },
  async listarCriticos() {
    return (await api.get('/productos/criticos')).data
  },
}