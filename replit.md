# Cryptective - Professional Cryptocurrency Recovery & Investment Platform

## Overview

Cryptective is a comprehensive cryptocurrency recovery and investment platform that provides professional services for recovering lost crypto assets and managing cryptocurrency investments. The platform combines a React-based frontend with an Express.js backend, featuring real-time market data, secure payment processing, and multi-tier investment options.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS with Shadcn/ui component library for consistent design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state and React Hook Form for form state
- **Data Visualization**: Recharts for cryptocurrency price charts
- **Theme System**: Custom theme provider supporting 4 modes (Light, Dark, Night Black, Dim White)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: bcryptjs for password hashing with session-based auth
- **File Handling**: Multer for secure file uploads (receipts, evidence)
- **Email Service**: Nodemailer with Zoho SMTP for notifications

### Database Design
- **Primary Database**: PostgreSQL with Drizzle ORM
- **Schema Structure**:
  - Users table for authentication
  - Investment applications with tier-based structure
  - Recovery requests with case tracking
  - Contact messages for support
  - Blog posts for RSS feed aggregation

## Key Components

### Investment Tier System
Three-tier investment structure designed for different portfolio sizes:
- **Tier 1**: $100 - $10,000 (Basic portfolio management)
- **Tier 2**: $11,000 - $100,000 (Advanced strategies)
- **Tier 3**: $100,000+ (Premium personalized service)

Each tier includes:
- Cryptocurrency-only payment processing
- QR code generation for wallet addresses
- Form validation with file upload capabilities
- Automated email notifications to administrators

### Recovery Services
Professional cryptocurrency recovery system for:
- Scam victim assistance
- Hacked wallet recovery
- Lost private key recovery
- Technical failure assistance
- Fraud investigation support

Features comprehensive case tracking and evidence collection.

### Real-time Market Integration
- **API Provider**: CoinGecko API for live cryptocurrency prices
- **Update Frequency**: 30-second intervals for price data
- **Chart Functionality**: Historical price data with multiple timeframes
- **Supported Assets**: Bitcoin, Ethereum, USDT, BNB, Solana

### Payment Processing
Crypto-only payment system supporting:
- Bitcoin (BTC)
- Ethereum (ETH)
- USDT (ERC20 and TRC20)
- USD Coin (USDC)
- Solana (SOL)
- Binance Coin (BNB)

## Data Flow

### User Registration/Authentication Flow
1. User submits registration form with validation
2. Password hashed using bcryptjs
3. User data stored in PostgreSQL via Drizzle ORM
4. Session-based authentication for subsequent requests

### Investment Application Flow
1. User selects investment tier and completes form
2. Payment method selection with QR code generation
3. File upload for receipt verification
4. Form submission triggers email notifications
5. Application stored in database with "pending" status

### Recovery Request Flow
1. User submits detailed recovery request form
2. Evidence files uploaded and stored securely
3. Case created in database with tracking ID
4. Automated emails sent to support team
5. Status tracking throughout recovery process

### Blog/News Integration
1. RSS feeds fetched from trusted crypto news sources
2. XML parsing and data normalization
3. Content stored in database with source attribution
4. Real-time updates displayed on blog page

## External Dependencies

### APIs and Services
- **CoinGecko API**: Cryptocurrency price data and market information
- **Zoho SMTP**: Email service for notifications and communications
- **QR Server API**: QR code generation for cryptocurrency addresses

### RSS News Sources
- CoinTelegraph
- Decrypt
- CoinDesk
- Bitcoin Magazine

### Development Tools
- **Vite**: Build tool and development server
- **ESBuild**: Production bundling
- **Drizzle Kit**: Database migrations and schema management

## Deployment Strategy

### Build Process
- Frontend built using Vite with optimized production bundles
- Backend compiled using ESBuild for Node.js deployment
- Static assets served from dist/public directory

### Environment Configuration
- Database connection via DATABASE_URL environment variable
- SMTP credentials for email service
- CoinGecko API key for enhanced rate limits

### Production Considerations
- Responsive design optimized for mobile and desktop
- SSL/HTTPS required for production deployment
- File upload size limits (10MB) configured
- CORS and security headers properly configured

## Changelog

Changelog:
- June 28, 2025. Initial setup
- January 30, 2025. Fixed application issues: Clock import, logo integration, charts, blog fallback data
- January 30, 2025. Database setup in progress: Supabase integration configured, connection troubleshooting

## Database Configuration

**Current Status**: Memory storage (temporary)
**Target**: Supabase PostgreSQL database
- URL: https://fasntsksesoxoiezbraw.supabase.co
- Tables: users, investment_applications, recovery_requests, contact_messages, blog_posts
- Connection: Using @neondatabase/serverless with Drizzle ORM

**Note**: Currently using memory storage while resolving Supabase connection issue (hostname resolution). All form submissions are temporarily stored in memory until database connection is established.

## Deployment Preparation

**Target Domain**: Cryptective.xyz
**Status**: Ready for deployment once database connection is established
**Features Complete**: 
- User authentication system
- Investment application forms (3 tiers)
- Recovery request system  
- Contact forms
- Live crypto pricing
- Blog/news aggregation
- Custom logo integration
- Multi-theme support

## User Preferences

Preferred communication style: Simple, everyday language.