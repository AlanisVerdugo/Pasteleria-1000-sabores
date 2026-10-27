import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Terminos from './Terminos'

const renderizar = () =>
  render(
    <MemoryRouter>
      <Terminos />
    </MemoryRouter>
  )

describe('Terminos', () => {
  it('muestra las 8 secciones numeradas', () => {
    renderizar()
    const secciones = screen.getAllByRole('heading', { level: 2 })
    expect(secciones).toHaveLength(8)
    expect(secciones[0]).toHaveTextContent('1')
    expect(secciones[7]).toHaveTextContent('8')
  })

  it('usa los valores de las constantes (despacho y código)', () => {
    renderizar()
    expect(screen.getByText(/3\.500/)).toBeInTheDocument()
    expect(screen.getByText(/FELICES50/)).toBeInTheDocument()
  })

  it('aclara que los descuentos no son acumulables', () => {
    renderizar()
    expect(screen.getByText(/no son acumulables/i)).toBeInTheDocument()
  })

  it('enlaza a Preguntas Frecuentes y a Contacto', () => {
    renderizar()
    expect(screen.getByRole('link', { name: 'Preguntas Frecuentes' })).toHaveAttribute('href', '/preguntas-frecuentes')
    expect(screen.getByRole('link', { name: 'Contacto' })).toHaveAttribute('href', '/contacto')
  })
})


