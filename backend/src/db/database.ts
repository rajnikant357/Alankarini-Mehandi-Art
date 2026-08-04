import { neon, NeonQueryFunction } from '@neondatabase/serverless';
import { getDatabaseUrl } from '../config/env.js';

export const sql: NeonQueryFunction<false, false> = neon(getDatabaseUrl());
