import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PasoDespacho from '../components/PasoDespacho'

describe('PasoDespacho', () => {
    it('muestra número, título y texto del paso', () => {
        render(
            <ul>
                <PasoDespacho numero={2} icono="bi-fire" titulo="La horneamos" texto="Recién hecha" />
            </ul>
        )

        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByRole('heading', { level: 3, name: 'La horneamos' })).toBeInTheDocument()
        expect(screen.getByText('Recién hecha')).toBeInTheDocument()
    })
})

