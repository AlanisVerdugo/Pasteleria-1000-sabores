import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Pie from './Pie'

const renderPie = () => render(<MemoryRouter><Pie /></MemoryRouter>)

describe('Pie', () => {
  test('muestra el nombre de la pastelería', () => {
    renderPie()
    expect(screen.getByText('Pastelería 1000 Sabores')).toBeInTheDocument()
  })

  test('el link de Contacto lleva a la página de contacto', () => {
    renderPie()
    expect(screen.getByRole('link', { name: 'Contacto' })).toHaveAttribute('href', '/contacto')
  })
})