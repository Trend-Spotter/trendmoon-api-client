import { describe, it, expect, beforeEach } from 'vitest';
import { CategoryService } from '../src';
import { TrendmoonApiClient } from '../src';
import type {
  GetCategoryDominanceForAssetsParams,
  GetCategoryDominanceForAssetsResponse,
  GetAllCategoriesResponse,
  GetTopCategoriesTodayResponse,
  GetCategoryCoinsLegacyParams,
  GetCategoryCoinsLegacyResponse,
  GetCategoryCoinsParams,
  GetCategoryCoinsResponse,
} from '../src';

import type { CategoryDominance } from '../src';

describe('CategoryService - Real API Integration with TrendmoonApiClient', () => {
  let categoryService: CategoryService;
  let realApiClient: TrendmoonApiClient;

  beforeEach(() => {
    realApiClient = new TrendmoonApiClient();
    categoryService = new CategoryService(realApiClient);
  });

  it('should retrieve all categories successfully and contain popular ones', async () => {
    const result: GetAllCategoriesResponse = await categoryService.getAllCategories();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    expect(result).toContain('Meme');
  }, 15000);

  it('should retrieve category dominance for assets successfully with detailed metrics', async () => {
    const mockParams: GetCategoryDominanceForAssetsParams = { category_name: ['Meme', 'Decentralized Finance (DeFi)'], duration: 30 };
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

  it('should retrieve top categories for today successfully', async () => {
    const result: GetTopCategoriesTodayResponse = await categoryService.getTopCategoriesToday();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      const firstCategory = result[0]!;

      expect(firstCategory).toHaveProperty('category_name');
      expect(firstCategory).toHaveProperty('score');
    }
  }, 15000);

  it('should retrieve coins within a specific category (legacy) successfully', async () => {
    const mockParams: GetCategoryCoinsLegacyParams = { category_name: 'Layer 1', top_n: 5 };
    const result: GetCategoryCoinsLegacyResponse = await categoryService.getCategoryCoinsLegacy(mockParams);

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
    const result: GetCategoryCoinsResponse = await categoryService.getCategoryCoins(mockParams);

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
    const result: GetCategoryCoinsResponse = await categoryService.getCategoryCoins(mockParams);
    expect(result).toBeDefined();
    expect(result.coins).toEqual([]);
    expect(result.category_name).toEqual('NonExistentCategory123');
  }, 15000);
});