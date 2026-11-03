import { healthResponseSchema } from '@spi/contracts';
import cors from 'cors';
import express, { type Express } from 'express';

export type AppConfig = {
  webOrigin: string;
};

export function createApp(config: AppConfig): Express {
  const app = express();

  app.disable('x-powered-by');
  app.use(express.json({ limit: '32kb' }));
  app.use(
    cors({
      origin(requestOrigin, callback) {
        if (requestOrigin === config.webOrigin) {
          callback(null, config.webOrigin);
          return;
        }
        callback(null, false);
      },
      methods: ['GET'],
      allowedHeaders: ['Content-Type'],
    }),
  );

  app.get('/api/health', (_req, res) => {
    const body = healthResponseSchema.parse({
      data: { status: 'ok' },
    });
    res.status(200).json(body);
  });

  return app;
}
