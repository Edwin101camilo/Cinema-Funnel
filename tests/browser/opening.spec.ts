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
  await expect(page.getByRole('heading',{name:'NEXO',exact:true})).toBeVisible({timeout:15000});
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
 await expect(page.getByRole('heading',{name:'NEXO',exact:true})).toBeVisible({timeout:15000});
});
test('failed video falls back to interactive still',async({page})=>{
 await page.route('**/studio-intro-*.mp4',route=>route.abort());
 await page.goto('/');
 await page.getByRole('button',{name:'Encender computadora'}).click();
 await expect(page.getByRole('button',{name:'Abrir archivo IDEA 001'})).toBeVisible();
});

test('vertical mobile frame and touch target across iPhone sizes',async({page})=>{
 for(const viewport of [{width:320,height:568},{width:390,height:844},{width:430,height:932}]){
  await page.setViewportSize(viewport);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await page.getByRole('button',{name:'Encender computadora'}).click();
  const file=page.getByRole('button',{name:'Abrir archivo IDEA 001'});
  await expect(file).toBeVisible();
  const box=await file.boundingBox(),monitor=await page.locator('.real-monitor').boundingBox();
  expect(box!.width).toBeGreaterThanOrEqual(144);
  expect(box!.height).toBeGreaterThanOrEqual(112);
  expect(box!.y).toBeGreaterThanOrEqual(monitor!.y);
  expect(box!.y+box!.height).toBeLessThanOrEqual(monitor!.y+monitor!.height);
  await expect(page.locator('.cinema-intro')).toHaveAttribute('preload','metadata');
  await expect(page.locator('.cinema-intro source')).toHaveAttribute('src','/cinema/scene-01/studio-intro-mobile.mp4');
  const plane=await page.locator('.cinema-plane').boundingBox();
  expect(plane!.width/plane!.height).toBeCloseTo(512/910,2);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 }
});

test('dive playback holds last frame and presents unsynthesized dialogue',async({page})=>{
 await page.goto('/');
 await page.getByRole('button',{name:'Encender computadora'}).click();
 await page.getByRole('button',{name:'Abrir archivo IDEA 001'}).click({timeout:15000});
 const dive=page.locator('.dive-video');
 await expect(dive).toHaveJSProperty('muted',true);
 await expect(page.getByRole('button',{name:'Abrir archivo IDEA 001'})).toBeDisabled();
 await expect(page.getByRole('heading',{name:'NEXO',exact:true})).toBeVisible({timeout:15000});
 await expect(dive).toHaveJSProperty('ended',true);
 await expect(dive).toHaveCount(1);
 await expect(dive).toHaveCSS('opacity','1');
 await expect(page.getByText('Espera… ¿puedes escucharme?',{exact:true})).toBeVisible();
 await expect(page.getByText('Bien. Entonces el archivo llegó a la persona correcta.',{exact:true})).toBeVisible();
 await expect(page.locator('.nexo-dialogue audio')).toHaveCount(0);
});
test('dive failed download still reaches NEXO without black screen',async({page})=>{
 await page.route('**/nexo-camera-dive.mp4',route=>route.abort());
 await page.goto('/');
 await page.getByRole('button',{name:'Encender computadora'}).click();
 await page.getByRole('button',{name:'Abrir archivo IDEA 001'}).click({timeout:15000});
 await expect(page.getByRole('heading',{name:'NEXO',exact:true})).toBeVisible({timeout:15000});
 await expect(page.locator('.dive-still')).toHaveJSProperty('complete',true);
 await expect(page.locator('.dive-video')).toHaveCSS('opacity','0');
});
