import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UsuarioForm from './UsuarioForm'

const ROSA = { id: 2, run: '123456785', nombre: 'Rosa', apellidos: 'Muñoz Díaz', email: 'rosa@gmail.com', fechaNacimiento: '1965-03-15', rol: 'cliente' }

describe('UsuarioForm', () => {
  test('al crear vacío muestra los errores, incluida la contraseña', async () => {
    const onGuardar = vi.fn()
    render(<UsuarioForm onGuardar={onGuardar} />)
    await userEvent.click(screen.getByRole('button', { name: /Crear usuario/ }))
    expect(screen.getByText('Ingresa el RUN')).toBeInTheDocument()
    expect(screen.getByText('Ingresa una contraseña')).toBeInTheDocument()
    expect(onGuardar).not.toHaveBeenCalled()
  })

  test('crea con el RUN limpio y el correo en minúsculas', async () => {
    const onGuardar = vi.fn().mockResolvedValue()
    render(<UsuarioForm onGuardar={onGuardar} />)
    await userEvent.type(screen.getByLabelText('RUN'), '12.345.678-5')
    await userEvent.type(screen.getByLabelText('Nombre'), 'Ana')
    await userEvent.type(screen.getByLabelText('Apellidos'), 'Soto')
    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'Ana@Gmail.com')
    await userEvent.type(screen.getByLabelText('Fecha de nacimiento'), '1990-05-10')
    await userEvent.type(screen.getByLabelText('Contraseña'), '1234')
    await userEvent.selectOptions(screen.getByLabelText('Rol'), 'admin')
    await userEvent.click(screen.getByRole('button', { name: /Crear usuario/ }))
    expect(onGuardar).toHaveBeenCalledWith({
      run: '123456785', nombre: 'Ana', apellidos: 'Soto', email: 'ana@gmail.com',
      fechaNacimiento: '1990-05-10', telefono: '', rol: 'admin', password: '1234',
    })
  })

  test('al editar precarga, no exige contraseña y no la manda si queda vacía', async () => {
    const onGuardar = vi.fn().mockResolvedValue()
    render(<UsuarioForm inicial={ROSA} esEdicion onGuardar={onGuardar} />)
    expect(screen.getByLabelText('Nombre')).toHaveValue('Rosa')
    expect(screen.getByLabelText('Nueva contraseña (opcional)')).toHaveValue('')
    await userEvent.click(screen.getByRole('button', { name: /Guardar cambios/ }))
    expect(onGuardar.mock.calls[0][0]).not.toHaveProperty('password')
  })

  test('bloquearRol deshabilita el rol', () => {
    render(<UsuarioForm inicial={{ ...ROSA, rol: 'admin' }} esEdicion bloquearRol onGuardar={vi.fn()} />)
    expect(screen.getByLabelText('Rol')).toBeDisabled()
  })

  test('si onGuardar falla, muestra el error', async () => {
    render(<UsuarioForm inicial={ROSA} esEdicion onGuardar={vi.fn().mockRejectedValue(new Error('El correo ya está registrado'))} />)
    await userEvent.click(screen.getByRole('button', { name: /Guardar cambios/ }))
    expect(await screen.findByRole('alert')).toHaveTextContent('El correo ya está registrado')
  })
})
