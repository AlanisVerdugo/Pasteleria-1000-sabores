import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Routes, Route } from 'react-router-dom'
import ProductoEditor from './ProductoEditor'
import ProductosLista from './ProductosLista'
import { renderConProviders } from '../../test/utils'
import { productosService } from '../../services'
import { productosRepo } from '../../data/productos'

afterEach(() => {
  vi.restoreAllMocks()
  productosRepo.reiniciar()
})

const rutas = (
  <Routes>
    <Route path="/admin/productos" element={<ProductosLista />} />
    <Route path="/admin/productos/nuevo" element={<ProductoEditor />} />
    <Route path="/admin/productos/:codigo/editar" element={<ProductoEditor />} />
  </Routes>
)

async function llenarNuevo(codigo) {
  await userEvent.type(await screen.findByLabelText('Código'), codigo)
  await userEvent.type(screen.getByLabelText('Nombre'), 'Torta de Lúcuma')
  await userEvent.selectOptions(screen.getByLabelText('Categoría'), '2')
  await userEvent.type(screen.getByLabelText('Precio base (CLP)'), '42000')
  await userEvent.type(screen.getByLabelText('Stock'), '6')
}

describe('ProductoEditor', () => {
  test('nuevo: crea el producto y vuelve a la lista con un aviso', async () => {
    renderConProviders(rutas, { ruta: '/admin/productos/nuevo' })
    expect(await screen.findByRole('heading', { name: 'Nuevo producto' })).toBeInTheDocument()
    await llenarNuevo('TT003')
    await userEvent.click(screen.getByRole('button', { name: /Crear producto/ }))

    expect(await screen.findByText('Se creó "Torta de Lúcuma"')).toBeInTheDocument()
    expect(screen.getAllByTestId('fila-producto')).toHaveLength(17)
  })

  test('nuevo: un código repetido muestra el error', async () => {
    renderConProviders(rutas, { ruta: '/admin/productos/nuevo' })
    await llenarNuevo('TC001')
    await userEvent.click(screen.getByRole('button', { name: /Crear producto/ }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Ya existe un producto con el código TC001')
  })

  test('editar: precarga el producto y guarda los cambios', async () => {
    const espia = vi.spyOn(productosService, 'actualizar')
    renderConProviders(rutas, { ruta: '/admin/productos/TC001/editar' })
    expect(await screen.findByRole('heading', { name: 'Editar producto' })).toBeInTheDocument()
    const stock = screen.getByLabelText('Stock')
    expect(stock).toHaveValue(10)
    await userEvent.clear(stock)
    await userEvent.type(stock, '3')
    await userEvent.click(screen.getByRole('button', { name: /Guardar cambios/ }))

    expect(espia).toHaveBeenCalledWith('TC001', expect.objectContaining({ stock: 3 }))
    expect(await screen.findByText('Se guardaron los cambios de "Torta Cuadrada de Chocolate"')).toBeInTheDocument()
  })

  test('editar un código que no existe avisa', async () => {
    renderConProviders(rutas, { ruta: '/admin/productos/XX999/editar' })
    expect(await screen.findByText(/No existe el producto XX999/)).toBeInTheDocument()
  })

  test('si fallan las categorías, muestra el error', async () => {
    const { categoriasService } = await import('../../services')
    vi.spyOn(categoriasService, 'listar').mockRejectedValue(new Error('Sin categorías'))
    renderConProviders(rutas, { ruta: '/admin/productos/nuevo' })
    expect(await screen.findByRole('alert')).toHaveTextContent('Sin categorías')
  })
})
