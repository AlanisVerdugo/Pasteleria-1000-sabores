import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TarjetaContador from './TarjetaContador'

describe('TarjetaContador', () => {
  test('con link, toda la tarjeta lleva a esa ruta', () => {
    render(
      <MemoryRouter>
        <TarjetaContador titulo="Productos" valor={16} icono="bi-box" link="/admin/productos" />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: /16\s*Productos/ })).toHaveAttribute('href', '/admin/productos')
  })

  test('sin link es solo una caja, y "alerta" la marca en rojo', () => {
    render(<TarjetaContador titulo="Críticos" valor={3} icono="bi-exclamation" alerta />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByTestId('contador')).toHaveClass('adm-contador-alerta')
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})
