import { Repositorio } from './Repositorio'
import { Producto } from '../models/Producto'

const semilla = [
  { codigo: 'A1', nombre: 'Torta A', precio: 1000, stock: 3 },
  { codigo: 'B2', nombre: 'Torta B', precio: 2000, stock: 0 },
]
const crearRepo = () =>
  new Repositorio({ clave: 'test', semilla, campoId: 'codigo', Modelo: Producto })

describe('Repositorio', () => {
  test('carga la semilla como instancias del modelo', () => {
    const repo = crearRepo()
    expect(repo.listar()).toHaveLength(2)
    expect(repo.buscarPorId('B2').estaAgotado()).toBe(true)
  })

  test('agrega y lo guarda en localStorage', () => {
    crearRepo().agregar({ codigo: 'C3', nombre: 'Torta C', precio: 3000 })
    expect(crearRepo().buscarPorId('C3').nombre).toBe('Torta C')
  })

  test('no permite códigos repetidos', () => {
    expect(() => crearRepo().agregar({ codigo: 'A1' })).toThrow('Ya existe')
  })

  test('actualiza y elimina', () => {
    const repo = crearRepo()
    expect(repo.actualizar('A1', { precio: 1500 }).precio).toBe(1500)
    expect(repo.eliminar('A1')).toBe(true)
    expect(repo.buscarPorId('A1')).toBeNull()
  })

  test('lanza error si no existe', () => {
    expect(() => crearRepo().eliminar('ZZ')).toThrow('No encontrado')
  })

  test('autoincrementa el id cuando campoId es "id"', () => {
    const repo = new Repositorio({ clave: 'u', semilla: [{ id: 1 }, { id: 2 }] })
    expect(repo.agregar({ nombre: 'Ana' }).id).toBe(3)
  })
})