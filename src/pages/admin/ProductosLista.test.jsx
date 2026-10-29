import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductosLista from './ProductosLista'
import { renderConProviders } from '../../test/utils'
import { productosService } from '../../services'
import { productosRepo } from '../../data/productos'

afterEach(() => {
  vi.restoreAllMocks()
  productosRepo.reiniciar() // deja las semillas como estaban
})

describe('ProductosLista', () => {
  test('lista todos los productos con su categoría y stock', async () => {
    renderConProviders(<ProductosLista />)
    const filas = await screen.findAllByTestId('fila-producto')
    expect(filas).toHaveLength(16)
    const tc001 = filas.find((f) => f.textContent.includes('TC001'))
    expect(within(tc001).getByText('Tortas Cuadradas')).toBeInTheDocument()
    expect(within(tc001).getByText('$45.000')).toBeInTheDocument()
    // Tarta de Santiago tiene stock 0
    const pt002 = filas.find((f) => f.textContent.includes('PT002'))
    expect(within(pt002).getByText('Agotado')).toBeInTheDocument()
  })

  test('la búsqueda filtra por nombre o código', async () => {
    const user = userEvent.setup()
    renderConProviders(<ProductosLista />)
    await screen.findAllByTestId('fila-producto')
    await user.type(screen.getByLabelText('Buscar producto'), 'vegana')
    expect(screen.getAllByTestId('fila-producto')).toHaveLength(2)
    await user.clear(screen.getByLabelText('Buscar producto'))
    await user.type(screen.getByLabelText('Buscar producto'), 'zzz')
    expect(screen.getByText('No hay productos que coincidan con la búsqueda.')).toBeInTheDocument()
  })

  test('el filtro de categoría deja solo esa categoría', async () => {
    const user = userEvent.setup()
    renderConProviders(<ProductosLista />)
    await screen.findAllByTestId('fila-producto')
    await user.selectOptions(screen.getByLabelText('Filtrar por categoría'), '8')
    expect(screen.getAllByTestId('fila-producto')).toHaveLength(2)
  })

  test('eliminar pide confirmación y saca el producto de la lista', async () => {
    const user = userEvent.setup()
    renderConProviders(<ProductosLista />)
    await screen.findAllByTestId('fila-producto')
    await user.click(screen.getByRole('button', { name: 'Eliminar Pan Sin Gluten' }))
    expect(screen.getByText(/¿Seguro que quieres eliminar "Pan Sin Gluten"\?/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Eliminar' }))

    expect(await screen.findByText('Se eliminó "Pan Sin Gluten"')).toBeInTheDocument()
    expect(screen.getAllByTestId('fila-producto')).toHaveLength(15)
  })

  test('cancelar el modal no elimina nada', async () => {
    const espia = vi.spyOn(productosService, 'eliminar')
    const user = userEvent.setup()
    renderConProviders(<ProductosLista />)
    await screen.findAllByTestId('fila-producto')
    await user.click(screen.getByRole('button', { name: 'Eliminar Pan Sin Gluten' }))
    await user.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(espia).not.toHaveBeenCalled()
  })

  test('si el service falla al cargar, muestra el error', async () => {
    vi.spyOn(productosService, 'listarTodos').mockRejectedValue(new Error('No se pudo cargar'))
    renderConProviders(<ProductosLista />)
    expect(await screen.findByRole('alert')).toHaveTextContent('No se pudo cargar')
  })

  test('si eliminar falla, muestra el error', async () => {
    vi.spyOn(productosService, 'eliminar').mockRejectedValue(new Error('No encontrado'))
    const user = userEvent.setup()
    renderConProviders(<ProductosLista />)
    await screen.findAllByTestId('fila-producto')
    await user.click(screen.getByRole('button', { name: 'Eliminar Pan Sin Gluten' }))
    await user.click(screen.getByRole('button', { name: 'Eliminar' }))
    expect(await screen.findByText('No encontrado')).toBeInTheDocument()
  })
})
