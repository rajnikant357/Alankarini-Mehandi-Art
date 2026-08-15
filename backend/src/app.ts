import cors from 'cors';
import express from 'express';
import { getAllowedCorsOrigin } from './config/env.js';
import { contentRouter } from './routes/content.js';
import { healthRouter } from './routes/health.js';

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        const allowed = getAllowedCorsOrigin(origin);
        if (allowed) {
          return callback(null, allowed);
        }
        return callback(null, false);
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
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
