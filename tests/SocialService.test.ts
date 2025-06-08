import { SocialService } from '../src';
import { TrendmoonApiClient } from '../src';
import type {
  GetSocialTrendParams,
  GetSocialTrendResponse,
  GetKeywordTrendParams,
  GetKeywordTrendResponse,
  GetProjectSummaryParams,
  GetProjectSummaryResponse,
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

  // Test cases for getProjectSummary reflecting the API description
  it('should retrieve a project summary by coin_id', async () => {
    const mockParams: GetProjectSummaryParams = { coin_id: 'bitcoin', days_ago: 7 };
    const result: GetProjectSummaryResponse = await socialService.getProjectSummary(mockParams);

    expect(result).toBeDefined();
    expect(typeof result.summary).toBe('string');
    expect(result.summary.length).toBeGreaterThan(0);
    expect(result).toHaveProperty('coin_id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('symbol');
  }, 15000);

  it('should retrieve a project summary by symbol', async () => {
    const mockParams: GetProjectSummaryParams = { symbol: 'BTC', days_ago: 14 };
    const result: GetProjectSummaryResponse = await socialService.getProjectSummary(mockParams);

    expect(result).toBeDefined();
    expect(typeof result.summary).toBe('string');
    expect(result.summary.length).toBeGreaterThan(0);
    expect(result).toHaveProperty('coin_id'); // Assuming the API returns coin_id even if queried by symbol
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('symbol');
  }, 15000);

  it('should retrieve a project summary by project_name', async () => {
    const mockParams: GetProjectSummaryParams = { project_name: 'Bitcoin', days_ago: 30 };
    const result: GetProjectSummaryResponse = await socialService.getProjectSummary(mockParams);

    expect(result).toBeDefined();
    expect(typeof result.summary).toBe('string');
    expect(result.summary.length).toBeGreaterThan(0);
    expect(result).toHaveProperty('coin_id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('symbol');
  }, 15000);

  it('should retrieve a project summary by contract_address', async () => {
    const mockParams: GetProjectSummaryParams = { contract_address: '0x2f42b7d686ca3effc69778b6ed8493a7787b4d6e', days_ago: 7 };
    const result: GetProjectSummaryResponse = await socialService.getProjectSummary(mockParams);

    expect(result).toBeDefined();
    expect(typeof result.summary).toBe('string');
    expect(result.summary.length).toBeGreaterThan(0);
    expect(result).toHaveProperty('coin_id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('symbol');
  }, 15000);

  it('should throw an error if no identifier is provided for project summary', async () => {
    // @ts-ignore - Intentionally passing invalid params for testing error case
    const mockParams: GetProjectSummaryParams = { days_ago: 7 }; // No identifier
    await expect(socialService.getProjectSummary(mockParams)).rejects.toThrow();
  }, 15000);

  it('should throw an error if multiple identifiers are provided for project summary', async () => {
    // @ts-ignore - Intentionally passing invalid params for testing error case
    const mockParams: GetProjectSummaryParams = { coin_id: 'ethereum', symbol: 'ETH', days_ago: 7 }; // Multiple identifiers
    await expect(socialService.getProjectSummary(mockParams)).rejects.toThrow();
  }, 15000);

  it('should throw an error if days_ago is missing for project summary', async () => {
    // @ts-ignore - Intentionally passing invalid params for testing error case
    const mockParams: GetProjectSummaryParams = { coin_id: 'taraxa' }; // Missing days_ago
    await expect(socialService.getProjectSummary(mockParams)).rejects.toThrow();
  }, 15000);
});