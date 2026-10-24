import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MisPedidos from './MisPedidos'
import { renderConProviders } from '../test/utils'

describe('MisPedidos', () => {
  test('un usuario sin pedidos ve el mensaje y el link a productos', async () => {
    renderConProviders(<MisPedidos usuarioId={3} />) // Pedro no tiene pedidos
    expect(await screen.findByText('Aún no tienes pedidos.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver productos' })).toBeInTheDocument()
  })

  test('muestra los pedidos del usuario, el más reciente primero', async () => {
    renderConProviders(<MisPedidos usuarioId={4} />) // Camila tiene 2
    const pedidos = await screen.findAllByTestId('pedido')
    expect(pedidos).toHaveLength(2)
    expect(pedidos[0]).toHaveTextContent('B-000002')
    expect(pedidos[1]).toHaveTextContent('B-000001')
  })

  test('el filtro Entregados muestra solo los entregados', async () => {
    const user = userEvent.setup()
    renderConProviders(<MisPedidos usuarioId={4} />)
    await screen.findAllByTestId('pedido')
    await user.click(screen.getByRole('button', { name: 'Entregados' }))
    const pedidos = screen.getAllByTestId('pedido')
    expect(pedidos).toHaveLength(1)
    expect(pedidos[0]).toHaveTextContent('Entregado')
  })

  test('si no hay pedidos en ese estado muestra un aviso', async () => {
    const user = userEvent.setup()
    renderConProviders(<MisPedidos usuarioId={4} />)
    await screen.findAllByTestId('pedido')
    await user.click(screen.getByRole('button', { name: 'En camino' }))
    expect(screen.queryAllByTestId('pedido')).toHaveLength(0)
    expect(screen.getByText('No tienes pedidos en este estado.')).toBeInTheDocument()
  })
})