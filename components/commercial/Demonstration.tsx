'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {demos} from '@/config/demos';
import {track,captureAttribution} from '@/lib/analytics';
import './commercial.css';
export default function Demonstration(){
 const [index,setIndex]=useState(0),[failed,setFailed]=useState(false),[sound,setSound]=useState(false);
 const video=useRef<HTMLVideoElement>(null);const demo=demos[index];
 useEffect(()=>{captureAttribution();return()=>video.current?.pause()},[]);
 function select(i:number){video.current?.pause();setFailed(false);setIndex(i)}
 return <main className="commercial demos"><nav className="commerce-nav"><Link href="/">EL ARCHIVO 001</Link><Link href="/oferta">VER PRODUCTO ↗</Link></nav><section className="demo-inner">
 <p className="micro">CREADOR IA STUDIO / DEMOSTRACIÓN</p><h1>De la idea<br/><em>al video.</em></h1>
 <p>Producto digital descargable para trabajar con Claude Code o Codex. No es un generador automático en esta web.</p>
 <nav className="demo-tabs" aria-label="Bloques de demostración">{demos.map((d,i)=><button key={d.id} aria-pressed={i===index} onClick={()=>select(i)}>{d.title}</button>)}</nav>
 <div className="demo-frame">{demo.src&&!failed?<video key={demo.id} ref={video} controls playsInline preload="none" muted={!sound} poster={demo.poster} onPlay={()=>track('demo_started',{demo:demo.id})} onError={()=>setFailed(true)} src={demo.src}/>:<div className="demo-pending" role="status"><span>▷</span><h2>{failed?'Video no disponible':'Demostración real pendiente'}</h2><p>{failed?'No se pudo cargar este recurso. Puedes consultar otro bloque o ver el producto.':demo.pending}</p><small>Este espacio no es una prueba ni un resultado del producto.</small></div>}</div>
 <h2 className="demo-heading">{demo.title}</h2><p>{demo.description}</p>
 {demo.src&&!failed&&<button className="cinema-action" aria-pressed={sound} onClick={()=>setSound(!sound)}>SONIDO {sound?'ON':'OFF'}</button>}
 <div className="demo-navigation"><button disabled={index===0} onClick={()=>select(index-1)}>← Anterior</button><button disabled={index===demos.length-1} onClick={()=>select(index+1)}>Siguiente →</button></div>
 <Link className="cinema-action" href="/oferta">VER PRECIO Y ACCESO →</Link>
 </section></main>
}
