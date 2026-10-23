import { Repositorio } from './Repositorio'
import { Producto } from '../models/Producto'
import { PRODUCTOS } from './semillas/productos'
import { STOCK_CRITICO } from '../utils/constantes'

class ProductoRepositorio extends Repositorio {
  listarCriticos() {
    return this.listar().filter((p) => p.stock < STOCK_CRITICO)
  }
}

export const productosRepo = new ProductoRepositorio({
  clave: 'pms_productos', semilla: PRODUCTOS, campoId: 'codigo', Modelo: Producto,
})