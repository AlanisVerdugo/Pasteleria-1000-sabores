import { DOMINIOS_DUOC } from '../utils/constantes'

export class Usuario {
  constructor({ email = '', rol = 'cliente', ...resto }) {
    const esDuoc = DOMINIOS_DUOC.some((d) => email.toLowerCase().endsWith(d))
    Object.assign(this, { ...resto, email, rol, esDuoc, tipoUsuario: esDuoc ? 'duoc' : 'normal' })
  }
}