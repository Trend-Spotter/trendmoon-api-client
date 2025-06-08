import { TrendmoonApiClient } from '../api/TrendmoonApiClient.js';
import * as Types from '../types/ResponseAndParams.js';

export class CoinService {
  private apiClient: TrendmoonApiClient;

  constructor(apiClient: TrendmoonApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Searches for coins based on various criteria.
   * @param params - Parameters for searching coins.
   */
  public async searchCoins(params?: Types.SearchCoinsParams): Promise<Types.SearchCoinsResponse> {
    return this.apiClient.searchCoins(params);
  }

  /**
   * Retrieves a list of all available platforms for coins.
   */
  public async getPlatforms(): Promise<Types.GetPlatformsResponse> {
    return this.apiClient.getPlatforms();
  }

  /**
   * Retrieves detailed information for a specific coin.
   * @param params - Parameters for getting coin details.
   */
  public async getCoinDetails(params?: Types.GetCoinDetailsParams): Promise<Types.GetCoinDetailsResponse> {
    return this.apiClient.getCoinDetails(params);
  }
}