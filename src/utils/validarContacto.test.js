import { validarContacto, MAX_MENSAJE } from './validaciones'

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



