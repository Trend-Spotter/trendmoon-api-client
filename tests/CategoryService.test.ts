import { CategoryService, AlertService, CategoryCoinService } from '../src';
import { TrendmoonApiClient } from '../src';
import type {
  GetCategoryDominanceForAssetsParams,
  GetCategoryDominanceForAssetsResponse,
  GetTopCategoriesDominanceParams,
  GetTopCategoriesDominanceResponse,
  GetAllCategoriesResponse,
  GetTopAlertsTodayResponse,
  GetTopCategoriesTodayResponse,
  GetTopCategoryAlertsResponse,
  GetCategoryCoinsLegacyParams,
  GetCategoryCoinsLegacyResponse,
  GetCategoryCoinsParams,
  GetCategoryCoinsResponse,
} from '../src';

import type { CategoryDominance, CategoryDominanceResponse, TopAlertsResponse } from '../src';


describe('CategoryService - Real API Integration with TrendmoonApiClient', () => {
  let categoryService: CategoryService;
  let alertService: AlertService;
  let categoryCoinService: CategoryCoinService;
  let realApiClient: TrendmoonApiClient;

  beforeEach(() => {
    realApiClient = new TrendmoonApiClient();
    categoryService = new CategoryService(realApiClient);
    alertService = new AlertService(realApiClient);
    categoryCoinService = new CategoryCoinService(realApiClient);
  });

  it('should retrieve all categories successfully and contain popular ones', async () => {
    const result: GetAllCategoriesResponse = await categoryService.getAllCategories();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    expect(result).toContain('Meme');
  }, 15000);

  it('should retrieve category dominance for assets successfully with detailed metrics', async () => {
    const mockParams: GetCategoryDominanceForAssetsParams = { category_name: ['Meme', 'DeFi'], duration: 30 };
    const result: GetCategoryDominanceForAssetsResponse = await categoryService.getCategoryDominanceForAssets(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    if (result.length > 0) {
      const firstRecord: CategoryDominance = result[0]!;
      expect(firstRecord).toHaveProperty('category_name');
      expect(typeof firstRecord.category_name).toBe('string');
      expect(firstRecord).toHaveProperty('date');
      expect(typeof firstRecord.date).toBe('string');

      expect(firstRecord).toHaveProperty('category_dominance');
      expect(typeof firstRecord.category_dominance).toBe('number');
      if (firstRecord.category_market_cap !== undefined && firstRecord.category_market_cap !== null) {
        expect(typeof firstRecord.category_market_cap).toBe('number');
      }
      if (firstRecord.dominance_pct_change !== undefined && firstRecord.dominance_pct_change !== null) {
        expect(typeof firstRecord.dominance_pct_change).toBe('number');
      }
      if (firstRecord.market_cap_pct_change !== undefined && firstRecord.market_cap_pct_change !== null) {
        expect(typeof firstRecord.market_cap_pct_change).toBe('number');
      }
    }
  }, 15000);

  it('should retrieve top categories dominance successfully with detailed metrics', async () => {
    const mockParams: GetTopCategoriesDominanceParams = { from_: 0, size: 10, sort_by: 'category_market_cap', sort_order: 'desc' };
    const result: GetTopCategoriesDominanceResponse = await categoryService.getTopCategoriesDominance(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    if (result.length > 0) {
      const firstRecord: CategoryDominanceResponse = result[0]!;
      expect(firstRecord).toHaveProperty('category_name');
      expect(typeof firstRecord.category_name).toBe('string');
      expect(firstRecord).toHaveProperty('date');
      expect(typeof firstRecord.date).toBe('string');

      expect(firstRecord).toHaveProperty('category_mindshare_dominance');
      expect(typeof firstRecord.category_mindshare_dominance).toBe('number');
      if (firstRecord.category_market_cap !== undefined && firstRecord.category_market_cap !== null) {
        expect(typeof firstRecord.category_market_cap).toBe('number');
      }
      if (firstRecord.category_mindshare_pct_change !== undefined && firstRecord.category_mindshare_pct_change !== null) {
        expect(typeof firstRecord.category_mindshare_pct_change).toBe('number');
      }
      if (firstRecord.market_cap_pct_change !== undefined && firstRecord.market_cap_pct_change !== null) {
        expect(typeof firstRecord.market_cap_pct_change).toBe('number');
      }
    }
  }, 15000);

  it('should retrieve top categories dominance with different sorting options', async () => {
    const mockParams: GetTopCategoriesDominanceParams = { from_: 0, size: 5, sort_by: 'category_mindshare_dominance', sort_order: 'desc' };
    const result: GetTopCategoriesDominanceResponse = await categoryService.getTopCategoriesDominance(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(5);
  }, 15000);

  it('should retrieve top alerts for today successfully', async () => {
    const result: GetTopAlertsTodayResponse = await alertService.getTopAlertsToday();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      const firstAlert: TopAlertsResponse = result[0]!;
      expect(firstAlert).toHaveProperty('category');
      expect(firstAlert).toHaveProperty('symbol');
      expect(firstAlert).toHaveProperty('name');
      expect(firstAlert).toHaveProperty('score');
    }
  }, 15000);

  it('should retrieve top categories for today successfully', async () => {
    const result: GetTopCategoriesTodayResponse = await alertService.getTopCategoriesToday();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      const firstCategory = result[0]!;

      expect(firstCategory).toHaveProperty('category_name');
      expect(firstCategory).toHaveProperty('score');
    }
  }, 15000);

  it('should retrieve top category alerts successfully', async () => {
    const result: GetTopCategoryAlertsResponse = await alertService.getTopCategoryAlerts();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      const firstCategoryAlert: TopAlertsResponse = result[0]!;
      expect(firstCategoryAlert).toHaveProperty('category');
      expect(firstCategoryAlert).toHaveProperty('symbol');
      expect(firstCategoryAlert).toHaveProperty('name');
      expect(firstCategoryAlert).toHaveProperty('score');
    }
  }, 15000);

  it('should retrieve coins within a specific category (legacy) successfully', async () => {
    const mockParams: GetCategoryCoinsLegacyParams = { category_name: 'Layer 1', top_n: 5 };
    const result: GetCategoryCoinsLegacyResponse = await categoryCoinService.getCategoryCoinsLegacy(mockParams);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('category_name');
    expect(Array.isArray(result.coins)).toBe(true);
    if (result.coins.length > 0) {
      const firstCoin = result.coins[0]!;
      expect(firstCoin).toHaveProperty('coin_id');
      expect(firstCoin).toHaveProperty('name');
    }
  }, 15000);

  it('should retrieve coins within a specific category successfully', async () => {
    const mockParams: GetCategoryCoinsParams = { category_name: 'DeFi', top_n: 5 };
    const result: GetCategoryCoinsResponse = await categoryCoinService.getCategoryCoins(mockParams);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('category_name');
    expect(Array.isArray(result.coins)).toBe(true);
    if (result.coins.length > 0) {
      const firstCoin = result.coins[0]!;
      expect(firstCoin).toHaveProperty('coin_id');
      expect(firstCoin).toHaveProperty('name');
    }
  }, 15000);

  it('should handle non-existent category gracefully for getCategoryCoins', async () => {
    const mockParams: GetCategoryCoinsParams = { category_name: 'NonExistentCategory123', top_n: 1 };
    const result: GetCategoryCoinsResponse = await categoryCoinService.getCategoryCoins(mockParams);
    expect(result).toBeDefined();
    expect(result.coins).toEqual([]);
    expect(result.category_name).toEqual('NonExistentCategory123');
  }, 15000);
});