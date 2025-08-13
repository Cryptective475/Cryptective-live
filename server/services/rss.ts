import { parseString } from 'xml2js';

interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  imageUrl?: string;
}

const RSS_SOURCES = [
  {
    name: 'CoinTelegraph',
    url: 'https://cointelegraph.com/rss'
  },
  {
    name: 'Decrypt',
    url: 'https://decrypt.co/feed'
  },
  {
    name: 'CoinDesk',
    url: 'https://www.coindesk.com/arc/outboundfeeds/rss/'
  },
  {
    name: 'Bitcoin Magazine',
    url: 'https://bitcoinmagazine.com/.rss/full/'
  }
];

export async function fetchRSSFeed(url: string, sourceName: string): Promise<RSSItem[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`RSS fetch failed: ${response.status}`);
    }

    const xml = await response.text();
    
    return new Promise((resolve, reject) => {
      parseString(xml, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        try {
          const items = result.rss?.channel?.[0]?.item || result.feed?.entry || [];
          const parsedItems: RSSItem[] = items.slice(0, 10).map((item: any) => {
            // Handle different RSS formats
            const title = item.title?.[0]?._ || item.title?.[0] || '';
            const description = item.description?.[0] || item.summary?.[0] || '';
            const link = item.link?.[0]?.$ ? item.link[0].$.href : (item.link?.[0] || '');
            const pubDate = item.pubDate?.[0] || item.published?.[0] || '';
            
            // Extract image from description or media elements
            let imageUrl = '';
            if (item['media:thumbnail']) {
              imageUrl = item['media:thumbnail'][0].$.url;
            } else if (item.enclosure && item.enclosure[0].$.type?.startsWith('image/')) {
              imageUrl = item.enclosure[0].$.url;
            } else {
              // Try to extract image from description
              const imgMatch = description.match(/<img[^>]+src="([^"]+)"/i);
              if (imgMatch) {
                imageUrl = imgMatch[1];
              }
            }

            return {
              title: title.replace(/<[^>]*>/g, '').trim(),
              description: description.replace(/<[^>]*>/g, '').trim().substring(0, 200) + '...',
              link,
              pubDate,
              source: sourceName,
              imageUrl
            };
          });

          resolve(parsedItems);
        } catch (parseError) {
          reject(parseError);
        }
      });
    });
  } catch (error) {
    console.error(`Error fetching RSS from ${sourceName}:`, error);
    return [];
  }
}

export async function fetchAllRSSFeeds(): Promise<RSSItem[]> {
  try {
    const promises = RSS_SOURCES.map(source => 
      fetchRSSFeed(source.url, source.name)
    );

    const results = await Promise.allSettled(promises);
    const allItems: RSSItem[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        allItems.push(...result.value);
      } else {
        console.error(`Failed to fetch RSS from ${RSS_SOURCES[index].name}:`, result.reason);
      }
    });

    // Sort by publication date and return latest 20
    return allItems
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 20);
  } catch (error) {
    console.error('Error fetching RSS feeds:', error);
    return [];
  }
}
