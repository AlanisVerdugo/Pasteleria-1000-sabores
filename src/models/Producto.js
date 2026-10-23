export class Producto {
  constructor({ codigo, nombre, categoriaId, precio, stock = 0, oferta = 0, activo = true, ...resto }) {
    Object.assign(this, { codigo, nombre, categoriaId, precio, stock, oferta, activo, ...resto })
  }
  estaAgotado() {
    return this.stock === 0
  }
}





