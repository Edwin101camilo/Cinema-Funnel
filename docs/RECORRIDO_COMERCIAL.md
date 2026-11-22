# Cinema Funnel — del diagnóstico a la venta

## Recorrido
Se mantiene la apertura existente. Al finalizar NEXO 01 se pasa a /descubrir,
con el mismo fotograma digital de fondo y la preferencia de sonido. Se puede
avanzar antes de que termine la primera voz.
NEXO 02 usa el MP3 adjunto, sin sustituirlo: 14,52 s. La señal sigue su envolvente
RMS real calculada a 30 muestras/s, consultada con audio.currentTime. No utiliza
micrófono ni una animación aleatoria en silencios.
Cues iniciales a partir de pausas medidas: 0–1,66; 2,26–4,22; 4,84–5,75;
6,37–7,54; 8,10–10,92; 11,66–12,42; 12,95–14,23 s. Pendiente ajuste por escucha.
Safari puede rechazar play(); Escuchar NEXO y Elegir ahora siempre permiten seguir.
La pregunta final revela los tres fragmentos; se pueden revelar antes.
Repetir diálogo reinicia audio y subtítulos; silenciar pausa. Es ficción narrativa.

Elección guardada en sessionStorage cf_diagnosis, validada contra tres valores.
No se solicitan datos personales. Cada elección muestra la respuesta entregada
por el creador, sin grabaciones nuevas. Una acción explícita inicia revelación
GSAP, con un plano vertical que se reconstruye a partir de cuatro fragmentos.
La animación es una transición técnica HTML, no una nueva película Gemini.

/demostracion contiene resultado, proceso y variedad, con selección manual.
Solo monta un video a la vez; pausa el anterior y lo desmonta al cambiar.
MP4, playsInline, controls, preload none; ningún video se reproduce automáticamente.
Los tres src están vacíos: se muestra claramente qué archivo real falta.
No se presenta ilustración narrativa como resultado de Creador IA Studio.

/oferta muestra US$9.99, producto descargable, requisitos, costos externos,
FAQ y límites de resultados. Se conservan el chat narrativo y acceso al recorrido
anterior /experiencia. No se promete garantía ni contenido del paquete no verificado.
Checkout mediante NEXT_PUBLIC_CHECKOUT_URL: HTTPS y dominio hotmart.com o subdominio.
Una URL vacía/no válida mantiene integración pendiente. Nunca se simuló una compra.
Configurar variable en Vercel y volver a desplegar cuando exista enlace oficial.

## Tráfico rápido y medición
VER PRODUCTO y VER DEMO permiten saltar desde la apertura. No hay duración mínima.
Se conserva utm_source, utm_medium, utm_campaign, utm_content y utm_term durante
la sesión y se añaden al enlace oficial de checkout sin sobrescribir parámetros.
Ejemplo de campaña: /?utm_source=tiktok&utm_medium=organic&utm_campaign=archivo001
Eventos: experience_start, monitor_power_on, file_opened, nexo_completed,
diagnosis_selected, demo_started, offer_viewed, checkout_clicked.
Adaptador local mediante CustomEvent cinema:analytics, sin servicios ni cookies.
Los eventos no demuestran conversiones. demo_started solo al reproducir un MP4 real.
No se implementa purchase sin integración confirmada de Hotmart.

## Pendiente antes de vender
1. MP4 vertical auténtico del resultado → config/demos.ts, bloque result.
2. Grabación del flujo real, con capturas autorizadas → bloque process.
3. MP4 de estilos distintos 2D/3D → bloque variety (se pueden añadir más entradas).
4. URL oficial de Hotmart, precio y condiciones finales verificados.
5. Inventario real de archivos entregados, instrucciones y mecanismo de entrega.
6. Sistemas operativos, versiones y mínimos de hardware compatibles.
7. Confirmación de derechos de uso de los materiales; condiciones y soporte oficiales.
8. Prueba humana en iPhone/Safari, escucha y sincronización final de NEXO 02.
Sin estos recursos la navegación funciona, pero no se declara un lanzamiento
comercial terminado ni se habilita una compra ficticia.

## Archivos
Nuevo: components/commercial/{Journey,Demonstration}.tsx, commercial.css;
app/{descubrir,demostracion}/page.tsx; config/{diagnosis,demos}.ts,
nexo02Envelope.json; public/audio/nexo/nexo-02.mp3; pruebas comerciales.
Editado: NexoDialogue.tsx (continuación), Opening.tsx (accesos/eventos/precarga),
Offer.tsx, config/product.ts, lib/analytics.ts y pruebas de navegación.
La arquitectura Next.js permanece. No se añadieron dependencias. MP4 existentes,
SISTEMA, primera voz NEXO y /experiencia conservados; main sin cambios.

## Límites de validación
Build, TypeScript, unitarias y pruebas Chromium móvil. Capturas a 390×844.
Se prueban decisiones, persistencia, reproducción NEXO 02, errores, revelación,
slots pendientes, FAQ, UTM y eventos locales, además de la apertura anterior.
No se valida checkout real sin URL, ni producción audiovisual sin archivos,
ni reproducción de los futuros MP4. Sin medición física de FPS, batería o Safari.
