import { render, screen } from '@testing-library/react'
import Pie from './Pie'

describe('Pie', () => {
  test('muestra el nombre de la pastelería', () => {
    render(<Pie />)
    expect(screen.getByText('Pastelería 1000 Sabores')).toBeInTheDocument()
  })
})