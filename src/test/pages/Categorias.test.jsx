import { screen } from '@testing-library/react'
import Categorias from '../../pages/Categorias'
import { renderConProviders } from '../utils'

describe('Categorias', () => {
  test('lista las 8 categorías con link a su detalle', async () => {
    renderConProviders(<Categorias />)
    const link = await screen.findByRole('link', { name: /tortas cuadradas/i })
    expect(link).toHaveAttribute('href', '/categorias/1')
    expect(screen.getAllByRole('link')).toHaveLength(8)
  })
})

