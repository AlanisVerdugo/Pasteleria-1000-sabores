import { screen } from '@testing-library/react'
import Pedidos from './Pedidos'
import { renderConProviders } from '../test/utils'
import RutaProtegida from '../components/RutaProtegida'

describe('Pedidos', () => {
  test('muestra el título de seguimiento para el usuario con sesión', async () => {
    renderConProviders(<RutaProtegida><Pedidos /></RutaProtegida>, { usuario: { id: 2 } })
    expect(await screen.findByRole('heading', { name: 'Seguimiento de Mis Pedidos' })).toBeInTheDocument()
  })
})

