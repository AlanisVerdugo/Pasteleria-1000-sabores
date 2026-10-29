import { validarProducto } from './validacionesAdmin'

const PRODUCTO_OK = { codigo: 'TC003', nombre: 'Torta de Lúcuma', categoriaId: '1', precio: '42000', stock: '5', oferta: '0', descripcion: '' }

describe('validarProducto', () => {
  test('un producto correcto no tiene errores', () => {
    expect(validarProducto(PRODUCTO_OK)).toEqual({})
  })
  test.each(['tc001', 'T001', 'TCAB01', 'TC01', 'TC0001'])('el código %s no es válido', (codigo) => {
    expect(validarProducto({ ...PRODUCTO_OK, codigo }).codigo).toMatch(/Formato/)
  })
  test('precio 0, decimal o negativo no sirven', () => {
    expect(validarProducto({ ...PRODUCTO_OK, precio: '0' }).precio).toBeDefined()
    expect(validarProducto({ ...PRODUCTO_OK, precio: '10.5' }).precio).toBeDefined()
    expect(validarProducto({ ...PRODUCTO_OK, precio: '-100' }).precio).toBeDefined()
  })
  test('stock 0 sí sirve, pero negativo no', () => {
    expect(validarProducto({ ...PRODUCTO_OK, stock: '0' }).stock).toBeUndefined()
    expect(validarProducto({ ...PRODUCTO_OK, stock: '-1' }).stock).toBeDefined()
  })
  test('campos vacíos', () => {
    const errores = validarProducto({ codigo: '', nombre: '', categoriaId: '', precio: '', stock: '', oferta: '' })
    expect(Object.keys(errores)).toEqual(['codigo', 'nombre', 'categoriaId', 'precio', 'stock', 'oferta'])
  })
  test('oferta mayor a 90 y descripción muy larga', () => {
    const errores = validarProducto({ ...PRODUCTO_OK, oferta: '95', descripcion: 'x'.repeat(501), nombre: 'y'.repeat(101) })
    expect(errores.oferta).toBeDefined()
    expect(errores.descripcion).toBe('Máximo 500 caracteres')
    expect(errores.nombre).toBe('Máximo 100 caracteres')
  })
})
