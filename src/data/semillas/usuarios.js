// Usuarios de prueba (password en texto plano SOLO porque es un mock de EV2)
const hoy = new Date()
const mes = String(hoy.getMonth() + 1).padStart(2, '0')
const dia = String(hoy.getDate()).padStart(2, '0')

export const USUARIOS = [
  { id: 1, run: '111111111', nombre: 'Admin', apellidos: 'Mil Sabores', email: 'admin@duoc.cl', password: 'admin123',
    fechaNacimiento: '1990-01-01', rol: 'admin', codigoDescuento: null, fechaRegistro: '2026-10-22' },
  { id: 2, run: '123456785', nombre: 'Rosa', apellidos: 'Muñoz Díaz', email: 'rosa@gmail.com', password: '1234',
    fechaNacimiento: '1965-03-15', rol: 'cliente', codigoDescuento: null, fechaRegistro: '2026-10-22' },
  { id: 3, run: '198765430', nombre: 'Pedro', apellidos: 'Soto Rojas', email: 'pedro@gmail.com', password: '1234',
    fechaNacimiento: '1998-07-20', rol: 'cliente', codigoDescuento: 'FELICES50', fechaRegistro: '2026-10-22' },
  // Estudiante Duoc que está de cumpleaños HOY (la fecha se calcula al cargar)
  { id: 4, run: '212345679', nombre: 'Camila', apellidos: 'Pérez Soto', email: 'camila@duocuc.cl', password: '1234',
    fechaNacimiento: `2004-${mes}-${dia}`, rol: 'cliente', codigoDescuento: null, fechaRegistro: '2026-10-22' },
]
