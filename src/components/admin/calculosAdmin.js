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

// ===== Reportes =====

// Total vendido / cantidad de órdenes (0 si no hay órdenes)
export const ticketPromedio = (ordenes) =>
  ordenes.length === 0 ? 0 : Math.round(sumarTotales(ordenes) / ordenes.length)

// { preparacion: 1, en_camino: 0, entregado: 1 } — parte con todos los estados en 0
export const ordenesPorEstado = (ordenes, estados) =>
  ordenes.reduce(
    (cuenta, o) => ({ ...cuenta, [o.estado]: (cuenta[o.estado] ?? 0) + 1 }),
    Object.fromEntries(estados.map((e) => [e, 0]))
  )

// Busca el producto de un ítem de orden: por código (D19) o, en las semillas que no lo traen, por nombre
const productoDelItem = (item, productos) =>
  productos.find((p) => p.codigo === item.codigo) ?? productos.find((p) => p.nombre === item.nombre)

// [{ nombre, total }] de mayor a menor. map -> reduce -> sort
export function ventasPorCategoria(ordenes, productos, categorias) {
  const totales = ordenes
    .flatMap((o) => o.items)
    .reduce((acc, item) => {
      const categoriaId = productoDelItem(item, productos)?.categoriaId
      const nombre = categorias.find((c) => c.id === categoriaId)?.nombre ?? 'Sin categoría'
      acc[nombre] = (acc[nombre] ?? 0) + item.precio * item.cantidad
      return acc
    }, {})
  return Object.entries(totales)
    .map(([nombre, total]) => ({ nombre, total }))
    .sort((a, b) => b.total - a.total)
}

// Los N productos con más unidades vendidas: [{ nombre, cantidad, total }]
export function topProductos(ordenes, cantidad = 5) {
  const porNombre = ordenes
    .flatMap((o) => o.items)
    .reduce((acc, item) => {
      const actual = acc[item.nombre] ?? { nombre: item.nombre, cantidad: 0, total: 0 }
      acc[item.nombre] = {
        ...actual,
        cantidad: actual.cantidad + item.cantidad,
        total: actual.total + item.precio * item.cantidad,
      }
      return acc
    }, {})
  return Object.values(porNombre)
    .sort((a, b) => b.cantidad - a.cantidad || b.total - a.total)
    .slice(0, cantidad)
}
