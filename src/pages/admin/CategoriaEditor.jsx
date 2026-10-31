import { useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { categoriasService } from '../../services'
import { useListado } from '../../hooks/useListado'
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin'
import CategoriaForm from '../../components/admin/CategoriaForm'

// /admin/categorias/nueva y /admin/categorias/:id/editar
function CategoriaEditor() {
  const { id } = useParams()
  const esEdicion = Boolean(id)
  const navigate = useNavigate()

  const cargar = useCallback(async () => {
    const categorias = await categoriasService.listar()
    return { categorias, categoria: id ? categorias.find((c) => c.id === Number(id)) ?? null : null }
  }, [id])
  const { datos, cargando, error } = useListado(cargar, null)

  const guardar = async (categoria) => {
    // No se permiten dos categorías con el mismo nombre
    const repetida = datos.categorias.some(
      (c) => c.nombre.toLowerCase() === categoria.nombre.toLowerCase() && c.id !== Number(id)
    )
    if (repetida) throw new Error(`Ya existe la categoría "${categoria.nombre}"`)

    if (esEdicion) await categoriasService.actualizar(id, categoria)
    else await categoriasService.crear(categoria)
    navigate('/admin/categorias', {
      state: { mensaje: esEdicion ? `Se guardó la categoría "${categoria.nombre}"` : `Se creó la categoría "${categoria.nombre}"` },
    })
  }

  if (cargando) return <p>Cargando...</p>
  if (error) return <Alert variant="danger">{error}</Alert>
  if (esEdicion && !datos.categoria) {
    return (
      <Alert variant="warning">
        No existe la categoría {id}. <Link to="/admin/categorias">Volver a categorías</Link>
      </Alert>
    )
  }

  return (
    <>
      <EncabezadoAdmin titulo={esEdicion ? 'Editar categoría' : 'Nueva categoría'}
        subtitulo={esEdicion ? datos.categoria.nombre : 'Completa los datos de la categoría'}>
        <Link to="/admin/categorias" className="adm-btn-secundario">
          <i className="bi bi-arrow-left" aria-hidden="true"></i> Volver
        </Link>
      </EncabezadoAdmin>
      <CategoriaForm inicial={datos.categoria} esEdicion={esEdicion} onGuardar={guardar} />
    </>
  )
}

export default CategoriaEditor
