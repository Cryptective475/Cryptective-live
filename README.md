# Cryptective - Professional Cryptocurrency Recovery & Investment Platform

A comprehensive cryptocurrency recovery and investment platform built with React, TypeScript, and Express.js. The platform provides professional services for cryptocurrency recovery, investment management, and secure trading solutions.

## 🚀 Features

### Core Services
- **Cryptocurrency Recovery**: Professional recovery services for lost crypto assets from scams, hacks, and technical failures
- **Investment Tiers**: Three-tier investment structure ($100-$10K, $11K-$100K, $100K+) with progressively enhanced services
- **Live Market Data**: Real-time cryptocurrency prices and charts powered by CoinGecko API
- **Secure Payments**: Multi-cryptocurrency payment support with QR code generation

### Platform Features
- **Multi-Theme Support**: 4 theme modes (Light, Dark, Night Black, Dim White) with localStorage persistence
- **Responsive Design**: Fully responsive interface optimized for mobile and desktop
- **Blog Integration**: RSS feed aggregation from trusted crypto news sources
- **User Authentication**: Secure login/signup system with password encryption
- **Email Notifications**: Automated email system using Zoho SMTP
- **Anti-Bot Protection**: Honeypot fields and math verification for contact forms

### Technical Features
- **Real-time Price Updates**: Live cryptocurrency price tracking with 30-second intervals
- **QR Code Generation**: Automatic QR code creation for wallet addresses
- **File Upload Support**: Secure file upload for receipts and evidence
- **Form Validation**: Comprehensive form validation using Zod schemas
- **API Integration**: RESTful API with proper error handling and validation

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **React Hook Form** with Zod validation
- **TanStack Query** for data fetching
- **Wouter** for routing
- **Recharts** for data visualization

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **Nodemailer** for email functionality
- **Multer** for file uploads
- **bcryptjs** for password hashing

### Database
- **PostgreSQL** (via Supabase or direct connection)
- **Drizzle ORM** for type-safe database operations

### External Services
- **CoinGecko API** for cryptocurrency data
- **Zoho SMTP** for email delivery
- **RSS Feed Parser** for blog content
- **QR Code Generation** for payment addresses

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cryptective
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in the required environment variables:
   - Database connection string
   - SMTP credentials for Zoho
   - CoinGecko API key
   - Admin email addresses

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## 🔧 Configuration

### Database Setup (Supabase)
1. Create a new project at [Supabase](https://supabase.com)
2. Go to Settings > Database and copy the connection string
3. Replace `[YOUR-PASSWORD]` with your database password
4. Add the connection string to your `.env` file as `DATABASE_URL`

### Email Configuration (Zoho)
1. Set up a Zoho Mail account for `support@cryptective.xyz`
2. Generate an app-specific password in Zoho Mail settings
3. Add the credentials to your `.env` file:
   ```
   SMTP_USER=support@cryptective.xyz
   SMTP_PASSWORD=your-app-password
   ```

### CoinGecko API
1. Get your API key from [CoinGecko](https://www.coingecko.com/en/api)
2. Add it to your `.env` file as `COINGECKO_API_KEY`

## 🚀 Deployment

### Build for Production
```bash
npm run build
