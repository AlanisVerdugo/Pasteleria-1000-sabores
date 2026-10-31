import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { contactoService } from '../../services'
import MensajesContacto from './MensajesContacto'

const MENSAJES = [
  { id: 1, tipo: 'Reclamo', nombre: 'Ana', email: 'ana@mail.cl', mensaje: 'Llegó tarde', usuarioId: null, fecha: '2026-10-20T10:00:00Z' },
  { id: 2, tipo: 'Sugerencia', nombre: 'Luis', email: 'luis@mail.cl', mensaje: 'Más sabores', usuarioId: 3, fecha: '2026-10-25T10:00:00Z' },
]

describe('MensajesContacto', () => {
  test('muestra los mensajes con el más nuevo primero', async () => {
    vi.spyOn(contactoService, 'listar').mockResolvedValue(MENSAJES)
    render(<MensajesContacto />)
    const filas = await screen.findAllByRole('row')
    expect(filas[1]).toHaveTextContent('Luis')
    expect(filas[2]).toHaveTextContent('Ana')
  })

  test('filtra por tipo de consulta', async () => {
    vi.spyOn(contactoService, 'listar').mockResolvedValue(MENSAJES)
    render(<MensajesContacto />)
    await userEvent.selectOptions(await screen.findByLabelText('Tipo de consulta'), 'Reclamo')
    expect(screen.getByText('Llegó tarde')).toBeInTheDocument()
    expect(screen.queryByText('Más sabores')).not.toBeInTheDocument()
  })

  test('sin mensajes muestra el aviso', async () => {
    vi.spyOn(contactoService, 'listar').mockResolvedValue([])
    render(<MensajesContacto />)
    expect(await screen.findByText('No hay mensajes.')).toBeInTheDocument()
  })
})

