import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Cabecera from './Cabecera'
import { renderConProviders } from '../test/utils'
import { crearItem } from '../context/CarritoContext'

async function abrirMenuUsuario(container) {
  await userEvent.click(container.querySelector('#menu-usuario'))
}

describe('Cabecera', () => {
  test('sin sesión muestra Iniciar sesión y Registrarse', async () => {
    const { container } = renderConProviders(<Cabecera />)
    await abrirMenuUsuario(container)
    expect(await screen.findByText('Iniciar sesión')).toBeInTheDocument()
    expect(screen.getByText('Registrarse')).toBeInTheDocument()
    expect(screen.queryByText('Cerrar sesión')).not.toBeInTheDocument()
  })

  test('con sesión de cliente muestra Cerrar sesión pero no Panel admin', async () => {
    const { container } = renderConProviders(<Cabecera />, { usuario: { id: 4 } })
    await abrirMenuUsuario(container)
    expect(await screen.findByText('Cerrar sesión')).toBeInTheDocument()
    expect(screen.queryByText('Panel admin')).not.toBeInTheDocument()
  })

  test('con sesión de admin muestra Panel admin', async () => {
    const { container } = renderConProviders(<Cabecera />, { usuario: { id: 1 } })
    await abrirMenuUsuario(container)
    expect(await screen.findByText('Panel admin')).toBeInTheDocument()
  })

  test('el badge muestra la cantidad de productos del carrito', () => {
    const producto = { codigo: 'X1', nombre: 'Torta prueba', precio: 10000, stock: 10, categoriaId: 1 }
    localStorage.setItem('pms_carrito', JSON.stringify([crearItem(producto, { cantidad: 3 })]))
    renderConProviders(<Cabecera />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  test('sin productos no muestra el badge', () => {
    renderConProviders(<Cabecera />)
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })
})