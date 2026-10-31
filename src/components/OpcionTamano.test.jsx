import { render, screen, fireEvent } from '@testing-library/react'
import OpcionTamano from './OpcionTamano'

describe('OpcionTamano', () => {
  test('muestra las personas y el precio que recibe por props', () => {
    render(<OpcionTamano personas="15 Personas" precio="$35.000" activa={false} onClick={() => {}} />)
    expect(screen.getByText('15 Personas')).toBeInTheDocument()
    expect(screen.getByText('$35.000')).toBeInTheDocument()
  })

  test('cuando "activa" es true, el botón tiene la clase activa', () => {
    render(<OpcionTamano personas="20 Personas" precio="$45.000" activa={true} onClick={() => {}} />)
    expect(screen.getByRole('button')).toHaveClass('activa')
  })

  test('cuando "activa" es false, el botón no tiene la clase activa', () => {
    render(<OpcionTamano personas="20 Personas" precio="$45.000" activa={false} onClick={() => {}} />)
    expect(screen.getByRole('button')).not.toHaveClass('activa')
  })

  test('al hacer clic, se ejecuta la función onClick', () => {
    const manejarClic = vi.fn()
    render(<OpcionTamano personas="20 Personas" precio="$45.000" activa={false} onClick={manejarClic} />)
    fireEvent.click(screen.getByRole('button'))
    expect(manejarClic).toHaveBeenCalledTimes(1)
  })
})