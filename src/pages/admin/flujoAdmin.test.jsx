import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'
import { renderConProviders } from '../../test/utils'
import { ordenesRepo } from '../../data/ordenes'
import { productosRepo } from '../../data/productos'

// Prueba de integración del panel: la App completa con sus rutas reales,
// RutaAdmin y AdminLayout. Se navega con el sidebar como lo haría el admin.
beforeEach(() => vi.spyOn(window, 'scrollTo').mockImplementation(() => {}))
afterEach(() => {
  vi.restoreAllMocks()
  ordenesRepo.reiniciar()
  productosRepo.reiniciar()
})

const ADMIN = { id: 1 }

describe('Flujo del panel admin (App completa)', () => {
  test('un cliente que entra a /admin vuelve a la tienda', async () => {
    renderConProviders(<App />, { ruta: '/admin', usuario: { id: 2 } })
    expect(await screen.findByRole('heading', { name: /50 Años Horneando/ })).toBeInTheDocument()
    expect(screen.queryByText('Panel admin · Rosa')).not.toBeInTheDocument()
  })

  test('el admin navega por todas las vistas del sidebar (ninguna en construcción)', async () => {
    const user = userEvent.setup()
    renderConProviders(<App />, { ruta: '/admin', usuario: ADMIN })
    expect(await screen.findByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()

    const menu = screen.getByRole('navigation', { name: 'Menú del administrador' })
    const visitas = [
      ['Productos', 'Productos'],
      ['Críticos', 'Productos críticos'],
      ['Categorías', 'Categorías'],
      ['Usuarios', 'Usuarios'],
      ['Órdenes', 'Órdenes y boletas'],
      ['Reportes', 'Reportes'],
      ['Perfil', 'Mi perfil'],
    ]
    for (const [link, titulo] of visitas) {
      await user.click(within(menu).getByRole('link', { name: link }))
      expect(await screen.findByRole('heading', { level: 1, name: titulo })).toBeInTheDocument()
      expect(screen.queryByText('Esta vista está en construcción.')).not.toBeInTheDocument()
    }
  })

  test('el admin cambia el estado de una orden y lo ve reflejado en el dashboard', async () => {
    const user = userEvent.setup()
    renderConProviders(<App />, { ruta: '/admin/ordenes/2', usuario: ADMIN })
    await screen.findByRole('heading', { name: 'Boleta B-000002' })
    await user.selectOptions(screen.getByLabelText('Cambiar estado'), 'en_camino')
    await screen.findByRole('status')

    const menu = screen.getByRole('navigation', { name: 'Menú del administrador' })
    await user.click(within(menu).getByRole('link', { name: 'Dashboard' }))
    const filas = await screen.findAllByTestId('orden-reciente')
    expect(within(filas[0]).getByText('En camino')).toBeInTheDocument()
  })

  test('crear un producto con stock bajo lo suma a los críticos del dashboard', async () => {
    const user = userEvent.setup()
    renderConProviders(<App />, { ruta: '/admin/productos/nuevo', usuario: ADMIN })
    await user.type(await screen.findByLabelText('Código'), 'PI003')
    await user.type(screen.getByLabelText('Nombre'), 'Alfajor de Maicena')
    await user.selectOptions(screen.getByLabelText('Categoría'), '3')
    await user.type(screen.getByLabelText('Precio base (CLP)'), '1500')
    await user.type(screen.getByLabelText('Stock'), '2')
    await user.click(screen.getByRole('button', { name: /Crear producto/ }))
    expect(await screen.findByText('Se creó "Alfajor de Maicena"')).toBeInTheDocument()

    const menu = screen.getByRole('navigation', { name: 'Menú del administrador' })
    await user.click(within(menu).getByRole('link', { name: 'Dashboard' }))
    const criticos = (await screen.findByText('Productos críticos')).closest('a')
    expect(criticos).toHaveTextContent('5') // 4 de las semillas + el nuevo
  })
})
