import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CarritoProvider } from '../context/CarritoContext'

export const ADMIN = { id: 1 }

export function renderConProviders(ui, { ruta = '/', usuario = null } = {}) {
  if (usuario) {
    localStorage.setItem('pms_token', `t-${usuario.id}`)
    localStorage.setItem('pms_refresh', `r-${usuario.id}`)
  }
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <AuthProvider>
        <CarritoProvider>{ui}</CarritoProvider>
      </AuthProvider>
    </MemoryRouter>
  )
}