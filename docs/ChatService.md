# ChatService

## Description
This service provides methods to interact with Chat-related endpoints of the Trendmoon API.

## Usage

```typescript
import { TrendmoonApiClient } from './api/TrendmoonApiClient.js';
import { ChatService } from './services/ChatService.js';

const apiClient = new TrendmoonApiClient();
const chatService = new ChatService(apiClient);
```

## Methods

The following methods are available in this service:

### `getChatByUsername(params)`
Interacts with the getChatByUsername endpoint.

#### Parameters
```typescript
export interface GetChatByUsernameParams {
  group_username: string; // path parameter
}
export type GetChatByUsernameResponse = Schema.Chat;


// --- Endpoint: /chat_activity/ ---
// GET /chat_activity/
export interface GetChatActivityParams {
  group_username?: string;
  start_date?: string; // date-time
  end_date?: string; // date-time
  from_?: number;
  size?: number;
}
export type GetChatActivityResponse = Schema.ChatActivity[];


// --- Endpoint: /messages/chat ---
// GET /messages/chat
```

#### Returns
```typescript
export type GetChatByUsernameResponse = Schema.Chat;


// --- Endpoint: /chat_activity/ ---
// GET /chat_activity/
export interface GetChatActivityParams {
  group_username?: string;
  start_date?: string; // date-time
  end_date?: string; // date-time
  from_?: number;
  size?: number;

// Referenced Schema type:
export interface Chat {
  group_username?: string | null;
  chat_id: number | null; // In spec, it's required for Chat schema, but can be null in some contexts
  title?: string | null;
  member_count?: number | null;
  member_online_count?: number | null;
  num_messages?: number | null; // Added to match tests
  num_unique_users?: number | null; // Added to match tests
  bot_count?: number | null;
  blacklisted?: boolean | null;
  blacklist_reason?: string | null;
  description?: string | null;
  administrator_count?: number | null;
  restricted_count?: number | null;
  banned_count?: number | null;
  is_verified?: boolean | null;
  is_scam?: boolean | null;
  is_fake?: boolean | null;
}

export interface ChatActivity {
  chat_id: number | null; // Required in schema
  date: string; // date-time
  group_username?: string | null;
  member_count?: number | null;
  num_messages?: number | null;
  title?: string | null;
  num_unique_users?: number | null;
  member_online_count?: number | null;
  daily_growth_messages?: number | null;
```

#### Example
```typescript
const result = await chatService.getChatByUsername(params);
```

### `getGroupsServiceStatus()`
Interacts with the getGroupsServiceStatus endpoint.

#### Returns
```typescript
export type GetGroupsServiceStatusResponse = Schema.ServiceStatusResponse;


// --- Endpoint: /groups/{group_username} ---
// GET /groups/{group_username}
export interface GetSpecificGroupParams {
  group_username: string; // path parameter
}
export type GetSpecificGroupResponse = Schema.GroupStatusResponse;

// Referenced Schema type:
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
}

// Modified to reflect that GetAllGroupsResponse is a direct array of objects,
// not an object with a 'groups' property.
export type GroupsListResponse = Array<{
```

#### Example
```typescript
const result = await chatService.getGroupsServiceStatus();
```

### `getSpecificGroup(params)`
Interacts with the getSpecificGroup endpoint.

#### Parameters
```typescript
export interface GetSpecificGroupParams {
  group_username: string; // path parameter
}
export type GetSpecificGroupResponse = Schema.GroupStatusResponse;


// --- Endpoint: /groups/add_group ---
// POST /groups/add_group
export type AddNewGroupRequest = Schema.GroupAddRequest;
export type AddNewGroupResponse = Schema.GroupAddResponse;


// --- Endpoint: /groups/ ---
// GET /groups/
// No specific parameters
export type GetAllGroupsResponse = Schema.GroupsListResponse;


// --- Endpoint: /get_top_alerts_today ---
// GET /get_top_alerts_today
```

#### Returns
```typescript
export type GetSpecificGroupResponse = Schema.GroupStatusResponse;


// --- Endpoint: /groups/add_group ---
// POST /groups/add_group
export type AddNewGroupRequest = Schema.GroupAddRequest;
export type AddNewGroupResponse = Schema.GroupAddResponse;


// --- Endpoint: /groups/ ---
// GET /groups/

// Referenced Schema type:
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
}

// Modified to reflect that GetAllGroupsResponse is a direct array of objects,
// not an object with a 'groups' property.
export type GroupsListResponse = Array<{
  group_username: string;
  chat_id: number;
  // Add other properties if they are returned in the array elements
  title?: string | null;
  member_count?: number | null;
  num_messages?: number | null;
  num_unique_users?: number | null;
  member_online_count?: number | null;
```

#### Example
```typescript
const result = await chatService.getSpecificGroup(params);
```

### `addNewGroup()`
Interacts with the addNewGroup endpoint.

#### Returns
```typescript
export type AddNewGroupResponse = Schema.GroupAddResponse;


// --- Endpoint: /groups/ ---
// GET /groups/
// No specific parameters
export type GetAllGroupsResponse = Schema.GroupsListResponse;


// --- Endpoint: /get_top_alerts_today ---
// GET /get_top_alerts_today

// Referenced Schema type:
export interface GroupAddResponse {
  message: string;
}

// Modified to reflect that GetAllGroupsResponse is a direct array of objects,
// not an object with a 'groups' property.
export type GroupsListResponse = Array<{
  group_username: string;
  chat_id: number;
  // Add other properties if they are returned in the array elements
  title?: string | null;
  member_count?: number | null;
  num_messages?: number | null;
  num_unique_users?: number | null;
  member_online_count?: number | null;
}>;

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
```

#### Example
```typescript
const result = await chatService.addNewGroup();
```

### `getAllGroups()`
Interacts with the getAllGroups endpoint.

#### Returns
```typescript
export type GetAllGroupsResponse = Schema.GroupsListResponse;


// --- Endpoint: /get_top_alerts_today ---
// GET /get_top_alerts_today
// No specific parameters
export type GetTopAlertsTodayResponse = Schema.TopAlertsResponse[];


// --- Endpoint: /get_top_categories_today ---
// GET /get_top_categories_today

// Referenced Schema type:
export type GroupsListResponse = Array<{
  group_username: string;
  chat_id: number;
  // Add other properties if they are returned in the array elements
  title?: string | null;
  member_count?: number | null;
  num_messages?: number | null;
  num_unique_users?: number | null;
  member_online_count?: number | null;
}>;
```

#### Example
```typescript
const result = await chatService.getAllGroups();
```

## Complete Example

```typescript
import { TrendmoonApiClient } from './api/TrendmoonApiClient.js';
import { ChatService } from './services/ChatService.js';

// Initialize the API client and service
const apiClient = new TrendmoonApiClient();
const chatService = new ChatService(apiClient);

// Example usage of the service
(async () => {
  try {
    // Use any method from the service
    const result = await chatService.someMethod();
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
})();
```
