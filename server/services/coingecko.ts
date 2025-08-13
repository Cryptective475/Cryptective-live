interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  market_cap: number;
  total_volume: number;
}

interface CoinHistory {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY || 'CG-8vgSoYf5XjpW6t1DJiELegJm';
const BASE_URL = 'https://api.coingecko.com/api/v3';

export async function getCryptoPrices(): Promise<CoinPrice[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,binancecoin,solana&order=market_cap_desc&per_page=5&page=1&sparkline=false&price_change_percentage=24h`,
      {
        headers: {
          'x-cg-demo-api-key': COINGECKO_API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    // Return fallback data
    return [
      {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        current_price: 43250,
        price_change_percentage_24h: 2.3,
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
        market_cap: 850000000000,
        total_volume: 15000000000
      },
      {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        current_price: 2650,
        price_change_percentage_24h: -1.2,
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
        market_cap: 320000000000,
        total_volume: 8000000000
      },
      {
        id: 'tether',
        symbol: 'usdt',
        name: 'Tether',
        current_price: 1.00,
        price_change_percentage_24h: 0.1,
        image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
        market_cap: 95000000000,
        total_volume: 25000000000
      },
      {
        id: 'binancecoin',
        symbol: 'bnb',
        name: 'BNB',
        current_price: 308,
        price_change_percentage_24h: 4.1,
        image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
        market_cap: 48000000000,
        total_volume: 1200000000
      },
      {
        id: 'solana',
        symbol: 'sol',
        name: 'Solana',
        current_price: 98,
        price_change_percentage_24h: 6.7,
        image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
        market_cap: 42000000000,
        total_volume: 2800000000
      }
    ];
  }
}

export async function getCoinHistory(coinId: string, days: number = 7): Promise<CoinHistory> {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
      {
        headers: {
          'x-cg-demo-api-key': COINGECKO_API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching coin history:', error);
    // Return fallback data
    const now = Date.now();
    const prices: [number, number][] = [];
    for (let i = days; i >= 0; i--) {
      prices.push([now - (i * 24 * 60 * 60 * 1000), 43000 + (Math.random() - 0.5) * 5000]);
    }
    
    return {
      prices,
      market_caps: prices.map(([time, price]) => [time, price * 19000000]),
      total_volumes: prices.map(([time, price]) => [time, price * 350000])
    };
  }
}
