import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Routes, Route } from 'react-router-dom'
import DetalleProducto from '../../pages/DetalleProducto'
import { renderConProviders } from '../utils'

const renderDetalle = (codigo, usuario = null) =>
  renderConProviders(
    <Routes>
      <Route path="/producto/:codigo" element={<DetalleProducto />} />
    </Routes>,
    { ruta: `/producto/${codigo}`, usuario }
  )

describe('DetalleProducto', () => {
  beforeEach(() => localStorage.clear())

  test('muestra el producto, su categoría y la oferta', async () => {
    renderDetalle('TC001')
    expect(await screen.findByRole('heading', { name: 'Torta Cuadrada de Chocolate' })).toBeInTheDocument()
    expect((await screen.findAllByText('Tortas Cuadradas')).length).toBeGreaterThan(0)
    expect(screen.getByText(/10% de descuento/)).toBeInTheDocument()
  })

  test('parte con el tamaño más chico (8 personas)', async () => {
    renderDetalle('TC001')
    expect(await screen.findByText('8 Personas', { selector: '.tamano-elegido' })).toBeInTheDocument()
  })

  test('con stock bajo avisa "Últimas N"', async () => {
    renderDetalle('PSA001')
    expect(await screen.findByText(/ltimas 3/)).toBeInTheDocument()
  })

  test('sin sesión pide iniciar sesión al agregar', async () => {
    const user = userEvent.setup()
    renderDetalle('TC001')
    await user.click(await screen.findByRole('button', { name: /al carrito/i }))
    expect(screen.getByRole('alert')).toHaveTextContent(/iniciar sesi/i)
  })

  test('con sesión agrega al carrito con el tamaño y el mensaje', async () => {
    const user = userEvent.setup()
    renderDetalle('TC001', { id: 2 })
    await user.type(await screen.findByPlaceholderText(/feliz cumplea/i), 'Feliz día')
    await user.click(screen.getByRole('button', { name: /al carrito/i }))
    expect(await screen.findByText(/agregado/i)).toBeInTheDocument()
    const [item] = JSON.parse(localStorage.getItem('pms_carrito_2'))
    expect(item).toMatchObject({ codigo: 'TC001', personas: 8, mensaje: 'Feliz día' })
  })

  test('código inexistente muestra "Producto no encontrado"', async () => {
    renderDetalle('NOEXISTE')
    expect(await screen.findByText('Producto no encontrado')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver productos/i })).toHaveAttribute('href', '/productos')
  })
})

