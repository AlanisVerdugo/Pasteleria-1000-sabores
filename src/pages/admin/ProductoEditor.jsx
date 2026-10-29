import { useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { productosService, categoriasService } from '../../services'
import { useListado } from '../../hooks/useListado'
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin'
import ProductoForm from '../../components/admin/ProductoForm'

// Una sola página para /admin/productos/nuevo y /admin/productos/:codigo/editar.
// Si la URL trae :codigo es edición: se precarga el producto (useParams).
function ProductoEditor() {
  const { codigo } = useParams()
  const esEdicion = Boolean(codigo)
  const navigate = useNavigate()

  // useCallback: la función solo cambia si cambia el código de la URL
  const cargar = useCallback(async () => {
    const [categorias, producto] = await Promise.all([
      categoriasService.listar(),
      codigo ? productosService.obtenerPorId(codigo) : null,
    ])
    return { categorias, producto }
  }, [codigo])
  const { datos, cargando, error } = useListado(cargar, null)

  const guardar = async (producto) => {
    try {
      if (esEdicion) await productosService.actualizar(codigo, producto)
      else await productosService.crear(producto)
    } catch (err) {
      // El repositorio responde 'Ya existe' cuando el código está repetido
      const mensaje = err.message === 'Ya existe' ? `Ya existe un producto con el código ${producto.codigo}` : err.message
      throw new Error(mensaje, { cause: err })
    }
    navigate('/admin/productos', {
      state: { mensaje: esEdicion ? `Se guardaron los cambios de "${producto.nombre}"` : `Se creó "${producto.nombre}"` },
    })
  }

  if (cargando) return <p>Cargando...</p>
  if (error) return <Alert variant="danger">{error}</Alert>
  if (esEdicion && !datos.producto) {
    return (
      <Alert variant="warning">
        No existe el producto {codigo}. <Link to="/admin/productos">Volver a productos</Link>
      </Alert>
    )
  }

  return (
    <>
      <EncabezadoAdmin
        titulo={esEdicion ? 'Editar producto' : 'Nuevo producto'}
        subtitulo={esEdicion ? `${datos.producto.codigo} · ${datos.producto.nombre}` : 'Completa los datos del producto'}
      >
        <Link to="/admin/productos" className="adm-btn-secundario">
          <i className="bi bi-arrow-left" aria-hidden="true"></i> Volver
        </Link>
      </EncabezadoAdmin>
      <ProductoForm inicial={datos.producto} categorias={datos.categorias} esEdicion={esEdicion} onGuardar={guardar} />
    </>
  )
}

export default ProductoEditor
