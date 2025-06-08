# ChatActivityService

## Description
This service provides methods to interact with ChatActivity-related endpoints of the Trendmoon API.

## Usage

```typescript
import { TrendmoonApiClient } from './api/TrendmoonApiClient.js';
import { ChatActivityService } from './services/ChatActivityService.js';

const apiClient = new TrendmoonApiClient();
const chatActivityService = new ChatActivityService(apiClient);
```

## Methods

The following methods are available in this service:

### `getChatActivity(params?)`
Interacts with the getChatActivity endpoint.

#### Parameters
```typescript
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
export interface GetMessagesForChatParams {
  group_username?: string | null;
  chat_id?: number | null;
  start_date: string; // date-time, required
  end_date: string; // date-time, required
  message_type?: Schema.MessageTypeEnum | null;
  with_spams?: boolean | null;
  from_?: number;
```

#### Returns
```typescript
export type GetChatActivityResponse = Schema.ChatActivity[];


// --- Endpoint: /messages/chat ---
// GET /messages/chat
export interface GetMessagesForChatParams {
  group_username?: string | null;
  chat_id?: number | null;
  start_date: string; // date-time, required
  end_date: string; // date-time, required
  message_type?: Schema.MessageTypeEnum | null;

// Referenced Schema type:
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
  weekly_growth_messages?: number | null;
  daily_growth_unique_users?: number | null;
  weekly_growth_unique_users?: number | null;
  description?: string | null;
  administrator_count?: number | null;
  restricted_count?: number | null;
  bot_amount?: number | null;
  banned_count?: number | null;
  is_verified?: number | null; // In spec, number, likely boolean intended
  is_scam?: number | null;   // In spec, number, likely boolean intended
  is_fake?: number | null;    // In spec, number, likely boolean intended
  gini_coefficient?: number | null;
  top_user_ratio?: number | null;
  is_well_distributed?: boolean | null;
  monthly_growth_messages?: number | null;
  monthly_growth_unique_users?: number | null;
  monthly_perc_returning_users?: number | null;
  weekly_perc_returning_users?: number | null;
}

```

#### Example
```typescript
const result = await chatActivityService.getChatActivity(params?);
```

## Complete Example

```typescript
import { TrendmoonApiClient } from './api/TrendmoonApiClient.js';
import { ChatActivityService } from './services/ChatActivityService.js';

// Initialize the API client and service
const apiClient = new TrendmoonApiClient();
const chatActivityService = new ChatActivityService(apiClient);

// Example usage of the service
(async () => {
  try {
    // Use any method from the service
    const result = await chatActivityService.someMethod();
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
})();
```
