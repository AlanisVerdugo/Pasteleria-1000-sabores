import { describe, test, expect } from 'vitest'
import { detalleItem } from '../../utils/formato'

describe('detalleItem', () => {
  test('incluye personas y mensaje cuando existen', () => {
    const texto = detalleItem({ personas: 15, mensaje: 'Feliz cumple', cantidad: 2 }, 10000)
    expect(texto).toContain('Para 15 personas')
    expect(texto).toContain('Mensaje: "Feliz cumple"')
    expect(texto).toContain('2 unidad(es)')
  })
  test('sin personas ni mensaje muestra solo la cantidad', () => {
    expect(detalleItem({ cantidad: 1 }, 5000)).not.toContain('personas')
  })
})

