import { render, screen } from '@testing-library/react'
import EncabezadoAdmin from './EncabezadoAdmin'

describe('EncabezadoAdmin', () => {
  test('muestra título, subtítulo y las acciones (children)', () => {
    render(
      <EncabezadoAdmin titulo="Productos" subtitulo="16 productos">
        <button type="button">Nuevo</button>
      </EncabezadoAdmin>
    )
    expect(screen.getByRole('heading', { name: 'Productos' })).toBeInTheDocument()
    expect(screen.getByText('16 productos')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Nuevo' })).toBeInTheDocument()
  })

  test('sin subtítulo ni acciones solo muestra el título', () => {
    render(<EncabezadoAdmin titulo="Reportes" />)
    expect(screen.getByRole('heading', { name: 'Reportes' })).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
