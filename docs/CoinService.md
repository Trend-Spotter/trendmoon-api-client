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
Interacts with the searchCoins endpoint.

#### Parameters
```typescript
export interface SearchCoinsParams {
  name?: string | null;
  symbol?: string | null;
  category?: string | null;
  chain?: string | null;
  contract_address?: string | null;
  group_username?: string | null;
  page?: number;
  page_size?: number;
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
const result = await coinService.searchCoins(params?);
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
    // Use any method from the service
    const result = await coinService.someMethod();
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
})();
```
