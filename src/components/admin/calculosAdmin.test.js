import {
  esDelMes, sumarTotales, ventasDelMes, ultimasOrdenes, nombreCliente,
  ticketPromedio, ordenesPorEstado, ventasPorCategoria, topProductos,
} from './calculosAdmin'

const ORDENES = [
  { id: 1, fecha: '2026-09-30T10:00:00.000Z', total: 10000 },
  { id: 2, fecha: '2026-10-05T10:00:00.000Z', total: 20000 },
  { id: 3, fecha: '2026-10-20T10:00:00.000Z', total: 5000 },
]
const HOY = new Date('2026-10-25T12:00:00')

describe('calculosAdmin', () => {
  test('esDelMes compara mes y año', () => {
    expect(esDelMes('2026-10-05T10:00:00.000Z', HOY)).toBe(true)
    expect(esDelMes('2025-10-05T10:00:00.000Z', HOY)).toBe(false)
  })
  test('sumarTotales suma todo (y tolera órdenes sin total)', () => {
    expect(sumarTotales([...ORDENES, { id: 4 }])).toBe(35000)
    expect(sumarTotales([])).toBe(0)
  })
  test('ventasDelMes solo cuenta las del mes', () => {
    expect(ventasDelMes(ORDENES, HOY)).toBe(25000)
  })
  test('ultimasOrdenes ordena de la más nueva a la más vieja y corta', () => {
    expect(ultimasOrdenes(ORDENES, 2).map((o) => o.id)).toEqual([3, 2])
    expect(ORDENES[0].id).toBe(1) // no cambia el original
  })
  test('nombreCliente usa el cliente de la orden, si no el usuario, si no "Invitado"', () => {
    const usuarios = [{ id: 4, nombre: 'Camila', apellidos: 'Pérez Soto' }]
    expect(nombreCliente({ cliente: { nombre: 'Rosa' }, usuarioId: 4 }, usuarios)).toBe('Rosa')
    expect(nombreCliente({ usuarioId: 4 }, usuarios)).toBe('Camila Pérez Soto')
    expect(nombreCliente({ usuarioId: null }, usuarios)).toBe('Invitado')
  })
})

describe('calculos de reportes', () => {
  const PRODUCTOS = [
    { codigo: 'TC001', nombre: 'Torta Chocolate', categoriaId: 1 },
    { codigo: 'PT001', nombre: 'Empanada', categoriaId: 5 },
  ]
  const CATEGORIAS = [{ id: 1, nombre: 'Tortas Cuadradas' }, { id: 5, nombre: 'Pastelería Tradicional' }]
  const VENTAS = [
    { estado: 'entregado', total: 51000, items: [
      { codigo: 'TC001', nombre: 'Torta Chocolate', cantidad: 1, precio: 45000 },
      { nombre: 'Empanada', cantidad: 2, precio: 3000 }, // semilla: sin código, se busca por nombre
    ] },
    { estado: 'preparacion', total: 9000, items: [
      { nombre: 'Empanada', cantidad: 3, precio: 3000 },
      { nombre: 'Producto borrado', cantidad: 1, precio: 0 },
    ] },
  ]

  test('ticketPromedio', () => {
    expect(ticketPromedio(VENTAS)).toBe(30000)
    expect(ticketPromedio([])).toBe(0)
  })
  test('ordenesPorEstado cuenta cada estado, también los que tienen 0', () => {
    expect(ordenesPorEstado(VENTAS, ['preparacion', 'en_camino', 'entregado']))
      .toEqual({ preparacion: 1, en_camino: 0, entregado: 1 })
  })
  test('ventasPorCategoria suma por categoría de mayor a menor', () => {
    expect(ventasPorCategoria(VENTAS, PRODUCTOS, CATEGORIAS)).toEqual([
      { nombre: 'Tortas Cuadradas', total: 45000 },
      { nombre: 'Pastelería Tradicional', total: 15000 },
      { nombre: 'Sin categoría', total: 0 },
    ])
  })
  test('topProductos ordena por unidades vendidas', () => {
    const top = topProductos(VENTAS, 2)
    expect(top).toEqual([
      { nombre: 'Empanada', cantidad: 5, total: 15000 },
      { nombre: 'Torta Chocolate', cantidad: 1, total: 45000 },
    ])
  })
})
