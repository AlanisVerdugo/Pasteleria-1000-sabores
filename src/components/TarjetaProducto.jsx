import { Link } from 'react-router-dom'
import { formatearPrecio } from '../utils/formato'

// Se usa en Home (destacados y ofertas) y en el Catálogo.
function TarjetaProducto({ producto, vitrina = false }) {
  const { codigo, nombre, descripcion, precio, oferta, imagen, stock } = producto
  const precioFinal = oferta > 0 ? Math.round(precio * (1 - oferta / 100)) : precio
  const ruta = `/producto/${codigo}`

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
              <Link to={ruta} className="btn-carrito" aria-label={`Ver ${nombre}`}>
                <i className="bi bi-cart-fill"></i>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TarjetaProducto