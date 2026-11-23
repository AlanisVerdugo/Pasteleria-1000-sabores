import { Navigate, Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import TiendaLayout from './layouts/TiendaLayout'
import AdminLayout from './layouts/AdminLayout'
import RutaProtegida from './components/RutaProtegida'
import RutaAdmin from './components/RutaAdmin'
import SubirAlInicio from './components/SubirAlInicio'

//tienda
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import Ofertas from './pages/Ofertas'
import Categorias from './pages/Categorias'
import CategoriaDetalle from './pages/CategoriaDetalle'
import DetalleProducto from './pages/DetalleProducto'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import PagoExito from './pages/PagoExito'
import PagoError from './pages/PagoError'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Blog from './pages/Blog'
import DetalleBlog from './pages/DetalleBlog'
import Nosotros from './pages/Nosotros'
import Perfil from './pages/Perfil'
import Pedidos from './pages/Pedidos'
import Contacto from './pages/Contacto'
import Despacho from './pages/Despacho'
import PreguntasFrecuentes from './pages/PreguntasFrecuentes'
import Terminos from './pages/Terminos'
import NoEncontrado from './pages/NoEncontrado'

//admin 
import Dashboard from './pages/admin/Dashboard'
import ProductosLista from './pages/admin/ProductosLista'
import ProductoEditor from './pages/admin/ProductoEditor'
import ProductoDetalle from './pages/admin/ProductoDetalle'
import ProductosCriticos from './pages/admin/ProductosCriticos'
import OrdenesLista from './pages/admin/OrdenesLista'
import OrdenDetalle from './pages/admin/OrdenDetalle'
import CategoriasLista from './pages/admin/CategoriasLista'
import CategoriaEditor from './pages/admin/CategoriaEditor'
import UsuariosLista from './pages/admin/UsuariosLista'
import UsuarioEditor from './pages/admin/UsuarioEditor'
import UsuarioDetalle from './pages/admin/UsuarioDetalle'
import HistorialCompras from './pages/admin/HistorialCompras'
import Reportes from './pages/admin/Reportes'
import MensajesContacto from './pages/admin/MensajesContacto'
import PerfilAdmin from './pages/admin/PerfilAdmin'


function InicioAdmin() {
  const { esVendedor } = useAuth()
  if (esVendedor) return <Navigate to="/admin/productos" replace />
  return <Dashboard />
}

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
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/categorias/:id" element={<CategoriaDetalle />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<RutaProtegida><Checkout /></RutaProtegida>} />
          <Route path="/pago/exito/:ordenId" element={<RutaProtegida><PagoExito /></RutaProtegida>} />
          <Route path="/pago/error" element={<RutaProtegida><PagoError /></RutaProtegida>} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/perfil" element={<RutaProtegida><Perfil /></RutaProtegida>} />
          <Route path="/mis-pedidos" element={<RutaProtegida><Pedidos /></RutaProtegida>} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<DetalleBlog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/despacho" element={<Despacho />} />
          <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="*" element={<NoEncontrado />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin" element={<RutaAdmin roles={['admin', 'vendedor']}><AdminLayout /></RutaAdmin>}>
          <Route index element={<InicioAdmin />} />
          <Route path="productos" element={<ProductosLista />} />
          <Route path="productos/nuevo" element={<RutaAdmin><ProductoEditor /></RutaAdmin>} />
          <Route path="productos/criticos" element={<RutaAdmin><ProductosCriticos /></RutaAdmin>} />
          <Route path="productos/:codigo" element={<ProductoDetalle />} />
          <Route path="productos/:codigo/editar" element={<RutaAdmin><ProductoEditor /></RutaAdmin>} />
          <Route path="categorias" element={<RutaAdmin><CategoriasLista /></RutaAdmin>} />
          <Route path="categorias/nueva" element={<RutaAdmin><CategoriaEditor /></RutaAdmin>} />
          <Route path="categorias/:id/editar" element={<RutaAdmin><CategoriaEditor /></RutaAdmin>} />
          <Route path="usuarios" element={<RutaAdmin><UsuariosLista /></RutaAdmin>} />
          <Route path="usuarios/nuevo" element={<RutaAdmin><UsuarioEditor /></RutaAdmin>} />
          <Route path="usuarios/:id" element={<RutaAdmin><UsuarioDetalle /></RutaAdmin>} />
          <Route path="usuarios/:id/editar" element={<RutaAdmin><UsuarioEditor /></RutaAdmin>} />
          <Route path="usuarios/:id/compras" element={<RutaAdmin><HistorialCompras /></RutaAdmin>} />
          <Route path="ordenes" element={<OrdenesLista />} />
          <Route path="ordenes/:id" element={<OrdenDetalle />} />
          <Route path="reportes" element={<RutaAdmin><Reportes /></RutaAdmin>} />
          <Route path="mensajes" element={<RutaAdmin><MensajesContacto /></RutaAdmin>} />
          <Route path="perfil" element={<RutaAdmin><PerfilAdmin /></RutaAdmin>} />
        </Route>
      </Routes>
    </>
  )
}
export default App