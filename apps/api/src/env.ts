import { config as loadDotenv } from 'dotenv';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_PORT = 4000;
const DEFAULT_WEB_ORIGIN = 'http://localhost:5173';

export type ServerConfig = {
  port: number;
  webOrigin: string;
};

export function loadRepoEnv(moduleUrl: string): void {
  const moduleDirectory = fileURLToPath(new URL('.', moduleUrl));
  const repoRoot = resolve(moduleDirectory, '../../..');
  const result = loadDotenv({
    path: resolve(repoRoot, '.env'),
    quiet: true,
  });

  if (result.error && !isMissingFile(result.error)) {
    throw new Error('Could not read the repository .env file');
  }
}

export function readServerConfig(env: NodeJS.ProcessEnv): ServerConfig {
  return {
    port: readPort(env.PORT),
    webOrigin: readWebOrigin(env.WEB_ORIGIN),
  };
}

function readPort(value: string | undefined): number {
  if (value === undefined || value.trim() === '') {
    return DEFAULT_PORT;
  }

  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }

  return port;
}

function readWebOrigin(value: string | undefined): string {
  const origin = value === undefined || value.trim() === '' ? DEFAULT_WEB_ORIGIN : value.trim();

  if (origin === '*') {
    throw new Error('WEB_ORIGIN must be one specific origin');
  }

  if (!origin.startsWith('http://') && !origin.startsWith('https://')) {
    throw new Error('WEB_ORIGIN must be an absolute http or https URL');
  }

  let url: URL;
  try {
    url = new URL(origin);
  } catch {
    throw new Error('WEB_ORIGIN must be an absolute http or https URL');
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('WEB_ORIGIN must use http or https');
  }

  if (url.username !== '' || url.password !== '') {
    throw new Error('WEB_ORIGIN must not include credentials');
  }

  if (url.pathname !== '/' || url.search !== '' || url.hash !== '') {
    throw new Error('WEB_ORIGIN must be an origin without a path, query, or hash');
  }

  return url.origin;
}

function isMissingFile(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT';
}
