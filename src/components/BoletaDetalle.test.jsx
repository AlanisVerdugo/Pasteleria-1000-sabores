import { render, screen } from '@testing-library/react'
import BoletaDetalle from './BoletaDetalle'

// Orden como las semillas: sin cliente, despacho, subtotal ni descuento
const ORDEN_SEMILLA = {
  id: 2, numero: 'B-000002', usuarioId: 4, estado: 'preparacion', fecha: '2026-10-22T18:30:00.000Z',
  items: [{ nombre: 'Torta Cuadrada de Chocolate', imagen: '/img/x.jpg', cantidad: 1, precio: 45000 }],
  total: 45000,
}

// Orden completa como la crea p2 en el pago (D19)
const ORDEN_COMPLETA = {
  id: 3, numero: 'B-000003', usuarioId: 2, estado: 'en_camino', fecha: '2026-10-28T12:00:00.000Z',
  cliente: { nombre: 'Rosa Muñoz', email: 'rosa@gmail.com', telefono: '+56911112222' },
  despacho: { region: 'Metropolitana', comuna: 'Ñuñoa', calle: 'Irarrázaval 100', fechaEntrega: '2026-10-30' },
  items: [
    { codigo: 'TC001', nombre: 'Torta Cuadrada de Chocolate', imagen: '/img/x.jpg', cantidad: 2, precio: 55000, tamano: 'mediana', mensaje: 'Feliz cumple' },
  ],
  subtotal: 110000,
  descuento: 55000,
  detalleDescuento: [{ motivo: 'Mayor de 50 años (50%)', monto: 55000 }],
  total: 55000,
}

describe('BoletaDetalle', () => {
  test('muestra número, productos y total de una orden semilla (sin campos opcionales)', () => {
    render(<BoletaDetalle orden={ORDEN_SEMILLA} />)
    expect(screen.getByText('N° B-000002')).toBeInTheDocument()
    expect(screen.getByText('Torta Cuadrada de Chocolate')).toBeInTheDocument()
    expect(screen.getByText('22-10-2026')).toBeInTheDocument()
    expect(screen.getByText('En preparación')).toBeInTheDocument()
    expect(screen.getByText('Cliente N° 4')).toBeInTheDocument()
    // sin descuento no aparece la línea
    expect(screen.queryByText(/Descuento/)).not.toBeInTheDocument()
  })

  test('con cliente, despacho y descuento muestra todos los datos', () => {
    render(<BoletaDetalle orden={ORDEN_COMPLETA} />)
    expect(screen.getByText('Rosa Muñoz')).toBeInTheDocument()
    expect(screen.getByText(/Irarrázaval 100, Ñuñoa/)).toBeInTheDocument()
    expect(screen.getByText('Tamaño: mediana • Mensaje: "Feliz cumple"')).toBeInTheDocument()
    expect(screen.getByText('Mayor de 50 años (50%):')).toBeInTheDocument()
    expect(screen.getByText('-$55.000')).toBeInTheDocument()
    // $110.000 aparece en la fila (2 x $55.000) y en el subtotal
    expect(screen.getAllByText('$110.000')).toHaveLength(2)
  })

  test('una compra como invitado lo indica', () => {
    render(<BoletaDetalle orden={{ ...ORDEN_SEMILLA, usuarioId: null }} />)
    expect(screen.getByText('Compra como invitado')).toBeInTheDocument()
  })

  test('sin orden muestra un aviso', () => {
    render(<BoletaDetalle orden={null} />)
    expect(screen.getByText('No se encontró la boleta.')).toBeInTheDocument()
  })
})
