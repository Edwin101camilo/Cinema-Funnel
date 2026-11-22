type EventName='experience_start'|'monitor_power_on'|'file_opened'|'nexo_completed'|'diagnosis_selected'|'demo_started'|'offer_viewed'|'checkout_clicked'|'scene_complete'|'demo_play'|'offer_view'|'checkout_click';
const keys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term'];
export function captureAttribution(){
 if(typeof window==='undefined')return;
 try{const query=new URLSearchParams(location.search),data:Record<string,string>={};for(const k of keys){const v=query.get(k);if(v)data[k]=v.slice(0,150)}if(Object.keys(data).length)sessionStorage.setItem('cf_utm',JSON.stringify(data))}catch{}
}
export function attribution():Record<string,string>{try{return JSON.parse(sessionStorage.getItem('cf_utm')||'{}')}catch{return {}}}
export function trackedUrl(url:string){if(!url)return '';try{const u=new URL(url,location.origin);for(const [k,v]of Object.entries(attribution()))if(keys.includes(k)&&!u.searchParams.has(k))u.searchParams.set(k,v);return u.href}catch{return url}}
export function track(name:EventName,params:Record<string,string|number>={}){
 if(typeof window==='undefined')return;
 captureAttribution();
 // Local event adapter only. No external SDK, cookies or transmission.
 window.dispatchEvent(new CustomEvent('cinema:analytics',{detail:{name,params,utm:attribution()}}));
 if(process.env.NODE_ENV==='development')console.info('[Cinema Funnel]',name,params);
}
