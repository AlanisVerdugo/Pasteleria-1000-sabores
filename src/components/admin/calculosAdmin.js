// Cálculos del admin (funciones puras: reciben arrays y devuelven números).
// Las usan el Dashboard y Reportes.

// ¿La fecha ISO de la orden cae en el mismo mes y año que "hoy"?
export const esDelMes = (fechaIso, hoy = new Date()) => {
  const f = new Date(fechaIso)
  return f.getFullYear() === hoy.getFullYear() && f.getMonth() === hoy.getMonth()
}

// Suma de los totales de las órdenes (reduce)
export const sumarTotales = (ordenes) => ordenes.reduce((suma, o) => suma + (o.total ?? 0), 0)

// Ventas del mes actual: filter + reduce
export const ventasDelMes = (ordenes, hoy = new Date()) =>
  sumarTotales(ordenes.filter((o) => esDelMes(o.fecha, hoy)))

// Las N órdenes más recientes (sin modificar el array original)
export const ultimasOrdenes = (ordenes, cantidad = 5) =>
  [...ordenes].sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, cantidad)

// Nombre del cliente de una orden: el que trae la orden (D19) o, si no viene
// (órdenes semilla), el del usuario. Sin usuario = compra como invitado.
export const nombreCliente = (orden, usuarios) => {
  if (orden.cliente?.nombre) return orden.cliente.nombre
  const u = usuarios.find((x) => x.id === orden.usuarioId)
  return u ? `${u.nombre} ${u.apellidos}` : 'Invitado'
}
