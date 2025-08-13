import { users, investmentApplications, recoveryRequests, contactMessages, blogPosts, type User, type InsertUser, type InvestmentApplication, type InsertInvestmentApplication, type RecoveryRequest, type InsertRecoveryRequest, type ContactMessage, type InsertContactMessage, type BlogPost, type InsertBlogPost } from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Investment Applications
  createInvestmentApplication(application: InsertInvestmentApplication): Promise<InvestmentApplication>;
  getInvestmentApplications(limit?: number): Promise<InvestmentApplication[]>;
  updateInvestmentApplicationStatus(id: number, status: string): Promise<void>;

  // Recovery Requests
  createRecoveryRequest(request: InsertRecoveryRequest): Promise<RecoveryRequest>;
  getRecoveryRequests(limit?: number): Promise<RecoveryRequest[]>;
  updateRecoveryRequestStatus(id: number, status: string): Promise<void>;

  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(limit?: number): Promise<ContactMessage[]>;
  updateContactMessageStatus(id: number, status: string): Promise<void>;

  // Blog Posts
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPosts(limit?: number): Promise<BlogPost[]>;
  getBlogPostsBySource(source: string, limit?: number): Promise<BlogPost[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private investmentApplications: Map<number, InvestmentApplication>;
  private recoveryRequests: Map<number, RecoveryRequest>;
  private contactMessages: Map<number, ContactMessage>;
  private blogPosts: Map<number, BlogPost>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.investmentApplications = new Map();
    this.recoveryRequests = new Map();
    this.contactMessages = new Map();
    this.blogPosts = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async createInvestmentApplication(insertApplication: InsertInvestmentApplication): Promise<InvestmentApplication> {
    const id = this.currentId++;
    const application: InvestmentApplication = {
      ...insertApplication,
      id,
      status: "pending",
      createdAt: new Date()
    };
    this.investmentApplications.set(id, application);
    return application;
  }

  async getInvestmentApplications(limit = 50): Promise<InvestmentApplication[]> {
    return Array.from(this.investmentApplications.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async updateInvestmentApplicationStatus(id: number, status: string): Promise<void> {
    const application = this.investmentApplications.get(id);
    if (application) {
      application.status = status;
      this.investmentApplications.set(id, application);
    }
  }

  async createRecoveryRequest(insertRequest: InsertRecoveryRequest): Promise<RecoveryRequest> {
    const id = this.currentId++;
    const request: RecoveryRequest = {
      ...insertRequest,
      id,
      status: "pending",
      createdAt: new Date()
    };
    this.recoveryRequests.set(id, request);
    return request;
  }

  async getRecoveryRequests(limit = 50): Promise<RecoveryRequest[]> {
    return Array.from(this.recoveryRequests.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async updateRecoveryRequestStatus(id: number, status: string): Promise<void> {
    const request = this.recoveryRequests.get(id);
    if (request) {
      request.status = status;
      this.recoveryRequests.set(id, request);
    }
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentId++;
    const message: ContactMessage = {
      ...insertMessage,
      id,
      status: "unread",
      createdAt: new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(limit = 50): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async updateContactMessageStatus(id: number, status: string): Promise<void> {
    const message = this.contactMessages.get(id);
    if (message) {
      message.status = status;
      this.contactMessages.set(id, message);
    }
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentId++;
    const post: BlogPost = {
      ...insertPost,
      id,
      createdAt: new Date()
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async getBlogPosts(limit = 20): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, limit);
  }

  async getBlogPostsBySource(source: string, limit = 20): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.source === source)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, limit);
  }
}

import { DatabaseStorage } from './db-storage';

// Temporarily use memory storage while debugging database connection
// TODO: Switch to DatabaseStorage once Supabase connection is fixed
export const storage = new MemStorage();

// Uncomment this line once database connection is working:
// export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
