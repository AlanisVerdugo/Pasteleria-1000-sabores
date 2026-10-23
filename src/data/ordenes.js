import { Repositorio } from './Repositorio'
import { Orden } from '../models/Orden'

export const ordenesRepo = new Repositorio({ clave: 'pms_ordenes', semilla: [], Modelo: Orden })