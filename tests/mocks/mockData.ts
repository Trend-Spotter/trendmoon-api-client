import * as Types from '../../src/types/ResponseAndParams.js';

// Mock data for API responses
export const mockSocialTrendData: Types.GetSocialTrendResponse = {
  coin_id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'BTC',
  market_cap_rank: 1,
  trend_market_data: [
    {
      date: '2024-01-15T10:00:00Z',
      hour_social_perc_diff: 5.2,
      day_social_perc_diff: 12.7,
      sentiment_score: 0.75,
      symbol_count: 2500,
      name_count: 1800,
      social_mentions: 12000,
      social_dominance: 45.8,
      price: 45000,
      market_cap: 850000000000,
      total_volume: 25000000000,
      lc_posts_created: 3500,
      lc_posts_active: 2800,
      lc_interactions: 85000,
      lc_contributors_created: 1200,
      lc_contributors_active: 950,
      lc_sentiment: 0.72,
      lc_social_dominance: 42.5,
      lc_social_volume_24h: 15000,
      lc_galaxy_score: 75.3,
      lc_alt_rank: 1
    }
  ]
};

export const mockKeywordTrendData: Types.GetKeywordTrendResponse = {
  keyword: 'bitcoin',
  data: [
    {
      date: '2024-01-15',
      count: 0
    }
  ],
  match_mode: 'exact',
  time_interval: 'daily',
  duration: 30
};

export const mockProjectSummaryData: Types.GetProjectSummaryResponse = {
  coin_id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'BTC',
  start_date: '2009-01-03',
  end_date: '2025-06-24',
  summary: 'Bitcoin is a decentralized digital currency.',
  created_at: '2024-06-01T12:00:00Z'
};

export const mockTopicPostsData: Types.GetTopicPostsResponse = {
  config: {
    id: 'config-123',
    type: 'social_post',
    name: 'test',
    topic: 'test',
    symbol: 'BTC',
    generated: 1
  },
  data: [
    {
      id: '1',
      post_type: 'twitter',
      post_title: 'Bitcoin analysis',
      post_link: 'https://twitter.com/crypto_trader/status/123456789',
      post_image: 'https://example.com/image.jpg',
      post_created: 1705316400,
      post_sentiment: 0.75,
      creator_id: 'crypto_trader_id',
      creator_name: 'crypto_trader',
      creator_display_name: 'Crypto Trader',
      creator_followers: 5000,
      creator_avatar: 'https://example.com/avatar.jpg',
      interactions_24h: 185,
      interactions_total: 500
    }
  ]
};

export const mockTopicNewsData: Types.GetTopicNewsResponse = {
  config: {
    topic: 'bitcoin',
    type: 'news',
    id: 'btc-news',
    name: 'Bitcoin',
    symbol: 'BTC',
    generated: 1705316400
  },
  data: [
    {
      id: '1',
      post_type: 'news',
      post_title: 'Bitcoin Reaches New Heights',
      post_link: 'https://example.com/news/1',
      post_image: 'https://example.com/images/bitcoin-ath.jpg',
      post_created: 1705309200, // timestamp pour '2024-01-15T09:00:00Z'
      post_sentiment: 0.85,
      creator_id: 'cryptonews',
      creator_name: 'CryptoNews',
      creator_display_name: 'Crypto News',
      creator_followers: 50000,
      creator_avatar: 'https://example.com/images/cryptonews-logo.png',
      interactions_24h: 1500,
      interactions_total: 5000
    }
  ]
};

export const mockSearchSocialPostsData: Types.SearchSocialPostsResponse = {
  searchConfig: {
    terms: [
      {
        term: 'Bitcoin'
      }
    ],
    no_adjust: false
  },
  data: [
    {
      id: '1',
      post_type: 'twitter',
      text: 'Bitcoin analysis for today',
      text_highlight: '<em>Bitcoin</em> analysis for today',
      post_created: 1705316400, // timestamp pour '2024-01-15T10:00:00Z'
      post_link: 'https://twitter.com/analyst/status/123456789'
    }
  ]
};

export const mockSocialTrendsData: Types.GetSocialTrendsResponse = [
  {
    coin_id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    market_cap_rank: 1,
    trend_market_data: [
      {
        date: '2024-06-24T00:00:00Z',
        hour_social_perc_diff: 5.2,
        day_social_perc_diff: 15.5,
        sentiment_score: 0.75,
        social_mentions: 1500,
        social_dominance: 45.8,
        price: 45000,
        market_cap: 850000000000,
        total_volume: 25000000000,
        lc_sentiment: 0.72,
        lc_social_dominance: 42.5,
        lc_social_volume_24h: 15000,
        lc_galaxy_score: 75.3,
        lc_alt_rank: 1
      }
    ]
  },
  {
    coin_id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    market_cap_rank: 2,
    trend_market_data: [
      {
        date: '2024-06-24T00:00:00Z',
        hour_social_perc_diff: -1.5,
        day_social_perc_diff: -2.3,
        sentiment_score: 0.5,
        social_mentions: 1200,
        social_dominance: 25.3,
        price: 2500,
        market_cap: 300000000000,
        total_volume: 15000000000,
        lc_sentiment: 0.55,
        lc_social_dominance: 24.7,
        lc_social_volume_24h: 8500,
        lc_galaxy_score: 68.2,
        lc_alt_rank: 2
      }
    ]
  }
];

export const mockCategoryData: Types.GetAllCategoriesResponse = [
  'DeFi',
  'NFT',
  'Layer 1',
  'Gaming'
];

export const mockChatActivityData: Types.GetChatActivityResponse = [
  {
    chat_id: 123456789,
    group_username: 'bitcoin_chat',
    num_messages: 150,
    num_unique_users: 45,
    date: '2024-01-15T10:00:00Z'
  }
];

export const mockUserSearchData: Types.SearchUsersResponse = [
  {
    user_id: 123456,
    username: 'crypto_user',
    first_name: 'John',
    last_name: 'Doe',
    verified: true
  }
];