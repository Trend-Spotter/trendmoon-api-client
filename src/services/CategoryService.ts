import { TrendmoonApiClient } from '../api/TrendmoonApiClient.js';
import * as Types from '../types/ResponseAndParams.js';

/**
 * CategoryService handles core category operations
 * Focused on category data and dominance analysis
 */
export class CategoryService {
  private apiClient: TrendmoonApiClient;

  constructor(apiClient: TrendmoonApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Retrieves category dominance data for assets.
   * @param params - Parameters for getting category dominance
   * @returns Promise resolving to category dominance data
   */
  public async getCategoryDominanceForAssets(params?: Types.GetCategoryDominanceForAssetsParams): Promise<Types.GetCategoryDominanceForAssetsResponse> {
    return this.apiClient.getCategoryDominanceForAssets(params);
  }

  /**
   * Retrieves top categories by market performance for the last day with pagination support.
   * @param params - Parameters for getting top categories dominance with sorting and pagination
   * @returns Promise resolving to top categories dominance data
   */
  public async getTopCategoriesDominance(params?: Types.GetTopCategoriesDominanceParams): Promise<Types.GetTopCategoriesDominanceResponse> {
    return this.apiClient.getTopCategoriesDominance(params);
  }

  /**
   * Retrieves a list of all available categories.
   * @returns Promise resolving to all available categories
   */
  public async getAllCategories(): Promise<Types.GetAllCategoriesResponse> {
    return this.apiClient.getAllCategories();
  }
}