import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Routes, Route } from 'react-router-dom'
import Checkout from './Checkout'
import { renderConProviders } from '../test/utils'
import { pagosService } from '../services/otrosService'
import { ordenesRepo } from '../data/ordenes'
import RutaProtegida from '../components/RutaProtegida'

const PEDRO = { id: 3 }
const ITEM = {
  clave: 'PT001-u-', codigo: 'PT001', nombre: 'Empanada de Manzana', imagen: '',
  categoriaId: 5, forma: null, tamano: null, personas: null, mensaje: '',
  precioUnitario: 3000, cantidad: 2, stock: 30,
}

const ponerCarrito = (items) => localStorage.setItem('pms_carrito_3', JSON.stringify(items))
const leerCarrito = () => JSON.parse(localStorage.getItem('pms_carrito_3'))

const renderCheckout = () =>
  renderConProviders(
    <Routes>
      <Route path="/checkout" element={<RutaProtegida><Checkout /></RutaProtegida>} />
      <Route path="/pago/exito/:id" element={<p>Página de éxito</p>} />
      <Route path="/pago/error" element={<p>Página de error</p>} />
    </Routes>,
    { ruta: '/checkout', usuario: PEDRO }
  )

describe('Checkout', () => {
  beforeEach(() => {
    localStorage.clear()
    // El pago real espera 800 ms, el test es instantáneo
    vi.spyOn(pagosService, 'procesarPago').mockImplementation(({ simularFallo }) =>
      simularFallo ? Promise.reject(new Error('Pago rechazado (simulado)')) : Promise.resolve({ aprobado: true })
    )
  })
  afterEach(() => vi.restoreAllMocks())

  test('con el carrito vacío muestra el aviso y el link al catálogo', async () => {
    renderCheckout()
    expect(await screen.findByText(/no hay nada que pagar/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ir al cat/i })).toBeInTheDocument()
  })

  test('precarga el nombre del usuario y muestra el resumen', async () => {
    ponerCarrito([ITEM])
    renderCheckout()
    expect(await screen.findByLabelText('Nombre de quien recibe')).toHaveValue('Pedro')
    expect(screen.getByText('2x Empanada de Manzana')).toBeInTheDocument()
  })

  test('no paga si faltan datos de despacho', async () => {
    const user = userEvent.setup()
    ponerCarrito([ITEM])
    renderCheckout()
    await user.clear(await screen.findByLabelText('Nombre de quien recibe'))
    await user.click(screen.getByRole('button', { name: /pagar/i }))
    expect(screen.getByLabelText('Nombre de quien recibe')).toHaveClass('is-invalid')
    expect(pagosService.procesarPago).not.toHaveBeenCalled()
  })

  test('pago exitoso: crea la orden con el cliente, vacía el carrito y va a éxito', async () => {
    const user = userEvent.setup()
    ponerCarrito([ITEM])
    renderCheckout()
    await user.type(await screen.findByLabelText(/calle/i, {}, { timeout: 3000 }), 'Av. Siempre Viva 123')
    await user.type(screen.getByLabelText('Comuna'), 'Santiago')
    await user.click(screen.getByRole('button', { name: /pagar/i }))

    expect(await screen.findByText('Página de éxito')).toBeInTheDocument()
    const orden = ordenesRepo.listar().at(-1)
    expect(orden.cliente.nombre).toBe('Pedro')
    expect(orden.despacho.comuna).toBe('Santiago')
    expect(leerCarrito()).toEqual([])
  })

  test('pago rechazado: va a error y NO vacía el carrito', async () => {
    const user = userEvent.setup()
    ponerCarrito([ITEM])
    renderCheckout()
    await user.type(await screen.findByLabelText(/calle/i, {}, { timeout: 3000 }), 'Av. Siempre Viva 123')
    await user.type(screen.getByLabelText('Comuna'), 'Santiago')
    await user.click(screen.getByRole('button', { name: /simular fallo/i }))

    expect(await screen.findByText('Página de error')).toBeInTheDocument()
    expect(leerCarrito()).toHaveLength(1)
  })
})

