import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Routes, Route } from 'react-router-dom'
import { renderConProviders } from '../test/utils'
import Registro from './Registro'
import { validarRegistro } from '../utils/validaciones'

const VALIDOS = {
  run: '11.111.111-1', nombre: 'Ana', apellidos: 'Pérez Soto',
  email: 'ana@gmail.com', fechaNacimiento: '2000-05-10',
  password: '1234', confirmar: '1234', codigo: '', terminos: true,
}

describe('validarRegistro', () => {
  it('no devuelve errores con datos válidos', () => {
    expect(validarRegistro(VALIDOS)).toEqual({})
  })

  it('acepta un RUN terminado en K (minúscula o mayúscula)', () => {
    expect(validarRegistro({ ...VALIDOS, run: '11.111.112-k' }).run).toBeUndefined()
  })

  it('marca error si las contraseñas no coinciden', () => {
    expect(validarRegistro({ ...VALIDOS, confirmar: '9999' }).confirmar).toBeTruthy()
  })

  it('marca error con un código inválido, pero acepta felices50', () => {
    expect(validarRegistro({ ...VALIDOS, codigo: 'HOLA' }).codigo).toBeTruthy()
    expect(validarRegistro({ ...VALIDOS, codigo: 'felices50' }).codigo).toBeUndefined()
  })

  it('exige aceptar los términos', () => {
    expect(validarRegistro({ ...VALIDOS, terminos: false }).terminos).toBeTruthy()
  })
})

function renderRegistro() {
  return renderConProviders(
    <Routes>
      <Route path="/registro" element={<Registro />} />
      <Route path="/" element={<h1>INICIO</h1>} />
    </Routes>,
    { ruta: '/registro' }
  )
}

async function llenar(user, datos) {
  await user.type(screen.getByLabelText('RUN'), datos.run)
  await user.type(screen.getByLabelText('Nombre'), datos.nombre)
  await user.type(screen.getByLabelText('Apellidos'), datos.apellidos)
  await user.type(screen.getByLabelText('Correo Electrónico'), datos.email)
  await user.type(screen.getByLabelText('Fecha de Nacimiento'), datos.fechaNacimiento)
  await user.type(screen.getByLabelText('Contraseña'), datos.password)
  await user.type(screen.getByLabelText('Confirmar Contraseña'), datos.confirmar)
  await user.click(screen.getByLabelText(/términos/i))
}

describe('Registro', () => {
  it('no muestra beneficios mientras no hay datos', () => {
    renderRegistro()
    expect(screen.getByTestId('mis-beneficios').querySelectorAll('li')).toHaveLength(0)
  })

  it('muestra la torta de cumpleaños al escribir un correo @duocuc.cl', async () => {
    const user = userEvent.setup()
    renderRegistro()
    await user.type(screen.getByLabelText('Correo Electrónico'), 'ana@duocuc.cl')
    expect(screen.getByTestId('mis-beneficios')).toHaveTextContent(/torta/i)
  })

  it('con más de 50 años y FELICES50 muestra solo el 50%', async () => {
    const user = userEvent.setup()
    renderRegistro()
    await user.type(screen.getByLabelText('Fecha de Nacimiento'), '1960-05-10')
    await user.type(screen.getByLabelText(/código/i), 'felices50')
    const caja = screen.getByTestId('mis-beneficios')
    expect(caja).toHaveTextContent('50%')
    expect(caja).not.toHaveTextContent('10%')
  })

  it('muestra errores y no avanza si el formulario está vacío', async () => {
    const user = userEvent.setup()
    renderRegistro()
    await user.click(screen.getByRole('button', { name: /registrarse/i }))
    expect(screen.queryByText('INICIO')).not.toBeInTheDocument()
  })

  it('registra con datos válidos y lleva al inicio', async () => {
    const user = userEvent.setup()
    renderRegistro()
    await llenar(user, VALIDOS)
    await user.click(screen.getByRole('button', { name: /registrarse/i }))
    expect(await screen.findByText('INICIO')).toBeInTheDocument()
  })

  it('avisa si el correo ya está registrado', async () => {
    const user = userEvent.setup()
    renderRegistro()
    await llenar(user, { ...VALIDOS, email: 'camila@duocuc.cl' })
    await user.click(screen.getByRole('button', { name: /registrarse/i }))
    expect(await screen.findByRole('alert')).toHaveTextContent(/ya está registrado/i)
  })
})