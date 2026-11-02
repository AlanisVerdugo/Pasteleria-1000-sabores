import { screen } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import { renderConProviders } from '../utils'
import RutaProtegida from '../../components/RutaProtegida'

const CLIENTE = { id: 2 }

const rutas = (
  <Routes>
    <Route path="/login" element={<p>Pantalla de login</p>} />
    <Route path="/perfil" element={<RutaProtegida><p>Mi perfil</p></RutaProtegida>} />
  </Routes>
)

describe('RutaProtegida', () => {
  test('sin sesión manda al login', async () => {
    renderConProviders(rutas, { ruta: '/perfil' })
    expect(await screen.findByText('Pantalla de login')).toBeInTheDocument()
  })
  test('con sesión muestra la página', async () => {
    renderConProviders(rutas, { ruta: '/perfil', usuario: CLIENTE })
    expect(await screen.findByText('Mi perfil')).toBeInTheDocument()
  })
})

