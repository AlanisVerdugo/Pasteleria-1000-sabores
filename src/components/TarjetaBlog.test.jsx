import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TarjetaBlog from './TarjetaBlog'

const base = {
  id: 7,
  titulo: 'Artículo de prueba',
  categoria: 'Consejos de maestros',
  fecha: '2026-09-13',
  autor: 'Ana Test',
  imagen: '/img/prueba.jpg',
  resumen: 'Un resumen corto.',
}

const renderTarjeta = (articulo = base) =>
  render(
    <MemoryRouter>
      <TarjetaBlog articulo={articulo} />
    </MemoryRouter>
  )

describe('TarjetaBlog', () => {
  test('muestra los datos del artículo', () => {
    renderTarjeta()
    expect(screen.getByRole('heading', { name: 'Artículo de prueba' })).toBeInTheDocument()
    expect(screen.getByText('Un resumen corto.')).toBeInTheDocument()
    expect(screen.getByText('Por Ana Test')).toBeInTheDocument()
    expect(screen.getByAltText('Artículo de prueba')).toHaveAttribute('src', '/img/prueba.jpg')
  })

  test('muestra la fecha formateada y la categoría', () => {
    renderTarjeta()
    expect(screen.getByText(/13-09-2026/)).toHaveTextContent('Consejos de maestros')
  })

  test('el link "Leer" lleva al detalle del artículo', () => {
    renderTarjeta()
    expect(screen.getByRole('link', { name: 'Leer Artículo de prueba' })).toHaveAttribute('href', '/blog/7')
  })
})