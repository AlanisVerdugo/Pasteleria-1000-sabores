import { screen } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import ProductoDetalle from './ProductoDetalle'
import { renderConProviders } from '../../test/utils'
import { productosService } from '../../services'

afterEach(() => vi.restoreAllMocks())

const rutas = (
  <Routes>
    <Route path="/admin/productos/:codigo" element={<ProductoDetalle />} />
  </Routes>
)

describe('ProductoDetalle', () => {
  test('muestra los datos de una torta con sus tamaños y la oferta', async () => {
    renderConProviders(rutas, { ruta: '/admin/productos/TC001' })
    expect(await screen.findByRole('heading', { name: 'Torta Cuadrada de Chocolate' })).toBeInTheDocument()
    expect(screen.getByText('Tortas Cuadradas')).toBeInTheDocument()
    expect(screen.getByText(/10% \(queda en \$40\.500\)/)).toBeInTheDocument()
    expect(screen.getByText('mediana')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Editar/ })).toHaveAttribute('href', '/admin/productos/TC001/editar')
  })

  test('un producto sin oferta, agotado y que no es torta', async () => {
    renderConProviders(rutas, { ruta: '/admin/productos/PT002' })
    expect(await screen.findByRole('heading', { name: 'Tarta de Santiago' })).toBeInTheDocument()
    expect(screen.getByText('Sin oferta')).toBeInTheDocument()
    expect(screen.getByText('Agotado')).toBeInTheDocument()
    expect(screen.getByText('No es torta')).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  test('un stock crítico se marca', async () => {
    renderConProviders(rutas, { ruta: '/admin/productos/PG002' })
    expect(await screen.findByText('Crítico')).toBeInTheDocument()
  })

  test('si el producto no existe, avisa', async () => {
    renderConProviders(rutas, { ruta: '/admin/productos/XX999' })
    expect(await screen.findByText(/No existe el producto XX999/)).toBeInTheDocument()
  })

  test('si el service falla, muestra el error', async () => {
    vi.spyOn(productosService, 'obtenerPorId').mockRejectedValue(new Error('Error de red'))
    renderConProviders(rutas, { ruta: '/admin/productos/TC001' })
    expect(await screen.findByRole('alert')).toHaveTextContent('Error de red')
  })
})
