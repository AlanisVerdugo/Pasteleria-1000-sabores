import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ValorCard from './ValorCard'

describe('ValorCard', () => {
  it('muestra el título, el texto y la etiqueta que recibe', () => {
    render(
      <ValorCard
        icono="bi bi-basket"
        colorIcono="qs-icono-rosa"
        titulo="Ingredientes Nobles"
        texto="Huevos de campo y frutas locales."
        etiqueta="Origen Local"
      />
    )

    expect(screen.getByRole('heading', { name: 'Ingredientes Nobles' })).toBeInTheDocument()
    expect(screen.getByText('Huevos de campo y frutas locales.')).toBeInTheDocument()
    expect(screen.getByText('• Origen Local')).toBeInTheDocument()
  })
})