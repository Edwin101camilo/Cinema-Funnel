'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import NexoChat from './NexoChat';
import {product} from '@/config/product';
import {track,trackedUrl} from '@/lib/analytics';
import './commercial/commercial.css';
const faq=[
 ['¿Necesito saber programar?','El flujo se basa en instrucciones en lenguaje natural, sin programar las animaciones desde cero. Sí requiere preparar el entorno y seguir instrucciones técnicas.'],
 ['¿Necesito pagar otras herramientas?','Puede ser necesario. El acceso a Claude Code o Codex y otros servicios no está incluido; sus planes y tarifas dependen del proveedor.'],
 ['¿Funciona en mi computador?','Necesitas un computador compatible con las herramientas del flujo. Los sistemas operativos, versiones y requisitos mínimos exactos están pendientes de confirmación; compruébalos antes de comprar.'],
 ['¿Puedo crear videos para TikTok, Reels y Shorts?','El flujo está orientado a videos verticales 2D y 3D. La publicación debe cumplir los formatos y condiciones de cada plataforma; no se garantizan visualizaciones ni viralidad.'],
 ['¿Qué recibo después de comprar?','Un producto digital descargable. El inventario final de archivos, recursos e instrucciones y el método de entrega deben confirmarse en la ficha oficial antes de habilitar la compra.'],
 ['¿Es una aplicación web o una herramienta descargable?','Es una herramienta digital descargable para utilizar junto con Claude Code o Codex. Esta página presenta el producto; no genera videos automáticamente en el navegador.'],
 ['¿Incluye Claude Code o Codex?','No. Necesitas acceso a las herramientas de IA correspondientes y sus condiciones de uso.']
];
export default function Offer(){
 const [checkout,setCheckout]=useState('');
 useEffect(()=>{track('offer_viewed');try{const u=new URL(product.checkoutUrl);if(u.protocol==='https:'&&(u.hostname==='hotmart.com'||u.hostname.endsWith('.hotmart.com')))setCheckout(trackedUrl(u.href))}catch{}},[]);
 return <main className="offer commercial sale"><nav className="commerce-nav"><Link href="/">◈ EL ARCHIVO 001</Link><Link href="/demostracion">VER DEMOSTRACIÓN ↗</Link></nav><div className="offerInner">
 <div className="eyebrow">CREADOR IA STUDIO / ACCESO</div><h1>TU PRÓXIMA IDEA MERECE <em>CONVERTIRSE EN VIDEO.</em></h1>
 <p className="lead">Convierte tus ideas en videos animados 2D y 3D con inteligencia artificial, sin tener que programar animaciones desde cero.</p>
 <p>Una herramienta digital descargable. Trabaja con Claude Code o Codex, desde tu entorno preparado.</p>
 <div className="offerGrid"><section className="paper"><h2>EL PRODUCTO</h2><p>Flujo de creación de videos verticales 2D y 3D mediante instrucciones y herramientas de IA.</p><p>Los recursos e instrucciones incluidos deben coincidir con el paquete final. Su inventario detallado está pendiente de verificación.</p><h2>ANTES DE COMPRAR</h2>{product.requirements.map(r=><p key={r}>• {r}</p>)}</section>
 <section className="checkout" id="comprar"><span>PRECIO DE LANZAMIENTO</span><h2>{product.price}</h2><p>Pago único por el producto digital. El acceso a servicios externos puede tener costos adicionales.</p>
 {checkout?<a className="btn" href={checkout} target="_blank" rel="noopener noreferrer" onClick={()=>track('checkout_clicked')}>OBTENER CREADOR IA STUDIO ↗</a>:<div className="disabledCheckout" role="status">CHECKOUT PENDIENTE DE CONFIGURAR</div>}
 <small>Consulta el contenido, la entrega y las condiciones de compra en el checkout oficial cuando esté disponible.</small></section></div>
 <section className="faq"><h2>PREGUNTAS FRECUENTES</h2>{faq.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
 <NexoChat/><p className="legal">No se garantizan visualizaciones, viralidad ni ingresos. No se incluyen testimonios ni resultados no verificados.</p>
 <Link className="subtle-link" href="/experiencia">Volver al recorrido anterior</Link>
 </div></main>
}
