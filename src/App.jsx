
// componentes
import Pie from './components/Pie';
import Cabecera from './components/Cabecera';


//paginas
import Home from './pages/Home';
import Boletas from './pages/Boletas';
import Login from './pages/Login';
import Pedidos from './pages/Pedidos';
import QuienesSomos from './pages/QuienesSomos';
import Registro from './pages/Registro';

import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Cabecera/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/catalogo" element={<Home/>} />
        <Route path="/blog" element={<Home/>} />
        <Route path="/quienes-somos" element={<QuienesSomos/>} />
        <Route path="/carrito" element={<Home/>} />
        <Route path="/boletas" element={<Boletas/>} />
        <Route path="/detalle-producto" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/pedidos" element={<Pedidos/>} />
        <Route path="/registro" element={<Registro/>} />
      </Routes>  

      <Pie/>
    </>
  ) 
}

export default App
