import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CarritoProvider } from '../context/CarritoContext'

export function renderConProviders(ui, { ruta = '/', usuario = null } = {}) {
  if (usuario) localStorage.setItem('pms_sesion', JSON.stringify({ usuarioId: usuario.id }))
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <AuthProvider>
        <CarritoProvider>{ui}</CarritoProvider>
      </AuthProvider>
    </MemoryRouter>
  )
}