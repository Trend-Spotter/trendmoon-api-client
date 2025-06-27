# CategoryService

## Description
This service provides methods to interact with Category-related endpoints of the Trendmoon API, focused on category data and dominance analysis.

## Usage

```typescript
import { TrendmoonApiClient } from './api/TrendmoonApiClient.js';
import { CategoryService } from './services/CategoryService.js';

const apiClient = new TrendmoonApiClient();
const categoryService = new CategoryService(apiClient);
```

## Methods

The following methods are available in this service:

### `getCategoryDominanceForAssets(params?)`
Get mindshare dominance and performance metrics for specified categories over time.

This endpoint allows you to track the market dominance of specific cryptocurrency categories (like 'Meme', 'AI', 'DeFi') over a given time period.

#### Parameters
```typescript
export interface GetCategoryDominanceForAssetsParams {
  category_name?: string[];
  duration?: number;
  from_?: number;
  size?: number;
}
```

#### Returns
```typescript
export type GetCategoryDominanceForAssetsResponse = Schema.CategoryDominance[];
```

#### Example
```typescript
// Get dominance data for Meme and DeFi categories over the last 30 days
const result = await categoryService.getCategoryDominanceForAssets({
  category_name: ['Meme', 'Decentralized Finance (DeFi)'],
  duration: 30,
  from_: 0,
  size: 100
});
```

### `getTopCategoriesDominance(params?)`
Get top categories by market performance for the last day with pagination support.

#### Parameters
```typescript
export interface GetTopCategoriesDominanceParams {
  from_?: number;
  size?: number;
  sort_by?: string;
  sort_order?: string;
}
```

- **from_**: Starting point for pagination (default: 0)
- **size**: Number of categories to return per page (default: 100)
- **sort_by**: Sorting criteria (default: 'category_market_cap')
  - 'category_market_cap': Sort by total market capitalization
  - 'category_mindshare_dominance': Sort by mindshare dominance percentage
  - 'market_cap_pct_change': Sort by percentage change in market cap
  - 'category_mindshare_pct_change': Sort by percentage change in mindshare dominance
- **sort_order**: Sort order - 'desc' for highest first, 'asc' for lowest first (default: 'desc')

#### Returns
```typescript
export type GetTopCategoriesDominanceResponse = Schema.CategoryDominanceResponse[];
```

#### Example
```typescript
// Get top 20 categories with highest market cap growth
const result = await categoryService.getTopCategoriesDominance({
  from_: 0,
  size: 20,
  sort_by: 'market_cap_pct_change',
  sort_order: 'desc'
});

// Get next 20 categories for pagination
const nextPage = await categoryService.getTopCategoriesDominance({
  from_: 20,
  size: 20,
  sort_by: 'category_market_cap',
  sort_order: 'desc'
});
```

### `getAllCategories()`
Get a list of all available cryptocurrency categories.

#### Returns
```typescript
export type GetAllCategoriesResponse = string[];
```

#### Example
```typescript
const categories = await categoryService.getAllCategories();
console.log('Available categories:', categories);
```

### `getTopAlertsToday()`
Interacts with the getTopAlertsToday endpoint.

#### Returns
```typescript
export type GetTopAlertsTodayResponse = Schema.TopAlertsResponse[];


// --- Endpoint: /get_top_categories_today ---
// GET /get_top_categories_today
// No specific parameters
export type GetTopCategoriesTodayResponse = Schema.TopCategoriesResponse[];


// --- Endpoint: /get_top_category_alerts ---
// GET /get_top_category_alerts

// Referenced Schema type:
export interface TopAlertsResponse { // This matches your example 'Alert'
  category: string;
  symbol: string;
  name: string;
  score: number;
  technical_indicator_score: number;
  social_indicator_score: number;
  day_trend: number; // "1_day_trend" in your example, but spec has "day_trend"
  day_perc_diff: number;
  social_mentions: number;
  mentions_ma: number;
  mentions_upper_band: number;
  price_momentum: number;
  price_pct_change: number;
  volume_pct_change?: number; // Added question mark as the line was cut off
}

// Missing interface for TopCategoriesResponse, added based on intuitive naming.
// If you have an OpenAPI/Swagger definition for this, please provide it.
export interface TopCategoriesResponse {
  category: string;
  // Add other properties if needed
  // score?: number;
  // some_other_property?: string;
}

// Interface for "Coin" objects inside categories (inherited or not)
export interface CategoryCoinItem {
  coin_id: string;
  name: string;
}

#### Example
```typescript
const result = await categoryService.getTopAlertsToday();
```

### `getTopCategoriesToday()`
Interacts with the getTopCategoriesToday endpoint.

#### Returns
```typescript
export type GetTopCategoriesTodayResponse = Schema.TopCategoriesResponse[];


// --- Endpoint: /get_top_category_alerts ---
// GET /get_top_category_alerts
// No specific parameters
export type GetTopCategoryAlertsResponse = Schema.TopAlertsResponse[];


// --- Endpoint: /get_category_coins_legacy ---
// GET /get_category_coins_legacy

// Referenced Schema type:
export interface TopCategoriesResponse {
  category: string;
  // Add other properties if needed
  // score?: number;
  // some_other_property?: string;
}

// Interface for "Coin" objects inside categories (inherited or not)
export interface CategoryCoinItem {
  coin_id: string;
  name: string;
  symbol: string;
  // Add other properties that category coin objects might have,
  // for example, market_cap, rank, etc.
  // market_cap?: number;
}

// Updated CategoryCoinLegacyResponse interface
export interface CategoryCoinLegacyResponse {
  category_name: string; // Category name
  coins: CategoryCoinItem[]; // Array of category coins (legacy)
}

// Updated CategoryCoinResponse interface
export interface CategoryCoinResponse {
  category_name: string; // Category name
  coins: CategoryCoinItem[]; // Array of category coins
}
```

#### Example
```typescript
const result = await categoryService.getTopCategoriesToday();
```

### `getTopCategoryAlerts()`
Interacts with the getTopCategoryAlerts endpoint.

#### Returns
```typescript
export type GetTopCategoryAlertsResponse = Schema.TopAlertsResponse[];


// --- Endpoint: /get_category_coins_legacy ---
// GET /get_category_coins_legacy
export interface GetCategoryCoinsLegacyParams {
  category_name: string; // required
  top_n?: number;
}
export type GetCategoryCoinsLegacyResponse = Schema.CategoryCoinLegacyResponse;

// Referenced Schema type:
export interface TopAlertsResponse { // This matches your example 'Alert'
  category: string;
  symbol: string;
  name: string;
  score: number;
  technical_indicator_score: number;
  social_indicator_score: number;
  day_trend: number; // "1_day_trend" in your example, but spec has "day_trend"
  day_perc_diff: number;
  social_mentions: number;
  mentions_ma: number;
  mentions_upper_band: number;
  price_momentum: number;
  price_pct_change: number;
  volume_pct_change?: number; // Added question mark as the line was cut off
}

// Missing interface for TopCategoriesResponse, added based on intuitive naming.
// If you have an OpenAPI/Swagger definition for this, please provide it.
export interface TopCategoriesResponse {
  category: string;
  // Add other properties if needed
  // score?: number;
  // some_other_property?: string;
}

// Interface for "Coin" objects inside categories (inherited or not)
export interface CategoryCoinItem {
  coin_id: string;
  name: string;
}

#### Example
```typescript
const result = await categoryService.getTopCategoryAlerts();
```

### `getCategoryCoinsLegacy(params)`
Interacts with the getCategoryCoinsLegacy endpoint.

#### Parameters
```typescript
export interface GetCategoryCoinsLegacyParams {
  category_name: string; // required
  top_n?: number;
}
export type GetCategoryCoinsLegacyResponse = Schema.CategoryCoinLegacyResponse;


// --- Endpoint: /get_category_coins ---
// GET /get_category_coins
export interface GetCategoryCoinsParams {
  category_name: string; // required
  top_n?: number;
}
export type GetCategoryCoinsResponse = Schema.CategoryCoinResponse;


// --- Endpoint: /status (different from /groups/status or /) ---
// GET /status
// No specific parameters
export interface GetGeneralStatusResponse {
}
```

#### Returns
```typescript
export type GetCategoryCoinsLegacyResponse = Schema.CategoryCoinLegacyResponse;


// --- Endpoint: /get_category_coins ---
// GET /get_category_coins
export interface GetCategoryCoinsParams {
  category_name: string; // required
  top_n?: number;
}
export type GetCategoryCoinsResponse = Schema.CategoryCoinResponse;

// Referenced Schema type:
export interface CategoryCoinLegacyResponse {
  category_name: string; // Category name
  coins: CategoryCoinItem[]; // Array of category coins (legacy)
}

// Updated CategoryCoinResponse interface
export interface CategoryCoinResponse {
  category_name: string; // Category name
  coins: CategoryCoinItem[]; // Array of category coins
}
```

#### Example
```typescript
const result = await categoryService.getCategoryCoinsLegacy(params);
```

### `getCategoryCoins(params)`
Interacts with the getCategoryCoins endpoint.

#### Parameters
```typescript
export interface GetCategoryCoinsParams {
  category_name: string; // required
  top_n?: number;
}
export type GetCategoryCoinsResponse = Schema.CategoryCoinResponse;


// --- Endpoint: /status (different from /groups/status or /) ---
// GET /status
// No specific parameters
export interface GetGeneralStatusResponse {
  // The schema is empty "{}", so we can use an empty object or a more descriptive one if known.
  // For now, let's assume it's like the root status.
  status?: string; // Or make it a more specific type if it always returns something.
  message?: string;
  [key: string]: any; // To allow for an empty object or other properties
}
```

#### Returns
```typescript
export type GetCategoryCoinsResponse = Schema.CategoryCoinResponse;


// --- Endpoint: /status (different from /groups/status or /) ---
// GET /status
// No specific parameters
export interface GetGeneralStatusResponse {
  // The schema is empty "{}", so we can use an empty object or a more descriptive one if known.
  // For now, let's assume it's like the root status.
  status?: string; // Or make it a more specific type if it always returns something.
  message?: string;

// Referenced Schema type:
export interface CategoryCoinResponse {
  category_name: string; // Category name
  coins: CategoryCoinItem[]; // Array of category coins
}
```

#### Example
```typescript
const result = await categoryService.getCategoryCoins(params);
```

## Complete Example

```typescript
import { TrendmoonApiClient } from './api/TrendmoonApiClient.js';
import { CategoryService } from './services/CategoryService.js';

// Initialize the API client and service
const apiClient = new TrendmoonApiClient();
const categoryService = new CategoryService(apiClient);

// Example usage of the service
(async () => {
  try {
    // Use any method from the service
    const result = await categoryService.someMethod();
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
})();
```
