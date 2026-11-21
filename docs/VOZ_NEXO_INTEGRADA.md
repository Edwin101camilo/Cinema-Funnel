# NEXO — voz de prueba integrada

Se copian sin alterar el MP3 real y el VTT suministrados a public/audio/nexo/.
Duración comprobada: 7,235918 s. Los cuatro cues de config/nexoVoice.ts reproducen
los tiempos del VTT (70–730, 1480–2710, 3040–3780 y 4030–7150 ms).
El VTT recibido declara sincronización aproximada. No se ajustaron tiempos sin
evidencia auditiva; se verifica la relación entre subtítulo y currentTime.
Pendiente escucha y ajuste perceptual en iPhone.

NEXO aparece como una señal discreta sobre el último fotograma digital existente.
Se intentará reproducir al llegar solo si SONIDO ya fue autorizado. play() se
captura; Safari puede pedir otro gesto. Reproducir voz funciona desde un gesto
explícito y habilita el sonido. No se reproduce voz durante el viaje de cámara.
No se usa speechSynthesis ni se genera audio.

Los subtítulos muestran una sola frase según el reloj del audio, mediante
requestAnimationFrame. Las pausas del MP3 no muestran texto. La onda es decorativa:
solo se mueve durante reproducción, no representa amplitudes reales.
Movimiento reducido desactiva su animación. El ambiente sintetizado previo baja
al 12% mientras habla NEXO y se restaura al pausar/finalizar; silenciar mantiene
la salida apagada. Al ocultar la pestaña se pausa la voz; requiere reanudar.
Tras ended se esperan 650 ms antes de revelar Continuar.
Leer sin sonido presenta las frases con los mismos tiempos y permite continuar,
incluso si el audio falla. El acceso superior a oferta permanece disponible.

Cambios limitados a Opening, NexoDialogue, audio de apertura, estilos, configuración
de voz, recursos, documentación y pruebas. Otras escenas y main sin cambios.
Validación: build, TypeScript, pruebas unitarias y móviles Chromium; reproducción,
pausa/silencio, subtítulos por tiempo, bloqueo de autoplay y lectura sin sonido.
No se afirma verificación física en Safari/iPhone ni escucha de la mezcla final.
