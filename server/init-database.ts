import { db } from './db';
import { sql } from 'drizzle-orm';

export async function initializeDatabase() {
  try {
    console.log('Initializing database tables...');

    // Create users table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create investment_applications table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS investment_applications (
        id SERIAL PRIMARY KEY,
        tier VARCHAR(10) NOT NULL,
        email VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        preferred_contact VARCHAR(20) NOT NULL,
        amount VARCHAR(50) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        receipt_url TEXT,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create recovery_requests table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS recovery_requests (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        loss_type VARCHAR(100) NOT NULL,
        estimated_loss VARCHAR(50) NOT NULL,
        crypto_type VARCHAR(50),
        incident_date DATE,
        description TEXT NOT NULL,
        evidence_urls JSONB,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create contact_messages table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        phone VARCHAR(50),
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create blog_posts table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        source VARCHAR(255) NOT NULL,
        title TEXT NOT NULL,
        content TEXT,
        excerpt TEXT,
        image_url TEXT,
        source_url TEXT NOT NULL,
        published_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    // Fall back to memory storage if database fails
    console.log('Falling back to memory storage...');
  }
}