import {defineConfig} from '@playwright/test';
import base from './playwright.config';
export default defineConfig({...base,use:{baseURL:'http://localhost:3001'},webServer:{command:'npm run start -- --port 3001',url:'http://localhost:3001',reuseExistingServer:true}});
