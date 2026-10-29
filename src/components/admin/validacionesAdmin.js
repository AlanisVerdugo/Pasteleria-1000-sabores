import { requerido } from '../../utils/validaciones'

// Validaciones de los formularios del admin (p3).
// Igual que las de utils/validaciones: devuelven { campo: 'mensaje' } y {} si todo está bien.

// Código de producto: 2 o 3 letras mayúsculas + 3 números (TC001, PSA002)
export const REGEX_CODIGO = /^[A-Z]{2,3}\d{3}$/

const esEntero = (valor) => /^\d+$/.test(String(valor).trim())

export function validarProducto(v) {
  const errores = {}
  if (!requerido(v.codigo)) errores.codigo = 'Ingresa el código'
  else if (!REGEX_CODIGO.test(v.codigo.trim())) errores.codigo = 'Formato: 2 o 3 letras mayúsculas y 3 números (ej: TC001)'
  if (!requerido(v.nombre)) errores.nombre = 'Ingresa el nombre'
  else if (v.nombre.trim().length > 100) errores.nombre = 'Máximo 100 caracteres'
  if (!requerido(v.categoriaId)) errores.categoriaId = 'Elige una categoría'
  if (!esEntero(v.precio) || Number(v.precio) <= 0) errores.precio = 'El precio debe ser un número entero mayor a 0'
  if (!esEntero(v.stock)) errores.stock = 'El stock debe ser un número entero mayor o igual a 0'
  if (!esEntero(v.oferta) || Number(v.oferta) > 90) errores.oferta = 'La oferta debe ser un porcentaje entre 0 y 90'
  if (v.descripcion && v.descripcion.trim().length > 500) errores.descripcion = 'Máximo 500 caracteres'
  return errores
}
