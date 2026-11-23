import { productosService, ordenesService, authService, pagosService, categoriasService } from '../../services/index'

describe('productosService', () => {
  test('sin filtros lista los 16 productos activos', async () => {
    const r = await productosService.buscar({ texto: '', categoriaId: undefined, forma: undefined, personas: undefined })
    expect(r).toHaveLength(16)
  })

  test('busca combinando filtros', async () => {
    const r = await productosService.buscar({ texto: 'torta', forma: 'cuadrada' })
    expect(r.map((p) => p.codigo)).toEqual(['TC001', 'TC002'])
  })

  test('lista solo ofertas, de mayor a menor descuento', async () => {
    const r = await productosService.listarOfertas()
    expect(r.every((p) => p.oferta > 0)).toBe(true)
    for (let i = 1; i < r.length; i++) {
      expect(r[i - 1].oferta).toBeGreaterThanOrEqual(r[i].oferta)
    }
  })

  test('comprar descuenta stock y rechaza si no alcanza', async () => {
    await authService.login('rosa@gmail.com', '1234')
    const stockAntes = (await productosService.obtenerPorId('TC001')).stock
    await ordenesService.crear({
      items: [{ codigo: 'TC001', cantidad: 2 }],
      despacho: { nombre: 'Rosa', calle: 'Calle 1', comuna: 'Santiago' },
    })
    expect((await productosService.obtenerPorId('TC001')).stock).toBe(stockAntes - 2)
    await expect(
      ordenesService.crear({
        items: [{ codigo: 'PT002', cantidad: 1 }],
        despacho: { nombre: 'Rosa', calle: 'Calle 1', comuna: 'Santiago' },
      }),
    ).rejects.toThrow('No hay stock suficiente')
  })
})

describe('categoriasService', () => {
  test('no elimina una categoría con productos', async () => {
    await authService.login('admin@duoc.cl', 'admin123')
    await expect(categoriasService.eliminar(1)).rejects.toThrow('hay productos')
  })
})

describe('ordenesService', () => {
  test('crea la orden con número y estado inicial', async () => {
    await authService.login('rosa@gmail.com', '1234')
    const o = await ordenesService.crear({
      items: [],
      despacho: { nombre: 'Rosa', calle: 'Calle', comuna: 'Santiago' },
    })
    expect(o).toMatchObject({ numero: 'B-000003', estado: 'preparacion' })
  })

  test('rechaza un estado inválido', async () => {
    await authService.login('admin@duoc.cl', 'admin123')
    const o = await ordenesService.crear({
      items: [],
      despacho: { nombre: 'Admin', calle: 'Calle', comuna: 'Santiago' },
    })
    await expect(ordenesService.cambiarEstado(o.id, 'perdido')).rejects.toThrow('Estado no válido')
  })
})

describe('authService', () => {
  test('login correcto no devuelve la contraseña', async () => {
    const u = await authService.login('admin@duoc.cl', 'admin123')
    expect(u.rol).toBe('admin')
    expect(u.password).toBeUndefined()
    expect((await authService.obtenerSesion()).id).toBe(u.id)
  })

  test('login incorrecto rechaza', async () => {
    await expect(authService.login('admin@duoc.cl', 'mala')).rejects.toThrow('Credenciales inválidas')
  })

  test('registra detectando si es Duoc y no permite correos repetidos', async () => {
    const u = await authService.registrar({
      nombre: 'Lu',
      email: 'lu@duocuc.cl',
      password: '1234',
    })
    expect(u).toMatchObject({ esDuoc: true, tipoUsuario: 'duoc', rol: 'cliente' })
    await expect(authService.registrar({ nombre: 'Otro', email: 'lu@duocuc.cl', password: '1234' })).rejects.toThrow(
      'ya está registrado',
    )
  })

  test('logout borra la sesión', async () => {
    await authService.login('admin@duoc.cl', 'admin123')
    await authService.logout()
    expect(await authService.obtenerSesion()).toBeNull()
  })
})

describe('pagosService', () => {
  test('aprueba o rechaza según el botón', async () => {
    await expect(pagosService.procesarPago({ total: 1000 }, 0)).resolves.toMatchObject({ aprobado: true })
    await expect(pagosService.procesarPago({ total: 1000, simularFallo: true }, 0)).rejects.toThrow('rechazado')
  })
})

describe('productosService.listarDestacados', () => {
  test('devuelve solo los productos destacados', async () => {
    const destacados = await productosService.listarDestacados()
    expect(destacados).toHaveLength(4)
    expect(destacados.every((p) => p.destacado)).toBe(true)
  })
})