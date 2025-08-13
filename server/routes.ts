import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInvestmentApplicationSchema, insertRecoveryRequestSchema, insertContactMessageSchema, insertUserSchema } from "@shared/schema";
import { sendInvestmentNotification, sendRecoveryNotification, sendContactNotification } from "./services/email";
import { getCryptoPrices, getCoinHistory } from "./services/coingecko";
import { fetchAllRSSFeeds } from "./services/rss";
import bcrypt from "bcryptjs";
import multer from "multer";

const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Auth routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });

      // Remove password from response
      const { password, ...userResponse } = user;
      res.json(userResponse);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data", error });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Remove password from response
      const { password: _, ...userResponse } = user;
      res.json(userResponse);
    } catch (error) {
      res.status(500).json({ message: "Login failed", error });
    }
  });

  // Investment applications
  app.post("/api/investment", upload.single('receipt'), async (req, res) => {
    try {
      const applicationData = insertInvestmentApplicationSchema.parse({
        ...req.body,
        receiptUrl: req.file?.path
      });
      
      const application = await storage.createInvestmentApplication(applicationData);
      
      // Send notification emails
      await sendInvestmentNotification(application);
      
      res.json(application);
    } catch (error) {
      res.status(400).json({ message: "Invalid application data", error });
    }
  });

  app.get("/api/investment", async (req, res) => {
    try {
      const applications = await storage.getInvestmentApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch applications", error });
    }
  });

  // Recovery requests
  app.post("/api/recovery", upload.array('evidence', 5), async (req, res) => {
    try {
      const evidenceUrls = req.files ? (req.files as Express.Multer.File[]).map(file => file.path) : [];
      
      const requestData = insertRecoveryRequestSchema.parse({
        ...req.body,
        evidenceUrls
      });
      
      const request = await storage.createRecoveryRequest(requestData);
      
      // Send notification emails
      await sendRecoveryNotification(request);
      
      res.json(request);
    } catch (error) {
      res.status(400).json({ message: "Invalid recovery request data", error });
    }
  });

  app.get("/api/recovery", async (req, res) => {
    try {
      const requests = await storage.getRecoveryRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recovery requests", error });
    }
  });

  // Contact messages
  app.post("/api/contact", async (req, res) => {
    try {
      // Simple anti-bot check
      const { mathCheck, honeypot, ...messageData } = req.body;
      
      if (honeypot) {
        return res.status(400).json({ message: "Bot detected" });
      }
      
      if (parseInt(mathCheck) !== 8) {
        return res.status(400).json({ message: "Security check failed" });
      }
      
      const validatedData = insertContactMessageSchema.parse(messageData);
      const message = await storage.createContactMessage(validatedData);
      
      // Send notification emails
      await sendContactNotification(message);
      
      res.json(message);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data", error });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact messages", error });
    }
  });

  // Crypto prices
  app.get("/api/crypto/prices", async (req, res) => {
    try {
      const prices = await getCryptoPrices();
      res.json(prices);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch crypto prices", error });
    }
  });

  app.get("/api/crypto/history/:coinId", async (req, res) => {
    try {
      const { coinId } = req.params;
      const { days = "7" } = req.query;
      const history = await getCoinHistory(coinId, parseInt(days as string));
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch coin history", error });
    }
  });

  // Blog/RSS feeds
  app.get("/api/blog", async (req, res) => {
    try {
      const articles = await fetchAllRSSFeeds();
      
      // If no articles were fetched, return fallback content
      if (!articles || articles.length === 0) {
        const fallbackArticles = [
          {
            title: "Emerging economies have sparked crypto adoption worldwide",
            description: "Analysis of cryptocurrency adoption trends in developing markets and their impact on global digital finance.",
            link: "https://cointelegraph.com/news/emerging-economies-crypto-adoption-worldwide",
            pubDate: new Date().toISOString(),
            source: "CoinTelegraph",
            imageUrl: "https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjQtMTAvZGI5NGY4NzItNjQ5Mi00ZGViLTgzYzItMzQyZDA1ZGU0MjhkLmpwZw==.jpg"
          },
          {
            title: "Bitcoin ETFs surge as institutional demand grows",
            description: "Major financial institutions increase Bitcoin ETF allocations amid growing institutional cryptocurrency adoption.",
            link: "https://decrypt.co/news/bitcoin-etfs-institutional-demand-surge",
            pubDate: new Date().toISOString(),
            source: "Decrypt"
          },
          {
            title: "DeFi protocols report record monthly volumes",
            description: "Decentralized finance platforms see significant growth in transaction volumes and total value locked.",
            link: "https://coindesk.com/markets/defi-protocols-record-volumes",
            pubDate: new Date().toISOString(),
            source: "CoinDesk"
          }
        ];
        res.json(fallbackArticles);
        return;
      }
      
      res.json(articles);
    } catch (error) {
      console.error('Blog API error:', error);
      res.status(500).json({ message: "Failed to fetch blog articles", error });
    }
  });

  // Wallet addresses for QR generation
  app.get("/api/wallets", (req, res) => {
    const wallets = {
      btc: 'bc1q64ddhqdhj6k9dsdxzp732vypysnrlqgtxnkz3r',
      eth: '0x187CF971622C9E47Cb587dbFd310Cc51288E273e',
      usdt_erc20: '0x187CF971622C9E47Cb587dbFd310Cc51288E273e',
      usdt_trc20: 'TK3VqoZz9ytane8mFQYZY2qkhEXpSFD1N8',
      usdc: '0x187CF971622C9E47Cb587dbFd310Cc51288E273e',
      sol: '5bNPoCXfv1HjBpd769arF4msVGgxjqEKB18ujZ8eZ1a4',
      bnb: '0x187CF971622C9E47Cb587dbFd310Cc51288E273e'
    };
    res.json(wallets);
  });

  const httpServer = createServer(app);
  return httpServer;
}
