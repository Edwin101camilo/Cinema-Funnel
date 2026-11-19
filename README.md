# Cinema Funnel — EL ARCHIVO 001

Prototipo inicial ejecutable de experiencia cinematográfica para **Creador IA Studio**.

## Inicio

Requisitos: Node.js 20+ y npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abrir http://localhost:3000. En Windows, copiar `.env.example` a `.env.local` manualmente si `cp` no está disponible.

## Rutas
- `/` — pantalla inicial
- `/experiencia` — escenas 01–04
- `/oferta` — escena 05 / venta

## Configuración
Editar `config/product.ts` y `config/story.ts` para ajustar contenido. Agregar `NEXT_PUBLIC_CHECKOUT_URL` real a `.env.local` antes de publicar. Sin URL de checkout, la compra está deshabilitada de forma intencional.

## Material pendiente
El video `public/videos/demo-real.mp4` **no se incluye**; debe ser una grabación auténtica. El póster SVG indica que falta el recurso. No usar el prototipo públicamente como demostración real antes de añadirlo.

## Verificaciones
```bash
npm run typecheck
npm test
npm run build
```

## Documentación
- `docs/GUION_CINEMA_FUNNEL.md`: guion, diálogos, tiempos y sonidos.
- `docs/ARQUITECTURA.md`: alcance, riesgos y próximos pasos.

## Estado
Prototipo de código inicial. No incorpora backend, checkout activo, IA en tiempo real ni analítica de producción. La implementación incluye dependencias GSAP/Howler/Zustand preparadas para el pulido posterior; la versión base usa CSS, React y Web Audio nativo para evitar complejidad prematura.

## Desarrollo continuado en la nube
Las cinco escenas incluyen diagnóstico, selección de formato, conversación narrativa
con NEXO y oferta. El progreso y las decisiones se conservan durante la sesión.
NEXO usa respuestas locales predefinidas: no hay un proveedor de IA conectado.
La demo se habilita cuando existe un MP4 válido en la ruta documentada.
No se añadieron testimonios ni resultados ficticios.

### Visualizar sin instalar nada en tu computador
En la terminal del entorno cloud:
```bash
cd /workspace/cinema-funnel
npm ci
npm run dev -- --hostname 0.0.0.0
```
Abre el puerto 3000 mediante la vista previa del entorno. Si usas GitHub Codespaces,
abre la pestaña **Ports**, localiza 3000 y elige **Open in Browser**.
La dirección localhost corresponde al entorno cloud, no a tu computador.

### Guardar en GitHub desde la nube
Crea un repositorio vacío en GitHub y ejecuta en la terminal cloud, sustituyendo
USUARIO por tu cuenta. Autentícate con GitHub CLI si está disponible (`gh auth login`).
No escribas tokens en archivos del proyecto.
```bash
git init
git add .
git commit -m "Completar experiencia Archivo 001"
git branch -M main
git remote add origin https://github.com/USUARIO/cinema-funnel.git
git push -u origin main
```
Configura tu identidad Git si Git la solicita. No subas .env.local.
Después puedes abrir el repositorio con **Code → Codespaces → Create codespace**
y continuar íntegramente en la nube.

### Pruebas de navegador
```bash
npx playwright install chromium
npx playwright test
```
Se verifican el recorrido completo, persistencia, reinicio, chat, oferta y ancho móvil.
Pendiente antes de lanzamiento: video real, checkout real, validación comercial
y pruebas en dispositivos físicos iOS/Android.

## GitHub privado y Vercel desde iPhone
Consulta [la guía paso a paso](docs/DESPLIEGUE_VERCEL.md).
La configuración de Vercel está en vercel.json y no requiere secretos para una vista previa.
