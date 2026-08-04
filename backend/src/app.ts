import express from 'express';
import { getAllowedCorsOrigin } from './config/env.js';
import { contentRouter } from './routes/content.js';
import { healthRouter } from './routes/health.js';

export function createApp() {
  const app = express();

  app.use((req, res, next) => {
    const requestOrigin = req.headers.origin;
    const allowedOrigin = getAllowedCorsOrigin(requestOrigin);

    if (allowedOrigin) {
      res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
      res.setHeader('Vary', 'Origin');
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
      return;
    }
    next();
  });
  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));

  app.get('/', (_req, res) => {
    res.json({
      ok: true,
      message: 'Alankarini backend is running',
    });
  });

  app.use('/api', healthRouter);
  app.use('/api', contentRouter);

  return app;
}
