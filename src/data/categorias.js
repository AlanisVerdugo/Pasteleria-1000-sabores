import { Repositorio } from './Repositorio'
import { Categoria } from '../models/Categoria'
import { CATEGORIAS } from './semillas/categorias'

export const categoriasRepo = new Repositorio({ clave: 'pms_categorias', semilla: CATEGORIAS, Modelo: Categoria })