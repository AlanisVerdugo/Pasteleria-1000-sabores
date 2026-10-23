import { PRODUCTOS } from './semillas/productos'
import { CATEGORIAS } from './semillas/categorias'
import { productosRepo } from './productos'

describe('semillas', () => {
  test('hay 16 productos y 8 categorías', () => {
    expect(PRODUCTOS).toHaveLength(16)
    expect(CATEGORIAS).toHaveLength(8)
  })

  test('los códigos no se repiten', () => {
    const codigos = PRODUCTOS.map((p) => p.codigo)
    expect(new Set(codigos).size).toBe(codigos.length)
  })

  test('cada producto tiene los campos y una categoría válida', () => {
    const ids = CATEGORIAS.map((c) => c.id)
    PRODUCTOS.forEach((p) => {
      expect(p).toMatchObject({ codigo: expect.any(String), nombre: expect.any(String), precio: expect.any(Number) })
      expect(ids).toContain(p.categoriaId)
    })
  })

  test('el repositorio de productos lista los críticos', () => {
    expect(productosRepo.listarCriticos().every((p) => p.stock < 5)).toBe(true)
  })
})