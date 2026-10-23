import { renderHook, act, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from './AuthContext'
import { CarritoProvider, useCarrito, carritoReducer, crearItem } from './CarritoContext'
import { usuariosRepo } from '../data/usuarios'

const torta = { codigo: 'TT001', nombre: 'Torta', categoriaId: 2, forma: 'circular', precio: 40000, stock: 3, oferta: 0, tamanos: [] }

beforeEach(() => usuariosRepo.reiniciar())

describe('carritoReducer', () => {
  test('agrega, suma si se repite y respeta el stock', () => {
    const item = crearItem(torta, { cantidad: 2 })
    let estado = carritoReducer([], { type: 'AGREGAR', item })
    estado = carritoReducer(estado, { type: 'AGREGAR', item })
    expect(estado).toHaveLength(1)
    expect(estado[0].cantidad).toBe(3) // 2 + 2 = 4, pero el tope es el stock (3)
  })

  test('cambia cantidad, quita con 0 y vacía', () => {
    const inicial = [crearItem(torta)]
    expect(carritoReducer(inicial, { type: 'CAMBIAR_CANTIDAD', clave: inicial[0].clave, cantidad: 2 })[0].cantidad).toBe(2)
    expect(carritoReducer(inicial, { type: 'CAMBIAR_CANTIDAD', clave: inicial[0].clave, cantidad: 0 })).toEqual([])
    expect(carritoReducer(inicial, { type: 'QUITAR', clave: inicial[0].clave })).toEqual([])
    expect(carritoReducer(inicial, { type: 'VACIAR' })).toEqual([])
    expect(carritoReducer(inicial, { type: 'CARGAR', items: [] })).toEqual([])
    expect(carritoReducer(inicial, { type: 'OTRA' })).toBe(inicial)
  })
})

const envoltorio = ({ children }) => (
  <AuthProvider>
    <CarritoProvider>{children}</CarritoProvider>
  </AuthProvider>
)

describe('contextos juntos', () => {
  test('login de admin y logout', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: envoltorio })
    await waitFor(() => expect(result.current.cargando).toBe(false))
    await act(() => result.current.login('admin@duoc.cl', 'admin123'))
    expect(result.current.esAdmin).toBe(true)
    await act(() => result.current.logout())
    expect(result.current.usuario).toBeNull()
  })

  test('el carrito calcula totales y no agrega sin stock', async () => {
    const { result } = renderHook(() => useCarrito(), { wrapper: envoltorio })
    act(() => result.current.agregar(torta, { cantidad: 2 }))
    expect(result.current.cantidadItems).toBe(2)
    expect(result.current.total).toBe(80000)
    let agrego
    act(() => { agrego = result.current.agregar({ ...torta, codigo: 'X', stock: 0 }) })
    expect(agrego).toBe(false)
    expect(JSON.parse(localStorage.getItem('pms_carrito'))).toHaveLength(1)
  })

  test('useAuth fuera del provider avisa el error', () => {
    expect(() => renderHook(() => useAuth())).toThrow('dentro de AuthProvider')
  })
})