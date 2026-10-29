import { screen, within } from '@testing-library/react'
import ProductosCriticos from './ProductosCriticos'
import { renderConProviders } from '../../test/utils'
import { productosService } from '../../services'

afterEach(() => vi.restoreAllMocks())

describe('ProductosCriticos', () => {
  test('lista solo los productos con stock < 5, del menor al mayor', async () => {
    renderConProviders(<ProductosCriticos />)
    const filas = await screen.findAllByTestId('fila-critico')
    // semillas: PT002 (0), PG002 (2), PSA001 (3), TT002 (4)
    expect(filas.map((f) => within(f).getAllByRole('cell')[1].textContent)).toEqual(['PT002', 'PG002', 'PSA001', 'TT002'])
    expect(within(filas[0]).getByText('Agotado')).toBeInTheDocument()
    expect(screen.queryByText('TC001')).not.toBeInTheDocument()
  })

  test('cada fila lleva a editar para reponer stock', async () => {
    renderConProviders(<ProductosCriticos />)
    const filas = await screen.findAllByTestId('fila-critico')
    expect(within(filas[1]).getByRole('link', { name: 'Reponer stock' })).toHaveAttribute('href', '/admin/productos/PG002/editar')
  })

  test('sin críticos muestra el mensaje de todo al día', async () => {
    vi.spyOn(productosService, 'listarCriticos').mockResolvedValue([])
    renderConProviders(<ProductosCriticos />)
    expect(await screen.findByText(/No hay productos críticos/)).toBeInTheDocument()
  })

  test('si el service falla, muestra el error', async () => {
    vi.spyOn(productosService, 'listarCriticos').mockRejectedValue(new Error('Falló'))
    renderConProviders(<ProductosCriticos />)
    expect(await screen.findByRole('alert')).toHaveTextContent('Falló')
  })
})
