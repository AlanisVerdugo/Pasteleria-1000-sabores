// "contenido" es una lista de párrafos.
// Subir VERSION_DATOS en utils/constantes.js
export const CATEGORIAS_BLOG = ['Recetas tradicionales', 'Consejos de maestros', 'Aportes Duoc UC', 'Nuestra historia']

export const BLOG = [
  {
    id: 1,
    titulo: 'Secretos del Manjar Casero: De la Leche al Punto Caramelo',
    categoria: 'Recetas tradicionales',
    fecha: '2026-09-13',
    autor: 'Freddy Camposo, Jefe de Horno',
    imagen: '/img/manjar casero.jpg',
    resumen: 'La alquimia de reducir leche entera con azúcar a fuego lento exige paciencia. Revelamos los secretos para lograr el punto perfecto.',
    contenido: [
      'El manjar es el corazón de muchas de nuestras tortas, y hacerlo en casa es más simple de lo que parece: solo necesitas leche entera, azúcar y mucha paciencia.',
      'El secreto está en el fuego bajo y en revolver constantemente con cuchara de palo, sobre todo al final, cuando la mezcla empieza a espesar y tomar color.',
      'Para saber si está listo, pasa la cuchara por el fondo de la olla: si se ve el fondo por un par de segundos antes de que el manjar vuelva a cubrirlo, alcanzaste el punto caramelo.',
    ],
  },
  {
    id: 2,
    titulo: 'Adaptando Tortas Clásicas para Diabéticos y Celíacos',
    categoria: 'Aportes Duoc UC',
    fecha: '2026-08-29',
    autor: 'Alan Bugueño, Duoc UC',
    imagen: '/img/torta celiacos.jpg',
    resumen: '¿Es posible conservar el alma de una torta tradicional sin gluten ni azúcar? Así trabajamos las recetas junto a estudiantes de Duoc UC.',
    contenido: [
      'Junto a estudiantes de Gastronomía de Duoc UC probamos cómo adaptar nuestras recetas clásicas para personas con diabetes o celiaquía.',
      'Para reemplazar el azúcar usamos alulosa, que carameliza de forma parecida y mantiene la humedad del bizcocho. Para el gluten, una mezcla de harinas de arroz y almendra.',
      'El resultado son tortas como nuestra Torta Sin Azúcar de Naranja y el Brownie Sin Gluten, que ya puedes encontrar en el catálogo.',
    ],
  },
  {
    id: 3,
    titulo: 'La Historia de Nuestro Récord Guinness de 1995',
    categoria: 'Nuestra historia',
    fecha: '2026-08-20',
    autor: 'Familia 1000 Sabores',
    imagen: '/img/pastel gigante.jpg',
    resumen: '48 horas sin dormir y más de dos mil hojas de hojarasca. Revive la jornada en que nuestra tradición familiar llegó al libro de récords.',
    contenido: [
      'En 1995 nos propusimos algo que parecía imposible: hornear la torta más grande del mundo.',
      'Fueron 48 horas de trabajo sin descanso, más de dos mil hojas de hojarasca y litros de manjar preparados por toda la familia y nuestros vecinos.',
      'Ese día entramos al Libro Guinness de los Récords, y hasta hoy es uno de los recuerdos que más nos enorgullece.',
    ],
  },
  {
    id: 4,
    titulo: '5 Errores Comunes al Batir Merengue',
    categoria: 'Consejos de maestros',
    fecha: '2026-10-05',
    autor: 'Freddy Camposo, Jefe de Horno',
    imagen: '/img/amasando.jpg',
    resumen: 'Si tu merengue se baja o queda líquido, probablemente estás cometiendo alguno de estos errores. Te contamos cómo evitarlos.',
    contenido: [
      'Primer error: usar un bol con restos de grasa. Cualquier gota de aceite o de yema impide que las claras suban.',
      'Segundo y tercer error: agregar el azúcar de golpe o demasiado pronto. Hay que incorporarla de a poco, cuando las claras ya están espumosas.',
      'Cuarto y quinto error: batir de más o hacerlo en un día muy húmedo. El merengue está listo cuando forma picos firmes y brillantes.',
    ],
  },
]