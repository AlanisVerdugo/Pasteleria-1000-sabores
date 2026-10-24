import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Routes, Route, Link } from 'react-router-dom'
import SubirAlInicio from './SubirAlInicio'
import { renderConProviders } from '../test/utils'

describe('SubirAlInicio', () => {
  test('al cambiar de página sube al inicio', async () => {
    const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    const user = userEvent.setup()
    renderConProviders(
      <>
        <SubirAlInicio />
        <Routes>
          <Route path="/" element={<Link to="/otra">Ir a otra</Link>} />
          <Route path="/otra" element={<p>Otra página</p>} />
        </Routes>
      </>
    )
    scroll.mockClear() // ignoramos la llamada de la primera carga

    await user.click(screen.getByRole('link', { name: 'Ir a otra' }))
    expect(await screen.findByText('Otra página')).toBeInTheDocument()
    expect(scroll).toHaveBeenCalledWith(0, 0)
    scroll.mockRestore()
  })
})