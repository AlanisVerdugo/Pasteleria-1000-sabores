import { productosService, ordenesService, authService, pagosService, categoriasService } from './index'
import { productosRepo } from '../data/productos'
import { ordenesRepo } from '../data/ordenes'
import { usuariosRepo } from '../data/usuarios'

beforeEach(() => {
  productosRepo.reiniciar()
  ordenesRepo.reiniciar()
  usuariosRepo.reiniciar()
})

describe('productosService', () => {
  test('busca combinando filtros', async () => {
    const r = await productosService.buscar({ texto: 'torta', forma: 'cuadrada' })
    expect(r.map((p) => p.codigo)).toEqual(['TC001', 'TC002'])
  })

  test('lista solo ofertas', async () => {
    const r = await productosService.listarOfertas()
    expect(r.every((p) => p.oferta > 0)).toBe(true)
  })

  test('descuenta stock y rechaza si no alcanza', async () => {
    await productosService.descontarStock([{ codigo: 'TC001', cantidad: 2, nombre: 'x' }])
    expect((await productosService.obtenerPorId('TC001')).stock).toBe(8)
    await expect(
      productosService.descontarStock([{ codigo: 'PT002', cantidad: 1, nombre: 'Tarta' }])
    ).rejects.toThrow('No hay stock suficiente')
  })
})

describe('categoriasService', () => {
  test('no elimina una categoría con productos', async () => {
    await expect(categoriasService.eliminar(1)).rejects.toThrow('hay productos')
  })
})

describe('ordenesService', () => {
  test('crea la orden con número y estado inicial', async () => {
    const o = await ordenesService.crear({ usuarioId: 2, items: [], total: 1000 })
    expect(o).toMatchObject({ numero: 'B-000001', estado: 'preparacion' })
  })

  test('rechaza un estado inválido', async () => {
    const o = await ordenesService.crear({ items: [] })
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
    const u = await authService.registrar({ nombre: 'Lu', email: 'lu@duocuc.cl', password: '1234' })
    expect(u).toMatchObject({ esDuoc: true, tipoUsuario: 'duoc', rol: 'cliente' })
    await expect(authService.registrar({ email: 'lu@duocuc.cl' })).rejects.toThrow('ya está registrado')
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


