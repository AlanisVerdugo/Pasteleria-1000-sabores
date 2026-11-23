import { api, nuloSiNoExiste } from './api'

export const blogService = {
  async listar() {
    return (await api.get('/blog')).data
  },
  async obtenerPorId(id) {
    return api.get(`/blog/${id}`).then((r) => r.data).catch(nuloSiNoExiste)
  },
}

export const contactoService = {
  async enviar({ tipo, nombre, email, mensaje }) {
    if (!tipo || !nombre || !email || !mensaje) throw new Error('Completa todos los campos')
    return (await api.post('/mensajes', { tipo, nombre, email, mensaje })).data
  },
  async listar() {
    return (await api.get('/mensajes')).data
  },
}

/** Pago simulado (D1): espera un poco, como un banco de verdad */
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