import { screen } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import UsuarioDetalle from './UsuarioDetalle'
import { renderConProviders } from '../../test/utils'
import { usuariosService } from '../../services'

afterEach(() => vi.restoreAllMocks())

const rutas = (
  <Routes>
    <Route path="/admin/usuarios/:id" element={<UsuarioDetalle />} />
  </Routes>
)

describe('UsuarioDetalle', () => {
  test('muestra los datos y el descuento de mayor de 50 (Rosa)', async () => {
    renderConProviders(rutas, { ruta: '/admin/usuarios/2', usuario: { id: 1 } })
    expect(await screen.findByRole('heading', { name: 'Rosa Muñoz Díaz' })).toBeInTheDocument()
    expect(screen.getByText('50%')).toBeInTheDocument()
    expect(screen.getByText(/Mayor de 50 años/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Historial de compras/ })).toHaveAttribute('href', '/admin/usuarios/2/compras')
  })

  test('una estudiante Duoc de cumpleaños hoy tiene la torta gratis (Camila)', async () => {
    renderConProviders(rutas, { ruta: '/admin/usuarios/4', usuario: { id: 1 } })
    expect(await screen.findByText(/Torta gratis en su cumpleaños/)).toBeInTheDocument()
    expect(screen.getByText('¡Es hoy!')).toBeInTheDocument()
    expect(screen.getByText('Estudiante Duoc UC')).toBeInTheDocument()
    expect(screen.getByText('Sin descuento.')).toBeInTheDocument()
  })

  test('si no existe, avisa', async () => {
    renderConProviders(rutas, { ruta: '/admin/usuarios/99', usuario: { id: 1 } })
    expect(await screen.findByText(/No existe el usuario 99/)).toBeInTheDocument()
  })

  test('si el service falla, muestra el error', async () => {
    vi.spyOn(usuariosService, 'obtenerPorId').mockRejectedValue(new Error('Error de red'))
    renderConProviders(rutas, { ruta: '/admin/usuarios/2' })
    expect(await screen.findByRole('alert')).toHaveTextContent('Error de red')
  })
})
