# Cinema Funnel V2

## Separación
Ruta /v2, rama feature/mobile-funnel-v2. No se modifica ningún archivo de la
versión previa; se importan solamente configuración de producto, voz y utilidades
existentes. Los nuevos estilos están bajo .v2-app. No se añadieron dependencias.

## Referencia revisada
hivest-embudo-main.zip contiene index.html y media, sin LICENSE ni autorización
de reutilización verificable. Se revisaron definición de escenas, llamada,
chat, escritura progresiva, película y limpieza de temporizadores/audio al
navegar. No se copiaron código, imágenes, videos, voces, marcas ni contenido.
La implementación React, composición roja/crema, diálogos, llamada y mensajería
son originales. La interfaz de chat adopta convenciones de mensajería, sin
logotipo ni imitación de identidad de WhatsApp.
Rechazar avanza a chat inmediatamente, sin repetición insistente de llamada.

## Recorrido
1. Gancho: explica el producto desde la entrada, espacio para video auténtico,
   acceso directo a demos o historia.
2. Llamada simulada: NEXO, Contestar/Rechazar, aviso explícito de ficción.
3. Chat narrativo: nota original NEXO, subtítulos, escritura breve con cancelación,
   tres obstáculos y respuestas configurables. Sin IA en vivo ni datos personales.
4. Selector 2D/3D, demo correspondiente. No usa metraje narrativo como prueba.
5. Proceso explorable: idea → Claude Code/Codex → Studio → composición → resultado.
6. US$9.99, requisitos, FAQ y Hotmart configurable.
Cualquier escena puede saltarse; demo/oferta siempre accesibles. #scene=1…6
permite enlaces directos y Atrás/Adelante del navegador. Decisiones guardadas
en sessionStorage cf_v2, independientes de la experiencia anterior.

## Audio y video
Sonido desactivado por defecto, indicador permanente. La nota empieza solo al
tocarla. Silenciar, cambiar escena o esconder la pestaña pausa la nota.
Sonido opcional de notificación sintetizado, habilitado únicamente por gesto.
No hay llamadas, contactos, permisos telefónicos ni mensajes externos.
MediaSlot no carga un MP4 hasta pulsar Reproducir con sonido. No hay autoplay.
Si play() falla, se solicita otro toque; nunca se hace fallback silencioso.
Mute nativo y control general se reflejan en el indicador. Al cambiar estilo
se desmonta y pausa el video anterior; solo existe un reproductor de demo.
No se espera a que termine una voz para avanzar.

## Recursos pendientes
config/v2/content.ts contiene tres slots vacíos: gancho, resultado 2D y resultado
3D, con MP4 auténtico y póster opcional. Los avisos visibles no son demos.
No se inventaron videos, estadísticas, garantías ni contenido final del paquete.
NEXT_PUBLIC_CHECKOUT_URL admite HTTPS de hotmart.com o subdominios. Sin URL
válida la compra queda pendiente. Deben verificarse contenido descargable,
entrega, requisitos exactos de sistema y condiciones oficiales antes de vender.
El checkout real y la reproducción de futuros MP4 requieren pruebas al incorporarlos.

## Analítica
CustomEvent cinema:v2 y buffer local de los últimos 60 eventos en
sessionStorage cf_v2_events. Eventos: scene_view, scene_exit (motivo y duración),
scene_hidden, exit_intent, call_decision, diagnosis_selected, style_selected,
voice_completed, demo_started, offer_viewed, checkout_clicked.
UTM se conserva con la utilidad existente y se añade al checkout.
exit_intent/pagehide y ocultar pestaña son señales, no prueba concluyente de
abandono. Sin proveedor externo ni métricas inventadas. Para informes agregados
será necesaria integración autorizada con un colector y política de consentimiento.

## Verificación y límites
Build, TypeScript y 2 pruebas unitarias aprobadas. Las 6 pruebas V2 en Chromium
móvil y las 2 pruebas del recorrido anterior aprobaron. Suite específica de rutas alternativas,
persistencia, hash/back, reduced motion, voz, bloqueo de audio, eventos/UTM,
ausencia de descargas MP4 al entrar y ancho compacto 320×568.
Configuración WebKit incluida para repetirla cuando el entorno lo permita.
Se descargó WebKit, pero no arrancó: faltan libgtk-4, libgraphene, libharfbuzz-icu,
libmanette, libhyphen y libGLESv2. No había instalador cloud ni paquetes apt
disponibles. No se validó Safari ni un iPhone físico.
Primer JS de /v2: aproximadamente 109 kB según build; sin librerías pesadas.
No se midieron FPS, GPU, batería ni red real de un teléfono.
