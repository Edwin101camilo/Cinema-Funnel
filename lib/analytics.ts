type EventName = 'experience_start'|'scene_complete'|'demo_play'|'offer_view'|'checkout_click';
export function track(name:EventName, params:Record<string,string|number>={}) {
 if(typeof window==='undefined') return;
 // Analytics intentionally disabled until consent and provider integration are configured.
 if(process.env.NODE_ENV==='development') console.info('[Cinema Funnel]',name,params);
}
