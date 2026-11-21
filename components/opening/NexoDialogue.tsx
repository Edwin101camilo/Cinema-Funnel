'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {nexoVoice} from '@/config/nexoVoice';
export default function NexoDialogue({sound,active,onEnable,onSpeaking}:{sound:boolean;active:boolean;onEnable:()=>void;onSpeaking:(v:boolean)=>void}){
 const audio=useRef<HTMLAudioElement>(null),frame=useRef(0),finishTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const [time,setTime]=useState(0),[error,setError]=useState(''),[playing,setPlaying]=useState(false),[silent,setSilent]=useState(false),[done,setDone]=useState(false);
 const clock=useRef(0),last=useRef(0);
 function finish(){setPlaying(false);setSilent(false);onSpeaking(false);if(finishTimer.current)clearTimeout(finishTimer.current);finishTimer.current=setTimeout(()=>setDone(true),650)}
 function play(){
  if(!audio.current)return;
  setError('');setSilent(false);setDone(false);
  if(audio.current.ended)audio.current.currentTime=0;
  void audio.current.play().catch(()=>{setPlaying(false);onSpeaking(false);setError('Pulsa Reproducir voz para escuchar a NEXO.')});
 }
 useEffect(()=>{if(active&&sound)play();else if(!sound)audio.current?.pause()},[active,sound]); // Safari may reject: explicit play control stays available.
 useEffect(()=>{
  if(!active)return;
  const tick=(now:number)=>{
   if(!document.hidden){
    if(silent){clock.current+=last.current?Math.min(now-last.current,100):0;setTime(clock.current/1000);if(clock.current>=nexoVoice.duration*1000){finish();return}}
    else if(audio.current&&!audio.current.paused)setTime(audio.current.currentTime);
   }
   last.current=now;frame.current=requestAnimationFrame(tick);
  };
  last.current=0;frame.current=requestAnimationFrame(tick);
  return()=>cancelAnimationFrame(frame.current);
 },[active,silent]);
 useEffect(()=>{const pause=()=>{if(document.hidden){audio.current?.pause();last.current=0}};document.addEventListener('visibilitychange',pause);return()=>{document.removeEventListener('visibilitychange',pause);audio.current?.pause();cancelAnimationFrame(frame.current);if(finishTimer.current)clearTimeout(finishTimer.current);onSpeaking(false)}},[onSpeaking]);
 const cue=nexoVoice.cues.find(c=>time>=c.start&&time<c.end);
 return <div className="nexo-dialogue" data-speaking={playing}>
  <div className="transmission-wave" aria-hidden="true">{[0,1,2,3,4,5,6,7,8].map(i=><i key={i} style={{animationDelay:(i%4)*-.17+'s'}}/>)}</div>
  <p className="transmission-label">NEXO · SEÑAL RECIBIDA</p>
  <div className="nexo-caption" aria-live="polite" aria-atomic="true">{cue?.text||'\u00a0'}</div>
  <audio ref={audio} src={nexoVoice.src} preload="auto" onPlaying={()=>{setPlaying(true);onSpeaking(true)}} onPause={()=>{setPlaying(false);onSpeaking(false)}} onEnded={finish} onError={()=>{setPlaying(false);onSpeaking(false);setError('No se pudo cargar la voz. Puedes continuar sin sonido.')}}/>
  {error&&<p className="voice-error" role="status">{error}</p>}
  {!playing&&!silent&&!done&&<div className="voice-actions"><button className="textbtn" onClick={()=>{if(!sound)onEnable();play()}}>Reproducir voz</button><button className="textbtn" onClick={()=>{audio.current?.pause();setError('');clock.current=0;setTime(0);setSilent(true)}}>Leer sin sonido</button></div>}
  {playing&&<button className="textbtn" onClick={()=>audio.current?.pause()}>Pausar voz</button>}
  {done&&<Link className="nexo-continue" href="/experiencia">Continuar →</Link>}
 </div>
}
