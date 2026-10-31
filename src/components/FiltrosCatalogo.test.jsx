import { render, screen, fireEvent } from '@testing-library/react'
import FiltrosCatalogo from './FiltrosCatalogo'

describe('FiltrosCatalogo', () => {
  test('muestra las categorías reales (carga asíncrona)', async () => {
    render(<FiltrosCatalogo categoriaId={undefined} forma={undefined} personas={undefined} onCambiar={() => {}} onLimpiar={() => {}} />)
    expect(await screen.findByText('Postres Individuales')).toBeInTheDocument()
  })

  test('marca como seleccionada la categoría que coincide con categoriaId', async () => {
    render(<FiltrosCatalogo categoriaId={3} forma={undefined} personas={undefined} onCambiar={() => {}} onLimpiar={() => {}} />)
    const checkbox = await screen.findByLabelText('Postres Individuales')
    expect(checkbox).toBeChecked()
  })

  test('al hacer clic en una categoría llama a onCambiar con su id', async () => {
    const manejarCambiar = vi.fn()
    render(<FiltrosCatalogo categoriaId={undefined} forma={undefined} personas={undefined} onCambiar={manejarCambiar} onLimpiar={() => {}} />)
    const checkbox = await screen.findByLabelText('Postres Individuales')
    fireEvent.click(checkbox)
    expect(manejarCambiar).toHaveBeenCalledWith('categoriaId', 3)
  })

  test('al hacer clic en "Limpiar" llama a onLimpiar', () => {
    const manejarLimpiar = vi.fn()
    render(<FiltrosCatalogo categoriaId={undefined} forma={undefined} personas={undefined} onCambiar={() => {}} onLimpiar={manejarLimpiar} />)
    fireEvent.click(screen.getByRole('link', { name: /Limpiar/i }))
    expect(manejarLimpiar).toHaveBeenCalledTimes(1)
  })
})