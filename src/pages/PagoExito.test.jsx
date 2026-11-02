import { screen } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import PagoExito from './PagoExito'
import { renderConProviders } from '../test/utils'
import { ordenesService } from '../services/ordenesService'

describe('PagoExito', () => {
  test('muestra el éxito, la boleta y el link a mis pedidos', async () => {
    const orden = await ordenesService.crear({
      usuarioId: 3, cliente: { nombre: 'Pedro', email: 'pedro@gmail.com' },
      items: [{ codigo: 'PT001', nombre: 'Empanada de Manzana', imagen: '', cantidad: 1, precio: 3000 }],
      despacho: { nombre: 'Pedro', calle: 'Calle 1', comuna: 'Santiago' },
      subtotal: 3000, descuento: 0, detalleDescuento: [], total: 6000,
    })
    renderConProviders(
      <Routes><Route path="/pago/exito/:ordenId" element={<PagoExito />} /></Routes>,
      { ruta: `/pago/exito/${orden.id}` }
    )
    expect(await screen.findByText(/pago exitoso/i)).toBeInTheDocument()
    expect(screen.getByText(orden.numero, { exact: false })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver mis pedidos/i })).toHaveAttribute('href', '/mis-pedidos')
  })
})

