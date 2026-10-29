import { esDelMes, sumarTotales, ventasDelMes, ultimasOrdenes, nombreCliente } from './calculosAdmin'

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
