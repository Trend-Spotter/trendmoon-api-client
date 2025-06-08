import { TrendmoonApiClient } from '../api/TrendmoonApiClient.js';
import * as Types from '../types/ResponseAndParams.js';

export class CategoryService {
  private apiClient: TrendmoonApiClient;

  constructor(apiClient: TrendmoonApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Retrieves category dominance data for assets.
   * @param params - Parameters for getting category dominance.
   */
  public async getCategoryDominanceForAssets(params?: Types.GetCategoryDominanceForAssetsParams): Promise<Types.GetCategoryDominanceForAssetsResponse> {
    return this.apiClient.getCategoryDominanceForAssets(params);
  }

  /**
   * Retrieves a list of all available categories.
   */
  public async getAllCategories(): Promise<Types.GetAllCategoriesResponse> {
    return this.apiClient.getAllCategories();
  }

  /**
   * Retrieves top alerts for today.
   */
  public async getTopAlertsToday(): Promise<Types.GetTopAlertsTodayResponse> {
    return this.apiClient.getTopAlertsToday();
  }

  /**
   * Retrieves top categories for today.
   */
  public async getTopCategoriesToday(): Promise<Types.GetTopCategoriesTodayResponse> {
    return this.apiClient.getTopCategoriesToday();
  }

  /**
   * Retrieves top category alerts.
   */
  public async getTopCategoryAlerts(): Promise<Types.GetTopCategoryAlertsResponse> {
    return this.apiClient.getTopCategoryAlerts();
  }

  /**
   * Retrieves coins within a specific category (legacy endpoint).
   * @param params - Parameters for getting category coins (legacy).
   */
  public async getCategoryCoinsLegacy(params: Types.GetCategoryCoinsLegacyParams): Promise<Types.GetCategoryCoinsLegacyResponse> {
    return this.apiClient.getCategoryCoinsLegacy(params);
  }

  /**
   * Retrieves coins within a specific category.
   * @param params - Parameters for getting category coins.
   */
  public async getCategoryCoins(params: Types.GetCategoryCoinsParams): Promise<Types.GetCategoryCoinsResponse> {
    return this.apiClient.getCategoryCoins(params);
  }
}