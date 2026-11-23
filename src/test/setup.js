import '@testing-library/jest-dom'
import { reiniciarFalso } from './falso/almacen'

vi.mock('../services/api', () => import('./falso/apiFalsa'))

beforeEach(() => {
  localStorage.clear()
  reiniciarFalso()
})