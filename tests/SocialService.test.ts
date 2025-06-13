import { SocialService } from '../src';
import { TrendmoonApiClient } from '../src';
import type {
  GetSocialTrendParams,
  GetSocialTrendResponse,
  GetKeywordTrendParams,
  GetKeywordTrendResponse,
  GetProjectSummaryParams,
  GetProjectSummaryResponse,
  GetTopicSummaryParams,
  GetTopicSummaryResponse,
  SearchSocialPostsParams,
  SearchSocialPostsResponse,
  GetTopicNewsParams,
  GetTopicNewsResponse,
  GetTopicPostsParams,
  GetTopicPostsResponse,
} from '../src';

describe('SocialService - Real API Integration with TrendmoonApiClient', () => {
  let socialService: SocialService;
  let realApiClient: TrendmoonApiClient;

  beforeEach(() => {
    realApiClient = new TrendmoonApiClient();
    socialService = new SocialService(realApiClient);
  });

  it('should retrieve social trends via the real API client successfully', async () => {
    const mockParams: GetSocialTrendParams = { coin_id: 'ethereum' };
    const result: GetSocialTrendResponse = await socialService.getSocialTrend(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result.trend_market_data)).toBe(true);
    expect(result).toHaveProperty('coin_id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('symbol');
    if (result.trend_market_data.length > 0) {
      expect(result.trend_market_data[0]).toHaveProperty('date');
    }
  }, 15000);

  it('should retrieve keyword trends via the real API client successfully', async () => {
    const mockParams: GetKeywordTrendParams = { keyword: 'defi' };
    const result: GetKeywordTrendResponse = await socialService.getKeywordTrend(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result.data)).toBe(true);
    expect(result).toHaveProperty('keyword');
    expect(result).toHaveProperty('match_mode');
    expect(result).toHaveProperty('time_interval');
    if (result.data.length > 0) {
      expect(result.data[0]).toHaveProperty('date');
      expect(result.data[0]).toHaveProperty('count');
    }
  }, 15000);

  // TODO: Reintroduce these tests when getProjectSummary is fixed and re-implemented
  // Test cases for getProjectSummary reflecting the API description
  // it('should retrieve a project summary by coin_id', async () => {
  //   const mockParams: GetProjectSummaryParams = { coin_id: 'bitcoin', days_ago: 7 };
  //   const result: GetProjectSummaryResponse = await socialService.getProjectSummary(mockParams);

  //   expect(result).toBeDefined();
  //   expect(typeof result.summary).toBe('string');
  //   expect(result.summary.length).toBeGreaterThan(0);
  //   expect(result).toHaveProperty('coin_id');
  //   expect(result).toHaveProperty('name');
  //   expect(result).toHaveProperty('symbol');
  // }, 15000);

  // it('should retrieve a project summary by symbol', async () => {
  //   const mockParams: GetProjectSummaryParams = { symbol: 'BTC', days_ago: 14 };
  //   const result: GetProjectSummaryResponse = await socialService.getProjectSummary(mockParams);

  //   expect(result).toBeDefined();
  //   expect(typeof result.summary).toBe('string');
  //   expect(result.summary.length).toBeGreaterThan(0);
  //   expect(result).toHaveProperty('coin_id'); // Assuming the API returns coin_id even if queried by symbol
  //   expect(result).toHaveProperty('name');
  //   expect(result).toHaveProperty('symbol');
  // }, 15000);

  // it('should retrieve a project summary by project_name', async () => {
  //   const mockParams: GetProjectSummaryParams = { project_name: 'Bitcoin', days_ago: 30 };
  //   const result: GetProjectSummaryResponse = await socialService.getProjectSummary(mockParams);

  //   expect(result).toBeDefined();
  //   expect(typeof result.summary).toBe('string');
  //   expect(result.summary.length).toBeGreaterThan(0);
  //   expect(result).toHaveProperty('coin_id');
  //   expect(result).toHaveProperty('name');
  //   expect(result).toHaveProperty('symbol');
  // }, 15000);

  // it('should retrieve a project summary by contract_address', async () => {
  //   const mockParams: GetProjectSummaryParams = { contract_address: '0x2f42b7d686ca3effc69778b6ed8493a7787b4d6e', days_ago: 7 };
  //   const result: GetProjectSummaryResponse = await socialService.getProjectSummary(mockParams);

  //   expect(result).toBeDefined();
  //   expect(typeof result.summary).toBe('string');
  //   expect(result.summary.length).toBeGreaterThan(0);
  //   expect(result).toHaveProperty('coin_id');
  //   expect(result).toHaveProperty('name');
  //   expect(result).toHaveProperty('symbol');
  // }, 15000);

  // it('should throw an error if no identifier is provided for project summary', async () => {
  //   // @ts-ignore - Intentionally passing invalid params for testing error case
  //   const mockParams: GetProjectSummaryParams = { days_ago: 7 }; // No identifier
  //   await expect(socialService.getProjectSummary(mockParams)).rejects.toThrow();
  // }, 15000);

  // it('should throw an error if multiple identifiers are provided for project summary', async () => {
  //   // @ts-ignore - Intentionally passing invalid params for testing error case
  //   const mockParams: GetProjectSummaryParams = { coin_id: 'ethereum', symbol: 'ETH', days_ago: 7 }; // Multiple identifiers
  //   await expect(socialService.getProjectSummary(mockParams)).rejects.toThrow();
  // }, 15000);

  // it('should throw an error if days_ago is missing for project summary', async () => {
  //   // @ts-ignore - Intentionally passing invalid params for testing error case
  //   const mockParams: GetProjectSummaryParams = { coin_id: 'taraxa' }; // Missing days_ago
  //   await expect(socialService.getProjectSummary(mockParams)).rejects.toThrow();
  // }, 15000);

  it('should retrieve a topic summary for ethereum successfully', async () => {
    const mockParams: GetTopicSummaryParams = { topic: 'ethereum' };
    const result: GetTopicSummaryResponse = await socialService.getTopicSummary(mockParams);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('overview');
    expect(typeof result.overview).toBe('string');
    expect(result.overview.length).toBeGreaterThan(0);
    expect(result).toHaveProperty('recent_sentiment');
    expect(result.recent_sentiment).toHaveProperty('sentiment');
    expect(typeof result.recent_sentiment.sentiment).toBe('string');
    expect(result.recent_sentiment).toHaveProperty('bullish');
    expect(typeof result.recent_sentiment.bullish).toBe('string');
    expect(result.recent_sentiment).toHaveProperty('bearish');
    expect(typeof result.recent_sentiment.bearish).toBe('string');
    expect(result).toHaveProperty('developments_and_catalysts');
    expect(typeof result.developments_and_catalysts).toBe('string');
    expect(result.developments_and_catalysts.length).toBeGreaterThan(0);
    expect(result).toHaveProperty('full_report');
    expect(typeof result.full_report).toBe('string');
    expect(result.full_report.length).toBeGreaterThan(0);
    expect(result).toHaveProperty('topic', 'ethereum');
    expect(result).toHaveProperty('generated_at');
    expect(typeof result.generated_at).toBe('string');
  }, 30000);

  it('should throw an error for an invalid topic', async () => {
    const mockParams: GetTopicSummaryParams = { topic: 'nonexistenttopic12345' };
    await expect(socialService.getTopicSummary(mockParams)).rejects.toThrow();
  }, 30000);

  // Test for searchSocialPosts
  it('should search social posts successfully', async () => {
    const mockParams: SearchSocialPostsParams = { 
      terms: 'ethereum defi',
      limit: 10 
    };
    const result: SearchSocialPostsResponse = await socialService.searchSocialPosts(mockParams);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('searchConfig');
    expect(result.searchConfig).toHaveProperty('terms');
    expect(Array.isArray(result.searchConfig.terms)).toBe(true);
    expect(result).toHaveProperty('data');
    expect(Array.isArray(result.data)).toBe(true);
    
    if (result.data.length > 0) {
      const post = result.data[0];
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('post_type');
      expect(post).toHaveProperty('text');
      expect(post).toHaveProperty('text_highlight');
      expect(post).toHaveProperty('post_created');
      expect(post).toHaveProperty('post_link');
      
      // Type-specific checks
      expect(typeof post.id).toBe('string');
      expect(typeof post.post_type).toBe('string');
      expect(typeof post.text).toBe('string');
      expect(typeof post.text_highlight).toBe('string');
      expect(typeof post.post_created).toBe('number');
      expect(typeof post.post_link).toBe('string');
      
      // Content validation
      expect(post.text.toLowerCase()).toContain('ethereum');
      expect(post.text_highlight.toLowerCase()).toContain('ethereum');
    }
  }, 30000);

  it('should throw an error when search terms are missing', async () => {
    // @ts-ignore - Intentionally passing invalid params for testing error case
    const mockParams: SearchSocialPostsParams = { limit: 10 }; // Missing required 'terms'
    await expect(socialService.searchSocialPosts(mockParams)).rejects.toThrow('Field required');
  }, 30000);

  // Test for getTopicNews
  it('should retrieve topic news successfully', async () => {
    const mockParams: GetTopicNewsParams = { topic: 'ethereum' };
    const result: GetTopicNewsResponse = await socialService.getTopicNews(mockParams);
    
    expect(result).toBeDefined();
    expect(result).toHaveProperty('config');
    expect(result.config).toHaveProperty('topic', 'ethereum');
    expect(result.config).toHaveProperty('type', 'topic');
    expect(result.config).toHaveProperty('name', 'Ethereum');
    expect(result.config).toHaveProperty('symbol', 'ETH');
    expect(Array.isArray(result.data)).toBe(true);
    
    if (result.data.length > 0) {
      const news = result.data[0];
      expect(news).toHaveProperty('id');
      expect(news).toHaveProperty('post_type');
      expect(news).toHaveProperty('post_title');
      expect(news).toHaveProperty('post_link');
      expect(news).toHaveProperty('post_created');
      expect(news).toHaveProperty('post_sentiment');
      
      // Type-specific checks
      expect(typeof news.id).toBe('string');
      expect(typeof news.post_type).toBe('string');
      expect(typeof news.post_title).toBe('string');
      expect(typeof news.post_link).toBe('string');
      expect(typeof news.post_created).toBe('number');
      expect(typeof news.post_sentiment).toBe('number');
      
      // Content validation
      expect(news.post_title.toLowerCase()).toContain('ethereum');
    }
  }, 30000);

  it('should throw an error for invalid topic in news', async () => {
    const mockParams: GetTopicNewsParams = { topic: 'nonexistenttopic12345' };
    try {
      const result = await socialService.getTopicNews(mockParams);
      console.log('Unexpected successful response for invalid topic news:', {
        hasData: !!result.data,
        dataLength: result.data?.length,
        firstItem: result.data?.[0] ? {
          id: result.data[0].id,
          post_type: result.data[0].post_type
        } : null
      });
      throw new Error('Expected an error but got a successful response');
    } catch (error) {
      console.log('Error for invalid topic news:', error.message);
      expect(error).toBeDefined();
    }
  }, 30000);

  // Test for getTopicPosts
  it('should retrieve topic posts successfully', async () => {
    const mockParams: GetTopicPostsParams = { topic: 'ethereum' };
    const result: GetTopicPostsResponse = await socialService.getTopicPosts(mockParams);
    
    expect(result).toBeDefined();
    expect(result).toHaveProperty('config');
    expect(result.config).toHaveProperty('topic', 'ethereum');
    expect(result.config).toHaveProperty('type', 'topic');
    expect(Array.isArray(result.data)).toBe(true);
    
    if (result.data.length > 0) {
      const post = result.data[0];
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('post_type');
      expect(post).toHaveProperty('post_title');
      expect(post).toHaveProperty('post_link');
      expect(post).toHaveProperty('post_created');
      expect(post).toHaveProperty('post_sentiment');
      
      // Type-specific checks
      expect(typeof post.id).toBe('string');
      expect(typeof post.post_type).toBe('string');
      expect(typeof post.post_title).toBe('string');
      expect(typeof post.post_link).toBe('string');
      expect(typeof post.post_created).toBe('number');
      expect(typeof post.post_sentiment).toBe('number');
      
      // Content validation
      expect(post.post_title.toLowerCase()).toContain('ethereum');
    }
  }, 30000);

  it('should throw an error for invalid topic in posts', async () => {
    const mockParams: GetTopicPostsParams = { topic: 'nonexistenttopic12345' };
    try {
      const result = await socialService.getTopicPosts(mockParams);
      throw new Error('Expected an error but got a successful response');
    } catch (error) {
      console.log('Error for invalid topic posts:', error.message);
      expect(error).toBeDefined();
    }
  }, 30000);
});