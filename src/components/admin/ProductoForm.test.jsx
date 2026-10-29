import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductoForm from './ProductoForm'
import { achicarImagen } from '../../utils/imagen'

// En jsdom no hay canvas: achicarImagen se reemplaza por una función falsa
vi.mock('../../utils/imagen', () => ({ achicarImagen: vi.fn() }))

const CATEGORIAS = [{ id: 1, nombre: 'Tortas Cuadradas' }, { id: 2, nombre: 'Tortas Circulares' }]
const TORTA = {
  codigo: 'TC001', nombre: 'Torta Cuadrada de Chocolate', categoriaId: 1, descripcion: 'Rica', precio: 45000,
  stock: 10, oferta: 10, forma: 'cuadrada', tamanos: [{ id: 'chica', personas: 8, extra: 0 }],
  imagen: '/img/tc.jpg', permiteMensaje: true, activo: true,
}

describe('ProductoForm', () => {
  test('al enviar vacío muestra los errores y no llama a onGuardar', async () => {
    const onGuardar = vi.fn()
    render(<ProductoForm categorias={CATEGORIAS} onGuardar={onGuardar} />)
    await userEvent.click(screen.getByRole('button', { name: /Crear producto/ }))
    expect(screen.getByText('Ingresa el código')).toBeInTheDocument()
    expect(screen.getByText('Ingresa el nombre')).toBeInTheDocument()
    expect(screen.getByText('Elige una categoría')).toBeInTheDocument()
    expect(onGuardar).not.toHaveBeenCalled()
  })

  test('valida el formato del código', async () => {
    render(<ProductoForm categorias={CATEGORIAS} onGuardar={vi.fn()} />)
    await userEvent.type(screen.getByLabelText('Código'), 'abc1')
    await userEvent.click(screen.getByRole('button', { name: /Crear producto/ }))
    expect(screen.getByText(/2 o 3 letras mayúsculas y 3 números/)).toBeInTheDocument()
  })

  test('con datos válidos llama a onGuardar con números y forma del contrato', async () => {
    const onGuardar = vi.fn().mockResolvedValue()
    render(<ProductoForm categorias={CATEGORIAS} onGuardar={onGuardar} />)
    await userEvent.type(screen.getByLabelText('Código'), 'TC003')
    await userEvent.type(screen.getByLabelText('Nombre'), 'Torta de Lúcuma')
    await userEvent.selectOptions(screen.getByLabelText('Categoría'), '2')
    await userEvent.selectOptions(screen.getByLabelText('Forma'), 'circular')
    await userEvent.type(screen.getByLabelText('Precio base (CLP)'), '42000')
    await userEvent.type(screen.getByLabelText('Stock'), '6')
    await userEvent.click(screen.getByRole('button', { name: /Crear producto/ }))

    expect(onGuardar).toHaveBeenCalledTimes(1)
    const producto = onGuardar.mock.calls[0][0]
    expect(producto).toMatchObject({
      codigo: 'TC003', nombre: 'Torta de Lúcuma', categoriaId: 2, precio: 42000, stock: 6, oferta: 0,
      forma: 'circular', activo: true, imagen: '/img/logo-pasteleria-1000-sabores.png',
    })
    expect(producto.tamanos).toHaveLength(3) // una torta nueva recibe los 3 tamaños base
  })

  test('en edición precarga los datos y el código no se puede cambiar', () => {
    render(<ProductoForm inicial={TORTA} categorias={CATEGORIAS} esEdicion onGuardar={vi.fn()} />)
    expect(screen.getByLabelText('Código')).toHaveValue('TC001')
    expect(screen.getByLabelText('Código')).toHaveAttribute('readonly')
    expect(screen.getByLabelText('Nombre')).toHaveValue('Torta Cuadrada de Chocolate')
    expect(screen.getByLabelText('Stock')).toHaveValue(10)
    expect(screen.getByRole('button', { name: /Guardar cambios/ })).toBeInTheDocument()
    expect(screen.getByAltText('Vista previa')).toHaveAttribute('src', '/img/tc.jpg')
  })

  test('si onGuardar falla, muestra el mensaje', async () => {
    const onGuardar = vi.fn().mockRejectedValue(new Error('Ya existe un producto con el código TC001'))
    render(<ProductoForm inicial={TORTA} categorias={CATEGORIAS} onGuardar={onGuardar} />)
    await userEvent.click(screen.getByRole('button', { name: /Crear producto/ }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Ya existe un producto con el código TC001')
  })

  test('si deja de ser torta, se guarda sin forma ni tamaños', async () => {
    const onGuardar = vi.fn().mockResolvedValue()
    render(<ProductoForm inicial={TORTA} categorias={CATEGORIAS} esEdicion onGuardar={onGuardar} />)
    await userEvent.selectOptions(screen.getByLabelText('Forma'), '')
    await userEvent.click(screen.getByRole('button', { name: /Guardar cambios/ }))
    expect(onGuardar.mock.calls[0][0]).toMatchObject({ forma: null, tamanos: [] })
  })

  test('subir una foto la pone como imagen (vista previa)', async () => {
    achicarImagen.mockResolvedValueOnce('data:image/jpeg;base64,FOTO')
    render(<ProductoForm categorias={CATEGORIAS} onGuardar={vi.fn()} />)
    await userEvent.upload(screen.getByLabelText('…o sube una foto'), new File(['x'], 't.png', { type: 'image/png' }))
    expect(await screen.findByAltText('Vista previa')).toHaveAttribute('src', 'data:image/jpeg;base64,FOTO')
    expect(screen.getByLabelText('Ruta de la imagen')).toHaveValue('data:image/jpeg;base64,FOTO')
  })

  test('si la foto no sirve, muestra el error', async () => {
    achicarImagen.mockRejectedValueOnce(new Error('El archivo debe ser una imagen'))
    render(<ProductoForm categorias={CATEGORIAS} onGuardar={vi.fn()} />)
    await userEvent.upload(screen.getByLabelText('…o sube una foto'), new File(['x'], 't.png', { type: 'image/png' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('El archivo debe ser una imagen')
  })
})
