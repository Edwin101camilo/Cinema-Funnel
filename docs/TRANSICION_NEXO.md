# Transición de cámara a NEXO

## Archivos y alcance
- public/media/nexo-camera-dive.mp4: copia exacta del adjunto, H.264 720×1280,
  10 segundos, con pista AAC. Siempre se reproduce muted.
- public/media/nexo-dive-last.webp: fotograma extraído del mismo video; respaldo
  para movimiento reducido o carga fallida, no contenido inventado.
- components/opening/Opening.tsx: integra la transición en el estado existente.
- components/opening/opening.css: superposición de video y llegada HTML de NEXO.
- components/opening/NexoDialogue.tsx y config/nexoVoice.ts: diálogo y estructura
  para voz real; src y tiempos vacíos hasta recibir grabación y tiempos medidos.
No se añadieron dependencias ni se editaron las otras cuatro escenas.
main permanece intacta; publicación únicamente en feature/cinematic-opening.

## Flujo
El clic en IDEA_001 bloquea nuevas activaciones y desvanece el overlay.
El MP4 comienza muted/playsInline; se precarga metadata en entrada y auto después
de Encender. El monitor sigue visible hasta onPlaying: no hay pantalla de carga,
texto de conexión ni corte artificial a negro.
La apertura móvil y el video usan un encuadre centrado equivalente a cover;
en pantallas más altas que 9:16 se recortan los laterales. El centro del monitor
y el archivo quedan visibles. El adjunto comienza en el mismo escenario, aunque
existen diferencias de compresión/iluminación: un fundido de 300 ms las suaviza.
No se garantiza identidad perceptual en todos los dispositivos.

Al recibir ended, el elemento video se conserva montado, detenido sobre su
último fotograma; NEXO aparece encima mediante HTML/CSS. La imagen de respaldo
ya está debajo. No se reemplaza el final por un fondo negro.
Si play() falla, el recurso da error o se bloquea 8 s sin progreso, se utiliza
el fotograma real de respaldo y se presenta el diálogo. Movimiento reducido
omite el viaje y llega a ese mismo fotograma sin desplazamiento de cámara.
Al ocultar la pestaña se pausa el viaje; al volver se reanuda solo si no terminó.
Se conserva el acceso directo a la oferta y el enlace al recorrido previo.

## Voz
No hay ElevenLabs conectado, archivo ficticio ni speechSynthesis en esta apertura.
Se muestra:
“Espera… ¿puedes escucharme?”
“Bien. Entonces el archivo llegó a la persona correcta”.
Hasta recibir audio, ambas frases se leen sin imponer tiempos inventados.
Para integrar la grabación, configurar nexoVoice.src y start/end medidos de cada
frase. El componente sincroniza texto con currentTime; un botón explícito inicia
la grabación, solo con sonido habilitado. Maneja rechazo de play() y carga fallida.
Silenciar o esconder la pestaña pausa la voz. No se reproduce automáticamente.
Se conserva el ambiente Web Audio previo, autorizado mediante el control SONIDO.

## Verificación
Build, TypeScript, pruebas unitarias y pruebas móviles de recorrido,
reproducción sin bucle, final persistente, carga abortada, sonido, movimiento
reducido, geometría en tamaños de iPhone y subtítulos.
Capturas en Chromium móvil 390×844 antes/durante/después del viaje.
No se verificó Safari en un iPhone físico ni la mezcla acústica.
La sincronización con una grabación real no puede validarse hasta recibirla.
