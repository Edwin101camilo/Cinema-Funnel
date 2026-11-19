import {test,expect} from '@playwright/test';
for(const reduced of [false,true]){
 test('opening with sound and NEXO; reduced='+reduced,async({page})=>{
  await page.emulateMedia({reducedMotion:reduced?'reduce':'no-preference'});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('button',{name:'SONIDO OFF',exact:true})).toHaveAttribute('aria-pressed','false');
  await page.getByRole('button',{name:'SONIDO OFF',exact:true}).click();
  await expect(page.getByRole('button',{name:'SONIDO ON',exact:true})).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button',{name:'Encender computadora'}).click();
  const file=page.getByRole('button',{name:'Abrir archivo IDEA 001'});
  await expect(file).toBeVisible({timeout:15000});
  await expect(file).toBeFocused();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  await file.click();
  await expect(page.getByRole('heading',{name:'NEXO',exact:true})).toBeVisible({timeout:7000});
  await page.getByRole('button',{name:'SONIDO ON',exact:true}).click();
  await expect(page.getByRole('button',{name:'SONIDO OFF',exact:true})).toHaveAttribute('aria-pressed','false');
  await expect(page.getByRole('link',{name:'VER PRODUCTO'})).toHaveAttribute('href','/oferta');
  expect(errors).toEqual([]);
 });
}
test('intro plays once, still matches geometry and remains interactive',async({page})=>{
 await page.goto('/');
 const video=page.locator('.cinema-intro');
 await expect(video).toHaveJSProperty('loop',false);
 await expect(video).toHaveJSProperty('muted',true);
 await page.getByRole('button',{name:'Encender computadora'}).click();
 await expect(page.getByRole('button',{name:'Abrir archivo IDEA 001'})).toBeVisible({timeout:12000});
 await expect(video).toHaveJSProperty('ended',true);
 await expect(page.locator('.cinema-still')).toHaveJSProperty('complete',true);
 const bounds=await video.boundingBox(),stillBounds=await page.locator('.cinema-still').boundingBox();
 expect(bounds).toEqual(stillBounds);
 await page.evaluate(()=>{document.dispatchEvent(new Event('visibilitychange'))});
 await page.waitForTimeout(700);
 await expect(video).toHaveJSProperty('ended',true);
 const file=await page.locator('.mystery-file').boundingBox(),monitor=await page.locator('.real-monitor').boundingBox();
 expect(file!.x).toBeGreaterThanOrEqual(monitor!.x);
 expect(file!.x+file!.width).toBeLessThanOrEqual(monitor!.x+monitor!.width);
 await page.getByRole('button',{name:'Abrir archivo IDEA 001'}).click();
 await expect(page.getByRole('heading',{name:'NEXO',exact:true})).toBeVisible({timeout:7000});
});
test('failed video falls back to interactive still',async({page})=>{
 await page.route('**/studio-intro-desktop.mp4',route=>route.abort());
 await page.goto('/');
 await page.getByRole('button',{name:'Encender computadora'}).click();
 await expect(page.getByRole('button',{name:'Abrir archivo IDEA 001'})).toBeVisible();
});
