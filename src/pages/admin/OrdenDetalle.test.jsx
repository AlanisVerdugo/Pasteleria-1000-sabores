import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Routes, Route } from 'react-router-dom'
import OrdenDetalle from './OrdenDetalle'
import { renderConProviders } from '../../test/utils'
import { ordenesService } from '../../services'
import { ordenesRepo } from '../../data/ordenes'

afterEach(() => {
  vi.restoreAllMocks()
  ordenesRepo.reiniciar()
})

const rutas = (
  <Routes>
    <Route path="/admin/ordenes/:id" element={<OrdenDetalle />} />
  </Routes>
)

describe('OrdenDetalle', () => {
  test('muestra la boleta de la orden con BoletaDetalle', async () => {
    renderConProviders(rutas, { ruta: '/admin/ordenes/1' })
    expect(await screen.findByRole('heading', { name: 'Boleta B-000001' })).toBeInTheDocument()
    expect(screen.getByTestId('boleta')).toHaveTextContent('Empanada de Manzana')
    expect(screen.getByRole('link', { name: /Historial del cliente/ })).toHaveAttribute('href', '/admin/usuarios/4/compras')
  })

  test('cambia el estado de despacho desde la boleta', async () => {
    renderConProviders(rutas, { ruta: '/admin/ordenes/2' })
    await screen.findByRole('heading', { name: 'Boleta B-000002' })
    await userEvent.selectOptions(screen.getByLabelText('Cambiar estado'), 'en_camino')
    expect(await screen.findByRole('status')).toHaveTextContent('Estado actualizado a "En camino"')
    expect(screen.getByLabelText('Cambiar estado')).toHaveValue('en_camino')
  })

  test('el botón Imprimir llama a window.print', async () => {
    const imprimir = vi.spyOn(window, 'print').mockImplementation(() => {})
    renderConProviders(rutas, { ruta: '/admin/ordenes/1' })
    await userEvent.click(await screen.findByRole('button', { name: /Imprimir/ }))
    expect(imprimir).toHaveBeenCalled()
  })

  test('si cambiar el estado falla, lo avisa', async () => {
    vi.spyOn(ordenesService, 'cambiarEstado').mockRejectedValue(new Error('Estado no válido'))
    renderConProviders(rutas, { ruta: '/admin/ordenes/2' })
    await screen.findByRole('heading', { name: 'Boleta B-000002' })
    await userEvent.selectOptions(screen.getByLabelText('Cambiar estado'), 'entregado')
    expect(await screen.findByText('Estado no válido')).toBeInTheDocument()
  })

  test('si la orden no existe, avisa', async () => {
    renderConProviders(rutas, { ruta: '/admin/ordenes/99' })
    expect(await screen.findByText(/No existe la orden 99/)).toBeInTheDocument()
  })

  test('si el service falla, muestra el error', async () => {
    vi.spyOn(ordenesService, 'obtenerPorId').mockRejectedValue(new Error('Error de red'))
    renderConProviders(rutas, { ruta: '/admin/ordenes/1' })
    expect(await screen.findByRole('alert')).toHaveTextContent('Error de red')
  })
})
