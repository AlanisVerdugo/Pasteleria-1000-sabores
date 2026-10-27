import { Routes, Route } from 'react-router-dom'
import TiendaLayout from './layouts/TiendaLayout'
import AdminLayout from './layouts/AdminLayout'
import RutaProtegida from './components/RutaProtegida'
import RutaAdmin from './components/RutaAdmin'
import EnConstruccion from './components/EnConstruccion'
import SubirAlInicio from './components/SubirAlInicio'

import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import DetalleProducto from './pages/DetalleProducto'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Blog from './pages/Blog'
import DetalleBlog from './pages/DetalleBlog'
import Nosotros from './pages/Nosotros'
import Boletas from './pages/Boletas'
import Perfil from './pages/Perfil'
import Pedidos from './pages/Pedidos'
import Contacto from './pages/Contacto'
import NoEncontrado from './pages/NoEncontrado'

const enConstruccion = (titulo) => <EnConstruccion titulo={titulo} />

function App() {
  return (
    <>
      <SubirAlInicio />
      <Routes>
        {/* TIENDA */}
        <Route element={<TiendaLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Catalogo />} />
          <Route path="/producto/:codigo" element={<DetalleProducto />} />
          <Route path="/categorias" element={enConstruccion('Categorías')} />
          <Route path="/categorias/:id" element={enConstruccion('Categoría')} />
          <Route path="/ofertas" element={enConstruccion('Ofertas')} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={enConstruccion('Checkout')} />
          <Route path="/pago/exito/:ordenId" element={enConstruccion('Pago correcto')} />
          <Route path="/pago/error" element={enConstruccion('Pago con error')} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/perfil" element={<RutaProtegida><Perfil /></RutaProtegida>} />
          <Route path="/mis-pedidos" element={<RutaProtegida><Pedidos /></RutaProtegida>} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<DetalleBlog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NoEncontrado />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin" element={<RutaAdmin><AdminLayout /></RutaAdmin>}>
          <Route index element={enConstruccion('Dashboard')} />
          <Route path="productos" element={enConstruccion('Productos')} />
          <Route path="productos/nuevo" element={enConstruccion('Nuevo producto')} />
          <Route path="productos/criticos" element={enConstruccion('Productos críticos')} />
          <Route path="productos/:codigo" element={enConstruccion('Producto')} />
          <Route path="productos/:codigo/editar" element={enConstruccion('Editar producto')} />
          <Route path="categorias" element={enConstruccion('Categorías')} />
          <Route path="categorias/nueva" element={enConstruccion('Nueva categoría')} />
          <Route path="categorias/:id/editar" element={enConstruccion('Editar categoría')} />
          <Route path="usuarios" element={enConstruccion('Usuarios')} />
          <Route path="usuarios/nuevo" element={enConstruccion('Nuevo usuario')} />
          <Route path="usuarios/:id" element={enConstruccion('Usuario')} />
          <Route path="usuarios/:id/editar" element={enConstruccion('Editar usuario')} />
          <Route path="usuarios/:id/compras" element={enConstruccion('Historial de compras')} />
          <Route path="ordenes" element={<Boletas />} />
          <Route path="ordenes/:id" element={enConstruccion('Boleta')} />
          <Route path="reportes" element={enConstruccion('Reportes')} />
          <Route path="perfil" element={enConstruccion('Perfil admin')} />
        </Route>
      </Routes>
    </>
  )
}
export default App