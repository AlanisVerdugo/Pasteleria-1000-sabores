
// componentes
import Pie from './components/Pie';
import Cabecera from './components/Cabecera';


//paginas
import Home from './pages/Home';
import Boletas from './pages/Boletas';

import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Cabecera/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/catalogo" element={<Home/>} />
        <Route path="/blog" element={<Home/>} />
        <Route path="/quienes-somos" element={<Home/>} />
        <Route path="/carrito" element={<Home/>} />
        <Route path="/boletas" element={<Boletas/>} />
        <Route path="/detalle-producto" element={<Home/>} />
        <Route path="/login" element={<Home/>} />
        <Route path="/pedidos" element={<Home/>} />
        <Route path="/registro" element={<Home/>} />
      </Routes>  

      <Pie/>
    </>
  ) 
}

export default App
