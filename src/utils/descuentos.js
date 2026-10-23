import { DOMINIOS_DUOC, CODIGO_FELICES } from './constantes'

export function calcularEdad(fechaNacimiento, hoy = new Date()) {
  const [anio, mes, dia] = fechaNacimiento.split('-').map(Number)
  let edad = hoy.getFullYear() - anio
  const mesHoy = hoy.getMonth() + 1 // getMonth() parte en 0 (enero = 0)
  if (mesHoy < mes || (mesHoy === mes && hoy.getDate() < dia)) edad-- // aún no cumple este año
  return edad
}

export const esCorreoDuoc = (email = '') =>
  DOMINIOS_DUOC.some((d) => email.toLowerCase().endsWith(d))

export function esCumpleanos(fechaNacimiento, hoy = new Date()) {
  if (!fechaNacimiento) return false
  const [, mes, dia] = fechaNacimiento.split('-').map(Number)
  return hoy.getMonth() + 1 === mes && hoy.getDate() === dia
}

export function precioConOferta(producto, tamanoId = null) {
  const extra = producto.tamanos?.find((t) => t.id === tamanoId)?.extra ?? 0
  return Math.round((producto.precio + extra) * (1 - (producto.oferta ?? 0) / 100))
}

// D6: los descuentos NO se suman, gana el mayor
export function calcularDescuento(usuario, codigo, hoy = new Date()) {
  const ninguno = { porcentaje: 0, motivo: '' }
  if (!usuario) return ninguno
  const candidatos = [ninguno]
  if (usuario.fechaNacimiento && calcularEdad(usuario.fechaNacimiento, hoy) > 50) {
    candidatos.push({ porcentaje: 50, motivo: 'Mayor de 50 años (50%)' })
  }
  if (codigo === CODIGO_FELICES) {
    candidatos.push({ porcentaje: 10, motivo: 'Código FELICES50 (10%)' })
  }
  return candidatos.reduce((mayor, c) => (c.porcentaje > mayor.porcentaje ? c : mayor))
}

const esTorta = (item) => Boolean(item.forma) || [1, 2, 8].includes(item.categoriaId)

export function calcularTotales(items, usuario, hoy = new Date()) {
  const subtotal = items.reduce((suma, i) => suma + i.precioUnitario * i.cantidad, 0)
  const detalleDescuento = []
  let descuento = 0

  // D7: Duoc de cumpleaños => 1 unidad de la PRIMERA torta del carrito gratis
  if (usuario?.esDuoc && esCumpleanos(usuario.fechaNacimiento, hoy)) {
    const torta = items.find(esTorta)
    if (torta) {
      detalleDescuento.push({ motivo: 'Torta gratis por cumpleaños Duoc', monto: torta.precioUnitario })
      descuento += torta.precioUnitario
    }
  }

  // D6: después, el mayor % sobre lo que queda
  const { porcentaje, motivo } = calcularDescuento(usuario, usuario?.codigoDescuento, hoy)
  if (porcentaje > 0) {
    const monto = Math.round(((subtotal - descuento) * porcentaje) / 100)
    detalleDescuento.push({ motivo, monto })
    descuento += monto
  }

  return { subtotal, descuento, detalleDescuento, total: subtotal - descuento }
}