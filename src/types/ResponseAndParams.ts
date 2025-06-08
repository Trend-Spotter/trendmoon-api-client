import * as Schema from './Schema.js'

// --- Utility Types: Removed OnlyOne and AtLeastOne for simplicity with direct object literals ---
// They can be overly strict and cause issues like "is not assignable to type never".

// --- Endpoint: / (Root) ---
// GET /
export type GetRootResponse = Schema.StatusResponse;
// No specific parameters beyond standard headers


// --- Endpoint: /chats/{group_username} ---
// GET /chats/{group_username}
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
export type GetAllCategoriesResponse = string[];


// --- Endpoint: /coins/search ---
// GET /coins/search
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
// GET /coins/details
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

// Response type for project summary
export type GetProjectSummaryResponse = Schema.ProjectSummary;


// --- Endpoint: /social/topic_posts ---
// GET /social/topic_posts
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
// No specific parameters
export type GetGroupsServiceStatusResponse = Schema.ServiceStatusResponse;


// --- Endpoint: /groups/{group_username} ---
// GET /groups/{group_username}
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
// No specific parameters
export type GetTopAlertsTodayResponse = Schema.TopAlertsResponse[];


// --- Endpoint: /get_top_categories_today ---
// GET /get_top_categories_today
// No specific parameters
export type GetTopCategoriesTodayResponse = Schema.TopCategoriesResponse[];


// --- Endpoint: /get_top_category_alerts ---
// GET /get_top_category_alerts
// No specific parameters
export type GetTopCategoryAlertsResponse = Schema.TopAlertsResponse[];


// --- Endpoint: /get_category_coins_legacy ---
// GET /get_category_coins_legacy
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
  // The schema is empty "{}", so we can use an empty object or a more descriptive one if known.
  // For now, let's assume it's like the root status.
  status?: string; // Or make it a more specific type if it always returns something.
  message?: string;
  [key: string]: any; // To allow for an empty object or other properties
}