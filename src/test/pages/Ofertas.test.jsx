import { screen } from '@testing-library/react'
import Ofertas from '../../pages/Ofertas'
import { renderConProviders } from '../utils'
import { productosService } from '../../services/productosService'
import userEvent from '@testing-library/user-event'

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

  test('el banner muestra la mejor oferta', async () => {
    renderConProviders(<Ofertas />)
    expect(await screen.findByRole('heading', { name: '¡Hasta 20% de descuento!' })).toBeInTheDocument()
  })

  test('el filtro deja solo las ofertas desde ese porcentaje', async () => {
    renderConProviders(<Ofertas />)
    await screen.findAllByTestId('tarjeta-producto')
    await userEvent.click(screen.getByRole('button', { name: '20% o más' }))
    expect(screen.getAllByTestId('tarjeta-producto')).toHaveLength(1)
  })  
})
