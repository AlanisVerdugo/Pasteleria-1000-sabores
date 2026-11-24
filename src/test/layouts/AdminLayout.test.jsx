import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../../layouts/AdminLayout'
import { renderConProviders } from '../utils'
import { agregarVendedor } from '../falso/vendedor'

const ADMIN = { id: 1 }

const rutas = (
  <Routes>
    <Route path="/" element={<p>Tienda</p>} />
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<p>Contenido del dashboard</p>} />
      <Route path="productos/criticos" element={<p>Contenido de críticos</p>} />
    </Route>
  </Routes>
)

describe('AdminLayout', () => {
  test('muestra el sidebar completo y la página hija (Outlet)', async () => {
    renderConProviders(rutas, { ruta: '/admin', usuario: ADMIN })
    expect(await screen.findByText('Contenido del dashboard')).toBeInTheDocument()
    for (const texto of ['Dashboard', 'Productos', 'Críticos', 'Categorías', 'Usuarios', 'Órdenes', 'Reportes', 'Perfil']) {
      expect(screen.getByRole('link', { name: texto })).toBeInTheDocument()
    }
    expect(screen.getByRole('button', { name: /Salir/ })).toBeInTheDocument()
  })

  test('marca como activo el link de la página actual', async () => {
    renderConProviders(rutas, { ruta: '/admin/productos/criticos', usuario: ADMIN })
    await screen.findByText('Contenido de críticos')
    expect(screen.getByRole('link', { name: 'Críticos' })).toHaveClass('active')
    expect(screen.getByRole('link', { name: 'Productos' })).not.toHaveClass('active')
    expect(screen.getByRole('link', { name: 'Dashboard' })).not.toHaveClass('active')
  })

  test('Salir cierra la sesión y vuelve a la tienda', async () => {
    const user = userEvent.setup()
    renderConProviders(rutas, { ruta: '/admin', usuario: ADMIN })
    expect(await screen.findByText(/Panel admin · Admin/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Salir/ }))
    expect(await screen.findByText('Tienda')).toBeInTheDocument()
    expect(localStorage.getItem('pms_token')).toBeNull()
  })

  test('el admin ve los 9 enlaces del menú', async () => {
    renderConProviders(rutas, { ruta: '/admin', usuario: ADMIN })
    const menu = await screen.findByRole('navigation', { name: 'Menú del administrador' })
    const enlaces = within(menu).getAllByRole('link').filter((a) => a.textContent.trim() !== 'Volver a la tienda')
    expect(enlaces).toHaveLength(9)
  })

  test('el vendedor solo ve Productos y Órdenes, con el subtítulo "Panel vendedor"', async () => {
    const vendedor = agregarVendedor()
    renderConProviders(rutas, { ruta: '/admin', usuario: vendedor })
    expect(await screen.findByText(/Panel vendedor · Vale/)).toBeInTheDocument()
    const menu = screen.getByRole('navigation', { name: 'Menú del administrador' })
    const textos = within(menu).getAllByRole('link').map((a) => a.textContent.trim())
    expect(textos).toEqual(['Productos', 'Órdenes', 'Volver a la tienda'])
    for (const oculto of ['Dashboard', 'Críticos', 'Categorías', 'Usuarios', 'Mensajes', 'Reportes', 'Perfil']) {
      expect(within(menu).queryByRole('link', { name: oculto })).not.toBeInTheDocument()
    }
    expect(screen.getByRole('button', { name: /Salir/ })).toBeInTheDocument()
  })
})
