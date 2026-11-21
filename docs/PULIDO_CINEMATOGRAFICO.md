# Pulido de estudio y presencia de NEXO

## Alcance conservado
Cambios sobre feature/cinematic-opening. Sin reconstruir arquitectura, agregar
dependencias, editar main ni modificar rutas/escenas posteriores. Los MP4 de
encendido y Gemini y el MP3 de NEXO se conservan byte a byte.

## Estudio
El póster del estudio aparece desde el primer render móvil. Se retira el velo
oscuro a pantalla completa; título editorial superior y encendido sobre monitor.
Se integra el MP3 real de SISTEMA (7,471 s). Con sonido habilitado, se intenta
reproducir después de Encender; Safari puede rechazar y se ofrece un control
explícito. Silencio, fallos y movimiento reducido no bloquean IDEA_001.
Subtítulos basados en pausas detectadas del archivo: 0–1,41; 1,85–4,13;
4,53–7,24 s. La tercera frase contiene una pausa interior. Requieren revisión
auditiva humana; no se afirma sincronización fonética validada en iPhone.
Reflejo radial rojo de baja intensidad sobre escritorio, barrido de pantalla
y estado discreto. La luz sigue currentTime de SISTEMA cuando reproduce y un
reloj visual cuando está silenciado. No se modifica la iluminación del video:
el reflejo HTML es una aproximación, no un render volumétrico físico.
IDEA_001 sigue siendo HTML en las mismas coordenadas. Respuesta de brillo al
pulsar y desvanecimiento rápido, manteniendo Gemini sin cortes añadidos.

## NEXO
Señal abstracta original con dos anillos en perspectiva, núcleo luminoso,
partículas fijas muy sutiles y línea central. No hay tarjeta ni nuevo personaje.
config/nexoEnvelope.json contiene RMS normalizado, extraído del MP3 a 30 muestras
por segundo. La intensidad se consulta con audio.currentTime; no es una animación
aleatoria ni análisis de micrófono. El fallback y las pausas no simulan voz.
Esto evita AudioContext extra, permisos y procesamiento FFT en el celular.
En reduced motion se elimina el movimiento y el barrido.
Subtítulos por frase, con entrada suave, separados de la señal. Se mantienen
sus tiempos VTT anteriores, ducking, fallback, pausa y Continuar tras ended.
El acceso superior a oferta sigue disponible durante todo el recorrido.

## Rendimiento y validación
Build, TypeScript y pruebas unitarias; navegador Chromium móvil para recorrido,
audio real, silenciamiento, carga fallida, reduced motion y geometría.
Pruebas adicionales de SISTEMA y fallo de su MP3 sin bloquear archivo.
Capturas 390×844 de entrada, arranque y NEXO. No se midieron FPS reales de GPU,
temperatura ni batería de iPhone; no se afirma rendimiento físico certificado.
El JS inicial reportado por build pasa de 138 kB a 139 kB.
Pendiente Safari físico, audición final y aprobación artística.
