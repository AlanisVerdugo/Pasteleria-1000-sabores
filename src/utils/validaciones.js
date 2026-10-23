export const requerido = (valor) => String(valor ?? '').trim() !== ''

export const validarEmail = (email = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const validarPassword = (pass = '') => pass.length >= 4 && pass.length <= 10

// RUN chileno con dígito verificador. Acepta "12.345.678-5" o "123456785"
export function validarRun(run = '') {
  const limpio = run.replace(/[.\-\s]/g, '').toUpperCase()
  if (!/^\d{7,8}[0-9K]$/.test(limpio)) return false
  const cuerpo = limpio.slice(0, -1)
  let suma = 0
  let multiplicador = 2
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1
  }
  const resto = 11 - (suma % 11)
  const esperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto)
  return limpio.slice(-1) === esperado
}

// devuelve un objeto con los errores 
export function validarLogin({ email, password }) {
  const errores = {}
  if (!requerido(email)) errores.email = 'Ingresa tu correo'
  else if (!validarEmail(email)) errores.email = 'El correo no es válido'
  if (!requerido(password)) errores.password = 'Ingresa tu contraseña'
  else if (!validarPassword(password)) errores.password = 'Debe tener entre 4 y 10 caracteres'
  return errores
}