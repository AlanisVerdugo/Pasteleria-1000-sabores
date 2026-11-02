import { screen } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import { renderConProviders } from '../utils'
import RutaAdmin from '../../components/RutaAdmin'

const ADMIN = { id: 1 }
const CLIENTE = { id: 2 }

const rutas = (
  <Routes>
    <Route path="/" element={<p>Inicio</p>} />
    <Route path="/login" element={<p>Pantalla de login</p>} />
    <Route path="/admin" element={<RutaAdmin><p>Panel</p></RutaAdmin>} />
  </Routes>
)

describe('RutaAdmin', () => {
  test('sin sesión manda al login', async () => {
    renderConProviders(rutas, { ruta: '/admin' })
    expect(await screen.findByText('Pantalla de login')).toBeInTheDocument()
  })
  test('un cliente no entra al admin', async () => {
    renderConProviders(rutas, { ruta: '/admin', usuario: CLIENTE })
    expect(await screen.findByText('Inicio')).toBeInTheDocument()
  })
  test('el admin sí entra', async () => {
    renderConProviders(rutas, { ruta: '/admin', usuario: ADMIN })
    expect(await screen.findByText('Panel')).toBeInTheDocument()
  })
})

