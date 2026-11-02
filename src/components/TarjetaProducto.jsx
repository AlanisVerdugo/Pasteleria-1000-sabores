import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formatearPrecio } from '../utils/formato'
import { useCarrito } from '../context/CarritoContext'
import { useAuth } from '../context/AuthContext'

// Se usa en Home (destacados y ofertas) y en el Catálogo.
function TarjetaProducto({ producto, vitrina = false }) {
  const { codigo, nombre, descripcion, precio, oferta, imagen, stock } = producto
  const precioFinal = oferta > 0 ? Math.round(precio * (1 - oferta / 100)) : precio
  const ruta = `/producto/${codigo}`
  const { agregar } = useCarrito()
  const { usuario } = useAuth()
  const navigate = useNavigate()
  const [agregado, setAgregado] = useState(false)

  // El tamaño más chico (menos personas) es el del precio que muestra la tarjeta
  const tamanoMenor = producto.tamanos?.length
    ? producto.tamanos.reduce((menor, t) => (t.personas < menor.personas ? t : menor)).id
    : null

  const agregarAlCarrito = () => {
    if (!usuario) {
      navigate('/login')
      return
    }
    if (agregar(producto, { tamano: tamanoMenor })) {
      setAgregado(true)
      setTimeout(() => setAgregado(false), 1500)
    }
  }

  return (
    <div className="col">
      <div className="card producto-card h-100" data-testid="tarjeta-producto">
        <Link to={ruta} className="producto-imagen-wrap">
          <img src={imagen} className="card-img-top" alt={nombre} />
          {oferta > 0 && <span className="badge-producto badge-oferta">-{oferta}%</span>}
          {stock === 0 && <span className="badge-producto badge-agotado">Agotado</span>}
        </Link>

        <div className="card-body d-flex flex-column">
          <Link to={ruta} className="producto-titulo-link">
            <h3 className="producto-titulo">{nombre}</h3>
          </Link>
          <p className="producto-detalle">{descripcion}</p>

          {!vitrina && (
            <div className="mt-auto d-flex justify-content-between align-items-center">
              <div>
                {oferta > 0 && <span className="producto-precio-antes">{formatearPrecio(precio)}</span>}
                <span className="producto-precio">{formatearPrecio(precioFinal)}</span>
              </div>
              <button
                type="button"
                className="btn-carrito"
                aria-label={`Agregar ${nombre} al carrito`}
                onClick={agregarAlCarrito}
                disabled={stock === 0}
              >
                <i className={`bi ${agregado ? 'bi-check-lg' : 'bi-cart-fill'}`}></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TarjetaProducto