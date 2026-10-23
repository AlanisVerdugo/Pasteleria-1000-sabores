import { VERSION_DATOS } from '../utils/constantes'

export class Repositorio {
  #clave; #semilla; #campoId; #Modelo   // # = privado, solo la clase los ve

  constructor({ clave, semilla = [], campoId = 'id', Modelo = null }) {
    this.#clave = clave
    this.#semilla = semilla
    this.#campoId = campoId
    this.#Modelo = Modelo
    this.items = this.#cargar()
  }

  #crear(datos) {
    return this.#Modelo ? new this.#Modelo(datos) : { ...datos }
  }

  #cargar() {
    const guardado = JSON.parse(localStorage.getItem(this.#clave))
    if (guardado && guardado.version === VERSION_DATOS) {
      return guardado.items.map((d) => this.#crear(d))
    }
    const items = this.#semilla.map((d) => this.#crear(d))
    this.#guardar(items)
    return items
  }

  #guardar(items = this.items) {
    localStorage.setItem(this.#clave, JSON.stringify({ version: VERSION_DATOS, items }))
  }

  #indice(id) {
    const i = this.items.findIndex((item) => item[this.#campoId] === id)
    if (i === -1) throw new Error('No encontrado')
    return i
  }

  listar() {
    return [...this.items]
  }

  buscarPorId(id) {
    return this.items.find((item) => item[this.#campoId] === id) ?? null
  }

  agregar(datos) {
    const nuevo = { ...datos }
    if (this.#campoId === 'id') {
      nuevo.id = Math.max(0, ...this.items.map((i) => i.id)) + 1
    } else if (this.buscarPorId(nuevo[this.#campoId])) {
      throw new Error('Ya existe')
    }
    const item = this.#crear(nuevo)
    this.items.push(item)
    this.#guardar()
    return item
  }

  actualizar(id, cambios) {
    const i = this.#indice(id)
    this.items[i] = this.#crear({ ...this.items[i], ...cambios, [this.#campoId]: id })
    this.#guardar()
    return this.items[i]
  }

  eliminar(id) {
    this.items.splice(this.#indice(id), 1)
    this.#guardar()
    return true
  }

  reiniciar() {
    this.items = this.#semilla.map((d) => this.#crear(d))
    this.#guardar()
  }
}