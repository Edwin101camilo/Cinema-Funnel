# Cinema Funnel — Escena 01, paquete móvil

## Alcance
Solo móvil vertical 9:16 por ahora. No cambiar diseño de escritorio ni otras escenas. Trabajar en rama de desarrollo y conservar producción estable.

## Recursos
- `public/cinema/scene-01/studio-intro-mobile.mp4`: video de encendido, 10 s, 512x910, 30 fps, H.264, sin audio. Se conserva la duración completa para asegurar continuidad con el fotograma final.
- `studio-idle-mobile.webp`: imagen fija extraída del último fotograma del MP4 optimizado.
- `camera-dive-start-mobile.png`: fotograma final del MP4 optimizado, para usar como imagen de referencia en Gemini Veo al generar la transición.
- `studio-poster-mobile.webp`: primer fotograma de carga.

## Integración
1. En pantallas móviles mostrar poster mientras se carga el video; `playsInline`, `muted`, `preload=metadata` y sin reproducción automática con audio.
2. Reproducir intro una sola vez después de la acción de entrada; al evento `ended`, mostrar la imagen idle alineada al mismo encuadre. No repetir el encendido.
3. Mantener el archivo IDEA_001 como HTML táctil sobre la pantalla del monitor, nunca quemado en video.
4. Coordinar la posición del overlay con el encuadre móvil real; comprobar en iPhone y distintas relaciones de aspecto. Evitar estirar el video.
5. Mantener controles de audio y subtítulos; la introducción se exportó sin sonido para sincronizar efectos separados.
6. Cuando el usuario pulse IDEA_001, conservar la transición existente hasta tener el recurso `camera-dive-mobile.mp4`. No afirmar que este video existe.
7. Incluir fallback de imagen si falla la reproducción. Respetar `prefers-reduced-motion`.
8. Validar build, navegación y pruebas móviles; documentar cambios. No desplegar en producción sin aprobación.

## Próximo recurso a generar
`camera-dive-mobile.mp4` usando `camera-dive-start-mobile.png` como fotograma inicial, vertical 9:16. La cámara entra al monitor rojo y termina en un espacio oscuro con luz roja para NEXO.
