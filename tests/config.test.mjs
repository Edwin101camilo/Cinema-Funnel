import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('four narrative scenes configured',()=>{const s=readFileSync('config/story.ts','utf8');for(const id of ['archivo','diagnostico','nexo','revelacion'])assert.ok(s.includes(`id:'${id}'`))});
test('checkout not hardcoded',()=>{const s=readFileSync('config/product.ts','utf8');assert.ok(s.includes('NEXT_PUBLIC_CHECKOUT_URL'))});
