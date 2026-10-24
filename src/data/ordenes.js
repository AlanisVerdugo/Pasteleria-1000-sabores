import { Repositorio } from './Repositorio'
import { Orden } from '../models/Orden'

const SEMILLA_ORDENES = [
  {
    id: 1, numero: 'B-000001', usuarioId: 4, estado: 'entregado', fecha: '2026-10-10T15:00:00.000Z',
    items: [
      { nombre: 'Torta Sin Azúcar de Naranja', imagen: '/img/Torta sin azucar de naranja.jpg', cantidad: 1, precio: 48000 },
      { nombre: 'Empanada de Manzana', imagen: '/img/Empanada de manzana.jpg', cantidad: 4, precio: 3000 },
    ],
    total: 60000,
  },
  {
    id: 2, numero: 'B-000002', usuarioId: 4, estado: 'preparacion', fecha: '2026-10-22T18:30:00.000Z',
    items: [
      { nombre: 'Torta Cuadrada de Chocolate', imagen: '/img/Torta cuadrada de chocolate.jpg', cantidad: 1, precio: 45000 },
    ],
    total: 45000,
  },
]

export const ordenesRepo = new Repositorio({ clave: 'pms_ordenes', semilla: SEMILLA_ORDENES, Modelo: Orden })
