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
