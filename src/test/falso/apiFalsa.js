import {
  STOCK_CRITICO,
  ESTADOS_ORDEN,
  CODIGO_FELICES,
  DOMINIOS_DUOC,
  COSTO_DESPACHO,
} from '../../utils/constantes'
import {
  calcularTotales,
  precioConOferta,
  tortaCanjeadaEsteAnio,
} from '../../utils/descuentos'
import {
  boletasRepo,
  blogRepo,
  categoriasRepo,
  mensajesRepo,
  productosRepo,
  usuariosRepo,
} from './almacen'

export const EVENTO_SESION_EXPIRADA = 'pms:sesion-expirada'

export const guardarTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem('pms_token', accessToken)
  localStorage.setItem('pms_refresh', refreshToken)
}

export const borrarTokens = () => {
  localStorage.removeItem('pms_token')
  localStorage.removeItem('pms_refresh')
}

export const hayToken = () => Boolean(localStorage.getItem('pms_token'))

export const nuloSiNoExiste = (error) => {
  if (error.response?.status === 404) return null
  throw error
}

const rechazar = (status, mensaje) =>
  Promise.reject({ response: { status, data: { mensaje } }, message: mensaje })

const normalizarTexto = (texto = '') => texto.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

const usuarioDesdeToken = (token) => {
  if (!token?.startsWith('t-')) return null
  const id = Number(token.slice(2))
  return usuariosRepo.buscarPorId(id)
}

const usuarioActual = (config) => {
  const bearer = config?.headers?.Authorization
  const token = bearer?.replace(/^Bearer\s+/i, '') ?? localStorage.getItem('pms_token')
  return usuarioDesdeToken(token)
}

const usuarioRespuesta = (u) => {
  if (!u) return null
  const { password, ...resto } = u
  const esDuoc = DOMINIOS_DUOC.some((d) => u.email.toLowerCase().endsWith(d))
  return { ...resto, esDuoc, tipoUsuario: esDuoc ? 'duoc' : 'normal' }
}

const exigeRol = (usuario, roles) => {
  if (!usuario) return rechazar(401, 'No autenticado')
  if (!roles.includes(usuario.rol)) return rechazar(403, 'Acceso denegado')
  return null
}

const filtrarProductos = (lista, params = {}) => {
  let r = lista.filter((p) => p.activo !== false)
  const texto = (params.texto ?? '').trim()
  if (texto) {
    const t = normalizarTexto(texto)
    r = r.filter(
      (p) => normalizarTexto(p.nombre).includes(t) || normalizarTexto(p.codigo).includes(t),
    )
  }
  if (params.categoriaId != null && params.categoriaId !== '') {
    const id = Number(params.categoriaId)
    r = r.filter((p) => p.categoriaId === id)
  }
  if (params.forma) r = r.filter((p) => p.forma === params.forma)
  if (params.personas != null && params.personas !== '') {
    const min = Number(params.personas)
    r = r.filter((p) => (p.tamanos ?? []).some((t) => t.personas >= min))
  }
  if (params.precioMin != null && params.precioMin !== '') {
    r = r.filter((p) => p.precio >= Number(params.precioMin))
  }
  if (params.precioMax != null && params.precioMax !== '') {
    r = r.filter((p) => p.precio <= Number(params.precioMax))
  }
  return [...r].sort((a, b) => a.codigo.localeCompare(b.codigo))
}

const siguienteNumeroBoleta = () => {
  const nums = boletasRepo.listar().map((b) => Number(b.numero.replace(/\D/g, '')) || 0)
  const siguiente = Math.max(0, ...nums) + 1
  return `B-${String(siguiente).padStart(6, '0')}`
}

const rutasGet = async (path, config) => {
  const usuario = usuarioActual(config)
  const params = config?.params ?? {}

  if (path === '/auth/me') {
    const u = usuarioRespuesta(usuario)
    if (!u) return rechazar(401, 'No autenticado')
    return { data: u }
  }

  if (path === '/productos') return { data: filtrarProductos(productosRepo.listar(), params) }

  if (path === '/productos/todos') {
    const denegado = exigeRol(usuario, ['admin', 'vendedor'])
    if (denegado) return denegado
    return {
      data: [...productosRepo.listar()].sort((a, b) => a.codigo.localeCompare(b.codigo)),
    }
  }

  if (path === '/productos/destacados') {
    return { data: productosRepo.listar().filter((p) => p.destacado && p.activo !== false) }
  }

  if (path === '/productos/ofertas') {
    const ofertas = productosRepo
      .listar()
      .filter((p) => p.oferta > 0 && p.activo !== false)
      .sort((a, b) => b.oferta - a.oferta)
    return { data: ofertas }
  }

  if (path === '/productos/criticos') {
    const denegado = exigeRol(usuario, ['admin'])
    if (denegado) return denegado
    return { data: productosRepo.listar().filter((p) => p.stock < STOCK_CRITICO) }
  }

  if (path.startsWith('/productos/')) {
    const codigo = path.slice('/productos/'.length)
    const p = productosRepo.buscarPorId(codigo)
    if (!p || p.activo === false) return rechazar(404, 'Producto no encontrado')
    return { data: p }
  }

  if (path === '/categorias') return { data: categoriasRepo.listar() }

  if (path.startsWith('/categorias/')) {
    const id = Number(path.slice('/categorias/'.length))
    const c = categoriasRepo.buscarPorId(id)
    if (!c) return rechazar(404, 'Categoría no encontrada')
    return { data: c }
  }

  if (path === '/usuarios') {
    const denegado = exigeRol(usuario, ['admin'])
    if (denegado) return denegado
    return { data: usuariosRepo.listar().map(usuarioRespuesta) }
  }

  if (path.startsWith('/usuarios/')) {
    const denegado = exigeRol(usuario, ['admin'])
    if (denegado) return denegado
    const id = Number(path.slice('/usuarios/'.length))
    const u = usuariosRepo.buscarPorId(id)
    if (!u) return rechazar(404, 'Usuario no encontrado')
    return { data: usuarioRespuesta(u) }
  }

  if (path === '/boletas') {
    const denegado = exigeRol(usuario, ['admin', 'vendedor'])
    if (denegado) return denegado
    return { data: boletasRepo.listar() }
  }

  if (path === '/boletas/mis-boletas') {
    if (!usuario) return rechazar(401, 'No autenticado')
    return { data: boletasRepo.listar().filter((b) => b.usuarioId === usuario.id) }
  }

  if (path.startsWith('/boletas/usuario/')) {
    const denegado = exigeRol(usuario, ['admin'])
    if (denegado) return denegado
    const id = Number(path.slice('/boletas/usuario/'.length))
    return { data: boletasRepo.listar().filter((b) => b.usuarioId === id) }
  }

  if (path.startsWith('/boletas/')) {
    if (!usuario) return rechazar(401, 'No autenticado')
    const id = Number(path.slice('/boletas/'.length))
    const b = boletasRepo.buscarPorId(id)
    if (!b) return rechazar(404, 'Boleta no encontrada')
    if (usuario.rol === 'cliente' && b.usuarioId !== usuario.id) {
      return rechazar(403, 'No puedes ver esta boleta')
    }
    return { data: b }
  }

  if (path === '/blog') return { data: blogRepo.listar() }

  if (path.startsWith('/blog/')) {
    const id = Number(path.slice('/blog/'.length))
    const p = blogRepo.buscarPorId(id)
    if (!p) return rechazar(404, 'Entrada no encontrada')
    return { data: p }
  }

  if (path === '/mensajes') {
    const denegado = exigeRol(usuario, ['admin'])
    if (denegado) return denegado
    return { data: mensajesRepo.listar() }
  }

  return rechazar(404, 'Ruta no encontrada')
}

const rutasPost = async (path, body, config) => {
  const usuario = usuarioActual(config)

  if (path === '/auth/login') {
    const email = (body.email ?? '').trim().toLowerCase()
    const u = usuariosRepo.listar().find((x) => x.email.toLowerCase() === email)
    if (!u || u.password !== body.password) return rechazar(401, 'Credenciales inválidas')
    const usuario = usuarioRespuesta(u)
    return {
      data: {
        accessToken: `t-${u.id}`,
        refreshToken: `r-${u.id}`,
        usuario,
      },
    }
  }

  if (path === '/auth/registro') {
    const email = (body.email ?? '').trim().toLowerCase()
    if (usuariosRepo.listar().some((x) => x.email.toLowerCase() === email)) {
      return rechazar(409, 'El correo ya está registrado')
    }
    const codigo = (body.codigoDescuento ?? body.codigo ?? '').trim().toUpperCase()
    if (codigo && codigo !== CODIGO_FELICES) {
      return rechazar(409, 'Código de descuento no válido')
    }
    const nuevo = usuariosRepo.agregar({
      run: body.run ?? '',
      nombre: body.nombre,
      apellidos: body.apellidos ?? '',
      email: body.email,
      password: body.password ?? '1234',
      fechaNacimiento: body.fechaNacimiento ?? '2000-01-01',
      rol: 'cliente',
      codigoDescuento: codigo === CODIGO_FELICES ? CODIGO_FELICES : null,
      fechaRegistro: new Date().toISOString().slice(0, 10),
    })
    const usuario = usuarioRespuesta(nuevo)
    return {
      data: {
        accessToken: `t-${nuevo.id}`,
        refreshToken: `r-${nuevo.id}`,
        usuario,
      },
    }
  }

  if (path === '/auth/refresh') {
    const id = Number(String(body.refreshToken ?? '').replace(/^r-/, ''))
    const u = usuariosRepo.buscarPorId(id)
    if (!u) return rechazar(401, 'Refresh token inválido')
    return { data: { accessToken: `t-${u.id}`, refreshToken: `r-${u.id}` } }
  }

  if (path === '/productos') {
    const denegado = exigeRol(usuario, ['admin'])
    if (denegado) return denegado
    const existe = productosRepo.buscarPorId(body.codigo)
    if (existe) return rechazar(409, `Ya existe un producto con el código ${body.codigo}`)
    return { data: productosRepo.agregar({ activo: true, oferta: 0, destacado: false, ...body }) }
  }

  if (path === '/categorias') {
    const denegado = exigeRol(usuario, ['admin'])
    if (denegado) return denegado
    const nombre = (body.nombre ?? '').trim()
    const repetida = categoriasRepo
      .listar()
      .some((c) => c.nombre.toLowerCase() === nombre.toLowerCase())
    if (repetida) return rechazar(409, `Ya existe la categoría "${nombre}"`)
    return { data: categoriasRepo.agregar(body) }
  }

  if (path === '/usuarios') {
    const denegado = exigeRol(usuario, ['admin'])
    if (denegado) return denegado
    const email = (body.email ?? '').trim().toLowerCase()
    if (usuariosRepo.listar().some((x) => x.email.toLowerCase() === email)) {
      return rechazar(409, 'El correo ya está registrado')
    }
    const nuevo = usuariosRepo.agregar({ rol: 'cliente', ...body })
    return { data: usuarioRespuesta(nuevo) }
  }

  if (path === '/boletas') {
    const denegado = exigeRol(usuario, ['admin', 'cliente'])
    if (denegado) return denegado
    if (!usuario) return rechazar(401, 'No autenticado')

    const itemsReq = body.items ?? []
    const lineas = []
    for (const item of itemsReq) {
      const p = productosRepo.buscarPorId(item.codigo)
      if (!p) return rechazar(404, `Producto ${item.codigo} no encontrado`)
      if (p.stock < item.cantidad) {
        return rechazar(409, 'No hay stock suficiente')
      }
      const precioUnitario = precioConOferta(p, item.tamano ?? null)
      lineas.push({
        ...p,
        cantidad: item.cantidad,
        tamano: item.tamano ?? null,
        mensaje: item.mensaje ?? null,
        precioUnitario,
        personas: p.tamanos?.find((t) => t.id === item.tamano)?.personas ?? null,
      })
    }

    const uResp = usuarioRespuesta(usuario)
    const canjeada = tortaCanjeadaEsteAnio(boletasRepo.listar(), usuario.id)
    const { subtotal, descuento, detalleDescuento, total } = calcularTotales(
      lineas,
      uResp,
      new Date(),
      canjeada,
    )
    const totalConDespacho = total + COSTO_DESPACHO

    for (const item of itemsReq) {
      const p = productosRepo.buscarPorId(item.codigo)
      productosRepo.actualizar(item.codigo, { stock: p.stock - item.cantidad })
    }

    const despacho = body.despacho ?? null
    const boleta = boletasRepo.agregar({
      numero: siguienteNumeroBoleta(),
      usuarioId: usuario.id,
      cliente: { nombre: `${usuario.nombre} ${usuario.apellidos}`.trim(), email: usuario.email },
      estado: 'preparacion',
      fecha: new Date().toISOString(),
      items: lineas.map((l) => ({
        codigo: l.codigo,
        nombre: l.nombre,
        imagen: l.imagen,
        cantidad: l.cantidad,
        precio: l.precioUnitario,
        tamano: l.tamano,
        personas: l.personas,
        mensaje: l.mensaje,
      })),
      despacho: despacho
        ? {
            nombre: despacho.nombre,
            calle: despacho.calle,
            comuna: despacho.comuna,
            fechaEntrega: despacho.fechaEntrega ?? null,
          }
        : null,
      subtotal,
      descuento,
      detalleDescuento,
      costoDespacho: COSTO_DESPACHO,
      total: totalConDespacho,
    })
    return { data: boleta }
  }

  if (path === '/mensajes') {
    const msg = mensajesRepo.agregar({
      ...body,
      usuarioId: usuario?.id ?? null,
      fecha: new Date().toISOString(),
    })
    return { data: msg }
  }

  return rechazar(404, 'Ruta no encontrada')
}

const rutasPut = async (path, body, config) => {
  const usuario = usuarioActual(config)

  if (path === '/auth/perfil') {
    if (!usuario) return rechazar(401, 'No autenticado')
    const actualizado = usuariosRepo.actualizar(usuario.id, body)
    return { data: usuarioRespuesta(actualizado) }
  }

  if (path.startsWith('/productos/')) {
    const denegado = exigeRol(usuario, ['admin'])
    if (denegado) return denegado
    const codigo = path.slice('/productos/'.length)
    if (!productosRepo.buscarPorId(codigo)) return rechazar(404, 'Producto no encontrado')
    return { data: productosRepo.actualizar(codigo, body) }
  }

  if (path.startsWith('/categorias/')) {
    const denegado = exigeRol(usuario, ['admin'])
    if (denegado) return denegado
    const id = Number(path.slice('/categorias/'.length))
    if (!categoriasRepo.buscarPorId(id)) return rechazar(404, 'Categoría no encontrada')
    return { data: categoriasRepo.actualizar(id, body) }
  }

  if (path.startsWith('/usuarios/')) {
    const denegado = exigeRol(usuario, ['admin'])
    if (denegado) return denegado
    const id = Number(path.slice('/usuarios/'.length))
    if (!usuariosRepo.buscarPorId(id)) return rechazar(404, 'Usuario no encontrado')
    const cambios = { ...body }
    if (!cambios.password) delete cambios.password
    const email = (cambios.email ?? '').trim().toLowerCase()
    if (email) {
      const repetido = usuariosRepo.listar().some((u) => u.id !== id && u.email.toLowerCase() === email)
      if (repetido) return rechazar(409, 'El correo ya está registrado')
    }
    return { data: usuarioRespuesta(usuariosRepo.actualizar(id, cambios)) }
  }

  return rechazar(404, 'Ruta no encontrada')
}

const rutasPatch = async (path, body, config) => {
  const usuario = usuarioActual(config)

  const matchEstado = path.match(/^\/boletas\/(\d+)\/estado$/)
  if (matchEstado) {
    const denegado = exigeRol(usuario, ['admin'])
    if (denegado) return denegado
    const id = Number(matchEstado[1])
    const b = boletasRepo.buscarPorId(id)
    if (!b) return rechazar(404, 'Boleta no encontrada')
    if (!ESTADOS_ORDEN.includes(body.estado)) return rechazar(400, 'Estado no válido')
    return { data: boletasRepo.actualizar(id, { estado: body.estado }) }
  }

  return rechazar(404, 'Ruta no encontrada')
}

const rutasDelete = async (path, config) => {
  const usuario = usuarioActual(config)

  if (path.startsWith('/productos/')) {
    const denegado = exigeRol(usuario, ['admin'])
    if (denegado) return denegado
    const codigo = path.slice('/productos/'.length)
    if (!productosRepo.buscarPorId(codigo)) return rechazar(404, 'Producto no encontrado')
    productosRepo.eliminar(codigo)
    return { data: null }
  }

  if (path.startsWith('/categorias/')) {
    const denegado = exigeRol(usuario, ['admin'])
    if (denegado) return denegado
    const id = Number(path.slice('/categorias/'.length))
    if (!categoriasRepo.buscarPorId(id)) return rechazar(404, 'Categoría no encontrada')
    const tieneProductos = productosRepo.listar().some((p) => p.categoriaId === id)
    if (tieneProductos) return rechazar(409, 'No se puede eliminar: hay productos en esta categoría')
    categoriasRepo.eliminar(id)
    return { data: null }
  }

  if (path.startsWith('/usuarios/')) {
    const denegado = exigeRol(usuario, ['admin'])
    if (denegado) return denegado
    const id = Number(path.slice('/usuarios/'.length))
    if (!usuariosRepo.buscarPorId(id)) return rechazar(404, 'Usuario no encontrado')
    const tieneBoletas = boletasRepo.listar().some((b) => b.usuarioId === id)
    if (tieneBoletas) return rechazar(409, 'No se puede eliminar: el usuario tiene boletas')
    usuariosRepo.eliminar(id)
    return { data: null }
  }

  if (path.startsWith('/mensajes/')) {
    const denegado = exigeRol(usuario, ['admin'])
    if (denegado) return denegado
    const id = Number(path.slice('/mensajes/'.length))
    if (!mensajesRepo.buscarPorId(id)) return rechazar(404, 'Mensaje no encontrado')
    mensajesRepo.eliminar(id)
    return { data: null }
  }

  return rechazar(404, 'Ruta no encontrada')
}

export const api = {
  get: (url, config) => rutasGet(url.replace(/^\//, '').startsWith('api') ? url : url, config).catch((e) => Promise.reject(e)),
  post: (url, data, config) => rutasPost(url, data, config),
  put: (url, data, config) => rutasPut(url, data, config),
  patch: (url, data, config) => rutasPatch(url, data, config),
  delete: (url, config) => rutasDelete(url, config),
}

// Normaliza URLs relativas como axios (sin baseURL en tests).
const conRuta = (handler) => (url, ...rest) => {
  const path = url.replace(/\?.*$/, '')
  return handler(path, ...rest)
}

api.get = conRuta((path, config) => rutasGet(path, config))
api.post = conRuta((path, data, config) => rutasPost(path, data, config))
api.put = conRuta((path, data, config) => rutasPut(path, data, config))
api.patch = conRuta((path, data, config) => rutasPatch(path, data, config))
api.delete = conRuta((path, config) => rutasDelete(path, config))