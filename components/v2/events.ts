import {captureAttribution,attribution} from '@/lib/analytics';
export function v2Event(name:string,params:Record<string,string|number>={}){
 if(typeof window==='undefined')return;
 captureAttribution();
 const detail={name,params,utm:attribution(),time:Date.now()};
 try{const events=JSON.parse(sessionStorage.getItem('cf_v2_events')||'[]');sessionStorage.setItem('cf_v2_events',JSON.stringify([...events.slice(-59),detail]))}catch{}
 window.dispatchEvent(new CustomEvent('cinema:v2',{detail}));
}
