// Datos iniciales de productos. Para agregar uno: suma un objeto aquí
// y sube VERSION_DATOS en utils/constantes.js
const TAMANOS = [
  { id: 'chica', personas: 8, extra: 0 },
  { id: 'mediana', personas: 15, extra: 10000 },
  { id: 'grande', personas: 25, extra: 20000 },
]
const LOGO = '/img/logo-pasteleria-1000-sabores.png'

// Atajo para no repetir los campos de las tortas
const torta = (datos) => ({ forma: 'circular', tamanos: TAMANOS, permiteMensaje: true, oferta: 0, destacado: false, activo: true, ...datos })
// Atajo para productos que no son torta
const otro = (datos) => ({ forma: null, tamanos: [], permiteMensaje: false, oferta: 0, destacado: false, activo: true, ...datos })

export const PRODUCTOS = [
  torta({ codigo: 'TC001', nombre: 'Torta Cuadrada de Chocolate', categoriaId: 1, forma: 'cuadrada', precio: 45000, stock: 10, destacado: true, oferta: 10,
    descripcion: 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.', imagen: '/img/Torta cuadrada de chocolate.jpg' }),
  torta({ codigo: 'TC002', nombre: 'Torta Cuadrada de Frutas', categoriaId: 1, forma: 'cuadrada', precio: 50000, stock: 8,
    descripcion: 'Mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla.', imagen: LOGO }),
  torta({ codigo: 'TT001', nombre: 'Torta Circular de Vainilla', categoriaId: 2, precio: 40000, stock: 12,
    descripcion: 'Bizcocho de vainilla relleno con crema pastelera y glaseado dulce.', imagen: LOGO }),
  torta({ codigo: 'TT002', nombre: 'Torta Circular de Manjar', categoriaId: 2, precio: 42000, stock: 4, destacado: true,
    descripcion: 'Torta tradicional chilena con manjar y nueces.', imagen: '/img/Torta circular manjar.jpg' }),
  otro({ codigo: 'PI001', nombre: 'Mousse de Chocolate', categoriaId: 3, precio: 5000, stock: 20,
    descripcion: 'Postre individual cremoso hecho con chocolate de alta calidad.', imagen: LOGO }),
  otro({ codigo: 'PI002', nombre: 'Tiramisú Clásico', categoriaId: 3, precio: 5500, stock: 15, oferta: 20,
    descripcion: 'Postre italiano con capas de café, mascarpone y cacao.', imagen: '/img/Tiramisu clasico.jpg' }),
  torta({ codigo: 'PSA001', nombre: 'Torta Sin Azúcar de Naranja', categoriaId: 4, precio: 48000, stock: 3, destacado: true,
    descripcion: 'Torta ligera de naranja endulzada naturalmente.', imagen: '/img/Torta sin azucar de naranja.jpg' }),
  otro({ codigo: 'PSA002', nombre: 'Cheesecake Sin Azúcar', categoriaId: 4, precio: 47000, stock: 6,
    descripcion: 'Suave y cremoso, ideal para disfrutar sin culpa.', imagen: LOGO }),
  otro({ codigo: 'PT001', nombre: 'Empanada de Manzana', categoriaId: 5, precio: 3000, stock: 30,
    descripcion: 'Pastelería tradicional rellena de manzana especiada.', imagen: '/img/Empanada de manzana.jpg' }),
  otro({ codigo: 'PT002', nombre: 'Tarta de Santiago', categoriaId: 5, precio: 6000, stock: 0,
    descripcion: 'Tradicional tarta española de almendras, azúcar y huevos.', imagen: LOGO }),
  otro({ codigo: 'PG001', nombre: 'Brownie Sin Gluten', categoriaId: 6, precio: 4000, stock: 18,
    descripcion: 'Rico y denso, perfecto para quienes evitan el gluten.', imagen: '/img/torta celiacos.jpg' }),
  otro({ codigo: 'PG002', nombre: 'Pan Sin Gluten', categoriaId: 6, precio: 3500, stock: 2,
    descripcion: 'Suave y esponjoso, ideal para sándwiches.', imagen: LOGO }),
  torta({ codigo: 'PV001', nombre: 'Torta Vegana de Chocolate', categoriaId: 7, precio: 50000, stock: 7, oferta: 15,
    descripcion: 'Torta de chocolate húmeda sin ingredientes de origen animal.', imagen: LOGO }),
  otro({ codigo: 'PV002', nombre: 'Galletas Veganas de Avena', categoriaId: 7, precio: 4500, stock: 25,
    descripcion: 'Crujientes y sabrosas, una gran opción saludable.', imagen: '/img/Tartaleta-frutos-rojos.jpg' }),
  torta({ codigo: 'TE001', nombre: 'Torta Especial de Cumpleaños', categoriaId: 8, precio: 55000, stock: 9, destacado: true,
    descripcion: 'Personalizable con decoraciones y mensajes únicos.', imagen: '/img/pastel gigante.jpg' }),
  torta({ codigo: 'TE002', nombre: 'Torta Especial de Boda', categoriaId: 8, precio: 60000, stock: 5,
    descripcion: 'Elegante y deliciosa, pensada para el gran día.', imagen: LOGO }),
]
