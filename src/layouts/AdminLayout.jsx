import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../css/admin.css'

// Menú lateral del admin. "end" en Dashboard hace que solo se marque en /admin exacto.
const MENU = [
  { ruta: '/admin', texto: 'Dashboard', icono: 'bi-speedometer2', end: true },
  { ruta: '/admin/productos', texto: 'Productos', icono: 'bi-box-seam', end: true },
  { ruta: '/admin/productos/criticos', texto: 'Críticos', icono: 'bi-exclamation-triangle' },
  { ruta: '/admin/categorias', texto: 'Categorías', icono: 'bi-tags' },
  { ruta: '/admin/usuarios', texto: 'Usuarios', icono: 'bi-people' },
  { ruta: '/admin/ordenes', texto: 'Órdenes', icono: 'bi-receipt' },
  { ruta: '/admin/reportes', texto: 'Reportes', icono: 'bi-bar-chart' },
  { ruta: '/admin/perfil', texto: 'Perfil', icono: 'bi-person-circle' },
]

function AdminLayout() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  const salir = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="d-flex adm-layout">
      <nav className="adm-sidebar" aria-label="Menú del administrador">
        <div className="adm-sidebar-marca">
          1000 Sabores
          <img
            src="/img/logo-pasteleria-1000-sabores.png"
            alt="Logo pastelería 1000 sabores"
            className="adm-sidebar-logo"
          />
        </div>
        <div className="adm-sidebar-sub">Panel admin · {usuario?.nombre}</div>

        {MENU.map((item) => (
          <NavLink key={item.ruta} to={item.ruta} end={item.end} className="adm-sidebar-link">
            <i className={`bi ${item.icono}`} aria-hidden="true"></i> {item.texto}
          </NavLink>
        ))}

        <div className="adm-sidebar-pie">
          <NavLink to="/" className="adm-sidebar-link">
            <i className="bi bi-shop" aria-hidden="true"></i> Volver a la tienda
          </NavLink>
          <button type="button" className="adm-btn-salir mt-2" onClick={salir}>
            <i className="bi bi-box-arrow-right" aria-hidden="true"></i> Salir
          </button>
        </div>
      </nav>

      <main className="adm-contenido">
        <Outlet />
      </main>
    </div>
  )
}
export default AdminLayout
