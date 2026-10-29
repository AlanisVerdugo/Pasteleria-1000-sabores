import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alert, Badge, Table } from 'react-bootstrap'
import { productosService, categoriasService } from '../../services'
import { useListado } from '../../hooks/useListado'
import { formatearPrecio } from '../../utils/formato'
import { precioConOferta } from '../../utils/descuentos'
import { STOCK_CRITICO } from '../../utils/constantes'
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin'

// Mostrar producto (/admin/productos/:codigo): todos sus datos, sin editar
function ProductoDetalle() {
  const { codigo } = useParams()
  const cargar = useCallback(async () => {
    const producto = await productosService.obtenerPorId(codigo)
    const categoria = producto ? await categoriasService.obtenerPorId(producto.categoriaId) : null
    return { producto, categoria }
  }, [codigo])
  const { datos, cargando, error } = useListado(cargar, null)

  if (cargando) return <p>Cargando...</p>
  if (error) return <Alert variant="danger">{error}</Alert>
  const { producto, categoria } = datos
  if (!producto) {
    return (
      <Alert variant="warning">
        No existe el producto {codigo}. <Link to="/admin/productos">Volver a productos</Link>
      </Alert>
    )
  }

  return (
    <>
      <EncabezadoAdmin titulo={producto.nombre} subtitulo={`Código ${producto.codigo}`}>
        <Link to="/admin/productos" className="adm-btn-secundario">
          <i className="bi bi-arrow-left" aria-hidden="true"></i> Volver
        </Link>
        <Link to={`/admin/productos/${producto.codigo}/editar`} className="adm-btn-primario">
          <i className="bi bi-pencil" aria-hidden="true"></i> Editar
        </Link>
      </EncabezadoAdmin>

      <div className="adm-caja">
        <div className="row g-4">
          <div className="col-md-4">
            <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded-4" />
          </div>
          <div className="col-md-8">
            <p className="mb-2">{producto.descripcion || 'Sin descripción.'}</p>
            <ul className="list-unstyled mb-3">
              <li><strong>Categoría:</strong> {categoria?.nombre ?? 'Sin categoría'}</li>
              <li><strong>Precio base:</strong> {formatearPrecio(producto.precio)}</li>
              <li><strong>Oferta:</strong> {producto.oferta > 0 ? `${producto.oferta}% (queda en ${formatearPrecio(precioConOferta(producto))})` : 'Sin oferta'}</li>
              <li>
                <strong>Stock:</strong> {producto.stock}{' '}
                {producto.stock === 0 && <Badge bg="dark">Agotado</Badge>}
                {producto.stock > 0 && producto.stock < STOCK_CRITICO && <Badge bg="danger">Crítico</Badge>}
              </li>
              <li><strong>Forma:</strong> {producto.forma ?? 'No es torta'}</li>
              <li><strong>Mensaje personalizado:</strong> {producto.permiteMensaje ? 'Sí' : 'No'}</li>
              <li><strong>Estado:</strong> {producto.activo ? 'Activo' : 'Inactivo (no se ve en la tienda)'}</li>
            </ul>

            {producto.tamanos?.length > 0 && (
              <Table size="sm" className="adm-tabla">
                <thead><tr><th>Tamaño</th><th>Personas</th><th>Precio final</th></tr></thead>
                <tbody>
                  {producto.tamanos.map((t) => (
                    <tr key={t.id}>
                      <td>{t.id}</td>
                      <td>{t.personas}</td>
                      <td>{formatearPrecio(precioConOferta(producto, t.id))}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductoDetalle
