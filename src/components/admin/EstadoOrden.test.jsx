import { render, screen } from '@testing-library/react'
import EstadoOrden from './EstadoOrden'

describe('EstadoOrden', () => {
  test.each([
    ['preparacion', 'En preparación'],
    ['en_camino', 'En camino'],
    ['entregado', 'Entregado'],
  ])('el estado %s se muestra como "%s"', (estado, texto) => {
    render(<EstadoOrden estado={estado} />)
    expect(screen.getByText(texto)).toHaveClass(`adm-estado-${estado}`)
  })

  test('un estado desconocido se muestra tal cual', () => {
    render(<EstadoOrden estado="perdido" />)
    expect(screen.getByText('perdido')).toBeInTheDocument()
  })
})
