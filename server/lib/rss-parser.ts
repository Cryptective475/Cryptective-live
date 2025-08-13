import { XMLParser } from 'fast-xml-parser';

export interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
}

const RSS_FEEDS = [
  {
    url: 'https://cointelegraph.com/rss',
    name: 'CoinTelegraph'
  },
  {
    url: 'https://decrypt.co/feed',
    name: 'Decrypt'
  },
  {
    url: 'https://www.coindesk.com/arc/outboundfeeds/rss/',
    name: 'CoinDesk'
  },
  {
    url: 'https://bitcoinmagazine.com/.rss/full/',
    name: 'Bitcoin Magazine'
  }
];

export async function fetchRSSFeed(feedUrl: string, sourceName: string): Promise<RSSItem[]> {
  try {
    const response = await fetch(feedUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xmlData = await response.text();
    const parser = new XMLParser();
    const result = parser.parse(xmlData);
    
    const items = result.rss?.channel?.item || [];
    
    return items.slice(0, 10).map((item: any) => ({
      title: item.title || '',
      link: item.link || '',
      description: item.description || '',
      pubDate: item.pubDate || new Date().toISOString(),
      source: sourceName
    }));
  } catch (error) {
    console.error(`Failed to fetch RSS feed from ${sourceName}:`, error);
    return [];
  }
}

export async function fetchAllRSSFeeds(): Promise<RSSItem[]> {
  const allItems: RSSItem[] = [];
  
  for (const feed of RSS_FEEDS) {
    const items = await fetchRSSFeed(feed.url, feed.name);
    allItems.push(...items);
  }
  
  // Sort by publication date (newest first)
  return allItems.sort((a, b) => 
    new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
}
