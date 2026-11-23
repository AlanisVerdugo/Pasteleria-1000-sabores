# Pastelería 1000 Sabores

Tienda web de la Pastelería 1000 Sabores con React y Vite (EV2 → EV3, Duoc UC). En `main` consume la API Spring Boot (`pasteleria-api`) en lugar del `localStorage` de la EV2.

## Equipo

- p1: integración, páginas generales y revisión
- p2: Alanis Verdugo, tienda (catálogo, carrito, checkout)
- p3: Benja, panel de administración

## Requisitos

- Node.js 22.12 o superior
- npm

## Instalación y uso

```bash
git clone https://github.com/AlanisVerdugo/Pasteleria-1000-sabores.git
cd Pasteleria-1000-sabores
npm install
npm run dev
```

Abre la dirección que muestra la consola (normalmente http://localhost:5173).

**API (EV3):** levanta el backend en `http://localhost:8089` y configura `VITE_API_URL` en `.env.development` (ver `.env.example`). Sin API, login y catálogo no cargan datos reales.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Levanta el sitio en modo desarrollo |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Muestra la versión de producción ya generada |
| `npm run test` | Corre las pruebas con Vitest (modo observador) |
| `npm run test:coverage` | Corre las pruebas una vez con reporte de cobertura (`coverage/`) |
| `npm run lint` | Revisa el código con ESLint |

## Usuarios de prueba

| Correo | Contraseña | Caso |
|---|---|---|
| admin@duoc.cl | admin123 | Administrador, acceso al panel `/admin` |
| vendedor@pasteleria.cl | vendedor123 | Vendedor: productos y órdenes en el panel |
| rosa@gmail.com | 1234 | Mayor de 50 años, 50 % de descuento |
| pedro@gmail.com | 1234 | Código FELICES50, 10 % de descuento |
| camila@duocuc.cl | 1234 | Estudiante Duoc de cumpleaños hoy, torta gratis |

La sesión usa JWT en `localStorage` (`pms_token` / `pms_refresh`); el carrito sigue en `localStorage` por usuario. Productos, usuarios, órdenes, blog y mensajes vienen del backend (mismos usuarios semilla que el README de la API).

## Tecnologías

React 19, Vite, React Router, React Bootstrap y Bootstrap 5. Pruebas con Vitest, Testing Library y jsdom.

## Estructura

```
src/
  App.jsx           rutas de la aplicación
  main.jsx          punto de entrada
  components/       componentes reutilizables (y components/admin)
  context/          AuthContext y CarritoContext
  css/              hojas de estilo por sección
  hooks/            useFormulario, useListado y useProductos
  layouts/          TiendaLayout y AdminLayout
  pages/            páginas de la tienda (y pages/admin)
  services/         llamadas HTTP (`api.js`, productos, órdenes, auth, blog, contacto)
  test/falso/       datos y API en memoria solo para Vitest (F9)
  utils/            descuentos, formato, validaciones (y utils/admin)
  test/             todas las pruebas, con la misma estructura de carpetas que src
```

## Pruebas

npm run test            # modo observador: repite las pruebas al guardar; se sale con q
npx vitest run          # ejecuta todas las pruebas una vez y termina
npm run test:coverage   # pruebas + cobertura; el reporte queda en coverage/index.html

359 pruebas en 78 archivos (`npx vitest run`). Los umbrales mínimos están en `vite.config.js` (80 % líneas, 80 % funciones, 75 % ramas, 80 % sentencias). `npm run test:coverage` usa `src/test/falso/apiFalsa.js`, no requiere la API en marcha.

**Estado EV3 (`main`):** integración API F1–F9 completada; checklist **F7** validado contra API en 8089 (2026-11-23). PR #54 fusionado. Vitest: `npx vitest run` / `npm run test:coverage` (umbrales en `vite.config.js`). Guía de estudio: `pasteleria-api/docs/Guia_estudio_proyecto.md`.

**Pendiente:** entregables Fase **I** (manual, ERS, documentos con capturas de `main`).