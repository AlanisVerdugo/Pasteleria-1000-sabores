import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import DetalleBlog from './DetalleBlog'

// Se usa la ruta real para que useParams reciba el :id
const renderEnRuta = (url) =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path="/blog/:id" element={<DetalleBlog />} />
      </Routes>
    </MemoryRouter>
  )

describe('DetalleBlog', () => {
  test('muestra el artículo completo según el id de la URL', async () => {
    renderEnRuta('/blog/1')
    expect(await screen.findByRole('heading', { name: /Manjar Casero/ })).toBeInTheDocument()
    expect(screen.getByText(/leche entera, azúcar y mucha paciencia/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Volver al blog/ })).toHaveAttribute('href', '/blog')
  })

  test('si el artículo no existe, avisa y ofrece volver', async () => {
    renderEnRuta('/blog/99')
    expect(await screen.findByRole('heading', { name: 'Artículo no encontrado' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Volver al blog/ })).toBeInTheDocument()
  })
})