import { Routes, Route } from 'react-router-dom'
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
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pago/exito/:ordenId" element={<PagoExito />} />
          <Route path="/pago/error" element={<PagoError />} />
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
        <Route path="/admin" element={<RutaAdmin><AdminLayout /></RutaAdmin>}>
          <Route index element={<Dashboard />} />
          <Route path="productos" element={<ProductosLista />} />
          <Route path="productos/nuevo" element={<ProductoEditor />} />
          <Route path="productos/criticos" element={<ProductosCriticos />} />
          <Route path="productos/:codigo" element={<ProductoDetalle />} />
          <Route path="productos/:codigo/editar" element={<ProductoEditor />} />
          <Route path="categorias" element={<CategoriasLista />} />
          <Route path="categorias/nueva" element={<CategoriaEditor />} />
          <Route path="categorias/:id/editar" element={<CategoriaEditor />} />
          <Route path="usuarios" element={<UsuariosLista />} />
          <Route path="usuarios/nuevo" element={<UsuarioEditor />} />
          <Route path="usuarios/:id" element={<UsuarioDetalle />} />
          <Route path="usuarios/:id/editar" element={<UsuarioEditor />} />
          <Route path="usuarios/:id/compras" element={<HistorialCompras />} />
          <Route path="ordenes" element={<OrdenesLista />} />
          <Route path="ordenes/:id" element={<OrdenDetalle />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="mensajes" element={<MensajesContacto />} />
          <Route path="perfil" element={<PerfilAdmin />} />
        </Route>
      </Routes>
    </>
  )
}
export default App