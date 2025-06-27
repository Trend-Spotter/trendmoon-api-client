# CoinService

## Description
This service provides methods to interact with Coin-related endpoints of the Trendmoon API.

## Usage

```typescript
import { TrendmoonApiClient } from './api/TrendmoonApiClient.js';
import { CoinService } from './services/CoinService.js';

const apiClient = new TrendmoonApiClient();
const coinService = new CoinService(apiClient);
```

## Methods

The following methods are available in this service:

### `searchCoins(params?)`
Searches for coins using a single query field that searches both name and symbol.
Just like CoinGecko's search - type 'bitcoin', 'BTC', 'ethereum', 'ETH', etc.
Results are automatically ranked by relevance and market cap.

Examples:
- query="bitcoin" → finds Bitcoin, Bitcoin Cash, etc.
- query="BTC" → finds Bitcoin (highest market cap BTC)
- query="uni" → finds Uniswap and other UNI tokens
- query="MOON" → finds all MOON tokens sorted by market cap

Additional filters can be combined:
- chain: Filter by blockchain (e.g., ethereum, polygon)
- category: Filter by category (e.g., defi, gaming)
- contract_address: Find specific token by address
- group_username: Find by Telegram group
- sort_by: Sort by market_cap, fdv, name, symbol (default: market_cap)
- sort_order: Sort order asc or desc (default: desc)

#### Parameters
```typescript
export interface SearchCoinsParams {
  query?: string | null;
  category?: string | null;
  chain?: string | null;
  contract_address?: string | null;
  group_username?: string | null;
  page?: number;
  page_size?: number;
  sort_by?: string;
  sort_order?: string;
}
export type SearchCoinsResponse = Schema.Coin[];


// --- Endpoint: /coins/platforms ---
// GET /coins/platforms
// No specific parameters
export type GetPlatformsResponse = string[];


// --- Endpoint: /coins/details ---
```

#### Returns
```typescript
export type SearchCoinsResponse = Schema.Coin[];


// --- Endpoint: /coins/platforms ---
// GET /coins/platforms
// No specific parameters
export type GetPlatformsResponse = string[];


// --- Endpoint: /coins/details ---
// GET /coins/details

// Referenced Schema type:
export interface CoinPlatformDetail {
  decimal_place?: number | null;
  contract_address?: string | null;
}

export interface CoinLinks {
  homepage?: Array<string | null>;
  whitepaper?: string | null;
  blockchain_site?: Array<string | null>;
  official_forum_url?: Array<string | null>;
  chat_url?: Array<string | null>;
  announcement_url?: Array<string | null>;
  twitter_screen_name?: string | null;
  facebook_username?: string | null;
  telegram_channel_identifier?: string | null;
  subreddit_url?: string | null;
  repos_url?: Record<string, string[]>;
}

export interface CoinImage {
  thumb?: string | null;
  small?: string | null;
  large?: string | null;
}

export interface CoinCommunityData {
  twitter_followers?: number | null;
  telegram_channel_user_count?: number | null;
  reddit_subscribers?: number | null;
}
```

#### Example
```typescript
// Search for Bitcoin using query parameter
const bitcoinResults = await coinService.searchCoins({ query: 'bitcoin' });

// Search for ETH tokens sorted by market cap
const ethResults = await coinService.searchCoins({ 
  query: 'ETH', 
  sort_by: 'market_cap', 
  sort_order: 'desc' 
});

// Search within DeFi category with pagination
const defiResults = await coinService.searchCoins({ 
  category: 'Decentralized Finance (DeFi)', 
  page: 1, 
  page_size: 10 
});
```

### `getPlatforms()`
Interacts with the getPlatforms endpoint.

#### Returns
```typescript
export type GetPlatformsResponse = string[];


// --- Endpoint: /coins/details ---
// GET /coins/details
export interface GetCoinDetailsParams {
  contract_address?: string | null;
  symbol?: string | null;
  project_name?: string | null;
  coin_id?: string | null;
  telegram_channel?: string | null;
}
```

#### Example
```typescript
const result = await coinService.getPlatforms();
```

### `getCoinDetails(params?)`
Interacts with the getCoinDetails endpoint.

#### Parameters
```typescript
export interface GetCoinDetailsParams {
  contract_address?: string | null;
  symbol?: string | null;
  project_name?: string | null;
  coin_id?: string | null;
  telegram_channel?: string | null;
}
export type GetCoinDetailsResponse = Schema.Coin;


// --- Endpoint: /social/trend ---
// GET /social/trend
export interface GetSocialTrendParams {
  contract_address?: string | null;
  symbol?: string | null;
  project_name?: string | null;
  coin_id?: string | null;
  date_interval?: number;
  time_interval?: Schema.SocialTrendTimeIntervalEnum;
}
```

#### Returns
```typescript
export type GetCoinDetailsResponse = Schema.Coin;


// --- Endpoint: /social/trend ---
// GET /social/trend
export interface GetSocialTrendParams {
  contract_address?: string | null;
  symbol?: string | null;
  project_name?: string | null;
  coin_id?: string | null;
  date_interval?: number;

// Referenced Schema type:
export interface CoinPlatformDetail {
  decimal_place?: number | null;
  contract_address?: string | null;
}

export interface CoinLinks {
  homepage?: Array<string | null>;
  whitepaper?: string | null;
  blockchain_site?: Array<string | null>;
  official_forum_url?: Array<string | null>;
  chat_url?: Array<string | null>;
  announcement_url?: Array<string | null>;
  twitter_screen_name?: string | null;
  facebook_username?: string | null;
  telegram_channel_identifier?: string | null;
  subreddit_url?: string | null;
  repos_url?: Record<string, string[]>;
}

export interface CoinImage {
  thumb?: string | null;
  small?: string | null;
  large?: string | null;
}

export interface CoinCommunityData {
  twitter_followers?: number | null;
  telegram_channel_user_count?: number | null;
  reddit_subscribers?: number | null;
}
```

#### Example
```typescript
const result = await coinService.getCoinDetails(params?);
```

## Complete Example

```typescript
import { TrendmoonApiClient } from './api/TrendmoonApiClient.js';
import { CoinService } from './services/CoinService.js';

// Initialize the API client and service
const apiClient = new TrendmoonApiClient();
const coinService = new CoinService(apiClient);

// Example usage of the service
(async () => {
  try {
    // Search for Bitcoin by name
    const bitcoinResults = await coinService.searchCoins({ query: 'bitcoin' });
    console.log('Bitcoin search results:', bitcoinResults);

    // Search for tokens with "UNI" and sort by market cap
    const uniResults = await coinService.searchCoins({ 
      query: 'UNI', 
      sort_by: 'market_cap', 
      sort_order: 'desc',
      page_size: 5 
    });
    console.log('UNI token results:', uniResults);

    // Get all available platforms
    const platforms = await coinService.getPlatforms();
    console.log('Available platforms:', platforms);

    // Get coin details by ID
    const coinDetails = await coinService.getCoinDetails({ coin_id: 'ethereum' });
    console.log('Ethereum details:', coinDetails);
  } catch (error) {
    console.error('Error:', error);
  }
})();
```
