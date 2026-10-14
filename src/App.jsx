
// componentes
import Pie from './components/Pie';
import Cabecera from './components/Cabecera';


//paginas
import Home from './pages/Home';
import Boletas from './pages/Boletas';
import Blog from './pages/Blog';
import Carrito from './pages/Carrito';
import Catalogo from './pages/Catalogo';
import DetalleProducto from './pages/DetalleProducto';

import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Cabecera/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/catalogo" element={<Catalogo/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/quienes-somos" element={<Home/>} />
        <Route path="/carrito" element={<Carrito/>} />
        <Route path="/boletas" element={<Boletas/>} />
        <Route path="/detalle-producto" element={<DetalleProducto/>} />
        <Route path="/login" element={<Home/>} />
        <Route path="/pedidos" element={<Home/>} />
        <Route path="/registro" element={<Home/>} />
      </Routes>  

      <Pie/>
    </>
  ) 
}

export default App
