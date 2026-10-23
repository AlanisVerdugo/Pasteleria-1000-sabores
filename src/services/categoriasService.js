import { categoriasRepo } from '../data/categorias'
import { productosRepo } from '../data/productos'

export const categoriasService = {
  async listar() { return categoriasRepo.listar() },
  async obtenerPorId(id) { return categoriasRepo.buscarPorId(Number(id)) },
  async crear(categoria) { return categoriasRepo.agregar(categoria) },
  async actualizar(id, cambios) { return categoriasRepo.actualizar(Number(id), cambios) },
  async eliminar(id) {
    const enUso = productosRepo.listar().some((p) => p.categoriaId === Number(id))
    if (enUso) throw new Error('No se puede eliminar: hay productos en esta categoría')
    return categoriasRepo.eliminar(Number(id))
  },
}