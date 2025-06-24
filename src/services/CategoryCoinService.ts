import { TrendmoonApiClient } from '../api/TrendmoonApiClient.js';
import * as Types from '../types/ResponseAndParams.js';

/**
 * CategoryCoinService handles category-coin relationship operations
 * Provides methods for retrieving coins within specific categories
 */
export class CategoryCoinService {
  private apiClient: TrendmoonApiClient;

  constructor(apiClient: TrendmoonApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Retrieves coins within a specific category (legacy endpoint).
   * @param params - Parameters for getting category coins (legacy)
   * @returns Promise resolving to coins in the specified category
   * @deprecated Use getCategoryCoins instead
   */
  public async getCategoryCoinsLegacy(params: Types.GetCategoryCoinsLegacyParams): Promise<Types.GetCategoryCoinsLegacyResponse> {
    return this.apiClient.getCategoryCoinsLegacy(params);
  }

  /**
   * Retrieves coins within a specific category.
   * @param params - Parameters for getting category coins
   * @returns Promise resolving to coins in the specified category
   */
  public async getCategoryCoins(params: Types.GetCategoryCoinsParams): Promise<Types.GetCategoryCoinsResponse> {
    return this.apiClient.getCategoryCoins(params);
  }
}