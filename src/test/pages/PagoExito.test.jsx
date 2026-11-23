import { screen } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import PagoExito from '../../pages/PagoExito'
import { renderConProviders } from '../utils'
import { authService, ordenesService } from '../../services'

describe('PagoExito', () => {
  test('muestra el éxito, la boleta y el link a mis pedidos', async () => {
    await authService.login('pedro@gmail.com', '1234')
    const orden = await ordenesService.crear({
      items: [{ codigo: 'PT001', cantidad: 1 }],
      despacho: { nombre: 'Pedro', calle: 'Calle 1', comuna: 'Santiago' },
    })
    renderConProviders(
      <Routes><Route path="/pago/exito/:ordenId" element={<PagoExito />} /></Routes>,
      { ruta: `/pago/exito/${orden.id}`, usuario: { id: 3 } },
    )
    expect(await screen.findByText(/pago exitoso/i)).toBeInTheDocument()
    expect(screen.getByText(orden.numero, { exact: false })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver mis pedidos/i })).toHaveAttribute('href', '/mis-pedidos')
  })
})