import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import { validarLogin } from '../utils/validaciones'
import { renderConProviders } from '../test/utils'

// Mini app con 3 rutas para comprobar a dónde redirige el login
function renderLogin() {
  return renderConProviders(
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<p>PANEL ADMIN</p>} />
      <Route path="/" element={<p>INICIO</p>} />
    </Routes>,
    { ruta: '/login' }
  )
}

async function ingresar(email, password) {
  if (email) await userEvent.type(screen.getByLabelText('Correo Electrónico'), email)
  if (password) await userEvent.type(screen.getByLabelText('Contraseña'), password)
  await userEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))
}

describe('validarLogin', () => {
  test('pide correo y contraseña si están vacíos', () => {
    expect(validarLogin({ email: '', password: '' })).toEqual({
      email: 'Ingresa tu correo',
      password: 'Ingresa tu contraseña',
    })
  })
  test('rechaza correo mal escrito y contraseña corta', () => {
    const errores = validarLogin({ email: 'hola', password: '12' })
    expect(errores.email).toBe('El correo no es válido')
    expect(errores.password).toBe('Debe tener entre 4 y 10 caracteres')
  })
})

describe('Login', () => {
  test('muestra errores de validación al enviar vacío', async () => {
    renderLogin()
    await ingresar()
    expect(screen.getByText('Ingresa tu correo')).toBeInTheDocument()
    expect(screen.getByText('Ingresa tu contraseña')).toBeInTheDocument()
  })

  test('muestra "Credenciales inválidas" con contraseña incorrecta', async () => {
    renderLogin()
    await ingresar('admin@duoc.cl', 'mala1234')
    expect(await screen.findByRole('alert')).toHaveTextContent('Credenciales inválidas')
  })

  test('el aviso de credenciales se borra al volver a escribir', async () => {
    renderLogin()
    await ingresar('admin@duoc.cl', 'mala1234')
    await screen.findByRole('alert')
    await userEvent.type(screen.getByLabelText('Contraseña'), 'x')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  test('el admin entra y va a /admin', async () => {
    renderLogin()
    await ingresar('admin@duoc.cl', 'admin123')
    expect(await screen.findByText('PANEL ADMIN')).toBeInTheDocument()
  })

  test('un cliente entra y va al inicio', async () => {
    renderLogin()
    await ingresar('camila@duocuc.cl', '1234')
    expect(await screen.findByText('INICIO')).toBeInTheDocument()
  })
})