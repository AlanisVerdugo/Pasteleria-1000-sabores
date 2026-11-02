import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Catalogo from './Catalogo'
import { renderConProviders } from '../test/utils'

const cantidadMostrada = () => screen.getByText(/mostrando/i).querySelector('strong').textContent

describe('Catalogo', () => {
  beforeEach(() => localStorage.clear())

  test('carga productos y pagina de a 6', async () => {
    renderConProviders(<Catalogo />, { ruta: '/productos' })
    expect((await screen.findAllByText('Torta Cuadrada de Chocolate')).length).toBeGreaterThan(0)
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
  })

  test('el buscador filtra por texto', async () => {
    const user = userEvent.setup()
    renderConProviders(<Catalogo />, { ruta: '/productos' })
    await user.type(screen.getByPlaceholderText('Buscar productos...'), 'mousse')
    expect((await screen.findAllByText('Mousse de Chocolate')).length).toBeGreaterThan(0)
    expect(cantidadMostrada()).toBe('1')
  })

  test('sin coincidencias muestra el aviso', async () => {
    const user = userEvent.setup()
    renderConProviders(<Catalogo />, { ruta: '/productos' })
    await user.type(screen.getByPlaceholderText('Buscar productos...'), 'zzzz')
    expect(await screen.findByText(/no se encontraron productos/i)).toBeInTheDocument()
  })

  test('lee la búsqueda desde la URL (?q=)', async () => {
    renderConProviders(<Catalogo />, { ruta: '/productos?q=mousse' })
    expect(screen.getByPlaceholderText('Buscar productos...')).toHaveValue('mousse')
    expect((await screen.findAllByText('Mousse de Chocolate')).length).toBeGreaterThan(0)
  })
})

