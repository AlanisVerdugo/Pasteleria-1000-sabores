import { fireEvent, screen } from '@testing-library/react'
import Blog from './Blog'
import { renderConProviders } from '../test/utils'

describe('Blog', () => {
  test('muestra los artículos que vienen del service', async () => {
    renderConProviders(<Blog />)
    expect(await screen.findAllByTestId('tarjeta-blog')).toHaveLength(4)
  })

  test('filtra por categoría y marca el botón activo', async () => {
    renderConProviders(<Blog />)
    await screen.findAllByTestId('tarjeta-blog')

    const boton = screen.getByRole('button', { name: 'Aportes Duoc UC' })
    fireEvent.click(boton)

    expect(screen.getAllByTestId('tarjeta-blog')).toHaveLength(1)
    expect(boton).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Todos' })).toHaveAttribute('aria-pressed', 'false')
  })
})