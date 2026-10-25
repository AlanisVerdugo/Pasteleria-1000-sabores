import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import BotonesCompartir from './BotonesCompartir'

const URL_PRUEBA = 'https://pasteleria.cl/blog/1'

describe('BotonesCompartir', () => {
  it('arma los enlaces de cada red con el título y la url codificados', () => {
    render(<BotonesCompartir titulo="Torta de Manjar" url={URL_PRUEBA} />)

    const urlCodificada = encodeURIComponent(URL_PRUEBA)

    expect(screen.getByLabelText('Compartir en Facebook'))
      .toHaveAttribute('href', `https://www.facebook.com/sharer/sharer.php?u=${urlCodificada}`)
    expect(screen.getByLabelText('Compartir en X').getAttribute('href'))
      .toContain('text=Torta%20de%20Manjar')
    expect(screen.getByLabelText('Compartir en WhatsApp').getAttribute('href'))
      .toContain(urlCodificada)
  })

  it('copia el enlace y muestra el aviso', async () => {
    const user = userEvent.setup()
    render(<BotonesCompartir titulo="Torta de Manjar" url={URL_PRUEBA} />)

    await user.click(screen.getByLabelText('Copiar enlace'))

    expect(await screen.findByRole('status')).toHaveTextContent('¡Enlace copiado!')
    await expect(navigator.clipboard.readText()).resolves.toBe(URL_PRUEBA)
  })

  it('no muestra el aviso si falla el portapapeles', async () => {
    const user = userEvent.setup()
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('sin permiso'))
    render(<BotonesCompartir titulo="Torta de Manjar" url={URL_PRUEBA} />)

    await user.click(screen.getByLabelText('Copiar enlace'))

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})