import { validarContacto, MAX_MENSAJE, requerido, validarEmail, validarPassword, validarRun } from '../../utils/validaciones'

const valido = {
  tipo: 'Reclamo',
  nombre: 'Rosa',
  email: 'rosa@gmail.com',
  mensaje: 'Mi torta llegó tarde',
}

describe('validarContacto', () => {
  test('sin errores cuando todo está bien', () => {
    expect(validarContacto(valido)).toEqual({})
  })

  test('marca todos los campos vacíos', () => {
    const errores = validarContacto({ tipo: '', nombre: '', email: '', mensaje: '' })
    expect(Object.keys(errores)).toEqual(['tipo', 'nombre', 'email', 'mensaje'])
  })

  test('rechaza un tipo que no existe, un correo malo y un mensaje muy largo', () => {
    const errores = validarContacto({
      ...valido,
      tipo: 'Inventado',
      email: 'rosa@',
      mensaje: 'a'.repeat(MAX_MENSAJE + 1),
    })
    expect(errores).toEqual({
      tipo: 'Elige el tipo de consulta',
      email: 'El correo no es válido',
      mensaje: `Máximo ${MAX_MENSAJE} caracteres`,
    })
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



