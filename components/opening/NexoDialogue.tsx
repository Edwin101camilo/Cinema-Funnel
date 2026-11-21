'use client';
import {useEffect,useRef,useState} from 'react';
import {nexoVoice} from '@/config/nexoVoice';
export default function NexoDialogue({sound}:{sound:boolean}){
 const audio=useRef<HTMLAudioElement>(null);
 const [time,setTime]=useState<number|null>(null),[error,setError]=useState('');
 useEffect(()=>{if(!sound)audio.current?.pause()},[sound]);
 useEffect(()=>{const pause=()=>{if(document.hidden)audio.current?.pause()};document.addEventListener('visibilitychange',pause);return()=>document.removeEventListener('visibilitychange',pause)},[]);
 const timed=nexoVoice.cues.every(c=>c.start!==null&&c.end!==null);
 return <div className="nexo-dialogue">
  <div aria-live="polite">{nexoVoice.cues.filter(c=>time===null||!timed||(time>=c.start!&&time<c.end!)).map(c=><p key={c.text}>{c.text}</p>)}</div>
  {nexoVoice.src&&<><audio ref={audio} src={nexoVoice.src} preload="none" onTimeUpdate={()=>setTime(audio.current?.currentTime??null)} onEnded={()=>setTime(null)} onError={()=>setError('La voz no está disponible. Puedes leer el diálogo.')}/><button className="textbtn" disabled={!sound} onClick={()=>{setError('');void audio.current?.play().catch(()=>setError('Pulsa de nuevo para escuchar la voz.'))}}>Escuchar diálogo</button></>}
  {error&&<p role="status">{error}</p>}
 </div>
}
