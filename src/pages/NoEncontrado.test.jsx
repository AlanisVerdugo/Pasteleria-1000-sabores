import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NoEncontrado from './NoEncontrado'

const renderizar = () =>
    render(
        <MemoryRouter>
            <NoEncontrado />
        </MemoryRouter>
    )

describe('NoEncontrado (404)', () => {
    it('muestra el mensaje de página no encontrada', () => {
        renderizar()
        expect(screen.getByRole('heading', { level: 1, name: /no salió del horno/i })).toBeInTheDocument()
    })

    it('tiene un enlace para volver al inicio', () => {
        renderizar()
        expect(screen.getByRole('link', { name: /volver al inicio/i })).toHaveAttribute('href', '/')
    })

    it('tiene un enlace al catálogo', () => {
        renderizar()
        expect(screen.getByRole('link', { name: /ver catálogo/i })).toHaveAttribute('href', '/productos')
    })
})

