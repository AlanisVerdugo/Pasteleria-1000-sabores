import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PreguntaFrecuente from './PreguntaFrecuente'

const renderizar = (props = {}) =>
  render(
    <ul>
      <PreguntaFrecuente
        id="prueba"
        pregunta="¿Hacen tortas veganas?"
        respuesta="Sí, tenemos opciones veganas."
        abierta={false}
        onAlternar={() => {}}
        {...props}
      />
    </ul>
  )

describe('PreguntaFrecuente', () => {
  it('cerrada: muestra la pregunta pero no la respuesta', () => {
    renderizar()
    const boton = screen.getByRole('button', { name: /tortas veganas/i })
    expect(boton).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('Sí, tenemos opciones veganas.')).not.toBeInTheDocument()
  })

  it('abierta: muestra la respuesta', () => {
    renderizar({ abierta: true })
    expect(screen.getByRole('button', { name: /tortas veganas/i })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Sí, tenemos opciones veganas.')).toBeInTheDocument()
  })

  it('al hacer clic avisa al padre con onAlternar', async () => {
    const onAlternar = vi.fn()
    renderizar({ onAlternar })
    await userEvent.click(screen.getByRole('button', { name: /tortas veganas/i }))
    expect(onAlternar).toHaveBeenCalledTimes(1)
  })
})

