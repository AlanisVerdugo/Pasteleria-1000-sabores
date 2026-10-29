import { screen } from '@testing-library/react'
import Reportes from './Reportes'
import { renderConProviders } from '../../test/utils'
import { ordenesService } from '../../services'

afterEach(() => vi.restoreAllMocks())

const contador = (titulo) => screen.getByText(titulo).closest('[data-testid="contador"]')

describe('Reportes', () => {
  test('calcula los totales desde las órdenes semilla', async () => {
    renderConProviders(<Reportes />)
    expect(await screen.findByRole('heading', { name: 'Reportes' })).toBeInTheDocument()
    expect(contador('Ventas totales')).toHaveTextContent('$105.000')
    expect(contador('Órdenes')).toHaveTextContent('2')
    expect(contador('Ticket promedio')).toHaveTextContent('$52.500')
  })

  test('muestra órdenes por estado, ventas por categoría y el top de productos', async () => {
    renderConProviders(<Reportes />)
    expect(await screen.findByTestId('estado-preparacion')).toHaveTextContent('1')
    expect(screen.getByTestId('estado-en_camino')).toHaveTextContent('0')
    expect(screen.getByTestId('estado-entregado')).toHaveTextContent('1')

    const categorias = screen.getAllByTestId('venta-categoria')
    expect(categorias[0]).toHaveTextContent('Productos Sin Azúcar$48.000')

    const top = screen.getAllByTestId('top-producto')
    expect(top[0]).toHaveTextContent('Empanada de Manzana') // 4 unidades
  })

  test('sin órdenes muestra un aviso y totales en 0', async () => {
    vi.spyOn(ordenesService, 'listar').mockResolvedValue([])
    renderConProviders(<Reportes />)
    expect(await screen.findByText('Todavía no hay ventas para mostrar reportes.')).toBeInTheDocument()
    expect(contador('Ventas totales')).toHaveTextContent('$0')
  })

  test('si el service falla, muestra el error', async () => {
    vi.spyOn(ordenesService, 'listar').mockRejectedValue(new Error('Error de red'))
    renderConProviders(<Reportes />)
    expect(await screen.findByRole('alert')).toHaveTextContent('Error de red')
  })
})
