import { render, screen, fireEvent } from '@testing-library/react'
import ItemCarrito from './ItemCarrito'

describe('ItemCarrito', () => {
  test('muestra el nombre, detalle, precio y cantidad que recibe por props', () => {
    render(
      <ItemCarrito
        imagen="/img/torta.jpg"
        nombre="Torta de Prueba"
        detalle="1 unidad(es) · $45.000 c/u"
        precio="$45.000"
        cantidad={1}
        onSumar={() => {}}
        onRestar={() => {}}
        onEliminar={() => {}}
      />
    )
    expect(screen.getByText('Torta de Prueba')).toBeInTheDocument()
    expect(screen.getByText('1 unidad(es) · $45.000 c/u')).toBeInTheDocument()
    expect(screen.getByText('$45.000')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('con otra cantidad, la muestra distinta', () => {
    render(
      <ItemCarrito
        imagen="/img/torta.jpg"
        nombre="Torta de Prueba"
        detalle="3 unidad(es)"
        precio="$135.000"
        cantidad={3}
        onSumar={() => {}}
        onRestar={() => {}}
        onEliminar={() => {}}
      />
    )
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  test('al hacer clic en "+" llama a onSumar', () => {
    const manejarSumar = vi.fn()
    render(
      <ItemCarrito
        imagen="/img/torta.jpg"
        nombre="Torta"
        detalle="detalle"
        precio="$1.000"
        cantidad={1}
        onSumar={manejarSumar}
        onRestar={() => {}}
        onEliminar={() => {}}
      />
    )
    fireEvent.click(document.querySelector('.btn-sumar'))
    expect(manejarSumar).toHaveBeenCalledTimes(1)
  })

  test('al hacer clic en eliminar llama a onEliminar', () => {
    const manejarEliminar = vi.fn()
    render(
      <ItemCarrito
        imagen="/img/torta.jpg"
        nombre="Torta"
        detalle="detalle"
        precio="$1.000"
        cantidad={1}
        onSumar={() => {}}
        onRestar={() => {}}
        onEliminar={manejarEliminar}
      />
    )
    fireEvent.click(screen.getByLabelText('Eliminar producto'))
    expect(manejarEliminar).toHaveBeenCalledTimes(1)
  })
})