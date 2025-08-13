const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY || 'CG-8vgSoYf5XjpW6t1DJiELegJm';

export interface CryptoPriceData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

export async function getCryptoPrices(): Promise<CryptoPriceData[]> {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,binancecoin,solana&order=market_cap_desc&per_page=5&page=1&sparkline=false',
      {
        headers: {
          'x-cg-demo-api-key': COINGECKO_API_KEY
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch crypto prices:', error);
    // Return fallback data
    return [
      {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        current_price: 43250,
        price_change_percentage_24h: 2.3,
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
      },
      {
        id: 'ethereum',
        symbol: 'eth', 
        name: 'Ethereum',
        current_price: 2650,
        price_change_percentage_24h: -1.2,
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
      },
      {
        id: 'tether',
        symbol: 'usdt',
        name: 'Tether',
        current_price: 1.00,
        price_change_percentage_24h: 0.1,
        image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png'
      },
      {
        id: 'binancecoin',
        symbol: 'bnb',
        name: 'BNB',
        current_price: 308,
        price_change_percentage_24h: 4.1,
        image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png'
      },
      {
        id: 'solana',
        symbol: 'sol',
        name: 'Solana',
        current_price: 98,
        price_change_percentage_24h: 6.7,
        image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png'
      }
    ];
  }
}

export async function getCryptoChart(coinId: string, days: number = 7) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
      {
        headers: {
          'x-cg-demo-api-key': COINGECKO_API_KEY
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch crypto chart:', error);
    return null;
  }
}
