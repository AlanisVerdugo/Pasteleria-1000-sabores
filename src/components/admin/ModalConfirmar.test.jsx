import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ModalConfirmar from './ModalConfirmar'

describe('ModalConfirmar', () => {
  test('oculto no muestra nada', () => {
    render(<ModalConfirmar mostrar={false} titulo="Eliminar" mensaje="¿Seguro?" onConfirmar={() => {}} onCancelar={() => {}} />)
    expect(screen.queryByText('¿Seguro?')).not.toBeInTheDocument()
  })

  test('visible: los botones llaman a onConfirmar y onCancelar', async () => {
    const onConfirmar = vi.fn()
    const onCancelar = vi.fn()
    const user = userEvent.setup()
    render(
      <ModalConfirmar mostrar titulo="Eliminar producto" mensaje="¿Seguro?"
        onConfirmar={onConfirmar} onCancelar={onCancelar} />
    )
    expect(screen.getByText('¿Seguro?')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Eliminar' }))
    expect(onConfirmar).toHaveBeenCalledTimes(1)
    await user.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(onCancelar).toHaveBeenCalledTimes(1)
  })

  test('acepta otro texto para el botón de confirmar (props)', () => {
    render(<ModalConfirmar mostrar titulo="Salir" mensaje="¿Salir?" textoConfirmar="Sí, salir"
      onConfirmar={() => {}} onCancelar={() => {}} />)
    expect(screen.getByRole('button', { name: 'Sí, salir' })).toBeInTheDocument()
  })
})
