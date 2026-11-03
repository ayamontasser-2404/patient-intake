import assert from 'node:assert/strict';
import test from 'node:test';
import { healthResponseSchema } from './health.js';

test('accepts the documented health envelope', () => {
  const parsed = healthResponseSchema.parse({ data: { status: 'ok' } });
  assert.deepEqual(parsed, { data: { status: 'ok' } });
});

test('rejects a status other than ok', () => {
  const result = healthResponseSchema.safeParse({ data: { status: 'down' } });
  assert.equal(result.success, false);
});

test('rejects a response without the data envelope', () => {
  const result = healthResponseSchema.safeParse({ status: 'ok' });
  assert.equal(result.success, false);
});

test('rejects an empty body', () => {
  const result = healthResponseSchema.safeParse({});
  assert.equal(result.success, false);
});

test('drops fields outside the health contract', () => {
  const parsed = healthResponseSchema.parse({
    data: { status: 'ok', detail: 'hidden' },
    environment: 'development',
  });
  assert.deepEqual(parsed, { data: { status: 'ok' } });
});
