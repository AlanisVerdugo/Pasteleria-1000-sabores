import axios from 'axios'

const CLAVE_ACCESS = 'pms_token'
const CLAVE_REFRESH = 'pms_refresh'
export const EVENTO_SESION_EXPIRADA = 'pms:sesion-expirada'

const RUTAS_SIN_REFRESH = ['/auth/login', '/auth/registro', '/auth/refresh']
const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:8089/api/v1'

export const api = axios.create({ baseURL })

export const guardarTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem(CLAVE_ACCESS, accessToken)
  localStorage.setItem(CLAVE_REFRESH, refreshToken)
}

export const borrarTokens = () => {
  localStorage.removeItem(CLAVE_ACCESS)
  localStorage.removeItem(CLAVE_REFRESH)
}

export const hayToken = () => Boolean(localStorage.getItem(CLAVE_ACCESS))

/** Si el recurso no existe devuelve null (comportamiento de la EV2). */
export const nuloSiNoExiste = (error) => {
  if (error.response?.status === 404) return null
  throw error
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(CLAVE_ACCESS)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let renovando = null
const renovarTokens = () => {
  renovando ??= axios
    .post(`${baseURL}/auth/refresh`, { refreshToken: localStorage.getItem(CLAVE_REFRESH) })
    .then(({ data }) => {
      guardarTokens(data)
      return data.accessToken
    })
    .finally(() => {
      renovando = null
    })
  return renovando
}

api.interceptors.response.use(
  (respuesta) => respuesta,
  async (error) => {
    const { config, response } = error
    const sePuedeRenovar =
      response?.status === 401 &&
      config &&
      !config._reintento &&
      !RUTAS_SIN_REFRESH.some((ruta) => config.url?.includes(ruta)) &&
      localStorage.getItem(CLAVE_REFRESH)

    if (sePuedeRenovar) {
      config._reintento = true
      try {
        const tokenGuardado = localStorage.getItem(CLAVE_ACCESS)
        const yaRenovado = config.headers.Authorization !== `Bearer ${tokenGuardado}`
        const nuevoToken = yaRenovado ? tokenGuardado : await renovarTokens()
        config.headers.Authorization = `Bearer ${nuevoToken}`
        return api(config)
      } catch {
        borrarTokens()
        window.dispatchEvent(new Event(EVENTO_SESION_EXPIRADA))
      }
    }

    error.message = response?.data?.mensaje ?? (response ? error.message : 'No se pudo conectar con el servidor')
    return Promise.reject(error)
  },
)