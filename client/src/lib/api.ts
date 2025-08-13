import { apiRequest } from "./queryClient";

export interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  market_cap: number;
  total_volume: number;
}

export interface CoinHistory {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface BlogArticle {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  imageUrl?: string;
}

export interface WalletAddresses {
  btc: string;
  eth: string;
  usdt_erc20: string;
  usdt_trc20: string;
  usdc: string;
  sol: string;
  bnb: string;
}

// Auth API
export async function signup(userData: any) {
  const response = await apiRequest("POST", "/api/auth/signup", userData);
  return response.json();
}

export async function login(credentials: any) {
  const response = await apiRequest("POST", "/api/auth/login", credentials);
  return response.json();
}

// Investment API
export async function submitInvestmentApplication(data: FormData) {
  const response = await fetch("/api/investment", {
    method: "POST",
    body: data,
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error(`${response.status}: ${await response.text()}`);
  }
  
  return response.json();
}

// Recovery API
export async function submitRecoveryRequest(data: FormData) {
  const response = await fetch("/api/recovery", {
    method: "POST",
    body: data,
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error(`${response.status}: ${await response.text()}`);
  }
  
  return response.json();
}

// Contact API
export async function submitContactMessage(data: any) {
  const response = await apiRequest("POST", "/api/contact", data);
  return response.json();
}

// Crypto API
export async function getCryptoPrices(): Promise<CryptoPrice[]> {
  const response = await fetch("/api/crypto/prices");
  if (!response.ok) {
    throw new Error(`${response.status}: ${await response.text()}`);
  }
  return response.json();
}

export async function getCoinHistory(coinId: string, days: number = 7): Promise<CoinHistory> {
  const response = await fetch(`/api/crypto/history/${coinId}?days=${days}`);
  if (!response.ok) {
    throw new Error(`${response.status}: ${await response.text()}`);
  }
  return response.json();
}

// Blog API
export async function getBlogArticles(): Promise<BlogArticle[]> {
  const response = await fetch("/api/blog");
  if (!response.ok) {
    throw new Error(`${response.status}: ${await response.text()}`);
  }
  return response.json();
}

// Wallet API
export async function getWalletAddresses(): Promise<WalletAddresses> {
  const response = await fetch("/api/wallets");
  if (!response.ok) {
    throw new Error(`${response.status}: ${await response.text()}`);
  }
  return response.json();
}
