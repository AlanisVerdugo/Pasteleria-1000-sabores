import { calcularEdad, esCorreoDuoc, esCumpleanos, precioConOferta, calcularDescuento, calcularTotales, diasParaCumpleanos, tortaCanjeadaEsteAnio } from './descuentos'
import { formatearPrecio, formatearFecha } from './formato'
import { requerido, validarEmail, validarPassword, validarRun } from './validaciones'

const HOY = new Date(2026, 9, 22) // 22 de octubre de 2026 (el mes parte en 0)

describe('calcularEdad y cumpleaños', () => {
  test('calcula la edad según si ya cumplió', () => {
    expect(calcularEdad('1976-10-22', HOY)).toBe(50)
    expect(calcularEdad('1976-10-23', HOY)).toBe(49)
  })
  test('detecta el cumpleaños', () => {
    expect(esCumpleanos('2004-10-22', HOY)).toBe(true)
    expect(esCumpleanos('2004-05-01', HOY)).toBe(false)
    expect(esCumpleanos(null, HOY)).toBe(false)
  })
  test('detecta correos Duoc', () => {
    expect(esCorreoDuoc('ANA@DuocUC.cl')).toBe(true)
    expect(esCorreoDuoc('ana@gmail.com')).toBe(false)
  })
})

describe('diasParaCumpleanos', () => {
  const hoy = new Date(2026, 10, 2) 
  test('hoy es 0', () => expect(diasParaCumpleanos('2000-11-02', hoy)).toBe(0))
  test('mañana es 1', () => expect(diasParaCumpleanos('2000-11-03', hoy)).toBe(1))
  test('si ya pasó, cuenta hasta el próximo año', () => expect(diasParaCumpleanos('2000-11-01', hoy)).toBe(364))
})

describe('tortaCanjeadaEsteAnio', () => {
  const hoy = new Date(2026, 10, 2)
  const orden = { usuarioId: 5, fecha: '2026-03-10T12:00:00', detalleDescuento: [{ motivo: 'Torta gratis por cumpleaños Duoc', monto: 1 }] }
  test('true si este año usó la torta', () => expect(tortaCanjeadaEsteAnio([orden], 5, hoy)).toBe(true))
  test('false si fue el año pasado', () => expect(tortaCanjeadaEsteAnio([{ ...orden, fecha: '2025-03-10T12:00:00' }], 5, hoy)).toBe(false))
  test('false si es de otro usuario', () => expect(tortaCanjeadaEsteAnio([orden], 9, hoy)).toBe(false))
})

describe('calcularDescuento (D6: gana el mayor)', () => {
  const mayor = { fechaNacimiento: '1960-01-01' }
  const joven = { fechaNacimiento: '2000-01-01' }
  test.each([
    ['sin usuario', null, null, 0],
    ['solo código', joven, 'FELICES50', 10],
    ['solo mayor de 50', mayor, null, 50],
    ['mayor de 50 + código = 50, no 60', mayor, 'FELICES50', 50],
    ['50 años justos no tiene 50%', { fechaNacimiento: '1976-10-22' }, null, 0],
    ['código inválido', joven, 'OTRO', 0],
  ])('%s', (_, usuario, codigo, esperado) => {
    expect(calcularDescuento(usuario, codigo, HOY).porcentaje).toBe(esperado)
  })
})

describe('precios y totales', () => {
  test('aplica tamaño y oferta', () => {
    const p = { precio: 40000, oferta: 10, tamanos: [{ id: 'mediana', extra: 10000 }] }
    expect(precioConOferta(p, 'mediana')).toBe(45000)
    expect(precioConOferta({ precio: 5000 })).toBe(5000)
  })

  const items = [
    { codigo: 'PI001', categoriaId: 3, forma: null, precioUnitario: 5000, cantidad: 2 },
    { codigo: 'TT001', categoriaId: 2, forma: 'circular', precioUnitario: 40000, cantidad: 1 },
  ]

  test('sin usuario no hay descuento', () => {
    expect(calcularTotales(items, null, HOY)).toMatchObject({ subtotal: 50000, descuento: 0, total: 50000 })
  })

  test('Duoc de cumpleaños: la primera torta es gratis (D7)', () => {
    const camila = { esDuoc: true, fechaNacimiento: '2004-10-22' }
    const r = calcularTotales(items, camila, HOY)
    expect(r.descuento).toBe(40000)
    expect(r.total).toBe(10000)
  })

  test('código FELICES50 descuenta 10%', () => {
    const r = calcularTotales(items, { fechaNacimiento: '2000-01-01', codigoDescuento: 'FELICES50' }, HOY)
    expect(r.total).toBe(45000)
    expect(r.detalleDescuento[0].motivo).toContain('FELICES50')
  })

  test('la torta de cumpleaños no se aplica si ya se canjeó este año', () => {
    const duoc = { esDuoc: true, fechaNacimiento: '2000-10-22' } 
    const items = [{ forma: 'cuadrada', categoriaId: 1, precioUnitario: 30000, cantidad: 1 }]
    expect(calcularTotales(items, duoc, HOY).descuento).toBe(30000)
    expect(calcularTotales(items, duoc, HOY, true).descuento).toBe(0)
  })  
})

describe('formato', () => {
  test('formatea precio y fecha', () => {
    expect(formatearPrecio(45000)).toBe('$45.000')
    expect(formatearPrecio(500)).toBe('$500')
    expect(formatearFecha('2026-10-22T15:30:00.000Z')).toBe('22-10-2026')
  })
})

describe('validaciones', () => {
  test('requerido, email y contraseña', () => {
    expect(requerido('  ')).toBe(false)
    expect(requerido('Ana')).toBe(true)
    expect(validarEmail('ana@gmail.com')).toBe(true)
    expect(validarEmail('ana@')).toBe(false)
    expect(validarPassword('123')).toBe(false)
    expect(validarPassword('1234')).toBe(true)
  })
  test('valida el RUN con dígito verificador', () => {
    expect(validarRun('12.345.678-5')).toBe(true)
    expect(validarRun('19876543-0')).toBe(true)
    expect(validarRun('12345678-K')).toBe(false)
    expect(validarRun('abc')).toBe(false)
  })
})