import { Repositorio } from './Repositorio'
import { BLOG } from './semillas/blog'

export const blogRepo = new Repositorio({ clave: 'pms_blog', semilla: BLOG })
export const mensajesRepo = new Repositorio({ clave: 'pms_mensajes', semilla: [] })