import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import test from 'node:test';
import { createApp } from './app.js';

const webOrigin = 'http://localhost:5173';

async function withApp(run: (baseUrl: string) => Promise<void>): Promise<void> {
  const server = createServer(createApp({ webOrigin }));
  await new Promise<void>((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve());
  });

  const address = server.address();
  if (address === null || typeof address === 'string') {
    server.close();
    throw new Error('Test server did not bind to a TCP port');
  }

  try {
    await run(`http://127.0.0.1:${(address as AddressInfo).port}`);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

test('GET /api/health returns the documented envelope', async () => {
  await withApp(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/health`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type') ?? '', /^application\/json/);
    assert.deepEqual(await response.json(), { data: { status: 'ok' } });
    assert.equal(response.headers.get('x-powered-by'), null);
  });
});

test('CORS allows only the configured frontend origin', async () => {
  await withApp(async (baseUrl) => {
    const allowed = await fetch(`${baseUrl}/api/health`, {
      headers: { Origin: webOrigin },
    });
    assert.equal(allowed.status, 200);
    assert.equal(allowed.headers.get('access-control-allow-origin'), webOrigin);

    const rejected = await fetch(`${baseUrl}/api/health`, {
      headers: { Origin: 'http://evil.example' },
    });
    assert.equal(rejected.status, 200);
    assert.equal(rejected.headers.get('access-control-allow-origin'), null);
  });
});
