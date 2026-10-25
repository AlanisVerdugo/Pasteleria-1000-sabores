import { blogRepo, mensajesRepo } from '../data/otros'

export const blogService = {
  async listar() { return blogRepo.listar() },
  async obtenerPorId(id) { return blogRepo.buscarPorId(Number(id)) },
}

export const contactoService = {
  async enviar({ tipo, nombre, email, mensaje, usuarioId = null }) {
    if (!tipo || !nombre || !email || !mensaje) throw new Error('Completa todos los campos')
    return mensajesRepo.agregar({ tipo, nombre, email, mensaje, usuarioId, fecha: new Date().toISOString() })
  },
  async listar() { return mensajesRepo.listar() },
}

// Pago simulado (D1): espera un poco, como un banco de verdad
export const pagosService = {
  procesarPago({ total, simularFallo = false }, espera = 800) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (simularFallo || total <= 0) reject(new Error('Pago rechazado (simulado)'))
        else resolve({ aprobado: true, transaccion: 'TX-' + Date.now() })
      }, espera)
    })
  },
}