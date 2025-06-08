# MessageService

## Description
This service provides methods to interact with Message-related endpoints of the Trendmoon API.

## Usage

```typescript
import { TrendmoonApiClient } from './api/TrendmoonApiClient.js';
import { MessageService } from './services/MessageService.js';

const apiClient = new TrendmoonApiClient();
const messageService = new MessageService(apiClient);
```

## Methods

The following methods are available in this service:

### `getMessagesForChat(params)`
Interacts with the getMessagesForChat endpoint.

#### Parameters
```typescript
export interface GetMessagesForChatParams {
  group_username?: string | null;
  chat_id?: number | null;
  start_date: string; // date-time, required
  end_date: string; // date-time, required
  message_type?: Schema.MessageTypeEnum | null;
  with_spams?: boolean | null;
  from_?: number;
  size?: number;
}
export type GetMessagesForChatResponse = Schema.MessageResponse[];


// --- Endpoint: /messages/search ---
// GET /messages/search
export interface SearchMessagesParams {
  text?: string | null;
  group_username?: string | null;
  username?: string | null;
  message_type?: Schema.MessageTypeEnum | null;
```

#### Returns
```typescript
export type GetMessagesForChatResponse = Schema.MessageResponse[];


// --- Endpoint: /messages/search ---
// GET /messages/search
export interface SearchMessagesParams {
  text?: string | null;
  group_username?: string | null;
  username?: string | null;
  message_type?: Schema.MessageTypeEnum | null;
  user_is_bot?: boolean | null;

// Referenced Schema type:
export interface MessageResponse {
  id: number;
  chat_id: number;
  group_username?: string | null;
  user_id: number;
  username?: string | null;
  user_is_bot: boolean;
  user_is_spammer: boolean;
  date: string; // date-time
  sender_type: string;
  text?: string | null;
  clean_text?: string | null;
  message_type: string;
  spam_flag: boolean;
  views?: number | null;
  replies?: number | null;
  forwards?: number | null;
  reply_to_id?: number | null;
  member_online_count?: number | null;
}

export type MessageTypeEnum = "raw" | "clean";

export interface User {
  user_id: number;
  first_name?: string | null;
  last_name?: string | null;
  username?: string | null;
  bot?: boolean | null;
  verified?: boolean | null;
```

#### Example
```typescript
const result = await messageService.getMessagesForChat(params);
```

### `searchMessages(params)`
Interacts with the searchMessages endpoint.

#### Parameters
```typescript
export interface SearchMessagesParams {
  text?: string | null;
  group_username?: string | null;
  username?: string | null;
  message_type?: Schema.MessageTypeEnum | null;
  user_is_bot?: boolean | null;
  user_is_spammer?: boolean | null;
  spam_flag?: boolean | null;
  start_date: string; // date-time, required
  end_date: string; // date-time, required
  from_?: number;
  size?: number;
}
export type SearchMessagesResponse = Schema.MessageResponse[];


// --- Endpoint: /messages/timeframe ---
// GET /messages/timeframe
export interface GetMessagesWithinTimeframeParams {
  start_date?: string; // date-time
```

#### Returns
```typescript
export type SearchMessagesResponse = Schema.MessageResponse[];


// --- Endpoint: /messages/timeframe ---
// GET /messages/timeframe
export interface GetMessagesWithinTimeframeParams {
  start_date?: string; // date-time
  end_date?: string; // date-time
  message_type?: Schema.MessageTypeEnum | null;
  with_spams?: boolean | null;
  from_?: number;

// Referenced Schema type:
export interface MessageResponse {
  id: number;
  chat_id: number;
  group_username?: string | null;
  user_id: number;
  username?: string | null;
  user_is_bot: boolean;
  user_is_spammer: boolean;
  date: string; // date-time
  sender_type: string;
  text?: string | null;
  clean_text?: string | null;
  message_type: string;
  spam_flag: boolean;
  views?: number | null;
  replies?: number | null;
  forwards?: number | null;
  reply_to_id?: number | null;
  member_online_count?: number | null;
}

export type MessageTypeEnum = "raw" | "clean";

export interface User {
  user_id: number;
  first_name?: string | null;
  last_name?: string | null;
  username?: string | null;
  bot?: boolean | null;
  verified?: boolean | null;
```

#### Example
```typescript
const result = await messageService.searchMessages(params);
```

### `getMessagesWithinTimeframe(params?)`
Interacts with the getMessagesWithinTimeframe endpoint.

#### Parameters
```typescript
export interface GetMessagesWithinTimeframeParams {
  start_date?: string; // date-time
  end_date?: string; // date-time
  message_type?: Schema.MessageTypeEnum | null;
  with_spams?: boolean | null;
  from_?: number;
  size?: number;
}
export type GetMessagesWithinTimeframeResponse = Schema.MessageResponse[];


// --- Endpoint: /messages/user ---
// GET /messages/user
export interface GetMessagesForUserParams {
  username?: string | null;
  user_id?: number | null;
  start_date: string; // date-time, required
  end_date: string; // date-time, required
  message_type?: Schema.MessageTypeEnum | null;
  with_spams?: boolean | null;
```

#### Returns
```typescript
export type GetMessagesWithinTimeframeResponse = Schema.MessageResponse[];


// --- Endpoint: /messages/user ---
// GET /messages/user
export interface GetMessagesForUserParams {
  username?: string | null;
  user_id?: number | null;
  start_date: string; // date-time, required
  end_date: string; // date-time, required
  message_type?: Schema.MessageTypeEnum | null;

// Referenced Schema type:
export interface MessageResponse {
  id: number;
  chat_id: number;
  group_username?: string | null;
  user_id: number;
  username?: string | null;
  user_is_bot: boolean;
  user_is_spammer: boolean;
  date: string; // date-time
  sender_type: string;
  text?: string | null;
  clean_text?: string | null;
  message_type: string;
  spam_flag: boolean;
  views?: number | null;
  replies?: number | null;
  forwards?: number | null;
  reply_to_id?: number | null;
  member_online_count?: number | null;
}

export type MessageTypeEnum = "raw" | "clean";

export interface User {
  user_id: number;
  first_name?: string | null;
  last_name?: string | null;
  username?: string | null;
  bot?: boolean | null;
  verified?: boolean | null;
```

#### Example
```typescript
const result = await messageService.getMessagesWithinTimeframe(params?);
```

### `getMessagesForUser(params)`
Interacts with the getMessagesForUser endpoint.

#### Parameters
```typescript
export interface GetMessagesForUserParams {
  username?: string | null;
  user_id?: number | null;
  start_date: string; // date-time, required
  end_date: string; // date-time, required
  message_type?: Schema.MessageTypeEnum | null;
  with_spams?: boolean | null;
  from_?: number;
  size?: number;
}
export type GetMessagesForUserResponse = Schema.MessageResponse[];


// --- Endpoint: /users/search ---
// GET /users/search
export interface SearchUsersParams {
  username?: string | null;
  bot?: boolean | null;
  verified?: boolean | null;
  scam?: boolean | null;
```

#### Returns
```typescript
export type GetMessagesForUserResponse = Schema.MessageResponse[];


// --- Endpoint: /users/search ---
// GET /users/search
export interface SearchUsersParams {
  username?: string | null;
  bot?: boolean | null;
  verified?: boolean | null;
  scam?: boolean | null;
  fake?: boolean | null;

// Referenced Schema type:
export interface MessageResponse {
  id: number;
  chat_id: number;
  group_username?: string | null;
  user_id: number;
  username?: string | null;
  user_is_bot: boolean;
  user_is_spammer: boolean;
  date: string; // date-time
  sender_type: string;
  text?: string | null;
  clean_text?: string | null;
  message_type: string;
  spam_flag: boolean;
  views?: number | null;
  replies?: number | null;
  forwards?: number | null;
  reply_to_id?: number | null;
  member_online_count?: number | null;
}

export type MessageTypeEnum = "raw" | "clean";

export interface User {
  user_id: number;
  first_name?: string | null;
  last_name?: string | null;
  username?: string | null;
  bot?: boolean | null;
  verified?: boolean | null;
```

#### Example
```typescript
const result = await messageService.getMessagesForUser(params);
```

## Complete Example

```typescript
import { TrendmoonApiClient } from './api/TrendmoonApiClient.js';
import { MessageService } from './services/MessageService.js';

// Initialize the API client and service
const apiClient = new TrendmoonApiClient();
const messageService = new MessageService(apiClient);

// Example usage of the service
(async () => {
  try {
    // Use any method from the service
    const result = await messageService.someMethod();
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
})();
```
