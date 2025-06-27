import { TrendmoonApiClient } from '../api/TrendmoonApiClient.js';
import * as Types from '../types/ResponseAndParams.js';

export class CoinService {
  private apiClient: TrendmoonApiClient;

  constructor(apiClient: TrendmoonApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Searches for coins using a single query field that searches both name and symbol.
   * Just like CoinGecko's search - type 'bitcoin', 'BTC', 'ethereum', 'ETH', etc.
   * Results are automatically ranked by relevance and market cap.
   * 
   * Examples:
   * - query="bitcoin" → finds Bitcoin, Bitcoin Cash, etc.
   * - query="BTC" → finds Bitcoin (highest market cap BTC)
   * - query="uni" → finds Uniswap and other UNI tokens
   * - query="MOON" → finds all MOON tokens sorted by market cap
   * 
   * Additional filters can be combined:
   * - chain: Filter by blockchain (e.g., ethereum, polygon)
   * - category: Filter by category (e.g., defi, gaming)
   * - contract_address: Find specific token by address
   * - group_username: Find by Telegram group
   * - sort_by: Sort by market_cap, fdv, name, symbol (default: market_cap)
   * - sort_order: Sort order asc or desc (default: desc)
   * 
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