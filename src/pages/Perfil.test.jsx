import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Perfil from './Perfil'
import RutaProtegida from '../components/RutaProtegida'
import { renderConProviders } from '../test/utils'
import { validarPerfil } from '../utils/validaciones'

const renderPerfil = () =>
  renderConProviders(<RutaProtegida><Perfil /></RutaProtegida>, { usuario: { id: 4 } })

describe('validarPerfil', () => {
  test('acepta solo nombre y apellidos (lo demás es opcional)', () => {
    expect(validarPerfil({ nombre: 'Ana', apellidos: 'Soto', direccion: '', comuna: '', telefono: '' })).toEqual({})
  })

  test('marca error si el teléfono no es válido', () => {
    const errores = validarPerfil({ nombre: 'Ana', apellidos: 'Soto', direccion: '', comuna: '', telefono: '12ab' })
    expect(errores.telefono).toBeTruthy()
  })
})

describe('Perfil', () => {
  test('carga los datos del usuario con sesión', async () => {
    renderPerfil()
    expect(await screen.findByLabelText('Nombre')).toHaveValue('Camila')
    expect(screen.getAllByText('camila@duocuc.cl').length).toBeGreaterThan(0)
  })

  test('muestra el chip Duoc y la torta de cumpleaños', async () => {
    renderPerfil()
    expect(await screen.findByText('Duoc UC')).toBeInTheDocument()
    expect(screen.getByText(/torta gratis/i)).toBeInTheDocument()
  })

  test('no guarda si el nombre queda vacío', async () => {
    const user = userEvent.setup()
    renderPerfil()
    await user.clear(await screen.findByLabelText('Nombre'))
    await user.click(screen.getByRole('button', { name: /guardar cambios/i }))
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  test('guarda los cambios y muestra el mensaje de éxito', async () => {
    const user = userEvent.setup()
    renderPerfil()
    await user.type(await screen.findByLabelText('Comuna (opcional)'), 'Maipú')
    await user.click(screen.getByRole('button', { name: /guardar cambios/i }))
    expect(await screen.findByRole('status')).toHaveTextContent(/se guardaron/i)
    expect(screen.getByLabelText('Comuna (opcional)')).toHaveValue('Maipú')
  })
})