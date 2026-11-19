# Cinema Funnel 2.1 — apertura móvil vertical

## Alcance
Integración en feature/cinematic-opening; main no se modifica.
Las otras cuatro escenas mantienen su implementación. No se desarrolla ni
optimiza escritorio: conserva sus recursos previos. La selección del pack se
realiza al entrar, para pantallas de hasta 700 px de ancho.

## Recursos e interacción
Pack e instrucciones originales conservados en public/cinema/scene-01 y
docs/INSTRUCCIONES_PACK_MOVIL.md.
MP4 H.264 de 10 segundos, 512×910, 30 fps, sin audio; reproducción única al tocar
Encender, muted, playsInline, preload metadata. Sin autoplay ni loop.
Imagen idle precargada y decodificada; video e imagen comparten el mismo plano.
El video permanece hasta que llega ended y la imagen está lista. Fundido de
120 ms, sin cambio de escala ni desplazamiento. Se conserva el fotograma final
si la imagen falla. El WebP tiene ligeras diferencias de compresión respecto al
último frame: diferencia media RGB medida 1,93/1,26/1,60 en escala 0–255.
No se promete identidad píxel a píxel ni percepción idéntica en todo dispositivo.

## Plano móvil
Se muestra la relación original 512:910 (aproximadamente 9:16) completa,
centrada en el alto seguro. No se estira ni se recorta el monitor.
La extensión del fondo usa la imagen móvil desenfocada; no es otro plano.
Zona del monitor: x 1,2%, y 27,7%, ancho 97,6%, alto 31,1%.
IDEA_001 es HTML, con área mínima 144×112 CSS px, foco visible y activación táctil.
Se mantienen sonido opcional, voz, subtítulos, movimiento reducido y fallback.
No se reinicia el clip al volver a la pestaña; recargar permite una nueva sesión.

## Transición siguiente
La escena está preparada como punto de partida para la próxima integración:
el toque de IDEA_001 ya controla la transición GSAP existente.
Entregar camera-dive-mobile.mp4 usando camera-dive-start-mobile.png como
fotograma inicial, 512×910 o un múltiplo con la misma composición/proporción,
H.264 compatible con iOS, sin audio incrustado. La cámara debe entrar en el
monitor rojo y terminar en un espacio oscuro con luz roja para NEXO.
Al recibirlo habrá que integrarlo, precargarlo y sincronizar su evento ended con
la llegada de NEXO. Ese archivo aún no existe en el proyecto.
Audio definitivo, mezcla y locución siguen pendientes.

## Validación
Build y TypeScript; pruebas móviles de recorrido, sonido, reduced motion,
reproducción única, fallo de video y geometría del fotograma. Barrido de
320×568, 390×844 y 430×932: target dentro del monitor, sin scroll horizontal.
Captura visual en Chromium móvil 390×844.
Safari/iPhone físico y percepción/sonido reales requieren revisión del usuario.
La vista previa Vercel está protegida por la cuenta propietaria.
