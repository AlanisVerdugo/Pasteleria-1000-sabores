import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import OrdenesLista from './OrdenesLista'
import { renderConProviders } from '../../test/utils'
import { ordenesService } from '../../services'
import { ordenesRepo } from '../../data/ordenes'

afterEach(() => {
  vi.restoreAllMocks()
  ordenesRepo.reiniciar()
})

describe('OrdenesLista', () => {
  test('lista las órdenes (la más nueva primero) con el nombre del cliente', async () => {
    renderConProviders(<OrdenesLista />)
    const filas = await screen.findAllByTestId('fila-orden')
    expect(filas).toHaveLength(2)
    expect(filas[0]).toHaveTextContent('B-000002')
    expect(filas[0]).toHaveTextContent('Camila Pérez Soto') // la semilla no trae cliente: se busca el usuario
    expect(within(filas[1]).getByText('5')).toBeInTheDocument() // 1 torta + 4 empanadas
    expect(within(filas[0]).getByRole('link', { name: /Ver boleta/ })).toHaveAttribute('href', '/admin/ordenes/2')
  })

  test('filtra por estado con los botones', async () => {
    const user = userEvent.setup()
    renderConProviders(<OrdenesLista />)
    await screen.findAllByTestId('fila-orden')
    await user.click(screen.getByRole('button', { name: 'Entregado (1)' }))
    expect(screen.getAllByTestId('fila-orden')).toHaveLength(1)
    expect(screen.getByTestId('fila-orden')).toHaveTextContent('B-000001')
    await user.click(screen.getByRole('button', { name: 'En camino (0)' }))
    expect(screen.getByText('No hay órdenes que coincidan.')).toBeInTheDocument()
  })

  test('busca por número de boleta', async () => {
    const user = userEvent.setup()
    renderConProviders(<OrdenesLista />)
    await screen.findAllByTestId('fila-orden')
    await user.type(screen.getByLabelText('Buscar orden'), '000001')
    expect(screen.getAllByTestId('fila-orden')).toHaveLength(1)
  })

  test('cambiar el estado llama al service y actualiza la tabla', async () => {
    const espia = vi.spyOn(ordenesService, 'cambiarEstado')
    const user = userEvent.setup()
    renderConProviders(<OrdenesLista />)
    await screen.findAllByTestId('fila-orden')
    await user.selectOptions(screen.getByLabelText('Estado de B-000002'), 'en_camino')

    expect(espia).toHaveBeenCalledWith(2, 'en_camino')
    expect(await screen.findByText('La orden B-000002 quedó "En camino"')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'En camino (1)' })).toBeInTheDocument()
  })

  test('si cambiar el estado falla, muestra el error', async () => {
    vi.spyOn(ordenesService, 'cambiarEstado').mockRejectedValue(new Error('Estado no válido'))
    const user = userEvent.setup()
    renderConProviders(<OrdenesLista />)
    await screen.findAllByTestId('fila-orden')
    await user.selectOptions(screen.getByLabelText('Estado de B-000002'), 'entregado')
    expect(await screen.findByText('Estado no válido')).toBeInTheDocument()
  })

  test('si el service falla al cargar, muestra el error', async () => {
    vi.spyOn(ordenesService, 'listar').mockRejectedValue(new Error('Sin conexión'))
    renderConProviders(<OrdenesLista />)
    expect(await screen.findByRole('alert')).toHaveTextContent('Sin conexión')
  })
})
