export const product = {
  name: 'Creador IA Studio', price: 'US$9.99',
  tagline: 'Convierte tus ideas en videos animados con ayuda de IA.',
  features: ['Flujos de producción para videos animados 2D y 3D', 'Compatible con flujos de Claude Code y Codex', 'Archivos y herramientas configurables', 'Guía para empezar'],
  requirements: ['Computador compatible con el entorno de desarrollo', 'Acceso a Claude Code o Codex según el flujo elegido', 'Instalación y configuración de dependencias indicadas en la guía', 'Servicios externos pueden tener costos independientes'],
  checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_URL || '',
};
