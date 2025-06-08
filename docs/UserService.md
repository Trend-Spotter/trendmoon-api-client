# UserService

## Description
This service provides methods to interact with User-related endpoints of the Trendmoon API.

## Usage

```typescript
import { TrendmoonApiClient } from './api/TrendmoonApiClient.js';
import { UserService } from './services/UserService.js';

const apiClient = new TrendmoonApiClient();
const userService = new UserService(apiClient);
```

## Methods

The following methods are available in this service:

### `searchUsers(params?)`
Interacts with the searchUsers endpoint.

#### Parameters
```typescript
export interface SearchUsersParams {
  username?: string | null;
  bot?: boolean | null;
  verified?: boolean | null;
  scam?: boolean | null;
  fake?: boolean | null;
  spammer?: boolean | null;
  from_?: number;
  size?: number;
}
export type SearchUsersResponse = Schema.User[];


// --- Endpoint: /users/{identifier} ---
// GET /users/{identifier}
export interface GetUserByIdentifierParams {
  identifier: string; // path parameter (user_id or username)
}
export type GetUserByIdentifierResponse = Schema.User;
```

#### Returns
```typescript
export type SearchUsersResponse = Schema.User[];


// --- Endpoint: /users/{identifier} ---
// GET /users/{identifier}
export interface GetUserByIdentifierParams {
  identifier: string; // path parameter (user_id or username)
}
export type GetUserByIdentifierResponse = Schema.User;

// Referenced Schema type:
export interface User {
  user_id: number;
  first_name?: string | null;
  last_name?: string | null;
  username?: string | null;
  bot?: boolean | null;
  verified?: boolean | null;
  scam?: boolean | null;
  fake?: boolean | null;
  spammer?: boolean | null;
  last_spam_check?: string | null; // date-time
}

export interface CategoryDominance {
  date?: string; // date-time, not marked as required in schema but typical for time series
  category_name: string;
  category_dominance: number;
  category_market_cap?: number; // Not marked as required, but usually present
  dominance_pct_change?: number | null;
  market_cap_pct_change?: number | null;
}

export type SocialTrendTimeIntervalEnum = "1h" | "1d";

export interface TrendDataPoint {
  date: string; // date-time
  hour_social_perc_diff?: number | null;
  day_social_perc_diff?: number | null;
  sentiment_score?: number | null;
  symbol_count?: number | null;
```

#### Example
```typescript
const result = await userService.searchUsers(params?);
```

### `getUserByIdentifier(params)`
Interacts with the getUserByIdentifier endpoint.

#### Parameters
```typescript
export interface GetUserByIdentifierParams {
  identifier: string; // path parameter (user_id or username)
}
export type GetUserByIdentifierResponse = Schema.User;


// --- Endpoint: /categories/dominance ---
// GET /categories/dominance
export interface GetCategoryDominanceForAssetsParams {
  category_name?: string[];
  duration?: number;
  from_?: number;
  size?: number;
}
export type GetCategoryDominanceForAssetsResponse = Schema.CategoryDominance[];


// --- Endpoint: /categories/all ---
// GET /categories/all
// No specific parameters
```

#### Returns
```typescript
export type GetUserByIdentifierResponse = Schema.User;


// --- Endpoint: /categories/dominance ---
// GET /categories/dominance
export interface GetCategoryDominanceForAssetsParams {
  category_name?: string[];
  duration?: number;
  from_?: number;
  size?: number;
}

// Referenced Schema type:
export interface User {
  user_id: number;
  first_name?: string | null;
  last_name?: string | null;
  username?: string | null;
  bot?: boolean | null;
  verified?: boolean | null;
  scam?: boolean | null;
  fake?: boolean | null;
  spammer?: boolean | null;
  last_spam_check?: string | null; // date-time
}

export interface CategoryDominance {
  date?: string; // date-time, not marked as required in schema but typical for time series
  category_name: string;
  category_dominance: number;
  category_market_cap?: number; // Not marked as required, but usually present
  dominance_pct_change?: number | null;
  market_cap_pct_change?: number | null;
}

export type SocialTrendTimeIntervalEnum = "1h" | "1d";

export interface TrendDataPoint {
  date: string; // date-time
  hour_social_perc_diff?: number | null;
  day_social_perc_diff?: number | null;
  sentiment_score?: number | null;
  symbol_count?: number | null;
```

#### Example
```typescript
const result = await userService.getUserByIdentifier(params);
```

## Complete Example

```typescript
import { TrendmoonApiClient } from './api/TrendmoonApiClient.js';
import { UserService } from './services/UserService.js';

// Initialize the API client and service
const apiClient = new TrendmoonApiClient();
const userService = new UserService(apiClient);

// Example usage of the service
(async () => {
  try {
    // Use any method from the service
    const result = await userService.someMethod();
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
})();
```
