# Apertura 2.0 — informe de revisión

## Alcance y respaldo
La versión previa está en la rama remota backup/cinema-funnel-1.0.
El prototipo está en feature/cinematic-opening, sin sustituir main.
Solo se reemplaza la entrada /. /experiencia y /oferta conservan su código anterior.
La llegada a NEXO es un plano de cierre de esta apertura, no una reconstrucción de
la escena de chat. El enlace final permite regresar al recorrido original.
No se continúa con las otras cuatro escenas antes de aprobación visual.

## Referencia observada
https://copyfilms.online/ y su entrada /llamada, revisadas en viewport móvil.
Observado: encuadre vertical oscuro de profundidad, preparación para sonido,
acción inicial breve, continuación mediante una interfaz de llamada dentro de
la ficción y acceso alternativo para visitantes recurrentes.
Principios adoptados: una acción dominante, sonido voluntario, interfaz dentro
del escenario y continuidad entre interacción y respuesta audiovisual.
No se descargaron ni reutilizaron sus videos, imágenes, personajes, código o voz.
No se evaluó el recorrido completo ni su mezcla sonora: no se atribuyen al
prototipo prestaciones basadas en esas partes no verificadas.

## Implementación
Next.js/TypeScript; GSAP para luz, encendido, avance y transición.
Escenografía original CSS/SVG: pared, persiana, escritorio, monitor, teclado,
lámpara, halo y grano. Esto es previs cinematográfica, no metraje terminado.
Web Audio: ambiente continuo de dos osciladores, encendido, notificación y barrido.
El contexto solo se desbloquea al pulsar SONIDO; apagado por defecto.
VOZ habilita síntesis del navegador para los siguientes subtítulos (requiere
SONIDO ON). No es una locución profesional; disponibilidad y timbre dependen del
dispositivo. La voz no se repite retroactivamente al cambiar el control.
Al ocultar la pestaña se pausa la secuencia, el video y el audio. Al desmontar
se destruyen timeline/contexto y se cancela la síntesis.
Subtítulos permanentes, controles semánticos, foco al archivo y a NEXO.
Movimiento reducido: encendido inmediato, espera de lectura breve y fundido,
sin zoom ni video animado. No se necesita audio para avanzar.

## Montaje / ritmo
0 s: interacción de encendido; primera frase y tono.
1–4 s: pantalla y luz se activan.
0–9 s: acercamiento de cámara lento.
5 s: segunda frase.
10 s: aparece el archivo, notificación sonora y subtítulo de interacción.
La secuencia espera sin límite hasta que la persona toque el archivo.
Toque +0–3,2 s: acercamiento y barrido.
Toque +3,2–4,7 s: NEXO aparece y habla opcionalmente.
Duración activa aproximada 15 s; con lectura/toque, objetivo 20 s.
No se fuerza al usuario a tocar dentro de un plazo ni se simula interacción.

## Recursos finales que deben producirse
| Recurso | Entrega solicitada | Integración |
| --- | --- | --- |
| Estudio nocturno | Plano limpio original, sin monitor/textos incrustados, 8–12 s en bucle, luz azul verdosa, profundidad y partículas muy sutiles | openingMedia.mp4/webm en config/opening.ts |
| Versiones video | MP4 H.264 y opcional WebM, vertical 1080x1920 y composición compatible con recorte horizontal, sin pista sonora; objetivo móvil <5 MB | public/videos/; video muted, playsInline, preload none |
| Póster | WebP/AVIF del mismo encuadre, objetivo <200 KB | openingMedia.poster |
| Encendido / viaje final | Planos de monitor apagado→activo y acercamiento hasta señal abstracta NEXO, alineados con el encuadre del monitor | Requiere sincronización editorial adicional; el prototipo usa GSAP |
| Ambiente | Room tone, ventilación/electricidad suave; loop sin clics 20–30 s, WAV maestro y AAC/MP3 para web | Sustituir osciladores en audio.ts tras aprobar mezcla |
| Efectos | Encendido 1,5 s; señal .4 s; viaje 3,2 s; llegada .8 s, sin picos agresivos | Sustituir cues sintéticos |
| Voz española | “Hay una idea que nunca terminaste.” / “Y puede que todavía tenga algo que mostrarte.” / “Un archivo sigue esperando. Tócalo para abrirlo.” / “Restableciendo conexión.” / “Soy NEXO. Tu idea sigue aquí.” | Clips separados y subtítulos sincronizados; actualmente speechSynthesis |
| Arte final | Diseño original de estudio/monitor/NEXO y autorización de uso comercial de todos los recursos | Sustituir previs tras aprobación |

No se han suministrado estos recursos ni presentado como finalizados. El soporte
de MP4/WebM está preparado pero no probado con un recurso definitivo. Si falla el
video, se conserva la escenografía técnica. Para un video a pantalla completa,
el render debe dejar libre la zona del monitor interactivo.

## Verificación y límites
Build de producción correcto. Pruebas Chromium en móvil y escritorio para
sonido ON/OFF, foco, archivo, transición, oferta y reduced motion, más regresión
del recorrido anterior. Revisión de captura móvil 390×844.
La prueba de audio verifica activación/contexto y controles, no calidad acústica.
No se ha escuchado la mezcla en altavoces de iPhone ni probado Safari físico;
hay que revisar desbloqueo de audio, síntesis, interrupciones y modo silencio.
La escena no contiene IA conectada ni demuestra el producto real.
No hay video real ni locución grabada final; la estética actual es un prototipo
técnico sujeto a aprobación. El área min-height 600 permite scroll en pantallas
muy bajas; existe ajuste para orientación horizontal.
