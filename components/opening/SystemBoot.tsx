'use client';
import {useEffect,useRef,useState} from 'react';
const cues=[{start:0,end:1.41,text:'Sistema restablecido'},{start:1.85,end:4.13,text:'Se ha detectado un archivo sin terminar'},{start:4.53,end:7.24,text:'Identificador: IDEA_001'}];
export default function SystemBoot({active,sound,onSpeaking}:{active:boolean;sound:boolean;onSpeaking:(v:boolean)=>void}){
 const audio=useRef<HTMLAudioElement>(null),panel=useRef<HTMLDivElement>(null),once=useRef(false),silentTime=useRef(0);
 const [time,setTime]=useState(0),[blocked,setBlocked]=useState(false);
 function play(){setBlocked(false);void audio.current?.play().catch(()=>setBlocked(true))}
 useEffect(()=>{
  if(!active){audio.current?.pause();return}
  if(!once.current){once.current=true;if(sound)play()}
 },[active,sound]);
 useEffect(()=>{if(!sound)audio.current?.pause()},[sound]);
 useEffect(()=>{
  if(!active)return;
  let frame=0,last=0;
  const tick=(now:number)=>{
   if(!document.hidden){
    silentTime.current+=last?Math.min(now-last,100)/1000:0;
    const t=audio.current&&!audio.current.paused?audio.current.currentTime:silentTime.current;
    setTime(Math.min(t,7.47));
    panel.current?.closest<HTMLElement>('.opening')?.style.setProperty('--boot-light',String(Math.min(t/5.8,1)*.22));
   }
   last=now;if(silentTime.current<8||!audio.current?.paused)frame=requestAnimationFrame(tick);
  };
  frame=requestAnimationFrame(tick);
  const hide=()=>{if(document.hidden)audio.current?.pause()};
  document.addEventListener('visibilitychange',hide);
  return()=>{cancelAnimationFrame(frame);document.removeEventListener('visibilitychange',hide)};
 },[active]);
 useEffect(()=>()=>{audio.current?.pause();onSpeaking(false)},[onSpeaking]);
 const cue=cues.find(c=>time>=c.start&&time<c.end);
 return <div ref={panel} className="system-boot" hidden={!active} data-stage={time<1.85?'power':time<4.53?'scan':'identified'}>
  <audio ref={audio} src="/audio/sistema/sistema-inicio.mp3" preload="metadata" onPlaying={()=>onSpeaking(true)} onPause={()=>onSpeaking(false)} onEnded={()=>onSpeaking(false)} onError={()=>setBlocked(true)}/>
  <div className="system-indicator" aria-hidden="true"><i/><span>{time<1.85?'SYS / ONLINE':time<4.53?'ARCHIVE / SCAN':'IDEA_001 / FOUND'}</span></div>
  <p className="system-caption" aria-live="polite">{cue?.text||'\u00a0'}</p>
  {sound&&blocked&&<button className="textbtn" onClick={play}>Reproducir SISTEMA</button>}
 </div>
}
