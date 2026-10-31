import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Table, Form, Badge, Alert } from 'react-bootstrap'
import { productosService, categoriasService } from '../../services'
import { useListado } from '../../hooks/useListado'
import { formatearPrecio } from '../../utils/formato'
import { STOCK_CRITICO } from '../../utils/constantes'
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin'
import ModalConfirmar from '../../components/admin/ModalConfirmar'

async function cargarProductos() {
  const [productos, categorias] = await Promise.all([productosService.listarTodos(), categoriasService.listar()])
  return { productos, categorias }
}

// Badge del stock: rojo si es crítico (D2), "Agotado" si es 0
function BadgeStock({ stock }) {
  if (stock === 0) return <Badge bg="dark">Agotado</Badge>
  if (stock < STOCK_CRITICO) return <Badge bg="danger">{stock}</Badge>
  return <Badge bg="success">{stock}</Badge>
}

// Listar productos (admin): búsqueda, filtro por categoría y eliminar con Modal
function ProductosLista() {
  const { datos, cargando, error, recargar } = useListado(cargarProductos, null)
  const location = useLocation()
  const [texto, setTexto] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [aEliminar, setAEliminar] = useState(null) // producto elegido para eliminar (abre el Modal)
  const [mensaje, setMensaje] = useState(location.state?.mensaje ?? '')
  const [errorAccion, setErrorAccion] = useState('')

  if (cargando) return <p>Cargando productos...</p>
  if (error) return <Alert variant="danger">{error}</Alert>

  const nombreCategoria = (id) => datos.categorias.find((c) => c.id === id)?.nombre ?? 'Sin categoría'
  const busqueda = texto.trim().toLowerCase()
  // filter encadenado: texto (nombre o código) + categoría
  const visibles = datos.productos.filter((p) =>
    (p.nombre.toLowerCase().includes(busqueda) || p.codigo.toLowerCase().includes(busqueda)) &&
    (!categoriaId || p.categoriaId === Number(categoriaId))
  )

  const eliminar = async () => {
    try {
      await productosService.eliminar(aEliminar.codigo)
      setMensaje(`Se eliminó "${aEliminar.nombre}"`)
      setErrorAccion('')
      recargar()
    } catch (err) {
      setErrorAccion(err.message)
    }
    setAEliminar(null)
  }

  return (
    <>
      <EncabezadoAdmin titulo="Productos" subtitulo={`${datos.productos.length} productos en total`}>
        <Link to="/admin/productos/criticos" className="adm-btn-secundario">
          <i className="bi bi-exclamation-triangle" aria-hidden="true"></i> Críticos
        </Link>
        <Link to="/admin/productos/nuevo" className="adm-btn-primario">
          <i className="bi bi-plus-lg" aria-hidden="true"></i> Nuevo producto
        </Link>
      </EncabezadoAdmin>

      {mensaje && <Alert variant="success" onClose={() => setMensaje('')} dismissible>{mensaje}</Alert>}
      {errorAccion && <Alert variant="danger">{errorAccion}</Alert>}

      <div className="adm-caja">
        <div className="row g-2 mb-3">
          <div className="col-md-7">
            <Form.Control type="search" placeholder="Buscar por nombre o código..." aria-label="Buscar producto"
              value={texto} onChange={(e) => setTexto(e.target.value)} />
          </div>
          <div className="col-md-5">
            <Form.Select aria-label="Filtrar por categoría" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
              <option value="">Todas las categorías</option>
              {datos.categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </Form.Select>
          </div>
        </div>

        {visibles.length === 0 ? (
          <p className="mb-0">No hay productos que coincidan con la búsqueda.</p>
        ) : (
          <Table responsive hover className="adm-tabla align-middle mb-0">
            <thead>
              <tr>
                <th></th><th>Código</th><th>Nombre</th><th>Categoría</th><th>Precio</th>
                <th>Oferta</th><th>Stock</th><th>Estado</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((p) => (
                <tr key={p.codigo} data-testid="fila-producto">
                  <td><img src={p.imagen} alt={p.nombre} /></td>
                  <td>{p.codigo}</td>
                  <td>{p.nombre}</td>
                  <td>{nombreCategoria(p.categoriaId)}</td>
                  <td>{formatearPrecio(p.precio)}</td>
                  <td>{p.oferta > 0 ? `${p.oferta}%` : '—'}</td>
                  <td><BadgeStock stock={p.stock} /></td>
                  <td>{p.activo ? <Badge bg="success">Activo</Badge> : <Badge bg="secondary">Inactivo</Badge>}</td>
                  <td className="text-nowrap">
                    <Link to={`/admin/productos/${p.codigo}`} className="btn btn-sm btn-outline-secondary me-1"
                      aria-label={`Ver ${p.nombre}`}><i className="bi bi-eye"></i></Link>
                    <Link to={`/admin/productos/${p.codigo}/editar`} className="btn btn-sm btn-outline-primary me-1"
                      aria-label={`Editar ${p.nombre}`}><i className="bi bi-pencil"></i></Link>
                    <button type="button" className="btn btn-sm btn-outline-danger"
                      aria-label={`Eliminar ${p.nombre}`} onClick={() => setAEliminar(p)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      <ModalConfirmar
        mostrar={Boolean(aEliminar)}
        titulo="Eliminar producto"
        mensaje={`¿Seguro que quieres eliminar "${aEliminar?.nombre}"? Esta acción no se puede deshacer.`}
        onConfirmar={eliminar}
        onCancelar={() => setAEliminar(null)}
      />
    </>
  )
}

export default ProductosLista
