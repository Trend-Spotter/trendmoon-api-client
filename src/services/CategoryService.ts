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
   * Retrieves a list of all available categories.
   * @returns Promise resolving to all available categories
   */
  public async getAllCategories(): Promise<Types.GetAllCategoriesResponse> {
    return this.apiClient.getAllCategories();
  }
}