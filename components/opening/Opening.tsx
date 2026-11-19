'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {gsap} from 'gsap';
import {OpeningAudio} from './audio';
import {openingMedia} from '@/config/opening';
import './opening.css';

export default function Opening(){
 const root=useRef<HTMLElement>(null),timeline=useRef<gsap.core.Timeline|null>(null),audio=useRef<OpeningAudio|null>(null),clip=useRef<HTMLVideoElement>(null);
 const [phase,setPhase]=useState<'idle'|'boot'|'file'|'travel'|'nexo'>('idle');
 const [sound,setSound]=useState(false),[voice,setVoice]=useState(false),[reduced,setReduced]=useState(false),[subtitle,setSubtitle]=useState(''),[audioError,setAudioError]=useState(''),[mediaFailed,setMediaFailed]=useState(false);
 const muted=useRef(true),speaking=useRef(false),busy=useRef(false);
 const hasMedia=!!(openingMedia.mp4||openingMedia.webm)&&!mediaFailed;
 function say(text:string){
  setSubtitle(text);
  if(!muted.current&&speaking.current&&'speechSynthesis' in window){window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='es-ES';u.rate=.85;window.speechSynthesis.speak(u)}
 }
 useEffect(()=>{
  audio.current=new OpeningAudio();
  const q=matchMedia('(prefers-reduced-motion: reduce)');setReduced(q.matches);
  const change=()=>setReduced(q.matches);q.addEventListener('change',change);
  const visibility=()=>{if(document.hidden){timeline.current?.pause();audio.current?.mute();clip.current?.pause();window.speechSynthesis?.cancel()}else{timeline.current?.resume();if(!muted.current)void audio.current?.enable().catch(()=>{muted.current=true;setSound(false)});if(!q.matches)void clip.current?.play().catch(()=>{})}};
  document.addEventListener('visibilitychange',visibility);
  return()=>{timeline.current?.kill();audio.current?.dispose();window.speechSynthesis?.cancel();q.removeEventListener('change',change);document.removeEventListener('visibilitychange',visibility)}
 },[]);
 async function toggleSound(){
  if(sound){muted.current=true;setSound(false);audio.current?.mute();window.speechSynthesis?.cancel();return}
  try{await audio.current?.enable();muted.current=false;setSound(true);setAudioError('');audio.current?.cue(330)}
  catch{setAudioError('El audio no pudo activarse. Puedes continuar con subtítulos.')}
 }
 function start(){
  if(busy.current)return;busy.current=true;setPhase('boot');
  if(!reduced)void clip.current?.play().catch(()=>setMediaFailed(true));
  const scope=gsap.utils.selector(root);
  timeline.current=gsap.timeline();
  const t=timeline.current;
  t.call(()=>{say('Hay una idea que nunca terminaste.');audio.current?.cue(100,1.5)})
   .to(scope('.monitor-screen'),{opacity:1,duration:reduced?0:2,ease:'power2.inOut'},reduced?0:1)
   .to(scope('.light-spill'),{opacity:1,duration:reduced?0:3},reduced?0:1)
   .to(scope('.camera'),{scale:reduced?1:1.08,duration:reduced?0:9,ease:'sine.inOut'},0)
   .call(()=>say('Y puede que todavía tenga algo que mostrarte.'),[],reduced?1:5)
   .call(()=>{setPhase('file');audio.current?.cue(660);say('Un archivo sigue esperando. Tócalo para abrirlo.');busy.current=false},[],reduced?2:10);
 }
 function open(){
  if(busy.current||phase!=='file')return;busy.current=true;setPhase('travel');
  const scope=gsap.utils.selector(root);timeline.current?.kill();
  timeline.current=gsap.timeline().call(()=>{say('Restableciendo conexión.');audio.current?.cue(190,2)})
   .to(scope('.camera'),{scale:reduced?1:4,opacity:0,duration:reduced?.3:3.2,ease:'power3.inOut'})
   .call(()=>{setPhase('nexo');say('Soy NEXO. Tu idea sigue aquí.');audio.current?.cue(440,.8);busy.current=false})
   .fromTo(scope('.nexo-arrival'),{opacity:0},{opacity:1,duration:reduced?.2:1.5});
 }
 useEffect(()=>{if(phase==='file')root.current?.querySelector<HTMLButtonElement>('.mystery-file')?.focus({preventScroll:true});if(phase==='nexo')root.current?.querySelector<HTMLElement>('.nexo-arrival')?.focus({preventScroll:true})},[phase]);
 return <main ref={root} className="opening" data-phase={phase} data-reduced={reduced}>
  <header className="film-controls"><Link href="/oferta">VER PRODUCTO ↗</Link><div><button onClick={toggleSound} aria-pressed={sound}>{sound?'SONIDO ON':'SONIDO OFF'}</button><button aria-pressed={voice} onClick={()=>{speaking.current=!voice;setVoice(!voice);if(voice)window.speechSynthesis?.cancel()}}>VOZ {voice?'ON':'OFF'}</button></div></header>
  <div className="camera" aria-hidden={phase==='nexo'}>
   {hasMedia&&<video className="room-video" ref={clip} muted playsInline loop preload="none" poster={openingMedia.poster||undefined} onError={()=>setMediaFailed(true)}>{openingMedia.webm&&<source src={openingMedia.webm} type="video/webm"/>}{openingMedia.mp4&&<source src={openingMedia.mp4} type="video/mp4"/>}</video>}
   <div className="room-wall"/><div className="window-light"/><div className="light-spill"/><div className="desk"/><div className="lamp"><i/></div>
   <div className="computer"><div className="monitor-frame"><div className="monitor-screen"><div className="screen-grid"/><span className="screen-id">STUDIO / TERMINAL 001</span>
    {(phase==='file'||phase==='travel')&&<><div className="screen-notification"><i/> SEÑAL RECUPERADA <span>1 archivo pendiente</span></div><button className="mystery-file" aria-label="Abrir archivo IDEA 001" disabled={phase!=='file'} onClick={open}><svg viewBox="0 0 100 76" aria-hidden="true"><path d="M4 14h34l10 10h48v48H4z"/><path d="M4 25h92"/></svg><span>IDEA_001</span><small>TOCA PARA RECUPERAR</small></button></>}
    {phase==='boot'&&<span className="boot-line">RECUPERANDO SEÑAL…</span>}
   </div><span className="power-led"/></div><div className="monitor-neck"/><div className="monitor-foot"/></div>
   <div className="keyboard"/><div className="foreground"/>
  </div>
  {phase==='idle'&&<div className="opening-title"><p>CREADOR IA STUDIO PRESENTA</p><h1>EL ARCHIVO <span>001</span></h1><button className="power-switch" onClick={start} aria-label="Encender computadora"><span>⏻</span> ENCENDER</button><small>Una ficción interactiva · No accedemos a tus archivos</small></div>}
  <section className="nexo-arrival" tabIndex={-1} aria-label="Conexión con NEXO" hidden={phase!=='nexo'}><div className="nexo-orbit"/><p>TRANSMISIÓN RESTABLECIDA</p><h2>NEXO</h2><p>Tu idea sigue aquí.</p><small>Fin de la apertura · Prototipo para revisión visual</small><Link href="/experiencia">Continuar al recorrido anterior →</Link></section>
  <div className="film-grain" aria-hidden="true"/>
  <footer className="film-footer"><p className="film-subtitle" aria-live="polite">{subtitle}</p>{audioError&&<p role="status">{audioError}</p>}<div><span>01 / EL ARCHIVO PERDIDO</span><span>PROTOTIPO AUDIOVISUAL{reduced?' · MOVIMIENTO REDUCIDO':''}</span></div></footer>
 </main>
}
