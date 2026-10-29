import { Link } from 'react-router-dom'
import { Table, Alert, Badge, ProgressBar } from 'react-bootstrap'
import { productosService } from '../../services'
import { useListado } from '../../hooks/useListado'
import { STOCK_CRITICO } from '../../utils/constantes'
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin'

// Productos críticos (D2): stock < STOCK_CRITICO. Solo se ven en el admin;
// el cliente solo ve "Agotado" cuando el stock llega a 0.
function ProductosCriticos() {
  const { datos, cargando, error } = useListado(productosService.listarCriticos)

  if (cargando) return <p>Cargando productos críticos...</p>
  if (error) return <Alert variant="danger">{error}</Alert>

  // Primero los que tienen menos stock (copia con [...] para no tocar el original)
  const ordenados = [...datos].sort((a, b) => a.stock - b.stock)

  return (
    <>
      <EncabezadoAdmin
        titulo="Productos críticos"
        subtitulo={`Productos con stock menor a ${STOCK_CRITICO} unidades`}
      >
        <Link to="/admin/productos" className="adm-btn-secundario">
          <i className="bi bi-arrow-left" aria-hidden="true"></i> Todos los productos
        </Link>
      </EncabezadoAdmin>

      <div className="adm-caja">
        {ordenados.length === 0 ? (
          <p className="mb-0">
            <i className="bi bi-check-circle text-success" aria-hidden="true"></i> No hay productos críticos. ¡Todo el stock está al día!
          </p>
        ) : (
          <Table responsive hover className="adm-tabla align-middle mb-0">
            <thead>
              <tr><th></th><th>Código</th><th>Nombre</th><th>Stock</th><th style={{ minWidth: 160 }}>Nivel</th><th></th></tr>
            </thead>
            <tbody>
              {ordenados.map((p) => (
                <tr key={p.codigo} data-testid="fila-critico">
                  <td><img src={p.imagen} alt={p.nombre} /></td>
                  <td>{p.codigo}</td>
                  <td>{p.nombre}</td>
                  <td>
                    {p.stock === 0 ? <Badge bg="dark">Agotado</Badge> : <Badge bg="danger">{p.stock}</Badge>}
                  </td>
                  <td>
                    <ProgressBar variant={p.stock === 0 ? 'dark' : 'danger'} now={(p.stock / STOCK_CRITICO) * 100}
                      label={`${p.stock}/${STOCK_CRITICO}`} aria-label={`Stock de ${p.nombre}`} />
                  </td>
                  <td>
                    <Link to={`/admin/productos/${p.codigo}/editar`} className="btn btn-sm btn-outline-primary">
                      Reponer stock
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  )
}

export default ProductosCriticos
