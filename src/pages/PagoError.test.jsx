import { screen } from '@testing-library/react'
import PagoError from './PagoError'
import { renderConProviders } from '../test/utils'

describe('PagoError', () => {
  test('muestra el mensaje que llega por state', () => {
    renderConProviders(<PagoError />, { ruta: { pathname: '/pago/error', state: { mensaje: 'Sin stock de Torta X' } } })
    expect(screen.getByText('Sin stock de Torta X')).toBeInTheDocument()
  })

  test('sin mensaje muestra el texto por defecto y los links', () => {
    renderConProviders(<PagoError />, { ruta: '/pago/error' })
    expect(screen.getByText('No pudimos procesar tu pedido.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /reintentar pago/i })).toHaveAttribute('href', '/checkout')
    expect(screen.getByRole('link', { name: /volver al carrito/i })).toHaveAttribute('href', '/carrito')
  })
})

