import { createContext, useContext, useEffect, useReducer } from 'react'
import { useAuth } from './AuthContext'
import { calcularTotales, precioConOferta } from '../utils/descuentos'

const CLAVE = 'pms_carrito'
const CarritoContext = createContext(null)

// El reducer recibe el estado actual y una acción, y devuelve el estado NUEVO (nunca modifica el anterior)
export function carritoReducer(items, accion) {
  switch (accion.type) {
    case 'AGREGAR': {
      const nuevo = accion.item
      const existe = items.find((i) => i.clave === nuevo.clave)
      if (existe) {
        return items.map((i) =>
          i.clave === nuevo.clave ? { ...i, cantidad: Math.min(i.cantidad + nuevo.cantidad, i.stock) } : i
        )
      }
      return [...items, { ...nuevo, cantidad: Math.min(nuevo.cantidad, nuevo.stock) }]
    }
    case 'QUITAR':
      return items.filter((i) => i.clave !== accion.clave)
    case 'CAMBIAR_CANTIDAD':
      if (accion.cantidad < 1) return items.filter((i) => (i.clave === accion.clave ? { ...i, cantidad: 1 } : i))
      return items.map((i) =>
        i.clave === accion.clave ? { ...i, cantidad: Math.min(accion.cantidad, i.stock) } : i
      )
    case 'VACIAR':
      return []
    case 'CARGAR':
      return accion.items
    default:
      return items
  }
}

// Convierte un producto en una línea del carrito
export function crearItem(producto, { cantidad = 1, tamano = null, mensaje = '' } = {}) {
  return {
    clave: `${producto.codigo}-${tamano ?? 'u'}-${mensaje}`,
    codigo: producto.codigo,
    nombre: producto.nombre,
    imagen: producto.imagen,
    categoriaId: producto.categoriaId,
    forma: producto.forma ?? null,
    tamano,
    mensaje,
    precioUnitario: precioConOferta(producto, tamano),
    cantidad,
    stock: producto.stock,
  }
}

const claveDe = (usuario) => (usuario ? `${CLAVE}_${usuario.id}` : CLAVE)

export function CarritoProvider({ children }) {
  const { usuario } = useAuth()
  // crea el carrito de nuevo al cambiar de usuario
  return (
    <CarritoDelUsuario key={claveDe(usuario)} clave={claveDe(usuario)} usuario={usuario}>
      {children}
    </CarritoDelUsuario>
  )
}

function CarritoDelUsuario({ clave, usuario, children }) {
  const [items, dispatch] = useReducer(
    carritoReducer,
    clave,
    (c) => JSON.parse(localStorage.getItem(c)) ?? []
  )

  // los items, se guardan en la clave de ESTE usuario
  useEffect(() => {
    localStorage.setItem(clave, JSON.stringify(items))
  }, [clave, items])

  const agregar = (producto, opciones) => {
    if (producto.stock <= 0) return false
    dispatch({ type: 'AGREGAR', item: crearItem(producto, opciones) })
    return true
  }
  const quitar = (clave) => dispatch({ type: 'QUITAR', clave })
  const cambiarCantidad = (clave, cantidad) => dispatch({ type: 'CAMBIAR_CANTIDAD', clave, cantidad })
  const vaciar = () => dispatch({ type: 'VACIAR' })

  const totales = calcularTotales(items, usuario)
  const cantidadItems = items.reduce((suma, i) => suma + i.cantidad, 0)

  const valor = { items, agregar, quitar, cambiarCantidad, vaciar, ...totales, cantidadItems }
  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
}

export function useCarrito() {
  const contexto = useContext(CarritoContext)
  if (!contexto) throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  return contexto
}