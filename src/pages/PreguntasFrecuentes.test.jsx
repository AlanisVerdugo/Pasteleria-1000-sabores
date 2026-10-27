import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import PreguntasFrecuentes from './PreguntasFrecuentes'

const renderizar = () =>
  render(
    <MemoryRouter>
      <PreguntasFrecuentes />
    </MemoryRouter>
  )

describe('PreguntasFrecuentes', () => {
  it('muestra los 4 grupos de preguntas', () => {
    renderizar()
    for (const grupo of ['Pedidos', 'Despacho', 'Descuentos', 'Mi cuenta']) {
      expect(screen.getByRole('heading', { level: 2, name: grupo })).toBeInTheDocument()
    }
  })

  it('al abrir otra pregunta, se cierra la anterior', async () => {
    renderizar()
    const costo = screen.getByRole('button', { name: /cuánto cuesta el despacho/i })
    const horarios = screen.getByRole('button', { name: /en qué horarios entregan/i })

    await userEvent.click(costo)
    expect(costo).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/3\.500/)).toBeInTheDocument()

    await userEvent.click(horarios)
    expect(horarios).toHaveAttribute('aria-expanded', 'true')
    expect(costo).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText(/3\.500/)).not.toBeInTheDocument()
  })

  it('al hacer clic de nuevo en la misma pregunta, se cierra', async () => {
    renderizar()
    const pregunta = screen.getByRole('button', { name: /descuentos se suman/i })
    await userEvent.click(pregunta)
    await userEvent.click(pregunta)
    expect(pregunta).toHaveAttribute('aria-expanded', 'false')
  })

  it('tiene un enlace a Contacto', () => {
    renderizar()
    expect(screen.getByRole('link', { name: /ir a contacto/i })).toHaveAttribute('href', '/contacto')
  })
})

