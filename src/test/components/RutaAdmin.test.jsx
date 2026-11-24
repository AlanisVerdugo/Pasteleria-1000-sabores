import { screen } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import { renderConProviders } from '../utils'
import RutaAdmin from '../../components/RutaAdmin'
import { agregarVendedor } from '../falso/vendedor'

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
    expect(await screen.findByText('Inicio')).toBeInTheDocument()
  })
  test('un cliente no entra al admin', async () => {
    renderConProviders(rutas, { ruta: '/admin', usuario: CLIENTE })
    expect(await screen.findByText('Inicio')).toBeInTheDocument()
  })
  test('el admin sí entra', async () => {
    renderConProviders(rutas, { ruta: '/admin', usuario: ADMIN })
    expect(await screen.findByText('Panel')).toBeInTheDocument()
  })

  describe('con roles', () => {
    const rutasConRoles = (
      <Routes>
        <Route path="/" element={<p>Inicio</p>} />
        <Route path="/admin/productos" element={<RutaAdmin roles={['admin', 'vendedor']}><p>Lista de productos</p></RutaAdmin>} />
        <Route path="/admin/usuarios" element={<RutaAdmin><p>Usuarios</p></RutaAdmin>} />
      </Routes>
    )

    test('el vendedor entra a una ruta que permite su rol', async () => {
      const vendedor = agregarVendedor()
      renderConProviders(rutasConRoles, { ruta: '/admin/productos', usuario: vendedor })
      expect(await screen.findByText('Lista de productos')).toBeInTheDocument()
    })

    test('el vendedor no entra a una ruta solo de admin (roles por defecto)', async () => {
      const vendedor = agregarVendedor()
      renderConProviders(rutasConRoles, { ruta: '/admin/usuarios', usuario: vendedor })
      expect(await screen.findByText('Inicio')).toBeInTheDocument()
      expect(screen.queryByText('Usuarios')).not.toBeInTheDocument()
    })

    test('un cliente tampoco entra aunque la ruta permita al vendedor', async () => {
      renderConProviders(rutasConRoles, { ruta: '/admin/productos', usuario: CLIENTE })
      expect(await screen.findByText('Inicio')).toBeInTheDocument()
    })
  })
})
