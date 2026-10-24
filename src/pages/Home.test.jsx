import { screen, within } from '@testing-library/react'
import Home from './Home'
import { renderConProviders } from '../test/utils'
import { productosService } from '../services/productosService'

afterEach(() => vi.restoreAllMocks())

describe('Home', () => {
  test('muestra los 4 destacados desde el service', async () => {
    renderConProviders(<Home />)
    const seccion = await screen.findByRole('region', { name: 'Nuestros favoritos' })
    expect(within(seccion).getAllByTestId('tarjeta-producto')).toHaveLength(4)
  })

  test('muestra solo productos en oferta en la sección de ofertas', async () => {
    renderConProviders(<Home />)
    const seccion = await screen.findByRole('region', { name: 'Ofertas de aniversario' })
    expect(within(seccion).getAllByTestId('tarjeta-producto')).toHaveLength(3)
    expect(within(seccion).getByText('-20%')).toBeInTheDocument()
  })

  test('si no hay ofertas, la sección no aparece', async () => {
    vi.spyOn(productosService, 'listarOfertas').mockResolvedValue([])
    renderConProviders(<Home />)
    await screen.findByRole('region', { name: 'Nuestros favoritos' })
    expect(screen.queryByRole('region', { name: 'Ofertas de aniversario' })).not.toBeInTheDocument()
  })

  test('el botón del hero lleva a categorías', () => {
    renderConProviders(<Home />)
    expect(screen.getByRole('link', { name: 'Explorar Categorías' })).toHaveAttribute('href', '/categorias')
  })
})