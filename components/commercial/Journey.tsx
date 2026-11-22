'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {gsap} from 'gsap';
import {diagnosisOptions,nexo02Cues} from '@/config/diagnosis';
import envelope from '@/config/nexo02Envelope.json';
import {track} from '@/lib/analytics';
import './commercial.css';
export default function Journey({initialSound=false}:{initialSound?:boolean}){
 const [sound,setSound]=useState(initialSound),[time,setTime]=useState(0),[playing,setPlaying]=useState(false),[choices,setChoices]=useState(false),[selected,setSelected]=useState(''),[reveal,setReveal]=useState(false),[error,setError]=useState('');
 const audio=useRef<HTMLAudioElement>(null),signal=useRef<HTMLDivElement>(null),stage=useRef<HTMLElement>(null),reported=useRef(false);
 function finish(){setChoices(true);if(!reported.current){track('nexo_completed',{dialogue:2});reported.current=true}}
 function play(restart=false){if(!audio.current)return;if(restart){audio.current.currentTime=0;setTime(0)}setSound(true);setError('');void audio.current.play().catch(()=>{setError('Pulsa Escuchar NEXO para activar la voz.');setChoices(true)})}
 useEffect(()=>{try{const value=sessionStorage.getItem('cf_diagnosis');if(diagnosisOptions.some(o=>o.id===value)){setSelected(value!);setChoices(true)}}catch{}try{if(initialSound||sessionStorage.getItem('cf_sound')==='on')play()}catch{}return()=>audio.current?.pause()},[]);
 useEffect(()=>{let raf=0;const tick=()=>{const a=audio.current;if(a&&!a.paused&&!document.hidden){const t=a.currentTime;setTime(t);signal.current?.style.setProperty('--level',String(envelope[Math.floor(t*30)]||0));if(t>=12.95)setChoices(true)}else signal.current?.style.setProperty('--level','0');raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);const hide=()=>{if(document.hidden)audio.current?.pause()};document.addEventListener('visibilitychange',hide);return()=>{cancelAnimationFrame(raf);document.removeEventListener('visibilitychange',hide)}},[]);
 useEffect(()=>{if(!reveal)return;stage.current?.focus();const ctx=gsap.context(()=>{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)gsap.fromTo('.archive-shard',{opacity:0,x:i=>(i%2?1:-1)*65,y:i=>(i-2)*24,rotation:i=>i*9},{opacity:1,x:0,y:0,rotation:0,duration:.8,stagger:.09,ease:'power2.out'})},stage);return()=>ctx.revert()},[reveal]);
 function choose(id:string){audio.current?.pause();setSelected(id);try{sessionStorage.setItem('cf_diagnosis',id)}catch{}track('diagnosis_selected',{choice:id})}
 const choice=diagnosisOptions.find(o=>o.id===selected),cue=nexo02Cues.find(c=>time>=c.start&&time<c.end);
 return <main className="commercial journey" data-selected={!!selected}>
  <nav className="commerce-nav"><Link href="/demostracion">VER DEMOSTRACIÓN</Link><button onClick={()=>{if(sound){setSound(false);audio.current?.pause()}else play()}} aria-pressed={sound}>SONIDO {sound?'ON':'OFF'}</button><Link href="/oferta">VER PRODUCTO ↗</Link></nav>
  <audio ref={audio} src="/audio/nexo/nexo-02.mp3" preload="metadata" onPlaying={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onEnded={finish} onError={()=>{setError('Voz no disponible. Puedes elegir y continuar.');setChoices(true)}}/>
  {!reveal?<section className="diagnosis-stage">
   <p className="micro">NEXO / ANÁLISIS DEL ARCHIVO</p>
   <div ref={signal} className="analysis-signal" aria-hidden="true"><i/><i/><i/><span>001</span><div className="data-streak">IDEA · SECUENCIA · ORIGEN</div></div>
   <div className="journey-caption" aria-live="polite">{choice?choice.reply:cue?.text||'Hay una idea aquí.'}</div>
   {error&&<p className="load-note" role="status">{error}</p>}
   {!selected&&<div className="narrative-actions"><button onClick={()=>play(true)}>{playing?'Repetir diálogo':'Escuchar NEXO'}</button><button onClick={()=>{audio.current?.pause();setChoices(true)}}>Elegir ahora</button></div>}
   {choices&&<div className="data-options" aria-label="¿Qué te detiene?">{diagnosisOptions.map((o,i)=><button key={o.id} aria-pressed={selected===o.id} className={selected===o.id?'chosen':''} onClick={()=>choose(o.id)}><span>0{i+1} /</span>{o.label}<b>{selected===o.id?'✓':'↗'}</b></button>)}</div>}
   {selected&&<button className="cinema-action" onClick={()=>{audio.current?.pause();setReveal(true)}}>DESCUBRIR EL SISTEMA →</button>}
  </section>:<section className="reveal-stage" ref={stage} tabIndex={-1}>
   <p className="micro">NEXO / ARCHIVO RECONSTRUIDO</p><p className="journey-caption">Creo que encontré algo que deberías ver.</p>
   <div className="reconstructed-screen" aria-hidden="true">{[0,1,2,3].map(i=><div className="archive-shard" key={i}/>)}<span>IDEA_001<br/>↓<br/>PRODUCCIÓN</span></div>
   <h1>CREADOR<br/><em>IA STUDIO</em></h1>
   <p>Una herramienta descargable para crear videos animados verticales 2D y 3D con Claude Code o Codex.</p>
   <Link className="cinema-action" href="/demostracion">EXPLORAR LA DEMOSTRACIÓN →</Link><Link className="subtle-link" href="/oferta">Ver precio y requisitos</Link>
  </section>}
 </main>
}
