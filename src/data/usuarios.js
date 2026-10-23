import { Repositorio } from './Repositorio'
import { Usuario } from '../models/Usuario'
import { USUARIOS } from './semillas/usuarios'

export const usuariosRepo = new Repositorio({ clave: 'pms_usuarios', semilla: USUARIOS, Modelo: Usuario })