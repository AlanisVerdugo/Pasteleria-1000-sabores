import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Nosotros from './Nosotros'

describe('Nosotros', () => {
  it('muestra los 4 valores fundamentales', () => {
    render(<Nosotros />)
    expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(4)
  })

  it('muestra la misión, la visión y la alianza con Duoc UC', () => {
    render(<Nosotros />)
    expect(screen.getByText('Misión')).toBeInTheDocument()
    expect(screen.getByText('Visión')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Alianza con Duoc UC/ })).toBeInTheDocument()
  })
})



