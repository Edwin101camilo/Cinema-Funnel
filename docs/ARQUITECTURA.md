# Arquitectura y próximos pasos

## Implementado
- Next.js App Router, TypeScript, diseño responsive CSS sin dependencias de UI adicionales.
- 4 escenas narrativas + 5ª escena comercial en ruta independiente.
- Decisiones de diagnóstico y formato, navegación, salto a oferta, estado de progreso en sessionStorage.
- Sonido sintetizado opcional después de interacción, video HTML5 con póster placeholder.
- Configuración comercial separada, checkout bloqueado hasta introducir URL real.
- Eventos tipados de analítica en modo desarrollo (sin transmisión externa).
- Metadatos, FAQ, reduced motion y pruebas iniciales.

## Pendiente para lanzamiento
1. Grabar y colocar `public/videos/demo-real.mp4` (archivo no incluido).
2. Introducir `NEXT_PUBLIC_CHECKOUT_URL` real de Hotmart en `.env.local`.
3. Verificar condiciones comerciales, licencias y garantía en Hotmart.
4. Incorporar marca y materiales originales reales; sustituir el póster.
5. Implementar consentimiento de analítica y conexiones GA4/Meta Pixel. `purchase` solo mediante integración de compra confirmada.
6. Pruebas manuales en iOS Safari, Android Chrome y escritorio.
7. Optimizar peso multimedia y realizar prueba A/B con landing tradicional.

## Riesgos
- La experiencia puede reducir conversión si demora el acceso a la oferta.
- Recursos audiovisuales pesados perjudican rendimiento móvil.
- No confundir simulación narrativa con funcionalidad real.
