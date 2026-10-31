import { screen } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import HistorialCompras from './HistorialCompras'
import { renderConProviders } from '../../test/utils'
import { ordenesService } from '../../services'

afterEach(() => vi.restoreAllMocks())

const rutas = (
  <Routes>
    <Route path="/admin/usuarios/:id/compras" element={<HistorialCompras />} />
  </Routes>
)

const contador = (titulo) => screen.getByText(titulo).closest('[data-testid="contador"]')

describe('HistorialCompras', () => {
  test('muestra el resumen y los pedidos de Camila (reutiliza MisPedidos)', async () => {
    renderConProviders(rutas, { ruta: '/admin/usuarios/4/compras' })
    expect(await screen.findByText(/Camila Pérez Soto/)).toBeInTheDocument()
    expect(contador('Compras')).toHaveTextContent('2')
    expect(contador('Total gastado')).toHaveTextContent('$105.000')
    expect(contador('Última compra')).toHaveTextContent('22-10-2026')
    expect(await screen.findAllByTestId('pedido')).toHaveLength(2)
  })

  test('un usuario sin compras', async () => {
    renderConProviders(rutas, { ruta: '/admin/usuarios/3/compras' })
    expect(await screen.findByText(/Pedro Soto Rojas/)).toBeInTheDocument()
    expect(contador('Compras')).toHaveTextContent('0')
    expect(contador('Última compra')).toHaveTextContent('—')
    expect(await screen.findByText('Aún no tienes pedidos.')).toBeInTheDocument()
  })

  test('si el usuario no existe, avisa', async () => {
    renderConProviders(rutas, { ruta: '/admin/usuarios/99/compras' })
    expect(await screen.findByText(/No existe el usuario 99/)).toBeInTheDocument()
  })

  test('si el service falla, muestra el error', async () => {
    vi.spyOn(ordenesService, 'listarPorUsuario').mockRejectedValue(new Error('Error de red'))
    renderConProviders(rutas, { ruta: '/admin/usuarios/4/compras' })
    expect(await screen.findByRole('alert')).toHaveTextContent('Error de red')
  })
})
