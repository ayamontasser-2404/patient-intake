import assert from 'node:assert/strict';
import test from 'node:test';
import { readServerConfig } from './env.js';

test('uses local defaults when port and origin are unset', () => {
  assert.deepEqual(readServerConfig({}), {
    port: 4000,
    webOrigin: 'http://localhost:5173',
  });
});

test('reads a numeric port and a specific origin', () => {
  assert.deepEqual(
    readServerConfig({
      PORT: '4100',
      WEB_ORIGIN: 'http://localhost:5173/',
    }),
    {
      port: 4100,
      webOrigin: 'http://localhost:5173',
    },
  );
});

test('rejects ports outside the valid range', () => {
  assert.throws(() => readServerConfig({ PORT: '0' }), /PORT must be an integer/);
  assert.throws(() => readServerConfig({ PORT: '65536' }), /PORT must be an integer/);
  assert.throws(() => readServerConfig({ PORT: 'abc' }), /PORT must be an integer/);
});

test('rejects wildcard and non-origin frontend values', () => {
  assert.throws(() => readServerConfig({ WEB_ORIGIN: '*' }), /one specific origin/);
  assert.throws(
    () => readServerConfig({ WEB_ORIGIN: 'localhost:5173' }),
    /absolute http or https URL/,
  );
  assert.throws(
    () => readServerConfig({ WEB_ORIGIN: 'http://localhost:5173/app' }),
    /without a path/,
  );
});
