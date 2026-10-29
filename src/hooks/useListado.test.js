import { renderHook, waitFor, act } from '@testing-library/react'
import { useListado } from './useListado'

describe('useListado', () => {
  test('parte cargando y después entrega los datos', async () => {
    const listar = vi.fn().mockResolvedValue(['a', 'b'])
    const { result } = renderHook(() => useListado(listar))
    expect(result.current.cargando).toBe(true)
    await waitFor(() => expect(result.current.cargando).toBe(false))
    expect(result.current.datos).toEqual(['a', 'b'])
    expect(result.current.error).toBe('')
  })

  test('si el service falla, entrega el mensaje de error', async () => {
    const listar = vi.fn().mockRejectedValue(new Error('Falló la carga'))
    const { result } = renderHook(() => useListado(listar))
    await waitFor(() => expect(result.current.error).toBe('Falló la carga'))
    expect(result.current.datos).toEqual([])
  })

  test('recargar vuelve a llamar a la función', async () => {
    const listar = vi.fn().mockResolvedValueOnce([1]).mockResolvedValueOnce([1, 2])
    const { result } = renderHook(() => useListado(listar))
    await waitFor(() => expect(result.current.datos).toEqual([1]))
    act(() => result.current.recargar())
    await waitFor(() => expect(result.current.datos).toEqual([1, 2]))
    expect(listar).toHaveBeenCalledTimes(2)
  })
})
