# Pastelería 1000 Sabores

Sitio web de la pastelería: catálogo, carrito, checkout, blog, contacto y panel de administración.
El front habla con la API REST en Spring Boot; ver repositorio del backend y cómo levantarla ahí.

- API: <https://github.com/Nariyato/pasteleria-1000-sabores-api>

## Requisitos

- Node.js 22.12 o superior
- npm
- API en marcha en `http://localhost:8089` (MySQL, Docker o perfil `h2` del backend)

## Configuración

Copia la URL base de la API en `.env.development` (plantilla en `.env.example`):

```env
VITE_API_URL=http://localhost:8089/api/v1
```

Sin API no hay login ni catálogo con datos reales. Tras cambiar el `.env`, reinicia `npm run dev`.

## Instalación y uso

```bash
git clone https://github.com/AlanisVerdugo/Pasteleria-1000-sabores.git
cd Pasteleria-1000-sabores
npm install
npm run dev
```

Abre la URL que muestra la consola (normalmente http://localhost:5173).

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Vista previa del build |
| `npm run test` | Vitest en modo observador |
| `npm run test:coverage` | Vitest una vez + reporte en `coverage/` |
| `npm run lint` | ESLint |

## Usuarios de prueba

Requieren la API con datos semilla (mismos correos que en el README del backend):

| Correo | Contraseña | Uso |
|---|---|---|
| admin@duoc.cl | admin123 | Panel `/admin` completo |
| vendedor@pasteleria.cl | vendedor123 | Panel: productos y órdenes |
| rosa@gmail.com | 1234 | Cliente (descuento 50 %) |
| pedro@gmail.com | 1234 | Cliente (código FELICES50) |
| camila@duocuc.cl | 1234 | Cliente Duoc (torta cumpleaños si corresponde) |

La sesión guarda JWT en `localStorage` (`pms_token`, `pms_refresh`). El carrito sigue en `localStorage` por usuario.

## Tecnologías

React 19, Vite, React Router, React Bootstrap, Bootstrap 5. Pruebas: Vitest, Testing Library, jsdom.

## Estructura del código

```
src/
  App.jsx           rutas
  components/       UI reutilizable (incl. admin)
  context/          AuthContext, CarritoContext
  layouts/          tienda y panel admin
  pages/            pantallas (incl. admin)
  services/         HTTP hacia la API (axios en api.js)
  test/falso/       doble de la API solo para Vitest
  utils/            descuentos (vista), formato, validaciones
  test/             pruebas (misma forma de carpetas que src)
```

## Pruebas

```bash
npx vitest run
npm run test:coverage
npm run lint
```

`npm run test:coverage` usa `src/test/falso/apiFalsa.js` y no necesita la API levantada. Los umbrales mínimos están en `vite.config.js` (80 % líneas/funciones/sentencias, 75 % ramas).