import * as Types from '../../src/types/ResponseAndParams.js';
import {
  mockSocialTrendData,
  mockKeywordTrendData,
  mockProjectSummaryData,
  mockTopicPostsData,
  mockTopicNewsData,
  mockSearchSocialPostsData,
  mockSocialTrendsData,
  mockCategoryData,
  mockChatActivityData,
  mockUserSearchData
} from './mockData.js';

/**
 * Mock implementation of TrendmoonApiClient for testing
 * Provides predictable responses without making real API calls
 */
export class MockTrendmoonApiClient {
  
  // --- Root ---
  public async getRoot(): Promise<Types.GetRootResponse> {
    return { status: 'OK', message: 'Trendmoon API is running' };
  }

  // --- Social endpoints ---
  public async getSocialTrend(params?: Types.GetSocialTrendParams): Promise<Types.GetSocialTrendResponse> {
    return mockSocialTrendData;
  }

  public async getKeywordTrend(params?: Types.GetKeywordTrendParams): Promise<Types.GetKeywordTrendResponse> {
    return mockKeywordTrendData;
  }

  public async getProjectSummary(params?: Types.GetProjectSummaryParams): Promise<Types.GetProjectSummaryResponse> {
    return mockProjectSummaryData;
  }

  public async getTopicPosts(params?: Types.GetTopicPostsParams): Promise<Types.GetTopicPostsResponse> {
    return mockTopicPostsData;
  }

  public async getTopicNews(params?: Types.GetTopicNewsParams): Promise<Types.GetTopicNewsResponse> {
    return mockTopicNewsData;
  }

  public async searchSocialPosts(params: Types.SearchSocialPostsParams): Promise<Types.SearchSocialPostsResponse> {
    return mockSearchSocialPostsData;
  }

  public async getSocialTrends(params: Types.GetSocialTrendsParams): Promise<Types.GetSocialTrendsResponse> {
    return mockSocialTrendsData;
  }

  // --- Categories ---
  public async getAllCategories(): Promise<Types.GetAllCategoriesResponse> {
    return mockCategoryData;
  }

  public async getCategoryDominanceForAssets(params?: Types.GetCategoryDominanceForAssetsParams): Promise<Types.GetCategoryDominanceForAssetsResponse> {
    return [
      { category_name: 'DeFi', category_dominance: 45.5 },
      { category_name: 'NFT', category_dominance: 25.2 }
    ];
  }

  // --- Chat Activity ---
  public async getChatActivity(params?: Types.GetChatActivityParams): Promise<Types.GetChatActivityResponse> {
    return [
      {
        chat_id: 123456789,
        group_username: 'bitcoin_chat',
        num_messages: 150,
        num_unique_users: 45,
        date: '2024-01-15T10:00:00Z'
      }
    ];
  }

  // --- Users ---
  public async searchUsers(params?: Types.SearchUsersParams): Promise<Types.SearchUsersResponse> {
    return [
      {
        user_id: 123456,
        username: 'crypto_user',
        first_name: 'John',
        last_name: 'Doe',
        verified: true
      }
    ];
  }

  public async getUserByIdentifier(params: Types.GetUserByIdentifierParams): Promise<Types.GetUserByIdentifierResponse> {
    return {
      user_id: 123456,
      username: params.identifier,
      first_name: 'John',
      last_name: 'Doe',
      verified: true
    };
  }

  // --- Messages ---
  public async getMessagesForChat(params: Types.GetMessagesForChatParams): Promise<Types.GetMessagesForChatResponse> {
    return [
      {
        id: 1,
        chat_id: 123456789,
        text: 'Bitcoin is looking bullish today',
        user_id: 123456,
        date: '2024-01-15T10:00:00Z',
        username: 'crypto_trader',
        user_is_bot: false,
        user_is_spammer: false,
        sender_type: 'user',
        message_type: 'text',
        spam_flag: false
      }
    ];
  }

  public async searchMessages(params: Types.SearchMessagesParams): Promise<Types.SearchMessagesResponse> {
    return [
      {
        id: 1,
        chat_id: 123456789,
        text: 'Bitcoin analysis',
        user_id: 123456,
        date: '2024-01-15T10:00:00Z',
        username: 'crypto_trader',
        user_is_bot: false,
        user_is_spammer: false,
        sender_type: 'user',
        message_type: 'text',
        spam_flag: false
      }
    ];
  }

  public async getMessagesWithinTimeframe(params?: Types.GetMessagesWithinTimeframeParams): Promise<Types.GetMessagesWithinTimeframeResponse> {
    return [
      {
        id: 1,
        chat_id: 123456789,
        text: 'Market update',
        user_id: 123456,
        date: '2024-01-15T10:00:00Z',
        username: 'crypto_trader',
        user_is_bot: false,
        user_is_spammer: false,
        sender_type: 'user',
        message_type: 'text',
        spam_flag: false
      }
    ];
  }

  public async getMessagesForUser(params: Types.GetMessagesForUserParams): Promise<Types.GetMessagesForUserResponse> {
    return [
      {
        id: 1,
        chat_id: 123456789,
        text: 'User message',
        user_id: params.user_id || 123456,
        date: '2024-01-15T10:00:00Z',
        username: 'crypto_trader',
        user_is_bot: false,
        user_is_spammer: false,
        sender_type: 'user',
        message_type: 'text',
        spam_flag: false
      }
    ];
  }

  // --- Coins ---
  public async searchCoins(params?: Types.SearchCoinsParams): Promise<Types.SearchCoinsResponse> {
    return [
      {
        id: 'bitcoin',
        symbol: 'BTC',
        name: 'Bitcoin',
        market_cap: 800000000000,
        market_cap_rank: 1,
        fully_diluted_valuation: 850000000000,
        circulating_supply: 19500000,
        total_supply: 21000000,
        max_supply: 21000000,
        last_updated: '2024-01-15T10:00:00.000Z'
      }
    ];
  }

  public async getPlatforms(): Promise<Types.GetPlatformsResponse> {
    return [
      'ethereum',
      'polygon',
      'binance-smart-chain',
      'avalanche'
    ];
  }

  public async getCoinDetails(params?: Types.GetCoinDetailsParams): Promise<Types.GetCoinDetailsResponse> {
    return {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      web_slug: 'bitcoin',
      asset_platform_id: null,
      platforms: {},
      detail_platforms: {},
      block_time_in_minutes: 10,
      hashing_algorithm: 'SHA-256',
      categories: ['Cryptocurrency'],
      preview_listing: false,
      public_notice: null,
      additional_notices: [],
      description: {
        en: 'Bitcoin is a decentralized digital currency'
      },
      links: {
        homepage: ['https://bitcoin.org'],
        whitepaper: 'https://bitcoin.org/bitcoin.pdf',
        blockchain_site: ['https://blockchair.com/bitcoin'],
        official_forum_url: ['https://bitcointalk.org'],
        chat_url: [],
        announcement_url: [],
        twitter_screen_name: 'bitcoin',
        facebook_username: '',
        telegram_channel_identifier: '',
        subreddit_url: 'https://www.reddit.com/r/Bitcoin/',
        repos_url: {
          github: ['https://github.com/bitcoin/bitcoin'],
          bitbucket: []
        }
      },
      image: {
        thumb: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png',
        small: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
        large: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
      },
      country_origin: '',
      genesis_date: '2009-01-03',
      sentiment_votes_up_percentage: 75.5,
      sentiment_votes_down_percentage: 24.5,
      market_cap_rank: 1,
      community_data: {
        twitter_followers: 5500000,
        reddit_subscribers: 4800000,
        telegram_channel_user_count: null
      },
      developer_data: {
        forks: 35000,
        stars: 75000,
        subscribers: 4200,
        total_issues: 7500,
        closed_issues: 7200,
        pull_requests_merged: 15000,
        pull_request_contributors: 850,
        code_additions_deletions_4_weeks: {
          additions: 15000,
          deletions: 8500
        },
        commit_count_4_weeks: 125,
      },
      last_updated: '2024-01-15T10:00:00.000Z',
    };
  }

  // --- Chats ---
  public async getChatByUsername(params: Types.GetChatByUsernameParams): Promise<Types.GetChatByUsernameResponse> {
    return {
      group_username: params.group_username,
      chat_id: 123456789,
      title: 'Bitcoin Discussion',
      member_count: 1500,
      description: 'Bitcoin trading and analysis group'
    };
  }

  // --- Alerts & Categories (Legacy) ---
  public async getTopAlertsToday(): Promise<Types.GetTopAlertsTodayResponse> {
    return [
      {
        category: 'DeFi',
        symbol: 'BTC',
        name: 'Bitcoin',
        score: 85.5,
        technical_indicator_score: 80.2,
        social_indicator_score: 90.8,
        day_trend: 5.2,
        day_perc_diff: 3.4,
        social_mentions: 1250,
        mentions_ma: 1100,
        mentions_upper_band: 1400,
        price_momentum: 0.75,
        price_pct_change: 2.3,
        volume_pct_change: 15.7
      }
    ];
  }

  public async getTopCategoriesToday(): Promise<Types.GetTopCategoriesTodayResponse> {
    return [
      { category: 'DeFi' },
      { category: 'NFT' },
      { category: 'Layer 1' }
    ];
  }

  public async getTopCategoryAlerts(): Promise<Types.GetTopCategoryAlertsResponse> {
    return [
      {
        category: 'DeFi',
        symbol: 'UNI',
        name: 'Uniswap',
        score: 75.2,
        technical_indicator_score: 70.5,
        social_indicator_score: 80.0,
        day_trend: 3.1,
        day_perc_diff: 2.8,
        social_mentions: 850,
        mentions_ma: 800,
        mentions_upper_band: 1000,
        price_momentum: 0.65,
        price_pct_change: 1.8,
        volume_pct_change: 12.3
      }
    ];
  }

  public async getCategoryCoins(params: Types.GetCategoryCoinsParams): Promise<Types.GetCategoryCoinsResponse> {
    return {
      category_name: params.category_name,
      coins: [
        {
          coin_id: 'bitcoin',
          name: 'Bitcoin',
          symbol: 'BTC',
        }
      ]
    };
  }

  public async getCategoryCoinsLegacy(params: Types.GetCategoryCoinsLegacyParams): Promise<Types.GetCategoryCoinsLegacyResponse> {
    return {
      category_name: params.category_name,
      coins: [
        {
          coin_id: 'bitcoin',
          name: 'Bitcoin',
          symbol: 'BTC',
        }
      ]
    };
  }

  // --- Groups ---
  public async getGroupsServiceStatus(): Promise<Types.GetGroupsServiceStatusResponse> {
    return {
      message: 'Service is operational',
      status: 'operational'
    };
  }

  public async getSpecificGroup(params: Types.GetSpecificGroupParams): Promise<Types.GetSpecificGroupResponse> {
    return {
      group_username: params.group_username,
      title: 'Crypto Group',
      member_count: 1000,
      message: 'Group found successfully',
      status: 'operational'
    };
  }

  public async addNewGroup(body: Types.AddNewGroupRequest): Promise<Types.AddNewGroupResponse> {
    return {
      message: 'Group added successfully'
    };
  }

  public async getAllGroups(): Promise<Types.GetAllGroupsResponse> {
    return [
      {
        group_username: 'bitcoin_group',
        chat_id: 123456789,
        title: 'Bitcoin Discussion',
        member_count: 1500,
        num_messages: 5000,
        num_unique_users: 850,
        member_online_count: 125,
      }
    ];
  }

  // --- Status ---
  public async getGeneralStatus(): Promise<Types.GetGeneralStatusResponse> {
    return {
      status: 'operational',
      uptime: '99.9%',
      last_updated: '2024-01-15T10:00:00Z'
    };
  }
}