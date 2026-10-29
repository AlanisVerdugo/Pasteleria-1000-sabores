import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SelectorEstado from './SelectorEstado'

describe('SelectorEstado', () => {
  test('muestra los 3 estados de ESTADOS_ORDEN con el actual elegido', () => {
    render(<SelectorEstado estado="en_camino" onCambiar={() => {}} />)
    expect(screen.getAllByRole('option')).toHaveLength(3)
    expect(screen.getByLabelText('Cambiar estado')).toHaveValue('en_camino')
  })

  test('al elegir otro estado llama a onCambiar con su clave', async () => {
    const onCambiar = vi.fn()
    render(<SelectorEstado estado="preparacion" onCambiar={onCambiar} etiqueta="Estado de B-000001" />)
    await userEvent.selectOptions(screen.getByLabelText('Estado de B-000001'), 'entregado')
    expect(onCambiar).toHaveBeenCalledWith('entregado')
  })
})
