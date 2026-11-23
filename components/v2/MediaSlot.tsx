'use client';
import {useEffect,useRef,useState} from 'react';
import {v2Event} from './events';
type Media={src:string;poster:string;label:string;pending:string};
export default function MediaSlot({media,sound,onSound}:{media:Media;sound:boolean;onSound:(v:boolean)=>void}){
 const video=useRef<HTMLVideoElement>(null);
 const [loaded,setLoaded]=useState(false),[failed,setFailed]=useState(false),[blocked,setBlocked]=useState(false);
 const playRequested=useRef(false);
 function play(){onSound(true);setBlocked(false);playRequested.current=true;if(loaded){if(video.current){video.current.muted=false;void video.current.play().catch(()=>setBlocked(true))}}else setLoaded(true)}
 useEffect(()=>{if(!loaded)return;const v=video.current;if(v&&playRequested.current){v.muted=false;void v.play().catch(()=>setBlocked(true))}return()=>v?.pause()},[loaded]);
 useEffect(()=>{if(video.current)video.current.muted=!sound},[sound]);
 useEffect(()=>{const pause=()=>{if(document.hidden)video.current?.pause()};document.addEventListener('visibilitychange',pause);return()=>document.removeEventListener('visibilitychange',pause)},[]);
 return <div className="v2-media">
 {media.src&&!failed?<>{loaded?<video ref={video} src={media.src} poster={media.poster||undefined} controls playsInline preload="none" onPlay={()=>v2Event('demo_started',{demo:media.label})} onError={()=>setFailed(true)} onVolumeChange={()=>{if(video.current)onSound(!video.current.muted&&video.current.volume>0)}}/>:<div className="v2-video-cover">{media.poster&&<img src={media.poster} alt="Vista previa del video real"/>}<button className="v2-play" onClick={play}>▶ Reproducir con sonido</button></div>}
 <p className="v2-media-label">{sound?'Sonido activado':'Video silenciado — usa Sonido para activarlo'}</p>{blocked&&<button className="v2-plain" onClick={play}>Safari requiere otro toque: reproducir video</button>}</>:<div className="v2-media-missing"><span aria-hidden="true">▷</span><strong>{failed?'Video no disponible':media.label}</strong><p>{failed?'No se pudo cargar. Puedes avanzar o elegir otra demostración.':media.pending}</p><small>Material pendiente · No es una demostración del producto.</small></div>}
 </div>
}
