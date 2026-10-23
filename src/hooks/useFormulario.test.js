import { renderHook, act } from '@testing-library/react'
import { useFormulario } from './useFormulario'

const validar = (v) => (v.nombre ? {} : { nombre: 'Requerido' })
const evento = (name, value) => ({ target: { name, value, type: 'text' } })

describe('useFormulario', () => {
  test('manejarCambio actualiza el valor según el name', () => {
    const { result } = renderHook(() => useFormulario({ nombre: '' }, validar))
    act(() => result.current.manejarCambio(evento('nombre', 'Ana')))
    expect(result.current.valores.nombre).toBe('Ana')
  })

  test('con errores no llama a alEnviar y guarda los errores', () => {
    const alEnviar = vi.fn()
    const { result } = renderHook(() => useFormulario({ nombre: '' }, validar))
    act(() => result.current.manejarEnvio(alEnviar)({ preventDefault: () => {} }))
    expect(alEnviar).not.toHaveBeenCalled()
    expect(result.current.errores.nombre).toBe('Requerido')
  })

  test('sin errores llama a alEnviar con los valores', () => {
    const alEnviar = vi.fn()
    const { result } = renderHook(() => useFormulario({ nombre: 'Ana' }, validar))
    act(() => result.current.manejarEnvio(alEnviar)({ preventDefault: () => {} }))
    expect(alEnviar).toHaveBeenCalledWith({ nombre: 'Ana' })
  })

  test('reiniciar vuelve a los valores iniciales', () => {
    const { result } = renderHook(() => useFormulario({ nombre: '' }, validar))
    act(() => result.current.manejarCambio(evento('nombre', 'Ana')))
    act(() => result.current.reiniciar())
    expect(result.current.valores.nombre).toBe('')
  })
})