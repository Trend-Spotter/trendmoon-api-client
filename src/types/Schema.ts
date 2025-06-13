// From #/components/schemas/

export interface StatusResponse {
  status: string;
  message: string;
}

export interface ValidationError {
  loc: Array<string | number>;
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}

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

export interface CoinDeveloperDataCodeAdditionsDeletions4Weeks {
  additions?: number | null;
  deletions?: number | null;
}

export interface CoinDeveloperData {
  forks?: number | null;
  stars?: number | null;
  subscribers?: number | null;
  total_issues?: number | null;
  closed_issues?: number | null;
  pull_requests_merged?: number | null;
  pull_request_contributors?: number | null;
  code_additions_deletions_4_weeks?: CoinDeveloperDataCodeAdditionsDeletions4Weeks | null;
  commit_count_4_weeks?: number | null;
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  web_slug?: string | null;
  asset_platform_id?: string | null;
  platforms?: Record<string, string>;
  detail_platforms?: Record<string, CoinPlatformDetail | null>;
  block_time_in_minutes?: number | null;
  hashing_algorithm?: string | null;
  categories?: string[];
  preview_listing?: boolean | null;
  public_notice?: string | null;
  additional_notices?: string[];
  description?: Record<string, string | null>;
  links?: CoinLinks | null;
  image?: CoinImage | null;
  country_origin?: string | null;
  genesis_date?: string | null; // date-time
  contract_address?: string | null;
  sentiment_votes_up_percentage?: number | null;
  sentiment_votes_down_percentage?: number | null;
  market_cap_rank?: number | null;
  community_data?: CoinCommunityData | null;
  developer_data?: CoinDeveloperData | null;
  last_updated?: string | null; // date-time
  total_supply?: number | null;
  max_supply?: number | null;
  circulating_supply?: number | null;
  market_cap?: number | null;
  fully_diluted_valuation?: number | null;
  market_cap_fdv_ratio?: number | null;
  mcap_to_tvl_ratio?: number | null;
  fdv_to_tvl_ratio?: number | null;
}

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

// MessageResponse is used for public GET endpoints
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
  name_count?: number | null;
  social_mentions?: number | null;
  social_dominance?: number | null;
  price?: number | null;
  market_cap?: number | null;
  total_volume?: number | null;
  lc_posts_created?: number | null;
  lc_posts_active?: number | null;
  lc_interactions?: number | null;
  lc_contributors_created?: number | null;
  lc_contributors_active?: number | null;
  lc_sentiment?: number | null;
  lc_social_dominance?: number | null;
  lc_social_volume_24h?: number | null;
  lc_galaxy_score?: number | null;
  lc_alt_rank?: number | null;
}

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
  creator_followers: number;
  creator_avatar: string;
  interactions_24h: number;
  interactions_total: number;
}

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

export interface TopicSummaryResponse {
  overview: string;
  recent_sentiment: {
    sentiment: string;
    bullish: string;
    bearish: string;
  };
  developments_and_catalysts: string;
  full_report: string;
  topic: string;
  generated_at: string; // date-time
}