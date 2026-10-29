import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PerfilAdmin from './PerfilAdmin'
import { renderConProviders } from '../../test/utils'
import { usuariosService } from '../../services'
import { usuariosRepo } from '../../data/usuarios'
import RutaAdmin from '../../components/RutaAdmin'
import { achicarImagen } from '../../utils/imagen'

// En jsdom no hay canvas real: reemplazamos achicarImagen por una función falsa (igual que PerfilFoto.test)
vi.mock('../../utils/imagen', () => ({ achicarImagen: vi.fn() }))

const ADMIN = { id: 1 }
// RutaAdmin espera a que cargue la sesión (como en la app real)
const renderPerfil = () => renderConProviders(<RutaAdmin><PerfilAdmin /></RutaAdmin>, { usuario: ADMIN })

afterEach(() => {
  vi.restoreAllMocks()
  usuariosRepo.reiniciar()
})

describe('PerfilAdmin', () => {
  test('muestra los datos del admin con sesión', async () => {
    renderPerfil()
    expect(await screen.findByRole('heading', { name: 'Admin Mil Sabores' })).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre')).toHaveValue('Admin')
    expect(screen.getByLabelText('Correo (no se puede cambiar)')).toHaveValue('admin@duoc.cl')
    expect(screen.getByText('Administrador')).toBeInTheDocument()
  })

  test('valida y no guarda si falta el nombre', async () => {
    const espia = vi.spyOn(usuariosService, 'actualizar')
    renderPerfil()
    await userEvent.clear(await screen.findByLabelText('Nombre'))
    await userEvent.click(screen.getByRole('button', { name: /Guardar cambios/ }))
    expect(screen.getByText('Ingresa tu nombre')).toBeInTheDocument()
    expect(espia).not.toHaveBeenCalled()
  })

  test('guarda los cambios con actualizarPerfil', async () => {
    renderPerfil()
    const telefono = await screen.findByLabelText('Teléfono (opcional)')
    await userEvent.type(telefono, '+56987654321')
    await userEvent.click(screen.getByRole('button', { name: /Guardar cambios/ }))
    expect(await screen.findByRole('status')).toHaveTextContent('Tus datos se guardaron correctamente')
    expect((await usuariosService.obtenerPorId(1)).telefono).toBe('+56987654321')
  })

  test('cambia la foto (achicarImagen) y la muestra', async () => {
    achicarImagen.mockResolvedValueOnce('data:image/png;base64,AAA')
    renderPerfil()
    const archivo = new File(['x'], 'foto.png', { type: 'image/png' })
    await userEvent.upload(await screen.findByLabelText(/Cambiar foto/), archivo)
    expect(await screen.findByAltText('Foto de Admin')).toHaveAttribute('src', 'data:image/png;base64,AAA')
    expect(screen.getByRole('status')).toHaveTextContent('Tu foto se actualizó')
  })

  test('si la foto no es válida, muestra el error', async () => {
    achicarImagen.mockRejectedValueOnce(new Error('El archivo debe ser una imagen'))
    renderPerfil()
    const archivo = new File(['x'], 'foto.png', { type: 'image/png' })
    await userEvent.upload(await screen.findByLabelText(/Cambiar foto/), archivo)
    expect(await screen.findByText('El archivo debe ser una imagen')).toBeInTheDocument()
  })

  test('si guardar falla, muestra el error', async () => {
    vi.spyOn(usuariosService, 'actualizar').mockRejectedValue(new Error('No encontrado'))
    renderPerfil()
    await userEvent.click(await screen.findByRole('button', { name: /Guardar cambios/ }))
    expect(await screen.findByText('No encontrado')).toBeInTheDocument()
  })
})
