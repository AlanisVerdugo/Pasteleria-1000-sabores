import { screen } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import CategoriaDetalle from './CategoriaDetalle'
import { renderConProviders } from '../test/utils'

const renderCategoria = (id) =>
  renderConProviders(
    <Routes>
      <Route path="/categorias/:id" element={<CategoriaDetalle />} />
    </Routes>,
    { ruta: `/categorias/${id}` }
  )

describe('CategoriaDetalle', () => {
  beforeEach(() => localStorage.clear())

  test('muestra el nombre de la categoría y solo sus productos', async () => {
    renderCategoria(1)
    expect(await screen.findByRole('heading', { name: 'Tortas Cuadradas' })).toBeInTheDocument()
    expect((await screen.findAllByText('Torta Cuadrada de Chocolate')).length).toBeGreaterThan(0)
    expect(screen.queryByText('Mousse de Chocolate')).not.toBeInTheDocument()
  })

  test('tiene el link para volver a categorías', async () => {
    renderCategoria(1)
    expect(await screen.findByRole('link', { name: /volver a categor/i })).toHaveAttribute('href', '/categorias')
  })

  test('id inexistente muestra "Categoría no encontrada"', async () => {
    renderCategoria(999)
    expect(await screen.findByText(/no encontrada/i)).toBeInTheDocument()
  })
})

