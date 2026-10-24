import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Perfil from './Perfil'
import RutaProtegida from '../components/RutaProtegida'
import { renderConProviders } from '../test/utils'
import { achicarImagen } from '../utils/imagen'

// En los tests no hay navegador real que dibuje imágenes,
// así que reemplazamos achicarImagen por una versión falsa
vi.mock('../utils/imagen', () => ({
  achicarImagen: vi.fn(),
}))

const FOTO_FALSA = 'data:image/jpeg;base64,FOTO'
const png = () => new File(['x'], 'yo.png', { type: 'image/png' })

const renderPerfil = () =>
  renderConProviders(<RutaProtegida><Perfil /></RutaProtegida>, { usuario: { id: 4 } })

describe('Foto de perfil', () => {
  test('sin foto muestra la inicial y no el botón de quitar', async () => {
    renderPerfil()
    expect(await screen.findByText('C')).toBeInTheDocument()
    expect(screen.queryByRole('img', { name: /foto de camila/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Quitar foto' })).not.toBeInTheDocument()
  })

  test('al subir una foto se muestra y se puede quitar', async () => {
    achicarImagen.mockResolvedValueOnce(FOTO_FALSA)
    const user = userEvent.setup()
    renderPerfil()

    await user.upload(await screen.findByLabelText('Cambiar foto'), png())
    expect(await screen.findByRole('img', { name: /foto de camila/i })).toHaveAttribute('src', FOTO_FALSA)

    await user.click(screen.getByRole('button', { name: 'Quitar foto' }))
    expect(screen.queryByRole('img', { name: /foto de camila/i })).not.toBeInTheDocument()
  })

  test('si la imagen falla muestra el error', async () => {
    achicarImagen.mockRejectedValueOnce(new Error('El archivo debe ser una imagen'))
    const user = userEvent.setup()
    renderPerfil()

    await user.upload(await screen.findByLabelText('Cambiar foto'), png())
    expect(await screen.findByRole('alert')).toHaveTextContent('El archivo debe ser una imagen')
  })
})