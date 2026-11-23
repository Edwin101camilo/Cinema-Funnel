import {test,expect} from '@playwright/test';
test('accept and reject, all chat branches, style, process and pending checkout',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/v2');
 await page.getByRole('button',{name:'Entrar en la historia de NEXO'}).click();
 await expect(page.getByText('LLAMADA SIMULADA · DENTRO DE ESTA WEB')).toBeVisible();
 await page.getByRole('button',{name:'Rechazar',exact:true}).click();
 await expect(page.getByText('Prefieres mensajes. Seguimos por aquí.')).toBeVisible();
 await page.getByRole('button',{name:'← Anterior',exact:true}).click();
 await page.getByRole('button',{name:'Contestar',exact:true}).click();
 await expect(page.getByText('Tu idea llegó. Vamos a descubrir cómo darle forma.')).toBeVisible();
 for(const label of ['No sé animar','Tengo poco tiempo','No sé qué herramientas usar']){
  await page.getByRole('button',{name:label,exact:true}).click();
  await expect(page.getByRole('button',{name:label,exact:true})).toHaveAttribute('aria-pressed','true');
 }
 await page.getByRole('button',{name:'Elegir mi estilo'}).click();
 await page.getByRole('button',{name:'3D Profundidad y volumen'}).click();
 await expect(page.getByText('Demostración real 3D',{exact:true})).toBeVisible();
 await page.reload();await expect(page.getByRole('button',{name:'3D Profundidad y volumen'})).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button',{name:'Cómo funciona →'}).click();
 await page.getByRole('button',{name:/02Claude Code o Codex|02 Claude Code o Codex/}).click();
 await expect(page.getByText('Trabaja mediante instrucciones en lenguaje natural.',{exact:false})).toBeVisible();
 await page.getByRole('button',{name:'Conocer el acceso'}).click();
 await expect(page.getByText('US$9.99',{exact:true})).toBeVisible();
 await expect(page.getByText('Checkout de Hotmart pendiente de configurar.')).toBeVisible();
 await expect(page.locator('summary')).toHaveCount(6);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 expect(errors).toEqual([]);
});
test('shortcuts, hash/back navigation, reduced motion and scene skipping',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/v2');
 await page.getByRole('button',{name:'VER DEMO',exact:true}).click();
 await expect(page).toHaveURL(/scene=4/);
 await page.goBack();await expect(page.getByRole('heading',{name:/Imagina el video/})).toBeVisible();
 await page.getByRole('button',{name:'VER PRODUCTO',exact:true}).click();
 await expect(page.getByText('US$9.99',{exact:true})).toBeVisible();
 await page.goto('/v2#scene=2');
 await page.getByRole('button',{name:'Saltar escena →'}).click();
 await expect(page.getByText('Chat narrativo simulado · Respuestas predefinidas')).toBeVisible();
});
test('voice gesture, global mute and navigation pause',async({page})=>{
 await page.goto('/v2#scene=3');
 const a=page.locator('audio');
 await expect(a).toHaveJSProperty('paused',true);
 await page.getByRole('button',{name:'Escuchar nota'}).click();
 await expect.poll(()=>a.evaluate((v:HTMLAudioElement)=>v.paused)).toBe(false);
 await page.getByRole('button',{name:'SONIDO ON',exact:true}).click();
 await expect(a).toHaveJSProperty('paused',true);
 await page.getByRole('button',{name:'Escuchar nota'}).click();
 await page.getByRole('button',{name:'VER DEMO',exact:true}).click();
 await expect(a).toHaveJSProperty('paused',true);
});
test('blocked audio does not block reply or checkout',async({page})=>{
 await page.addInitScript(()=>{HTMLMediaElement.prototype.play=function(){return Promise.reject(new DOMException('blocked','NotAllowedError'))}});
 await page.goto('/v2#scene=3');await page.getByRole('button',{name:'Escuchar nota'}).click();
 await expect(page.getByText('Pulsa Escuchar nota para autorizar el audio.')).toBeVisible();
 await page.getByRole('button',{name:'VER PRODUCTO',exact:true}).click();
 await expect(page.getByText('US$9.99',{exact:true})).toBeVisible();
});
test('local exit and scene events include UTM; no initial videos downloaded',async({page})=>{
 const videos:string[]=[];page.on('request',r=>{if(r.url().endsWith('.mp4'))videos.push(r.url())});
 await page.addInitScript(()=>{(window as any).v2events=[];window.addEventListener('cinema:v2',(e:any)=>(window as any).v2events.push(e.detail))});
 await page.goto('/v2?utm_source=tiktok');
 await page.getByRole('button',{name:'VER PRODUCTO',exact:true}).click();
 await page.evaluate(()=>dispatchEvent(new Event('pagehide')));
 expect(await page.evaluate(()=>(window as any).v2events.some((e:any)=>e.name==='exit_intent'&&e.params.scene===6&&e.utm.utm_source==='tiktok'))).toBeTruthy();
 expect(videos).toEqual([]);
});
test('touch controls and layout at compact iPhone width',async({page})=>{
 await page.setViewportSize({width:320,height:568});
 for(let i=1;i<=6;i++){await page.goto('/v2#scene='+i);await expect(page.locator('.v2-scene')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy()}
});
