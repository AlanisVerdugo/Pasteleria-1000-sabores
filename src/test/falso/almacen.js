import { Repositorio } from './Repositorio'
import { PRODUCTOS } from './semillas/productos'
import { CATEGORIAS } from './semillas/categorias'
import { USUARIOS } from './semillas/usuarios'
import { BLOG } from './semillas/blog'
import { ORDENES } from './semillas/ordenes'

export const productosRepo = new Repositorio({
  clave: 'pms_falso_productos',
  semilla: PRODUCTOS,
  campoId: 'codigo',
})

export const categoriasRepo = new Repositorio({
  clave: 'pms_falso_categorias',
  semilla: CATEGORIAS,
})

export const usuariosRepo = new Repositorio({
  clave: 'pms_falso_usuarios',
  semilla: USUARIOS,
})

export const boletasRepo = new Repositorio({
  clave: 'pms_falso_boletas',
  semilla: ORDENES,
})

export const blogRepo = new Repositorio({
  clave: 'pms_falso_blog',
  semilla: BLOG,
})

export const mensajesRepo = new Repositorio({
  clave: 'pms_falso_mensajes',
  semilla: [],
})

export function reiniciarFalso() {
  productosRepo.reiniciar()
  categoriasRepo.reiniciar()
  usuariosRepo.reiniciar()
  boletasRepo.reiniciar()
  blogRepo.reiniciar()
  mensajesRepo.reiniciar()
}