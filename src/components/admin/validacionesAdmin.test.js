import { validarProducto, validarCategoria, validarUsuario } from './validacionesAdmin'

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

describe('validarCategoria', () => {
  test('nombre obligatorio y con largo máximo', () => {
    expect(validarCategoria({ nombre: '', descripcion: '' })).toEqual({ nombre: 'Ingresa el nombre' })
    expect(validarCategoria({ nombre: 'x'.repeat(51) }).nombre).toBe('Máximo 50 caracteres')
    expect(validarCategoria({ nombre: 'Kuchenes', descripcion: 'x'.repeat(201) }).descripcion).toBe('Máximo 200 caracteres')
    expect(validarCategoria({ nombre: 'Kuchenes', descripcion: 'Del sur' })).toEqual({})
  })
})

describe('validarUsuario', () => {
  const OK = { run: '123456785', nombre: 'Ana', apellidos: 'Soto', email: 'ana@gmail.com', fechaNacimiento: '1990-01-01', password: '1234', telefono: '', rol: 'cliente' }
  test('un usuario correcto no tiene errores', () => {
    expect(validarUsuario(OK)).toEqual({})
  })
  test('RUN con dígito verificador malo, correo malo y teléfono malo', () => {
    const errores = validarUsuario({ ...OK, run: '123456789', email: 'ana@', telefono: '12' })
    expect(errores).toEqual({ run: 'El RUN no es válido', email: 'El correo no es válido', telefono: 'Teléfono no válido' })
  })
  test('la contraseña es obligatoria al crear pero opcional al editar', () => {
    expect(validarUsuario({ ...OK, password: '' }).password).toBe('Ingresa una contraseña')
    expect(validarUsuario({ ...OK, password: '' }, true).password).toBeUndefined()
    expect(validarUsuario({ ...OK, password: '12' }, true).password).toBe('Debe tener entre 4 y 10 caracteres')
  })
  test('campos vacíos, fecha futura y rol inválido', () => {
    const errores = validarUsuario({ run: '', nombre: '', apellidos: '', email: '', fechaNacimiento: '2999-01-01', password: '1234', rol: 'jefe' })
    expect(Object.keys(errores)).toEqual(['run', 'nombre', 'apellidos', 'email', 'fechaNacimiento', 'rol'])
    expect(errores.fechaNacimiento).toBe('La fecha no puede ser futura')
    expect(validarUsuario({ ...OK, fechaNacimiento: '' }).fechaNacimiento).toBe('Ingresa la fecha de nacimiento')
  })
})
