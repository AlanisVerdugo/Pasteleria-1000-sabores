import { screen } from '@testing-library/react'
import TarjetaProducto from './TarjetaProducto'
import { renderConProviders } from '../test/utils'

// Productos de prueba propios, para no depender de las semillas
const base = { codigo: 'X01', nombre: 'Torta de Prueba', descripcion: 'Rica', imagen: '/img/x.jpg', precio: 45000, oferta: 0, stock: 5 }

describe('TarjetaProducto', () => {
  test('muestra nombre, precio con formato y link al detalle', () => {
    renderConProviders(<TarjetaProducto producto={base} />)
    expect(screen.getByRole('heading', { name: 'Torta de Prueba' })).toBeInTheDocument()
    expect(screen.getByText('$45.000')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver Torta de Prueba' })).toHaveAttribute('href', '/producto/X01')
  })

  test('con oferta muestra el % y los dos precios', () => {
    renderConProviders(<TarjetaProducto producto={{ ...base, oferta: 10 }} />)
    expect(screen.getByText('-10%')).toBeInTheDocument()
    expect(screen.getByText('$45.000')).toHaveClass('producto-precio-antes')
    expect(screen.getByText('$40.500')).toBeInTheDocument()
  })

  test('sin stock muestra Agotado y sin oferta no muestra %', () => {
    renderConProviders(<TarjetaProducto producto={{ ...base, stock: 0 }} />)
    expect(screen.getByText('Agotado')).toBeInTheDocument()
    expect(screen.queryByText(/%/)).not.toBeInTheDocument()
  })

  test('en modo vitrina no muestra precio ni carrito', () => {
    renderConProviders(<TarjetaProducto producto={base} vitrina />)
    expect(screen.queryByText('$45.000')).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Ver Torta de Prueba' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Torta de Prueba' })).toBeInTheDocument()
  })
})