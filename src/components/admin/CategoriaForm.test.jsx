import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CategoriaForm from './CategoriaForm'

vi.mock('../../utils/imagen', () => ({
  achicarImagen: vi.fn().mockResolvedValue('data:image/jpeg;base64,FOTO'),
}))

describe('CategoriaForm', () => {
  test('sin nombre muestra el error y no guarda', async () => {
    const onGuardar = vi.fn()
    render(<CategoriaForm onGuardar={onGuardar} />)
    await userEvent.click(screen.getByRole('button', { name: /Crear categoría/ }))
    expect(screen.getByText('Ingresa el nombre')).toBeInTheDocument()
    expect(onGuardar).not.toHaveBeenCalled()
  })

  test('envía los datos sin espacios de más', async () => {
    const onGuardar = vi.fn().mockResolvedValue()
    render(<CategoriaForm onGuardar={onGuardar} />)
    await userEvent.type(screen.getByLabelText('Nombre'), '  Kuchenes  ')
    await userEvent.type(screen.getByLabelText('Descripción'), 'Recetas del sur')
    await userEvent.click(screen.getByRole('button', { name: /Crear categoría/ }))
    expect(onGuardar).toHaveBeenCalledWith({ nombre: 'Kuchenes', descripcion: 'Recetas del sur', imagen: '' })
  })

  test('en edición precarga los datos', () => {
    render(<CategoriaForm esEdicion inicial={{ id: 1, nombre: 'Tortas Cuadradas', descripcion: 'Para compartir' }} onGuardar={vi.fn()} />)
    expect(screen.getByLabelText('Nombre')).toHaveValue('Tortas Cuadradas')
    expect(screen.getByRole('button', { name: /Guardar cambios/ })).toBeInTheDocument()
  })

  test('si onGuardar falla, muestra el error', async () => {
    render(<CategoriaForm inicial={{ nombre: 'Tortas Cuadradas' }} onGuardar={vi.fn().mockRejectedValue(new Error('Ya existe la categoría'))} />)
    await userEvent.click(screen.getByRole('button', { name: /Crear categoría/ }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Ya existe la categoría')
  })

  test('al subir una foto muestra la vista previa y la guarda', async () => {
    const onGuardar = vi.fn().mockResolvedValue()
    render(<CategoriaForm inicial={{ nombre: 'Kuchenes' }} onGuardar={onGuardar} />)
    const archivo = new File(['x'], 'foto.png', { type: 'image/png' })
    await userEvent.upload(screen.getByLabelText('…o sube una foto'), archivo)
    expect(await screen.findByAltText('Vista previa')).toHaveAttribute('src', 'data:image/jpeg;base64,FOTO')
    await userEvent.click(screen.getByRole('button', { name: /Crear categoría/ }))
    expect(onGuardar).toHaveBeenCalledWith(expect.objectContaining({ imagen: 'data:image/jpeg;base64,FOTO' }))
  })
})
