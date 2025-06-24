import { CategoryCoinService } from '../src';
import { MockTrendmoonApiClient } from './mocks';
import type {
  GetCategoryCoinsParams,
  GetCategoryCoinsResponse,
  GetCategoryCoinsLegacyParams,
  GetCategoryCoinsLegacyResponse,
} from '../src';

describe('CategoryCoinService - Mock Tests', () => {
  let categoryCoinService: CategoryCoinService;
  let mockApiClient: MockTrendmoonApiClient;

  beforeEach(() => {
    mockApiClient = new MockTrendmoonApiClient();
    // @ts-ignore - MockTrendmoonApiClient has same interface as TrendmoonApiClient
    categoryCoinService = new CategoryCoinService(mockApiClient);
  });

  describe('getCategoryCoins', () => {
    it('should retrieve coins within a specific category successfully', async () => {
      const params: GetCategoryCoinsParams = {
        category_name: 'DeFi'
      };
      
      const result: GetCategoryCoinsResponse = await categoryCoinService.getCategoryCoins(params);
      
      expect(result).toBeDefined();
      expect(result.coins).toBeInstanceOf(Array);
      expect(result.coins.length).toBeGreaterThan(0);
      expect(result.coins[0]).toHaveProperty('coin_id');
      expect(result.coins[0]).toHaveProperty('symbol');
      expect(result.coins[0]).toHaveProperty('name');
      expect(result.category_name).toBe('DeFi');
    });

    it('should handle different category types', async () => {
      const params: GetCategoryCoinsParams = {
        category_name: 'NFT'
      };
      
      const result: GetCategoryCoinsResponse = await categoryCoinService.getCategoryCoins(params);
      
      expect(result).toBeDefined();
      expect(result.coins).toBeInstanceOf(Array);
    });
  });

  describe('getCategoryCoinsLegacy', () => {
    it('should retrieve coins within a specific category (legacy) successfully', async () => {
      const params: GetCategoryCoinsLegacyParams = {
        category_name: 'DeFi'
      };
      
      const result: GetCategoryCoinsLegacyResponse = await categoryCoinService.getCategoryCoinsLegacy(params);
      
      expect(result).toBeDefined();
      expect(result.coins).toBeInstanceOf(Array);
      expect(result.coins.length).toBeGreaterThan(0);
      expect(result.coins[0]).toHaveProperty('coin_id');
      expect(result.coins[0]).toHaveProperty('symbol');
      expect(result.coins[0]).toHaveProperty('name');
      expect(result.category_name).toBe('DeFi');
    });

    it('should handle legacy endpoint parameters', async () => {
      const params: GetCategoryCoinsLegacyParams = {
        category_name: 'Layer 1'
      };
      
      const result: GetCategoryCoinsLegacyResponse = await categoryCoinService.getCategoryCoinsLegacy(params);
      
      expect(result).toBeDefined();
      expect(result.coins).toBeInstanceOf(Array);
    });
  });
});