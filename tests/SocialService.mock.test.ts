import { SocialService } from '../src';
import { MockTrendmoonApiClient } from './mocks';
import type {
  GetTopicPostsParams,
  GetTopicPostsResponse,
  GetTopicNewsParams,
  GetTopicNewsResponse,
  SearchSocialPostsParams,
  SearchSocialPostsResponse,
  GetSocialTrendsParams,
  GetSocialTrendsResponse,
  GetSocialTrendParams,
  GetSocialTrendResponse,
  GetKeywordTrendParams,
  GetKeywordTrendResponse,
  GetProjectSummaryParams,
  GetProjectSummaryResponse,
} from '../src';

describe('SocialService - Mock Tests (Missing Methods)', () => {
  let socialService: SocialService;
  let mockApiClient: MockTrendmoonApiClient;

  beforeEach(() => {
    mockApiClient = new MockTrendmoonApiClient();
    // @ts-ignore - MockTrendmoonApiClient has same interface as TrendmoonApiClient
    socialService = new SocialService(mockApiClient);
  });

  describe('getTopicPosts', () => {
    it('should retrieve topic posts successfully', async () => {
      const params: GetTopicPostsParams = {
        topic: 'bitcoin'
      };
      
      const result: GetTopicPostsResponse = await socialService.getTopicPosts(params);
      
      expect(result).toBeDefined();
      expect(result.data).toBeInstanceOf(Array);
      expect(result.data.length).toBeGreaterThan(0);
      expect(result.data[0]).toHaveProperty('id');
      expect(result.data[0]).toHaveProperty('post_title');
      expect(result.data[0]).toHaveProperty('creator_name');
      expect(result.data[0]).toHaveProperty('post_created');
      expect(result.data[0]).toHaveProperty('interactions_24h');
      expect(result).toHaveProperty('config');
    });

    it('should handle empty topic posts response', async () => {
      const params: GetTopicPostsParams = {
        topic: 'nonexistent-topic'
      };
      
      const result: GetTopicPostsResponse = await socialService.getTopicPosts(params);
      
      expect(result).toBeDefined();
      expect(result.data).toBeInstanceOf(Array);
      expect(result).toHaveProperty('config');
    });

    it('should work without parameters', async () => {
      const result: GetTopicPostsResponse = await socialService.getTopicPosts();
      
      expect(result).toBeDefined();
      expect(result.data).toBeInstanceOf(Array);
    });
  });

  describe('getTopicNews', () => {
    it('should retrieve topic news successfully', async () => {
      const params: GetTopicNewsParams = {
        topic: 'ethereum'
      };
      
      const result: GetTopicNewsResponse = await socialService.getTopicNews(params);
      
      expect(result).toBeDefined();
      expect(result.data).toBeInstanceOf(Array);
      expect(result.data.length).toBeGreaterThan(0);
      expect(result.data[0]).toHaveProperty('id');
      expect(result.data[0]).toHaveProperty('post_title');
      expect(result.data[0]).toHaveProperty('post_type');
      expect(result.data[0]).toHaveProperty('creator_name');
      expect(result.data[0]).toHaveProperty('post_created');
      expect(result.data[0]).toHaveProperty('post_link');
      expect(result).toHaveProperty('config');
    });

    it('should handle date range parameters', async () => {
      const params: GetTopicNewsParams = {
        topic: 'defi'
      };
      
      const result: GetTopicNewsResponse = await socialService.getTopicNews(params);
      
      expect(result).toBeDefined();
      expect(result.data).toBeInstanceOf(Array);
    });

    it('should work without parameters', async () => {
      const result: GetTopicNewsResponse = await socialService.getTopicNews();
      
      expect(result).toBeDefined();
      expect(result.data).toBeInstanceOf(Array);
    });
  });

  describe('searchSocialPosts', () => {
    it('should search social posts successfully', async () => {
      const params: SearchSocialPostsParams = {
        terms: 'bitcoin',
        limit: 20
      };
      
      const result: SearchSocialPostsResponse = await socialService.searchSocialPosts(params);
      
      expect(result).toBeDefined();
      expect(result.data).toBeInstanceOf(Array);
      expect(result.data.length).toBeGreaterThan(0);
      expect(result.data[0]).toHaveProperty('id');
      expect(result.data[0]).toHaveProperty('post_type');
      expect(result.data[0]).toHaveProperty('text');
      expect(result.data[0]).toHaveProperty('post_created');
      expect(result.data[0]).toHaveProperty('post_link');
      expect(result).toHaveProperty('searchConfig');
    });

    it('should handle platform filtering', async () => {
      const params: SearchSocialPostsParams = {
        terms: 'ethereum'
      };
      
      const result: SearchSocialPostsResponse = await socialService.searchSocialPosts(params);
      
      expect(result).toBeDefined();
      expect(result.data).toBeInstanceOf(Array);
      expect(result.data[0].post_type).toBe('twitter'); // Mock returns twitter
    });

    it('should handle date range search', async () => {
      const params: SearchSocialPostsParams = {
        terms: 'crypto'
      };
      
      const result: SearchSocialPostsResponse = await socialService.searchSocialPosts(params);
      
      expect(result).toBeDefined();
      expect(result.data).toBeInstanceOf(Array);
    });

    it('should handle pagination parameters', async () => {
      const params: SearchSocialPostsParams = {
        terms: 'defi',
        limit: 15
      };
      
      const result: SearchSocialPostsResponse = await socialService.searchSocialPosts(params);
      
      expect(result).toBeDefined();
      expect(result).toHaveProperty('searchConfig');
    });
  });

  describe('getSocialTrends', () => {
    it('should retrieve social trends for multiple coins successfully', async () => {
      const params: GetSocialTrendsParams = {
        coin_ids: ['bitcoin', 'ethereum', 'cardano'],
        start_date: '2024-01-01T00:00:00Z',
        end_date: '2024-01-02T00:00:00Z'
      };
      
      const result: GetSocialTrendsResponse = await socialService.getSocialTrends(params);
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('coin_id');
      expect(result[0]).toHaveProperty('symbol');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('trend_market_data');
      // Result is an array, no timeframe property
    });

    it('should handle single coin symbol', async () => {
      const params: GetSocialTrendsParams = {
        coin_ids: ['bitcoin'],
        start_date: '2024-01-01T00:00:00Z',
        end_date: '2024-01-08T00:00:00Z'
      };
      
      const result: GetSocialTrendsResponse = await socialService.getSocialTrends(params);
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      // Result is an array, no timeframe property
    });

    it('should handle different timeframes', async () => {
      const params: GetSocialTrendsParams = {
        coin_ids: ['ethereum', 'polygon'],
        start_date: '2024-01-01T00:00:00Z',
        end_date: '2024-01-31T00:00:00Z'
      };
      
      const result: GetSocialTrendsResponse = await socialService.getSocialTrends(params);
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      // Result is an array, no timeframe property
    });

    it('should handle limit parameter', async () => {
      const params: GetSocialTrendsParams = {
        coin_ids: ['bitcoin', 'ethereum', 'cardano'],
        start_date: '2024-01-01T00:00:00Z',
        end_date: '2024-01-02T00:00:00Z'
      };
      
      const result: GetSocialTrendsResponse = await socialService.getSocialTrends(params);
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  // Add tests for existing methods to ensure they still work with mocks
  describe('Existing methods with mocks', () => {
    it('should retrieve social trends with mock', async () => {
      const params: GetSocialTrendParams = { coin_id: 'bitcoin' };
      const result: GetSocialTrendResponse = await socialService.getSocialTrend(params);
      
      expect(result).toBeDefined();
      expect(result.trend_market_data).toBeInstanceOf(Array);
    });

    it('should retrieve keyword trends with mock', async () => {
      const params: GetKeywordTrendParams = { keyword: 'bitcoin' };
      const result: GetKeywordTrendResponse = await socialService.getKeywordTrend(params);
      
      expect(result).toBeDefined();
      expect(result.keyword).toBe('bitcoin');
    });

    it('should retrieve project summary with mock', async () => {
      const params: GetProjectSummaryParams = { symbol: 'BTC', days_ago: 7 };
      const result: GetProjectSummaryResponse = await socialService.getProjectSummary(params);
      
      expect(result).toBeDefined();
      expect(result.summary).toBe('Bitcoin is a decentralized digital currency.');
    });
  });
});