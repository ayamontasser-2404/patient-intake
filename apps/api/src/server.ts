import { createApp } from './app.js';
import { loadRepoEnv, readServerConfig } from './env.js';

loadRepoEnv(import.meta.url);

const { port, webOrigin } = readServerConfig(process.env);
const app = createApp({ webOrigin });

app.listen(port, '127.0.0.1', () => {
  console.log(`API listening on http://127.0.0.1:${port}`);
});
