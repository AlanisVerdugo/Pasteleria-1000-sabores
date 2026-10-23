import { screen } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import { renderConProviders } from '../test/utils'
import RutaProtegida from './RutaProtegida'
import RutaAdmin from './RutaAdmin'
import EnConstruccion from './EnConstruccion'
import NoEncontrado from '../pages/NoEncontrado'

const ADMIN = { id: 1 }
const CLIENTE = { id: 2 }

const rutas = (
  <Routes>
    <Route path="/" element={<p>Inicio</p>} />
    <Route path="/login" element={<p>Pantalla de login</p>} />
    <Route path="/perfil" element={<RutaProtegida><p>Mi perfil</p></RutaProtegida>} />
    <Route path="/admin" element={<RutaAdmin><p>Panel</p></RutaAdmin>} />
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

describe('RutaAdmin', () => {
  test('un cliente no entra al admin', async () => {
    renderConProviders(rutas, { ruta: '/admin', usuario: CLIENTE })
    expect(await screen.findByText('Inicio')).toBeInTheDocument()
  })
  test('el admin sí entra', async () => {
    renderConProviders(rutas, { ruta: '/admin', usuario: ADMIN })
    expect(await screen.findByText('Panel')).toBeInTheDocument()
  })
})

describe('páginas simples', () => {
  test('EnConstruccion muestra su título (props)', () => {
    renderConProviders(<EnConstruccion titulo="Ofertas" />)
    expect(screen.getByRole('heading', { name: 'Ofertas' })).toBeInTheDocument()
  })
  test('404 tiene link al inicio', () => {
    renderConProviders(<NoEncontrado />)
    expect(screen.getByRole('link', { name: /volver al inicio/i })).toHaveAttribute('href', '/')
  })
})