import { Link, Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className="d-flex">
      <nav className="p-3 border-end" style={{ minWidth: 200 }}>
        <h5>Panel admin</h5>
        <ul className="list-unstyled">
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/productos">Productos</Link></li>
          <li><Link to="/admin/categorias">Categorías</Link></li>
          <li><Link to="/admin/usuarios">Usuarios</Link></li>
          <li><Link to="/admin/ordenes">Órdenes</Link></li>
          <li><Link to="/admin/reportes">Reportes</Link></li>
          <li><Link to="/">Volver a la tienda</Link></li>
        </ul>
      </nav>
      <main className="flex-grow-1 p-4">
        <Outlet />
      </main>
    </div>
  )
}
export default AdminLayout