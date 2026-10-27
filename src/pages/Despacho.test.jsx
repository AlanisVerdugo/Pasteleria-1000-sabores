import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Despacho from '../pages/Despacho'

const renderizar = () =>
    render(
        <MemoryRouter>
            <Despacho />
        </MemoryRouter>
    )

describe('Despacho', () => {
    it('muestra los 4 pasos del recorrido', () => {
        renderizar()
        for (const titulo of ['Haces tu pedido', 'La horneamos', 'Va en camino', 'Llega a tu mesa']) {
            expect(screen.getByText(titulo)).toBeInTheDocument()
        }
    })

    it('muestra el costo de despacho desde la constante', () => {
        renderizar()
        expect(screen.getByText(/3\.500/)).toBeInTheDocument()
    })

    it('tiene un enlace a Contacto', () => {
        renderizar()
        expect(screen.getByRole('link', { name: /ir a contacto/i })).toHaveAttribute('href', '/contacto')
    })
})


