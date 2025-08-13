import { drizzle } from 'drizzle-orm/neon-serverless';
import { neon } from '@neondatabase/serverless';
import * as schema from '@shared/schema';

// Create Neon serverless connection - works better with Supabase
const sql = neon(process.env.DATABASE_URL!);

// Initialize Drizzle with Neon serverless
export const db = drizzle(sql, { schema });