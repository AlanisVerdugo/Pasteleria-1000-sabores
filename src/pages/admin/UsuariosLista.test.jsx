import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UsuariosLista from './UsuariosLista'
import { renderConProviders } from '../../test/utils'
import { usuariosService } from '../../services'
import { usuariosRepo } from '../../data/usuarios'

const ADMIN = { id: 1 }

afterEach(() => {
  vi.restoreAllMocks()
  usuariosRepo.reiniciar()
})

describe('UsuariosLista', () => {
  test('lista los usuarios sin mostrar contraseñas', async () => {
    renderConProviders(<UsuariosLista />, { usuario: ADMIN })
    const filas = await screen.findAllByTestId('fila-usuario')
    expect(filas).toHaveLength(4)
    expect(screen.queryByText('admin123')).not.toBeInTheDocument()
    expect(within(filas[3]).getByText('Duoc UC')).toBeInTheDocument() // Camila
  })

  test('el admin no puede eliminarse a sí mismo', async () => {
    renderConProviders(<UsuariosLista />, { usuario: ADMIN })
    await screen.findAllByTestId('fila-usuario')
    expect(screen.getByRole('button', { name: 'Eliminar Admin' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Eliminar Rosa' })).toBeEnabled()
    expect(screen.getByText('Tú')).toBeInTheDocument()
  })

  test('elimina a otro usuario después de confirmar', async () => {
    const user = userEvent.setup()
    renderConProviders(<UsuariosLista />, { usuario: ADMIN })
    await screen.findAllByTestId('fila-usuario')
    await user.click(screen.getByRole('button', { name: 'Eliminar Pedro' }))
    await user.click(screen.getByRole('button', { name: 'Eliminar' }))
    expect(await screen.findByText('Se eliminó a Pedro Soto Rojas')).toBeInTheDocument()
    expect(screen.getAllByTestId('fila-usuario')).toHaveLength(3)
  })

  test('busca por nombre o correo y filtra por rol', async () => {
    const user = userEvent.setup()
    renderConProviders(<UsuariosLista />, { usuario: ADMIN })
    await screen.findAllByTestId('fila-usuario')
    await user.type(screen.getByLabelText('Buscar usuario'), 'duocuc')
    expect(screen.getAllByTestId('fila-usuario')).toHaveLength(1)
    await user.clear(screen.getByLabelText('Buscar usuario'))
    await user.selectOptions(screen.getByLabelText('Filtrar por rol'), 'admin')
    expect(screen.getAllByTestId('fila-usuario')).toHaveLength(1)
    await user.type(screen.getByLabelText('Buscar usuario'), 'rosa')
    expect(screen.getByText('No hay usuarios que coincidan.')).toBeInTheDocument()
  })

  test('si eliminar falla, muestra el error', async () => {
    vi.spyOn(usuariosService, 'eliminar').mockRejectedValue(new Error('No encontrado'))
    const user = userEvent.setup()
    renderConProviders(<UsuariosLista />, { usuario: ADMIN })
    await screen.findAllByTestId('fila-usuario')
    await user.click(screen.getByRole('button', { name: 'Eliminar Rosa' }))
    await user.click(screen.getByRole('button', { name: 'Eliminar' }))
    expect(await screen.findByText('No encontrado')).toBeInTheDocument()
  })

  test('si el service falla al cargar, muestra el error', async () => {
    vi.spyOn(usuariosService, 'listar').mockRejectedValue(new Error('Sin conexión'))
    renderConProviders(<UsuariosLista />, { usuario: ADMIN })
    expect(await screen.findByRole('alert')).toHaveTextContent('Sin conexión')
  })
})
