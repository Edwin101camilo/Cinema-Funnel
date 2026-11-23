import {defineConfig,devices} from '@playwright/test';
export default defineConfig({
 testDir:'./tests/browser',testMatch:'v2.spec.ts',use:{baseURL:'http://localhost:3001'},
 webServer:{command:'npm run start -- --port 3001',url:'http://localhost:3001',reuseExistingServer:true},
 projects:[{name:'v2-chromium',use:{browserName:'chromium',viewport:{width:390,height:844},isMobile:true,hasTouch:true}},{name:'v2-webkit',use:{...devices['iPhone 13'],browserName:'webkit'}}]
});
