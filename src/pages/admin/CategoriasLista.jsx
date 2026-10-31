import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Table, Alert } from 'react-bootstrap'
import { categoriasService, productosService } from '../../services'
import { useListado } from '../../hooks/useListado'
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin'
import ModalConfirmar from '../../components/admin/ModalConfirmar'

async function cargarCategorias() {
  const [categorias, productos] = await Promise.all([categoriasService.listar(), productosService.listarTodos()])
  return { categorias, productos }
}

// Listar categorías con cuántos productos tiene cada una.
// Eliminar: categoriasService.eliminar RECHAZA si la categoría tiene productos, y aquí mostramos ese error.
function CategoriasLista() {
  const { datos, cargando, error, recargar } = useListado(cargarCategorias, null)
  const location = useLocation()
  const [aEliminar, setAEliminar] = useState(null)
  const [mensaje, setMensaje] = useState(location.state?.mensaje ?? '')
  const [errorAccion, setErrorAccion] = useState('')

  if (cargando) return <p>Cargando categorías...</p>
  if (error) return <Alert variant="danger">{error}</Alert>

  const cantidadProductos = (id) => datos.productos.filter((p) => p.categoriaId === id).length

  const eliminar = async () => {
    try {
      await categoriasService.eliminar(aEliminar.id)
      setMensaje(`Se eliminó la categoría "${aEliminar.nombre}"`)
      setErrorAccion('')
      recargar()
    } catch (err) {
      setMensaje('')
      setErrorAccion(err.message)
    }
    setAEliminar(null)
  }

  return (
    <>
      <EncabezadoAdmin titulo="Categorías" subtitulo={`${datos.categorias.length} categorías`}>
        <Link to="/admin/categorias/nueva" className="adm-btn-primario">
          <i className="bi bi-plus-lg" aria-hidden="true"></i> Nueva categoría
        </Link>
      </EncabezadoAdmin>

      {mensaje && <Alert variant="success" onClose={() => setMensaje('')} dismissible>{mensaje}</Alert>}
      {errorAccion && <Alert variant="danger" onClose={() => setErrorAccion('')} dismissible>{errorAccion}</Alert>}

      <div className="adm-caja">
        {datos.categorias.length === 0 ? (
          <p className="mb-0">No hay categorías.</p>
        ) : (
          <Table responsive hover className="adm-tabla align-middle mb-0">
            <thead>
              <tr><th></th><th>ID</th><th>Nombre</th><th>Descripción</th><th>Productos</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {datos.categorias.map((c) => (
                <tr key={c.id} data-testid="fila-categoria">
                  <td>{c.imagen && <img src={c.imagen} alt={c.nombre} />}</td>
                  <td>{c.id}</td>
                  <td>{c.nombre}</td>
                  <td>{c.descripcion}</td>
                  <td>{cantidadProductos(c.id)}</td>
                  <td className="text-nowrap">
                    <Link to={`/admin/categorias/${c.id}/editar`} className="btn btn-sm btn-outline-primary me-1"
                      aria-label={`Editar ${c.nombre}`}><i className="bi bi-pencil"></i></Link>
                    <button type="button" className="btn btn-sm btn-outline-danger" aria-label={`Eliminar ${c.nombre}`}
                      onClick={() => setAEliminar(c)}>
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
        titulo="Eliminar categoría"
        mensaje={`¿Seguro que quieres eliminar la categoría "${aEliminar?.nombre}"?`}
        onConfirmar={eliminar}
        onCancelar={() => setAEliminar(null)}
      />
    </>
  )
}

export default CategoriasLista
