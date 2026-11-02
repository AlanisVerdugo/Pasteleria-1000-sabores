import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AvisoCumpleanos from '../../components/AvisoCumpleanos'
import { useAuth } from '../../context/AuthContext'

vi.mock('../../context/AuthContext', () => ({ useAuth: vi.fn() }))

const hoy = new Date()
const fechaHoy = `2000-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`

const renderAviso = (usuario) => {
  useAuth.mockReturnValue({ usuario })
  render(<MemoryRouter><AvisoCumpleanos /></MemoryRouter>)
}

describe('AvisoCumpleanos', () => {
  test('aparece si es Duoc y hoy es su cumpleaños', () => {
    renderAviso({ nombre: 'Ana', esDuoc: true, fechaNacimiento: fechaHoy })
    expect(screen.getByText(/Feliz cumpleaños, Ana/)).toBeInTheDocument()
  })

  test('no aparece si no es Duoc', () => {
    renderAviso({ nombre: 'Ana', esDuoc: false, fechaNacimiento: fechaHoy })
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  test('no aparece sin sesión', () => {
    renderAviso(null)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})

