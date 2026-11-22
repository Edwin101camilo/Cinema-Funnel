import {test,expect} from '@playwright/test';
test('three branches, persistent diagnosis, reveal, demos and offer',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const [label,id,reply]of [
 ['No sé animar.','animation','No necesitas convertirte'],
 ['No tengo tiempo para crear videos.','time','Entonces necesitas un proceso'],
 ['No sé qué herramientas utilizar.','tools','El problema no siempre']
 ]){
  await page.goto('/descubrir');
  if(id==='animation')await page.getByRole('button',{name:'Elegir ahora'}).click();
  await page.getByRole('button',{name:new RegExp(label.replace('.',''))}).click();
  await expect(page.locator('.journey-caption')).toContainText(reply);
  expect(await page.evaluate(()=>sessionStorage.getItem('cf_diagnosis'))).toBe(id);
 }
 await page.reload();await expect(page.locator('.data-options .chosen')).toContainText('herramientas');
 await page.getByRole('button',{name:'DESCUBRIR EL SISTEMA'}).click();
 await expect(page.getByRole('heading',{name:/CREADOR/})).toBeVisible();
 await page.getByRole('link',{name:'EXPLORAR LA DEMOSTRACIÓN'}).click();
 for(const title of ['01 — El resultado','02 — Cómo funciona','03 — Variedad creativa']){
  await page.getByRole('button',{name:title,exact:true}).click();
  await expect(page.getByRole('heading',{name:'Demostración real pendiente'})).toBeVisible();
  expect(await page.locator('video').count()).toBe(0);
 }
 await page.getByRole('link',{name:'VER PRECIO Y ACCESO'}).click();
 await expect(page.getByText('US$9.99',{exact:true})).toBeVisible();
 await expect(page.getByText('CHECKOUT PENDIENTE DE CONFIGURAR')).toBeVisible();
 expect(await page.locator('summary').count()).toBeGreaterThanOrEqual(6);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 expect(errors).toEqual([]);
});
test('NEXO 02 real audio ends in choices and can replay',async({page})=>{
 await page.goto('/descubrir');
 await page.getByRole('button',{name:'Escuchar NEXO'}).click();
 await expect(page.locator('audio')).toHaveJSProperty('paused',false);
 await expect(page.locator('.journey-caption')).toContainText('He revisado');
 await expect(page.locator('.data-options')).toBeVisible({timeout:16000});
 await page.getByRole('button',{name:/Repetir diálogo|Escuchar NEXO/}).click();
 await expect.poll(()=>page.locator('audio').evaluate((a:HTMLAudioElement)=>a.currentTime)).toBeLessThan(3);
});
test('audio failure permits immediate completion',async({page})=>{
 await page.route('**/nexo-02.mp3',r=>r.abort());
 await page.goto('/descubrir');
 await page.getByRole('button',{name:'Escuchar NEXO'}).click();
 await page.getByRole('button',{name:'Elegir ahora'}).click();
 await expect(page.locator('.data-options button')).toHaveCount(3);
});
test('local analytics and UTM persist without third-party services',async({page})=>{
 await page.addInitScript(()=>{(window as any).events=[];window.addEventListener('cinema:analytics',(e:any)=>(window as any).events.push(e.detail))});
 await page.goto('/descubrir?utm_source=tiktok&utm_campaign=archivo001');
 await page.getByRole('button',{name:'Elegir ahora'}).click();
 await page.getByRole('button',{name:/No sé animar/}).click();
 expect(await page.evaluate(()=>(window as any).events.find((e:any)=>e.name==='diagnosis_selected').utm.utm_source)).toBe('tiktok');
 await page.goto('/oferta');
 expect(await page.evaluate(()=>(window as any).events.find((e:any)=>e.name==='offer_viewed').utm.utm_campaign)).toBe('archivo001');
});
