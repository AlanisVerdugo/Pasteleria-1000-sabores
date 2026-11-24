import { usuariosRepo } from './almacen'

// Agrega a la API falsa el usuario vendedor de las semillas del backend (vendedor@pasteleria.cl).
// Se llama en cada prueba porque setup.js reinicia los datos antes de cada una.
export function agregarVendedor() {
  return usuariosRepo.agregar({
    run: '99999999K', nombre: 'Vale', apellidos: 'Vendedora', email: 'vendedor@pasteleria.cl',
    password: 'vendedor123', fechaNacimiento: '1995-05-05', rol: 'vendedor', codigoDescuento: null,
    fechaRegistro: '2026-11-16',
  })
}
