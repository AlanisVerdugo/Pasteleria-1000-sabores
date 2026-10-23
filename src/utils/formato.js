// 45000 -> "$45.000"
export const formatearPrecio = (n) => '$' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')

// '2026-10-22T15:30:00Z' o '2026-10-22' -> "22-10-2026"
export const formatearFecha = (fecha) => fecha.slice(0, 10).split('-').reverse().join('-')