import { eq, desc } from 'drizzle-orm';
import { db } from './db';
import { users, investmentApplications, recoveryRequests, contactMessages, blogPosts } from '@shared/schema';
import type { IStorage } from './storage';
import type { 
  User, 
  InsertUser, 
  InvestmentApplication, 
  InsertInvestmentApplication,
  RecoveryRequest,
  InsertRecoveryRequest,
  ContactMessage,
  InsertContactMessage,
  BlogPost,
  InsertBlogPost
} from '@shared/schema';

export class DatabaseStorage implements IStorage {
  
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  // Investment Applications
  async createInvestmentApplication(application: InsertInvestmentApplication): Promise<InvestmentApplication> {
    const result = await db.insert(investmentApplications).values({
      ...application,
      receiptUrl: application.receiptUrl || null
    }).returning();
    return result[0];
  }

  async getInvestmentApplications(limit = 50): Promise<InvestmentApplication[]> {
    return await db.select()
      .from(investmentApplications)
      .orderBy(desc(investmentApplications.createdAt))
      .limit(limit);
  }

  async updateInvestmentApplicationStatus(id: number, status: string): Promise<void> {
    await db.update(investmentApplications)
      .set({ status })
      .where(eq(investmentApplications.id, id));
  }

  // Recovery Requests
  async createRecoveryRequest(request: InsertRecoveryRequest): Promise<RecoveryRequest> {
    const result = await db.insert(recoveryRequests).values({
      ...request,
      phone: request.phone || null,
      cryptoType: request.cryptoType || null,
      incidentDate: request.incidentDate || null
    }).returning();
    return result[0];
  }

  async getRecoveryRequests(limit = 50): Promise<RecoveryRequest[]> {
    return await db.select()
      .from(recoveryRequests)
      .orderBy(desc(recoveryRequests.createdAt))
      .limit(limit);
  }

  async updateRecoveryRequestStatus(id: number, status: string): Promise<void> {
    await db.update(recoveryRequests)
      .set({ status })
      .where(eq(recoveryRequests.id, id));
  }

  // Contact Messages
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const result = await db.insert(contactMessages).values({
      ...message,
      phone: message.phone || null
    }).returning();
    return result[0];
  }

  async getContactMessages(limit = 50): Promise<ContactMessage[]> {
    return await db.select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt))
      .limit(limit);
  }

  async updateContactMessageStatus(id: number, status: string): Promise<void> {
    await db.update(contactMessages)
      .set({ status })
      .where(eq(contactMessages.id, id));
  }

  // Blog Posts
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const result = await db.insert(blogPosts).values({
      ...post,
      content: post.content || null,
      excerpt: post.excerpt || null,
      imageUrl: post.imageUrl || null
    }).returning();
    return result[0];
  }

  async getBlogPosts(limit = 20): Promise<BlogPost[]> {
    return await db.select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit);
  }

  async getBlogPostsBySource(source: string, limit = 20): Promise<BlogPost[]> {
    return await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.source, source))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit);
  }
}