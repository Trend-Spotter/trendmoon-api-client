# SocialService

## Description
This service provides methods to interact with Social-related endpoints of the Trendmoon API.

## Usage

```typescript
import { TrendmoonApiClient } from './api/TrendmoonApiClient.js';
import { SocialService } from './services/SocialService.js';

const apiClient = new TrendmoonApiClient();
const socialService = new SocialService(apiClient);
```

## Methods

The following methods are available in this service:

### `getSocialTrend(params?)`
Interacts with the getSocialTrend endpoint.

#### Parameters
```typescript
export interface GetSocialTrendParams {
  contract_address?: string | null;
  symbol?: string | null;
  project_name?: string | null;
  coin_id?: string | null;
  date_interval?: number;
  time_interval?: Schema.SocialTrendTimeIntervalEnum;
}
export type GetSocialTrendResponse = Schema.SocialTrendResponse;


// --- Endpoint: /social/keyword ---
// GET /social/keyword
export interface GetKeywordTrendParams {
  keyword?: string;
  duration?: number;
  time_interval?: Schema.KeywordTimeIntervalEnum; // Uses the broader enum
  match_mode?: Schema.MatchModeEnum;
}
export type GetKeywordTrendResponse = Schema.KeywordTrendResponse;
```

#### Returns
```typescript
export type GetSocialTrendResponse = Schema.SocialTrendResponse;


// --- Endpoint: /social/keyword ---
// GET /social/keyword
export interface GetKeywordTrendParams {
  keyword?: string;
  duration?: number;
  time_interval?: Schema.KeywordTimeIntervalEnum; // Uses the broader enum
  match_mode?: Schema.MatchModeEnum;
}

// Referenced Schema type:
export interface SocialTrendResponse {
  coin_id: string;
  name: string;
  symbol: string;
  contract_address?: string | null;
  market_cap_rank?: number | null;
  trend_market_data: TrendDataPoint[];
}

export type TimeIntervalEnum = "1h" | "4h" | "12h" | "1d"; // Note: spec has 3d, 1w for one endpoint, but this is the common one
export type KeywordTimeIntervalEnum = "1h" | "4h" | "12h" | "1d" | "3d" | "1w";


export type MatchModeEnum = "exact" | "any" | "all" | "fuzzy" | "partial";

export interface KeywordDataPoint {
  date: string; // ISO format
  count: number;
}

export interface KeywordTrendResponse {
  keyword: string;
  match_mode: string; // MatchModeEnum
  time_interval: string; // TimeIntervalEnum / KeywordTimeIntervalEnum
  duration: number;
  data: KeywordDataPoint[];
}

export interface ProjectSummary {
  coin_id: string;
```

#### Example
```typescript
const result = await socialService.getSocialTrend(params?);
```

### `getKeywordTrend(params?)`
Interacts with the getKeywordTrend endpoint.

#### Parameters
```typescript
export interface GetKeywordTrendParams {
  keyword?: string;
  duration?: number;
  time_interval?: Schema.KeywordTimeIntervalEnum; // Uses the broader enum
  match_mode?: Schema.MatchModeEnum;
}
export type GetKeywordTrendResponse = Schema.KeywordTrendResponse;


// --- Endpoint: /social/project_summary ---
// GET /social/project_summary

// Definition of exclusive identifiers for GetProjectSummaryParams
// Using a union of specific types for better type inference with object literals
export type GetProjectSummaryParams = { days_ago: number; force_regenerate?: boolean; } & (
  { contract_address: string; symbol?: never; project_name?: never; coin_id?: never; } |
  { symbol: string; contract_address?: never; project_name?: never; coin_id?: never; } |
  { project_name: string; contract_address?: never; symbol?: never; coin_id?: never; } |
  { coin_id: string; contract_address?: never; symbol?: never; project_name?: never; }
  );
```

#### Returns
```typescript
export type GetKeywordTrendResponse = Schema.KeywordTrendResponse;


// --- Endpoint: /social/project_summary ---
// GET /social/project_summary

// Definition of exclusive identifiers for GetProjectSummaryParams
// Using a union of specific types for better type inference with object literals
export type GetProjectSummaryParams = { days_ago: number; force_regenerate?: boolean; } & (
  { contract_address: string; symbol?: never; project_name?: never; coin_id?: never; } |
  { symbol: string; contract_address?: never; project_name?: never; coin_id?: never; } |

// Referenced Schema type:
export interface KeywordTrendResponse {
  keyword: string;
  match_mode: string; // MatchModeEnum
  time_interval: string; // TimeIntervalEnum / KeywordTimeIntervalEnum
  duration: number;
  data: KeywordDataPoint[];
}

export interface ProjectSummary {
  coin_id: string;
  name: string;
  symbol: string;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  summary: string;
  created_at?: string; // date-time, not in required but example has it
}

export interface LunarCrushNewsConfig { // also used for TopicConfig
  topic: string;
  type: string;
  id: string;
  name?: string; // Only in NewsConfig
  symbol?: string; // Only in NewsConfig
  generated?: number; // Only in NewsConfig
}

export interface LunarCrushPost {
  id: string;
  post_type: string;
```

#### Example
```typescript
const result = await socialService.getKeywordTrend(params?);
```

### `getProjectSummary(params?)`
Interacts with the getProjectSummary endpoint.

#### Parameters
```typescript
export type GetProjectSummaryParams = { days_ago: number; force_regenerate?: boolean; } & (
  { contract_address: string; symbol?: never; project_name?: never; coin_id?: never; } |
  { symbol: string; contract_address?: never; project_name?: never; coin_id?: never; } |
  { project_name: string; contract_address?: never; symbol?: never; coin_id?: never; } |
  { coin_id: string; contract_address?: never; symbol?: never; project_name?: never; }
  );

// Response type for project summary
export type GetProjectSummaryResponse = Schema.ProjectSummary;


// --- Endpoint: /social/topic_posts ---
// GET /social/topic_posts
export interface GetTopicPostsParams {
  topic?: string;
}
export type GetTopicPostsResponse = Schema.LunarCrushTopicPostsResponse;


// --- Endpoint: /social/topic_news ---
```

#### Returns
```typescript
export type GetProjectSummaryResponse = Schema.ProjectSummary;


// --- Endpoint: /social/topic_posts ---
// GET /social/topic_posts
export interface GetTopicPostsParams {
  topic?: string;
}
export type GetTopicPostsResponse = Schema.LunarCrushTopicPostsResponse;

// Referenced Schema type:
export interface ProjectSummary {
  coin_id: string;
  name: string;
  symbol: string;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  summary: string;
  created_at?: string; // date-time, not in required but example has it
}

export interface LunarCrushNewsConfig { // also used for TopicConfig
  topic: string;
  type: string;
  id: string;
  name?: string; // Only in NewsConfig
  symbol?: string; // Only in NewsConfig
  generated?: number; // Only in NewsConfig
}

export interface LunarCrushPost {
  id: string;
  post_type: string;
  post_title: string;
  post_link: string;
  post_image?: string | null;
  post_created: number; // timestamp
  post_sentiment: number;
  creator_id: string;
  creator_name: string;
  creator_display_name: string;
```

#### Example
```typescript
const result = await socialService.getProjectSummary(params?);
```

### `getTopicPosts(params?)`
Interacts with the getTopicPosts endpoint.

#### Parameters
```typescript
export interface GetTopicPostsParams {
  topic?: string;
}
export type GetTopicPostsResponse = Schema.LunarCrushTopicPostsResponse;


// --- Endpoint: /social/topic_news ---
// GET /social/topic_news
export interface GetTopicNewsParams {
  topic?: string;
}
export type GetTopicNewsResponse = Schema.LunarCrushTopicPostsResponse;


// --- Endpoint: /social/search ---
// GET /social/search
export interface SearchSocialPostsParams {
  terms: string; // required
  limit?: number;
}
```

#### Returns
```typescript
export type GetTopicPostsResponse = Schema.LunarCrushTopicPostsResponse;


// --- Endpoint: /social/topic_news ---
// GET /social/topic_news
export interface GetTopicNewsParams {
  topic?: string;
}
export type GetTopicNewsResponse = Schema.LunarCrushTopicPostsResponse;

// Referenced Schema type:
export interface LunarCrushTopicPostsResponse { // also for TopicNewsResponse
  config: LunarCrushNewsConfig; // or LunarCrushTopicConfig
  data: LunarCrushPost[];
}

export interface LunarCrushSearchTerm {
  term: string;
}

export interface LunarCrushSearchConfig {
  terms: LunarCrushSearchTerm[];
  no_adjust?: boolean;
}

export interface LunarCrushSearchPost {
  id: string;
  post_type: string;
  text: string;
  text_highlight: string;
  post_created: number; // timestamp
  post_link: string;
}

export interface LunarCrushSearchResponse {
  searchConfig: LunarCrushSearchConfig;
  data: LunarCrushSearchPost[];
}

export interface ServiceStatusResponse {
  status: string;
```

#### Example
```typescript
const result = await socialService.getTopicPosts(params?);
```

### `getTopicNews(params?)`
Interacts with the getTopicNews endpoint.

#### Parameters
```typescript
export interface GetTopicNewsParams {
  topic?: string;
}
export type GetTopicNewsResponse = Schema.LunarCrushTopicPostsResponse;


// --- Endpoint: /social/search ---
// GET /social/search
export interface SearchSocialPostsParams {
  terms: string; // required
  limit?: number;
}
export type SearchSocialPostsResponse = Schema.LunarCrushSearchResponse;


// --- Endpoint: /social/trends ---
// GET /social/trends
export interface GetSocialTrendsParams {
  coin_ids: string[]; // required
  start_date: string; // date-time, required
```

#### Returns
```typescript
export type GetTopicNewsResponse = Schema.LunarCrushTopicPostsResponse;


// --- Endpoint: /social/search ---
// GET /social/search
export interface SearchSocialPostsParams {
  terms: string; // required
  limit?: number;
}
export type SearchSocialPostsResponse = Schema.LunarCrushSearchResponse;

// Referenced Schema type:
export interface LunarCrushTopicPostsResponse { // also for TopicNewsResponse
  config: LunarCrushNewsConfig; // or LunarCrushTopicConfig
  data: LunarCrushPost[];
}

export interface LunarCrushSearchTerm {
  term: string;
}

export interface LunarCrushSearchConfig {
  terms: LunarCrushSearchTerm[];
  no_adjust?: boolean;
}

export interface LunarCrushSearchPost {
  id: string;
  post_type: string;
  text: string;
  text_highlight: string;
  post_created: number; // timestamp
  post_link: string;
}

export interface LunarCrushSearchResponse {
  searchConfig: LunarCrushSearchConfig;
  data: LunarCrushSearchPost[];
}

export interface ServiceStatusResponse {
  status: string;
```

#### Example
```typescript
const result = await socialService.getTopicNews(params?);
```

### `searchSocialPosts(params)`
Interacts with the searchSocialPosts endpoint.

#### Parameters
```typescript
export interface SearchSocialPostsParams {
  terms: string; // required
  limit?: number;
}
export type SearchSocialPostsResponse = Schema.LunarCrushSearchResponse;


// --- Endpoint: /social/trends ---
// GET /social/trends
export interface GetSocialTrendsParams {
  coin_ids: string[]; // required
  start_date: string; // date-time, required
  end_date: string; // date-time, required
  interval?: "4h" | "12h" | "1d"; // More specific than general TimeIntervalEnum, so no Schema. prefix
}
export type GetSocialTrendsResponse = Schema.SocialTrendResponse[];


// --- Endpoint: /groups/status ---
// GET /groups/status
```

#### Returns
```typescript
export type SearchSocialPostsResponse = Schema.LunarCrushSearchResponse;


// --- Endpoint: /social/trends ---
// GET /social/trends
export interface GetSocialTrendsParams {
  coin_ids: string[]; // required
  start_date: string; // date-time, required
  end_date: string; // date-time, required
  interval?: "4h" | "12h" | "1d"; // More specific than general TimeIntervalEnum, so no Schema. prefix
}

// Referenced Schema type:
export interface LunarCrushSearchResponse {
  searchConfig: LunarCrushSearchConfig;
  data: LunarCrushSearchPost[];
}

export interface ServiceStatusResponse {
  status: string;
  message: string;
  block_number?: number | null;
  owner_address?: string | null;
  contract_address?: string | null;
}

export interface GroupStatusResponse {
  status: string; // 'found', 'not_monitored', or 'not_found'
  message: string;
  group_username?: string | null; // Added to match tests
  title?: string | null; // Added to match tests
  member_count?: number | null; // Added to match tests
  num_messages?: number | null; // Added to match tests
  num_unique_users?: number | null; // Added to match tests
  member_online_count?: number | null; // Added to match tests
}

export interface GroupAddRequest {
  group_username: string;
}

export interface GroupAddResponse {
  message: string;
```

#### Example
```typescript
const result = await socialService.searchSocialPosts(params);
```

### `getSocialTrends(params)`
Interacts with the getSocialTrends endpoint.

#### Parameters
```typescript
export interface GetSocialTrendsParams {
  coin_ids: string[]; // required
  start_date: string; // date-time, required
  end_date: string; // date-time, required
  interval?: "4h" | "12h" | "1d"; // More specific than general TimeIntervalEnum, so no Schema. prefix
}
export type GetSocialTrendsResponse = Schema.SocialTrendResponse[];


// --- Endpoint: /groups/status ---
// GET /groups/status
// No specific parameters
export type GetGroupsServiceStatusResponse = Schema.ServiceStatusResponse;


// --- Endpoint: /groups/{group_username} ---
// GET /groups/{group_username}
export interface GetSpecificGroupParams {
  group_username: string; // path parameter
}
```

#### Returns
```typescript
export type GetSocialTrendsResponse = Schema.SocialTrendResponse[];


// --- Endpoint: /groups/status ---
// GET /groups/status
// No specific parameters
export type GetGroupsServiceStatusResponse = Schema.ServiceStatusResponse;


// --- Endpoint: /groups/{group_username} ---
// GET /groups/{group_username}

// Referenced Schema type:
export interface SocialTrendResponse {
  coin_id: string;
  name: string;
  symbol: string;
  contract_address?: string | null;
  market_cap_rank?: number | null;
  trend_market_data: TrendDataPoint[];
}

export type TimeIntervalEnum = "1h" | "4h" | "12h" | "1d"; // Note: spec has 3d, 1w for one endpoint, but this is the common one
export type KeywordTimeIntervalEnum = "1h" | "4h" | "12h" | "1d" | "3d" | "1w";


export type MatchModeEnum = "exact" | "any" | "all" | "fuzzy" | "partial";

export interface KeywordDataPoint {
  date: string; // ISO format
  count: number;
}

export interface KeywordTrendResponse {
  keyword: string;
  match_mode: string; // MatchModeEnum
  time_interval: string; // TimeIntervalEnum / KeywordTimeIntervalEnum
  duration: number;
  data: KeywordDataPoint[];
}

export interface ProjectSummary {
  coin_id: string;
```

#### Example
```typescript
const result = await socialService.getSocialTrends(params);
```

## Complete Example

```typescript
import { TrendmoonApiClient } from './api/TrendmoonApiClient.js';
import { SocialService } from './services/SocialService.js';

// Initialize the API client and service
const apiClient = new TrendmoonApiClient();
const socialService = new SocialService(apiClient);

// Example usage of the service
(async () => {
  try {
    // Use any method from the service
    const result = await socialService.someMethod();
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
})();
```
