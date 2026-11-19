# Publicar desde el iPhone, sin computador

## Subir a GitHub privado desde este entorno cloud
1. En Safari, abre https://github.com/new, inicia sesión y crea un repositorio
   llamado cinema-funnel. Selecciona **Private**. Déjalo vacío (sin README).
2. Vuelve a esta conversación y comparte la URL del repositorio, no tu contraseña.
   El código ya está preparado como repositorio Git en /workspace/cinema-funnel.
3. Para autorizar la subida desde la nube se puede usar GitHub CLI:
   `gh auth login --hostname github.com --git-protocol https --web`.
   Abre en Safari el enlace que proporcione e introduce el código de autorización.
   Este paso requiere GitHub CLI instalado en el entorno. No pegues tokens en el chat.
4. Una vez autenticado, ejecuta en la nube (o pide al agente que lo haga):
   ```bash
   cd /workspace/cinema-funnel
   git add .
   git commit -m "Preparar Cinema Funnel para Vercel"
   git remote add origin https://github.com/TU_USUARIO/cinema-funnel.git
   git push -u origin main
   ```
   Si Git solicita identidad, configura tu nombre y un email de GitHub, que puede
   ser el email noreply de tu cuenta. Sustituye TU_USUARIO por tu usuario real.

Todo el código se transfiere de nube a nube. No necesitas descargar ni extraer el
ZIP en el iPhone. No subas el ZIP como único archivo del repositorio.

## Importar en Vercel
1. En Safari, abre https://vercel.com/new y conecta GitHub.
2. Autoriza acceso al repositorio privado cinema-funnel e impórtalo.
3. Framework: **Next.js**. Root Directory: **./** (package.json está en la raíz).
4. Node.js: **24.x**, la versión principal utilizada para verificar este proyecto.
5. Install Command: **npm ci**. Build Command: **npm run build**.
   Deja Output Directory en el valor predeterminado de Next.js.
6. No necesitas variables de entorno para visualizar esta versión.
7. Pulsa **Deploy**. Cuando termine, abre **Visit** y copia la URL real que
   Vercel asigne. Ese enlace HTTPS funciona desde Safari.
   Si Vercel solicita autenticación, entra con la cuenta propietaria.

La privacidad del repositorio no implica que el sitio desplegado sea privado.
Revisa Deployment Protection en Vercel si quieres limitar el acceso.
Las ramas/PR posteriores pueden generar despliegues Preview; la primera
importación normalmente crea el despliegue de producción del proyecto Vercel.

## Variables y contenido
- NEXT_PUBLIC_CHECKOUT_URL es opcional. Vacía mantiene la compra deshabilitada.
  Configúrala solo con la URL auténtica de checkout y vuelve a desplegar.
- Las variables NEXT_PUBLIC_* son públicas en el navegador: nunca pongas secretos.
- GA4/Meta no están conectados y no necesitan configuración para esta vista previa.
- La demo auténtica sigue pendiente; no se ha añadido contenido ficticio.
- No hay backend local ni IA externa requeridos. Los enlaces y recursos de la
  aplicación son relativos al dominio del despliegue.
- localhost solo se usa en las instrucciones de desarrollo y las pruebas, no como
  dirección de una API o recurso de producción.

## Validaciones
```bash
npm ci
npm run build
npm run typecheck
npm test
npx playwright install chromium
npx playwright test
```

El código de la aplicación se conserva sin cambios en esta preparación.
La validación en el dominio final de Vercel debe hacerse después del despliegue.
