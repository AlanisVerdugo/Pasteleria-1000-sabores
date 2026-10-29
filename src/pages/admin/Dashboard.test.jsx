import { screen, within } from '@testing-library/react'
import Dashboard from './Dashboard'
import { renderConProviders } from '../../test/utils'
import { productosService, ordenesService } from '../../services'

afterEach(() => vi.restoreAllMocks())

// Busca la tarjeta contador por su título y devuelve su texto
const contador = (titulo) => screen.getByText(titulo).closest('[data-testid="contador"]')

describe('Dashboard', () => {
  test('muestra los contadores calculados desde los services (semillas)', async () => {
    renderConProviders(<Dashboard />)
    expect(await screen.findByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
    expect(contador('Productos')).toHaveTextContent('16')
    expect(contador('Categorías')).toHaveTextContent('8')
    expect(contador('Usuarios')).toHaveTextContent('4')
    expect(contador('Órdenes')).toHaveTextContent('2')
  })

  test('los productos críticos se marcan en rojo y llevan a su vista', async () => {
    renderConProviders(<Dashboard />)
    const criticos = (await screen.findByText('Productos críticos')).closest('a')
    expect(criticos).toHaveClass('adm-contador-alerta')
    expect(criticos).toHaveAttribute('href', '/admin/productos/criticos')
  })

  test('es dinámico: si el service cambia, el contador cambia', async () => {
    vi.spyOn(productosService, 'listarCriticos').mockResolvedValue([])
    renderConProviders(<Dashboard />)
    const criticos = (await screen.findByText('Productos críticos')).closest('a')
    expect(criticos).toHaveTextContent('0')
    expect(criticos).not.toHaveClass('adm-contador-alerta')
  })

  test('lista las últimas órdenes con su estado y link a la boleta', async () => {
    renderConProviders(<Dashboard />)
    const filas = await screen.findAllByTestId('orden-reciente')
    expect(filas).toHaveLength(2)
    expect(filas[0]).toHaveTextContent('B-000002') // la más nueva primero
    expect(within(filas[0]).getByText('En preparación')).toBeInTheDocument()
    expect(within(filas[0]).getByRole('link', { name: 'Ver boleta' })).toHaveAttribute('href', '/admin/ordenes/2')
  })

  test('sin órdenes muestra un aviso', async () => {
    vi.spyOn(ordenesService, 'listar').mockResolvedValue([])
    renderConProviders(<Dashboard />)
    expect(await screen.findByText('Todavía no hay órdenes.')).toBeInTheDocument()
  })

  test('si un service falla, muestra el error', async () => {
    vi.spyOn(ordenesService, 'listar').mockRejectedValue(new Error('sin conexión'))
    renderConProviders(<Dashboard />)
    expect(await screen.findByRole('alert')).toHaveTextContent('sin conexión')
  })
})
