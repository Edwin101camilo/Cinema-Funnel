# Cinema Funnel 2.1 — integración de recursos de escena 01

Se leyeron y conservaron las instrucciones recibidas en
public/cinema/scene-01/INSTRUCCIONES_CODEX.txt. Se copiaron sin modificar los cuatro
recursos suministrados. El PNG monitor-on es referencia para producción y no se
descarga en el recorrido; se usa el WebP comprimido para la espera.

## Comportamiento
- La introducción H.264 910×512 dura 5,8 segundos, sin pista sonora.
- Se inicia al pulsar Encender; muted, playsInline, sin loop.
- El evento ended, no un temporizador, habilita IDEA_001.
- El WebP se carga debajo desde el inicio. Solo se retira visualmente el video
  cuando la imagen está cargada; fundido de 350 ms entre fotogramas.
- Imagen, video y zona interactiva comparten proporciones/coordenadas.
- El monitor ocupa x=19,56%, y=8,4%, ancho=61,1%, alto=54,7% del plano.
- Volver a la pestaña reanuda únicamente una introducción interrumpida: nunca
  reinicia un video terminado. Recargar la página permite iniciar otra sesión.
- Movimiento reducido omite la introducción y utiliza la imagen fija.
- Si la reproducción no comienza en 4 segundos, se utiliza la imagen fija.
- Si falla el MP4, se permite avanzar con la imagen; si falla la imagen, se
  conserva el último fotograma del video y se informa.
- Audio Web Audio y voz opcional conservados. No se afirma que sean mezcla final.
- Transición GSAP hacia NEXO conservada. El final sigue siendo un prototipo.

## Encuadre móvil
No existe un recurso vertical en el ZIP. Se utiliza un plano de ancho 150vw
en pantallas verticales, centrado, con la misma relación 910:512 (sin estirar).
El recorte lateral mantiene la pantalla y el archivo visibles. El área superior
e inferior se extiende con una copia desenfocada oscurecida de la imagen.
En escritorio se llena el encuadre conservando proporciones.
Esta solución es provisional hasta disponer del plano vertical original.

## Recursos que faltan para NEXO
1. Plano de transición de 3–4 s: comenzar exactamente en monitor-on.png,
   acercamiento al centro del monitor rojo y entrada al espacio de NEXO.
   Entregar MP4 H.264, opcional WebM, sin audio, versiones 16:9 y 9:16;
   conservar el color y la posición inicial para continuidad.
2. Plano de llegada de NEXO: fondo original de señal/interfaz, con fotograma final
   y bucle de espera si procede. El diseño debe aprobarse antes de producirlo.
3. Mezcla sonora: ambiente de estudio, encendido, notificación, barrido de cámara
   y llegada; WAV maestros y derivados web, con niveles consistentes.
4. Voz definitiva española, separada por frase, con tiempos y derechos de uso.
5. Introducción y espera verticales 9:16 para reemplazar el recorte provisional.

## Validación y publicación
Build y pruebas unitarias; navegador automatizado móvil/escritorio verifica
reproducción única, muted, correspondencia geométrica video/imagen, fallo de
video, controles de sonido, movimiento reducido y llegada a NEXO.
Se mantiene revisión visual por captura. Safari físico, audición en iPhone y
continuidad perceptual en dispositivo real requieren revisión del propietario.
El fundido disimula diferencias de compresión entre el MP4 y el WebP: no es una
garantía de identidad pixel a pixel.
Solo se publica feature/cinematic-opening; main y las demás escenas no se editan.
