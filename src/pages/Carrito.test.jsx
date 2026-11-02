import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Routes, Route } from 'react-router-dom'
import Carrito from './Carrito'
import { renderConProviders } from '../test/utils'

const ITEM = {
  clave: 'PT001-u-', codigo: 'PT001', nombre: 'Empanada de Manzana', imagen: '',
  categoriaId: 5, forma: null, tamano: null, personas: null, mensaje: '',
  precioUnitario: 3000, cantidad: 2, stock: 3,
}

const ponerCarrito = (id, items) => localStorage.setItem(`pms_carrito_${id}`, JSON.stringify(items))

const renderCarrito = (usuario = { id: 2 }) =>
  renderConProviders(
    <Routes>
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/checkout" element={<p>Página de checkout</p>} />
    </Routes>,
    { ruta: '/carrito', usuario }
  )

describe('Carrito', () => {
  beforeEach(() => localStorage.clear())

  test('vacío: muestra el aviso, 0 productos y el botón deshabilitado', () => {
    renderCarrito()
    expect(screen.getByText(/tu carrito est/i)).toBeInTheDocument()
    expect(screen.getByText('(0 productos)')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /confirmar pedido/i })).toBeDisabled()
  })

  test('muestra el item con su detalle y dice "producto" en singular', async () => {
    ponerCarrito(2, [ITEM])
    renderCarrito()
    await screen.findByText('Empanada de Manzana')
    expect(screen.getByText('Empanada de Manzana')).toBeInTheDocument()
    expect(screen.getByText(/2 unidad\(es\)/)).toBeInTheDocument()
    expect(screen.getByText('(1 producto)')).toBeInTheDocument()
  })

  test('suma hasta el stock y luego deshabilita el +', async () => {
    const user = userEvent.setup()
    ponerCarrito(2, [ITEM])
    renderCarrito()
    await screen.findByText('Empanada de Manzana')
    await user.click(screen.getByRole('button', { name: 'Sumar uno' }))
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sumar uno' })).toBeDisabled()
  })

  test('eliminar quita el producto', async () => {
    const user = userEvent.setup()
    ponerCarrito(2, [ITEM])
    renderCarrito()
    await screen.findByText('Empanada de Manzana')
    await user.click(screen.getByRole('button', { name: 'Eliminar producto' }))
    expect(screen.queryByText('Empanada de Manzana')).not.toBeInTheDocument()
  })

  test('vaciar deja el carrito en 0', async () => {
    const user = userEvent.setup()
    ponerCarrito(2, [ITEM])
    renderCarrito()
    await screen.findByText('Empanada de Manzana')
    await user.click(screen.getByText(/vaciar/i))
    expect(screen.getByText('(0 productos)')).toBeInTheDocument()
  })

  test('muestra una línea por cada descuento aplicado (código FELICES50)', async () => {
    ponerCarrito(3, [ITEM])
    renderCarrito({ id: 3 })
    expect(await screen.findByText(/FELICES50/)).toBeInTheDocument()
  })

  test('confirmar pedido lleva al checkout', async () => {
    const user = userEvent.setup()
    ponerCarrito(2, [ITEM])
    renderCarrito()
    await screen.findByText('Empanada de Manzana')
    await user.click(screen.getByRole('button', { name: /confirmar pedido/i }))
    expect(screen.getByText('Página de checkout')).toBeInTheDocument()
  })
})

