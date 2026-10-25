import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contacto from './Contacto'
import { renderConProviders } from '../test/utils'
import { contactoService } from '../services/otrosService'

afterEach(() => vi.restoreAllMocks())

// Llena el formulario como lo haría una persona
async function llenarFormulario() {
  await userEvent.click(screen.getByLabelText('Reclamo'))
  await userEvent.type(screen.getByLabelText('Nombre'), 'Rosa')
  await userEvent.type(screen.getByLabelText('Correo electrónico'), 'Rosa@Gmail.com')
  await userEvent.type(screen.getByLabelText('Mensaje'), 'Mi torta llegó tarde')
}

const botonEnviar = () => screen.getByRole('button', { name: /Enviar mensaje/ })

describe('Contacto', () => {
  test('al enviar vacío muestra los errores y no llama al service', async () => {
    const espia = vi.spyOn(contactoService, 'enviar')
    renderConProviders(<Contacto />)
    await userEvent.click(botonEnviar())

    expect(screen.getByText('Elige el tipo de consulta')).toBeInTheDocument()
    expect(screen.getByText('Ingresa tu nombre')).toBeInTheDocument()
    expect(screen.getByText('Ingresa tu correo')).toBeInTheDocument()
    expect(screen.getByText('Escribe tu mensaje')).toBeInTheDocument()
    expect(espia).not.toHaveBeenCalled()
  })

  test('envía el mensaje con su tipo, avisa y limpia el formulario', async () => {
    const espia = vi.spyOn(contactoService, 'enviar')
    renderConProviders(<Contacto />)
    await llenarFormulario()
    await userEvent.click(botonEnviar())

    expect(espia).toHaveBeenCalledWith({
      tipo: 'Reclamo',
      nombre: 'Rosa',
      email: 'rosa@gmail.com',
      mensaje: 'Mi torta llegó tarde',
      usuarioId: null,
    })
    expect(await screen.findByRole('status')).toHaveTextContent('Recibimos tu mensaje')
    expect(screen.getByLabelText('Nombre')).toHaveValue('')
  })

  test('si el service falla, muestra el error', async () => {
    vi.spyOn(contactoService, 'enviar').mockRejectedValue(new Error('No se pudo enviar'))
    renderConProviders(<Contacto />)
    await llenarFormulario()
    await userEvent.click(botonEnviar())

    expect(await screen.findByRole('alert')).toHaveTextContent('No se pudo enviar')
  })

  test('sin sesión no aparece la opción de usar mis datos', () => {
    renderConProviders(<Contacto />)
    expect(screen.queryByLabelText('Usar los datos de mi cuenta')).not.toBeInTheDocument()
  })

  test('con sesión, la opción autocompleta nombre y correo', async () => {
    renderConProviders(<Contacto />, { usuario: { id: 4 } })
    await userEvent.click(await screen.findByLabelText('Usar los datos de mi cuenta'))

    expect(screen.getByLabelText('Correo electrónico')).toHaveValue('camila@duocuc.cl')
   expect(screen.getByLabelText('Nombre')).toHaveValue('Camila Pérez Soto')
    expect(screen.getByLabelText('Nombre')).toHaveAttribute('readonly')
  })
})


