# Pastelería 1000 Sabores

Tienda web de la Pastelería 1000 Sabores hecha con React y Vite (Evaluación 2, Duoc UC). Es la versión en React del sitio HTML de la primera evaluación.

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
| rosa@gmail.com | 1234 | Mayor de 50 años, 50 % de descuento |
| pedro@gmail.com | 1234 | Código FELICES50, 10 % de descuento |
| camila@duocuc.cl | 1234 | Estudiante Duoc de cumpleaños hoy, torta gratis |

Las contraseñas están en texto plano solo porque los datos son simulados. Todo se guarda en el `localStorage` del navegador; para volver a los datos iniciales, borra el `localStorage` del sitio.

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
  data/semillas/    datos iniciales (blog, categorías, productos, usuarios)
  hooks/            useFormulario, useListado y useProductos
  layouts/          TiendaLayout y AdminLayout
  models/           Categoria, Orden, Producto y Usuario
  pages/            páginas de la tienda (y pages/admin)
  services/         acceso a datos (productos, órdenes, usuarios, pagos)
  utils/            descuentos, formato, validaciones (y utils/admin)
  test/             todas las pruebas, con la misma estructura de carpetas que src
```

## Pruebas

npm run test            # modo observador: repite las pruebas al guardar; se sale con q
npx vitest run          # ejecuta todas las pruebas una vez y termina
npm run test:coverage   # pruebas + cobertura; el reporte queda en coverage/index.html

359 pruebas en 78 archivos, con 94,95 % de cobertura de líneas. Los umbrales mínimos están en `vite.config.js` (80 % líneas, 80 % funciones, 75 % ramas, 80 % sentencias).