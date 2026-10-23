import { productosRepo } from '../data/productos'

export const productosService = {
  async listar() {
    return productosRepo.listar().filter((p) => p.activo)
  },
  async listarTodos() {
    return productosRepo.listar()
  },
  async obtenerPorId(codigo) {
    return productosRepo.buscarPorId(codigo)
  },
  async crear(producto) {
    return productosRepo.agregar(producto)
  },
  async actualizar(codigo, cambios) {
    return productosRepo.actualizar(codigo, cambios)
  },
  async eliminar(codigo) {
    return productosRepo.eliminar(codigo)
  },
  async listarPorCategoria(categoriaId) {
    const productos = await productosService.listar()
    return productos.filter((p) => p.categoriaId === Number(categoriaId))
  },
  async buscar({ texto = '', categoriaId, forma, personas, precioMin, precioMax } = {}) {
    const productos = await productosService.listar()
    return productos.filter((p) =>
      p.nombre.toLowerCase().includes(texto.toLowerCase()) &&
      (!categoriaId || p.categoriaId === Number(categoriaId)) &&
      (!forma || p.forma === forma) &&
      (!personas || p.tamanos.some((t) => t.personas >= Number(personas))) &&
      (!precioMin || p.precio >= Number(precioMin)) &&
      (!precioMax || p.precio <= Number(precioMax))
    )
  },
  async listarOfertas() {
    const productos = await productosService.listar()
    return productos.filter((p) => p.oferta > 0)
  },
  async listarCriticos() {
    return productosRepo.listarCriticos()
  },
  async descontarStock(items) {
    // Primero revisa TODO; si algo no alcanza, no descuenta nada
    items.forEach((item) => {
      const p = productosRepo.buscarPorId(item.codigo)
      if (!p || p.stock < item.cantidad) throw new Error(`No hay stock suficiente de ${item.nombre}`)
    })
    items.forEach((item) => {
      const p = productosRepo.buscarPorId(item.codigo)
      productosRepo.actualizar(item.codigo, { stock: p.stock - item.cantidad })
    })
    return true
  },
}