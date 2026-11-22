'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {gsap} from 'gsap';
import {OpeningAudio} from './audio';
import {openingMedia,mobileOpeningMedia} from '@/config/opening';
import './opening.css';
import NexoDialogue from './NexoDialogue';
import {track} from '@/lib/analytics';
import SystemBoot from './SystemBoot';

export default function Opening(){
 const root=useRef<HTMLElement>(null),timeline=useRef<gsap.core.Timeline|null>(null),audio=useRef<OpeningAudio|null>(null),clip=useRef<HTMLVideoElement>(null);
 const [media,setMedia]=useState<typeof openingMedia|null>(null);
 const selectedMedia=media||mobileOpeningMedia;
 const [phase,setPhase]=useState<'idle'|'boot'|'file'|'travel'|'nexo'>('idle');
 const [sound,setSound]=useState(false),[reduced,setReduced]=useState(false),[subtitle,setSubtitle]=useState(''),[audioError,setAudioError]=useState(''),[mediaFailed,setMediaFailed]=useState(false);
 const loadTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const playing=useRef(false),finished=useRef(false),secondLine=useRef(false);
 const muted=useRef(true),busy=useRef(false);
 const [stillReady,setStillReady]=useState(false);
 const [ended,setEnded]=useState(false);
 const dive=useRef<HTMLVideoElement>(null),diveActive=useRef(false),diveDone=useRef(false);
 const diveTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const [diveVisible,setDiveVisible]=useState(false),[diveFallback,setDiveFallback]=useState(false);
 const duck=useCallback((v:boolean)=>audio.current?.duck(v),[]);
 const enableVoiceSound=()=>{if(!sound)void toggleSound()};
 function say(text:string){setSubtitle(text)}
 function arrive(fallback=false){
  if(diveDone.current)return;
  diveDone.current=true;diveActive.current=false;
  if(diveTimer.current)clearTimeout(diveTimer.current);
  dive.current?.pause();setDiveFallback(fallback);setPhase('nexo');setSubtitle('');busy.current=false;
 }
 function diveFailed(){if(diveActive.current)arrive(true)}
 function armDiveTimeout(){
  if(diveTimer.current)clearTimeout(diveTimer.current);
  diveTimer.current=setTimeout(()=>{if(!document.hidden&&diveActive.current)arrive(true)},8000);
 }
 useEffect(()=>{
  track('experience_start');
  setMedia(matchMedia('(max-width: 700px)').matches?mobileOpeningMedia:openingMedia);
  audio.current=new OpeningAudio();
  const q=matchMedia('(prefers-reduced-motion: reduce)');setReduced(q.matches);
  const change=()=>setReduced(q.matches);q.addEventListener('change',change);
  const visibility=()=>{if(document.hidden){timeline.current?.pause();audio.current?.mute();clip.current?.pause();dive.current?.pause();if(diveTimer.current)clearTimeout(diveTimer.current)}else{if(diveActive.current){armDiveTimeout();void dive.current?.play().catch(diveFailed)}timeline.current?.resume();if(!muted.current)void audio.current?.enable().catch(()=>{muted.current=true;setSound(false)});if(playing.current&&!finished.current&&!q.matches)void clip.current?.play().catch(()=>finishIntro())}};
  document.addEventListener('visibilitychange',visibility);
  return()=>{if(diveTimer.current)clearTimeout(diveTimer.current);dive.current?.pause();if(loadTimer.current)clearTimeout(loadTimer.current);timeline.current?.kill();audio.current?.dispose();q.removeEventListener('change',change);document.removeEventListener('visibilitychange',visibility)}
 },[]);
 async function toggleSound(){
  if(sound){muted.current=true;setSound(false);audio.current?.mute();return}
  try{await audio.current?.enable();muted.current=false;setSound(true);setAudioError('');audio.current?.cue(330)}
  catch{setAudioError('El audio no pudo activarse. Puedes continuar con subtítulos.')}
 }
 function finishIntro(){
  if(finished.current)return;
  if(loadTimer.current)clearTimeout(loadTimer.current);clip.current?.pause();finished.current=true;playing.current=false;setEnded(true);
  timeline.current?.kill();setPhase('file');busy.current=false;
  audio.current?.cue(660);say('Un archivo sigue esperando. Tócalo para abrirlo.');
 }
 function start(){
  if(busy.current||finished.current)return;busy.current=true;setPhase('boot');track('monitor_power_on');
  say('');audio.current?.cue(100,1.5);
  if(reduced||mediaFailed||clip.current?.error||clip.current?.networkState===3){finishIntro();return}
  playing.current=true;
  loadTimer.current=setTimeout(()=>{if(!finished.current&&clip.current&&clip.current.currentTime===0){setMediaFailed(true);finishIntro()}},4000);
  void clip.current?.play().catch(()=>{setMediaFailed(true);finishIntro()});
 }
 function open(){
  if(busy.current||phase!=='file')return;busy.current=true;setPhase('travel');track('file_opened');setSubtitle('');
  timeline.current?.kill();
  gsap.to(root.current?.querySelector('.real-monitor')||[],{opacity:0,duration:reduced?0:.3});
  if(reduced){arrive(true);return}
  diveActive.current=true;armDiveTimeout();
  void dive.current?.play().catch(diveFailed);
 }
 useEffect(()=>{if(phase==='file')root.current?.querySelector<HTMLButtonElement>('.mystery-file')?.focus({preventScroll:true});if(phase==='nexo')root.current?.querySelector<HTMLElement>('.nexo-arrival')?.focus({preventScroll:true})},[phase]);
 return <main ref={root} className="opening" data-phase={phase} data-reduced={reduced}>
  <header className="film-controls"><Link href="/oferta">VER PRODUCTO ↗</Link><Link href="/demostracion">VER DEMO</Link><div><button onClick={toggleSound} aria-pressed={sound}>{sound?'SONIDO ON':'SONIDO OFF'}</button></div></header>
  <div className="file-response" aria-hidden="true"/>
  <div className="camera" aria-hidden={phase==='nexo'}>
   <div className="cinema-backdrop" aria-hidden="true"/>
   <div className="cinema-plane">
    {/* The decoded still remains under the video; both share exactly one geometry. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className="cinema-still" src={phase==='idle'?selectedMedia.poster:selectedMedia.idle} alt="" onLoad={e=>{const img=e.currentTarget;void img.decode().then(()=>setStillReady(true)).catch(()=>setStillReady(true))}} onError={()=>setAudioError('No se pudo cargar el fotograma de espera. Conservamos el último fotograma del video.')} />
    {media&&<video className="cinema-intro" ref={clip} muted playsInline preload="metadata" poster={selectedMedia.poster} style={{opacity:(ended&&stillReady)||reduced||mediaFailed?0:1}} onEnded={finishIntro} onTimeUpdate={()=>{if(clip.current&&clip.current.currentTime>=2.8&&!secondLine.current){secondLine.current=true;say('')}}} onError={()=>{setMediaFailed(true);if(playing.current)finishIntro()}}>
     <source src={selectedMedia.mp4} type="video/mp4" onError={()=>{setMediaFailed(true);if(playing.current)finishIntro()}}/>
    </video>}
    <div className="desk-reflection" aria-hidden="true"/><div className="real-monitor"><div className="boot-scan" aria-hidden="true"/>
    {(phase==='file'||phase==='travel')&&<><div className="screen-notification"><i/> SEÑAL RECUPERADA <span>1 archivo pendiente</span></div><button className="mystery-file" aria-label="Abrir archivo IDEA 001" disabled={phase!=='file'} onClick={open}><svg viewBox="0 0 100 76" aria-hidden="true"><path d="M4 14h34l10 10h48v48H4z"/><path d="M4 25h92"/></svg><span>IDEA_001</span><small>TOCA PARA RECUPERAR</small></button></>}
    </div>
   </div>
  </div>
  <SystemBoot active={phase==='boot'||phase==='file'} sound={sound} onSpeaking={duck}/>
  {/* Remains mounted after ended so the final decoded frame never disappears. */}
  <div className="dive-layer" aria-hidden="true" style={{opacity:diveVisible||diveFallback?1:0}}>
   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img src="/media/nexo-dive-last.webp" alt="" className="dive-still" />
   <video ref={dive} className="dive-video" muted playsInline preload={phase==='idle'?'none':'auto'} style={{opacity:diveFallback?0:1}}
    onPlaying={()=>{if(diveActive.current)setDiveVisible(true)}}
    onTimeUpdate={()=>{if(diveActive.current)armDiveTimeout()}}
    onWaiting={armDiveTimeout} onEnded={()=>arrive()} onError={diveFailed}>
    <source src="/media/nexo-camera-dive.mp4" type="video/mp4" onError={diveFailed}/>
   </video>
  </div>
  {phase==='idle'&&<div className="opening-title"><p>CREADOR IA STUDIO PRESENTA</p><h1>EL ARCHIVO <span>001</span></h1><button className="power-switch" onClick={start} aria-label="Encender computadora" disabled={!media}><span>⏻</span> ENCENDER</button><small>Videos 2D y 3D con IA · Herramienta descargable<br/>Una ficción interactiva · No accedemos a tus archivos</small></div>}
  <section className="nexo-arrival" tabIndex={-1} aria-label="Conexión con NEXO" hidden={phase!=='nexo'}><h2>NEXO</h2><NexoDialogue sound={sound} active={phase==='nexo'} onEnable={enableVoiceSound} onSpeaking={duck}/></section>
  <div className="film-grain" aria-hidden="true"/>
  <footer className="film-footer"><p className="film-subtitle" aria-live="polite">{subtitle}</p>{audioError&&<p role="status">{audioError}</p>}<div><span>01 / EL ARCHIVO PERDIDO</span><span>PROTOTIPO AUDIOVISUAL{reduced?' · MOVIMIENTO REDUCIDO':''}</span></div></footer>
 </main>
}
