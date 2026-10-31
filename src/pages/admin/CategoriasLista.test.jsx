import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Routes, Route } from 'react-router-dom'
import CategoriasLista from './CategoriasLista'
import CategoriaEditor from './CategoriaEditor'
import { renderConProviders } from '../../test/utils'
import { categoriasService } from '../../services'
import { categoriasRepo } from '../../data/categorias'

afterEach(() => {
  vi.restoreAllMocks()
  categoriasRepo.reiniciar()
})

const rutas = (
  <Routes>
    <Route path="/admin/categorias" element={<CategoriasLista />} />
    <Route path="/admin/categorias/nueva" element={<CategoriaEditor />} />
    <Route path="/admin/categorias/:id/editar" element={<CategoriaEditor />} />
  </Routes>
)

describe('CategoriasLista', () => {
  test('lista las 8 categorías con su cantidad de productos', async () => {
    renderConProviders(rutas, { ruta: '/admin/categorias' })
    const filas = await screen.findAllByTestId('fila-categoria')
    expect(filas).toHaveLength(8)
    expect(filas[0]).toHaveTextContent('Tortas Cuadradas')
    expect(within(filas[0]).getAllByRole('cell')[4]).toHaveTextContent('2')
  })

  test('no deja eliminar una categoría con productos y muestra el error del service', async () => {
    const user = userEvent.setup()
    renderConProviders(rutas, { ruta: '/admin/categorias' })
    await screen.findAllByTestId('fila-categoria')
    await user.click(screen.getByRole('button', { name: 'Eliminar Tortas Cuadradas' }))
    await user.click(screen.getByRole('button', { name: 'Eliminar' }))
    expect(await screen.findByText('No se puede eliminar: hay productos en esta categoría')).toBeInTheDocument()
    expect(screen.getAllByTestId('fila-categoria')).toHaveLength(8)
  })

  test('crea una categoría nueva y después la puede eliminar (no tiene productos)', async () => {
    const user = userEvent.setup()
    renderConProviders(rutas, { ruta: '/admin/categorias/nueva' })
    await user.type(await screen.findByLabelText('Nombre'), 'Kuchenes')
    await user.click(screen.getByRole('button', { name: /Crear categoría/ }))
    expect(await screen.findByText('Se creó la categoría "Kuchenes"')).toBeInTheDocument()
    expect(screen.getAllByTestId('fila-categoria')).toHaveLength(9)

    await user.click(screen.getByRole('button', { name: 'Eliminar Kuchenes' }))
    await user.click(screen.getByRole('button', { name: 'Eliminar' }))
    expect(await screen.findByText('Se eliminó la categoría "Kuchenes"')).toBeInTheDocument()
    expect(screen.getAllByTestId('fila-categoria')).toHaveLength(8)
  })

  test('no deja crear una categoría con un nombre repetido', async () => {
    const user = userEvent.setup()
    renderConProviders(rutas, { ruta: '/admin/categorias/nueva' })
    await user.type(await screen.findByLabelText('Nombre'), 'tortas cuadradas')
    await user.click(screen.getByRole('button', { name: /Crear categoría/ }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Ya existe la categoría "tortas cuadradas"')
  })

  test('edita una categoría precargada', async () => {
    const espia = vi.spyOn(categoriasService, 'actualizar')
    const user = userEvent.setup()
    renderConProviders(rutas, { ruta: '/admin/categorias/3/editar' })
    const nombre = await screen.findByLabelText('Nombre')
    expect(nombre).toHaveValue('Postres Individuales')
    await user.clear(nombre)
    await user.type(nombre, 'Postres en copa')
    await user.click(screen.getByRole('button', { name: /Guardar cambios/ }))
    expect(espia).toHaveBeenCalledWith('3', expect.objectContaining({ nombre: 'Postres en copa' }))
    expect(await screen.findByText('Se guardó la categoría "Postres en copa"')).toBeInTheDocument()
  })

  test('editar una categoría que no existe avisa', async () => {
    renderConProviders(rutas, { ruta: '/admin/categorias/99/editar' })
    expect(await screen.findByText(/No existe la categoría 99/)).toBeInTheDocument()
  })

  test('sin categorías muestra un aviso, y si el service falla muestra el error', async () => {
    vi.spyOn(categoriasService, 'listar').mockResolvedValueOnce([]).mockRejectedValueOnce(new Error('Falló'))
    const { unmount } = renderConProviders(rutas, { ruta: '/admin/categorias' })
    expect(await screen.findByText('No hay categorías.')).toBeInTheDocument()
    unmount()
    renderConProviders(rutas, { ruta: '/admin/categorias' })
    expect(await screen.findByRole('alert')).toHaveTextContent('Falló')
  })
})
