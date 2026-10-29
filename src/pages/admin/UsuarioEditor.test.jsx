import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Routes, Route } from 'react-router-dom'
import UsuarioEditor from './UsuarioEditor'
import UsuariosLista from './UsuariosLista'
import { renderConProviders } from '../../test/utils'
import { usuariosService } from '../../services'
import { usuariosRepo } from '../../data/usuarios'

const ADMIN = { id: 1 }

afterEach(() => {
  vi.restoreAllMocks()
  usuariosRepo.reiniciar()
})

const rutas = (
  <Routes>
    <Route path="/admin/usuarios" element={<UsuariosLista />} />
    <Route path="/admin/usuarios/nuevo" element={<UsuarioEditor />} />
    <Route path="/admin/usuarios/:id/editar" element={<UsuarioEditor />} />
  </Routes>
)

async function llenar(email) {
  await userEvent.type(await screen.findByLabelText('RUN'), '11.111.111-1')
  await userEvent.type(screen.getByLabelText('Nombre'), 'Ana')
  await userEvent.type(screen.getByLabelText('Apellidos'), 'Soto')
  await userEvent.type(screen.getByLabelText('Correo electrónico'), email)
  await userEvent.type(screen.getByLabelText('Fecha de nacimiento'), '1990-05-10')
  await userEvent.type(screen.getByLabelText('Contraseña'), '1234')
}

describe('UsuarioEditor', () => {
  test('crea un usuario y vuelve a la lista', async () => {
    renderConProviders(rutas, { ruta: '/admin/usuarios/nuevo', usuario: ADMIN })
    await llenar('ana@duocuc.cl')
    await userEvent.click(screen.getByRole('button', { name: /Crear usuario/ }))
    expect(await screen.findByText('Se creó el usuario Ana')).toBeInTheDocument()
    expect(screen.getAllByTestId('fila-usuario')).toHaveLength(5)
  })

  test('no deja crear con un correo ya registrado', async () => {
    renderConProviders(rutas, { ruta: '/admin/usuarios/nuevo', usuario: ADMIN })
    await llenar('rosa@gmail.com')
    await userEvent.click(screen.getByRole('button', { name: /Crear usuario/ }))
    expect(await screen.findByRole('alert')).toHaveTextContent('El correo ya está registrado')
  })

  test('edita un usuario precargado', async () => {
    const espia = vi.spyOn(usuariosService, 'actualizar')
    renderConProviders(rutas, { ruta: '/admin/usuarios/3/editar', usuario: ADMIN })
    const telefono = await screen.findByLabelText('Teléfono (opcional)')
    expect(screen.getByLabelText('Nombre')).toHaveValue('Pedro')
    await userEvent.type(telefono, '+56912345678')
    await userEvent.click(screen.getByRole('button', { name: /Guardar cambios/ }))
    expect(espia).toHaveBeenCalledWith('3', expect.objectContaining({ telefono: '+56912345678' }))
    expect(await screen.findByText('Se guardaron los cambios de Pedro')).toBeInTheDocument()
  })

  test('al editar, no deja usar el correo de otro usuario', async () => {
    renderConProviders(rutas, { ruta: '/admin/usuarios/3/editar', usuario: ADMIN })
    const email = await screen.findByLabelText('Correo electrónico')
    await userEvent.clear(email)
    await userEvent.type(email, 'rosa@gmail.com')
    await userEvent.click(screen.getByRole('button', { name: /Guardar cambios/ }))
    expect(await screen.findByRole('alert')).toHaveTextContent('El correo ya está registrado')
  })

  test('el admin editándose a sí mismo no puede cambiar su rol', async () => {
    renderConProviders(rutas, { ruta: '/admin/usuarios/1/editar', usuario: ADMIN })
    expect(await screen.findByLabelText('Rol')).toBeDisabled()
  })

  test('si el usuario no existe, avisa', async () => {
    renderConProviders(rutas, { ruta: '/admin/usuarios/99/editar', usuario: ADMIN })
    expect(await screen.findByText(/No existe el usuario 99/)).toBeInTheDocument()
  })

  test('si el service falla, muestra el error', async () => {
    vi.spyOn(usuariosService, 'obtenerPorId').mockRejectedValue(new Error('Error de red'))
    renderConProviders(rutas, { ruta: '/admin/usuarios/2/editar' }) // sin sesión, para que solo falle la página
    expect(await screen.findByText('Error de red')).toBeInTheDocument()
  })
})
