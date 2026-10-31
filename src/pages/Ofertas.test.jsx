import { screen } from '@testing-library/react'
import Ofertas from './Ofertas'
import { renderConProviders } from '../test/utils'
import { productosService } from '../services/productosService'

afterEach(() => vi.restoreAllMocks())

describe('Ofertas', () => {
  test('muestra el título de la página', async () => {
    renderConProviders(<Ofertas />)
    expect(screen.getByRole('heading', { name: 'Ofertas de Aniversario' })).toBeInTheDocument()
  })

  test('muestra todos los productos en oferta desde el service', async () => {
    renderConProviders(<Ofertas />)
    const tarjetas = await screen.findAllByTestId('tarjeta-producto')
    expect(tarjetas).toHaveLength(3)
  })

  test('si no hay ofertas, muestra el mensaje de "no hay ofertas"', async () => {
    vi.spyOn(productosService, 'listarOfertas').mockResolvedValue([])
    renderConProviders(<Ofertas />)
    expect(await screen.findByText('No hay ofertas disponibles en este momento.')).toBeInTheDocument()
  })

  test('con una sola oferta, muestra solo una tarjeta', async () => {
    vi.spyOn(productosService, 'listarOfertas').mockResolvedValue([
      { codigo: 'X01', nombre: 'Torta de Prueba', descripcion: 'Rica', imagen: '/img/x.jpg', precio: 10000, oferta: 10, stock: 5 },
    ])
    renderConProviders(<Ofertas />)
    const tarjetas = await screen.findAllByTestId('tarjeta-producto')
    expect(tarjetas).toHaveLength(1)
  })
})
