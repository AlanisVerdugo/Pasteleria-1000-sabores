import { renderHook, waitFor } from '@testing-library/react'
import { useProductos } from '../../hooks/useProductos'

describe('useProductos', () => {
  test('parte cargando y después entrega productos', async () => {
    const { result } = renderHook(() => useProductos({}))
    expect(result.current.cargando).toBe(true)
    await waitFor(() => expect(result.current.cargando).toBe(false))
    expect(result.current.productos.length).toBeGreaterThan(0)
  })

  test('filtra por categoría', async () => {
    const { result } = renderHook(() => useProductos({ categoriaId: 1 }))
    await waitFor(() => expect(result.current.cargando).toBe(false))
    expect(result.current.productos.every((p) => p.categoriaId === 1)).toBe(true)
  })

  test('vuelve a cargar cuando cambia el filtro', async () => {
    const { result, rerender } = renderHook((filtros) => useProductos(filtros), { initialProps: { texto: '' } })
    await waitFor(() => expect(result.current.cargando).toBe(false))
    rerender({ texto: 'mousse' })
    await waitFor(() => expect(result.current.productos).toHaveLength(1))
  })
})

