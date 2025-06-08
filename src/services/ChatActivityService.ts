import { TrendmoonApiClient } from '../api/TrendmoonApiClient.js';
import * as Types from '../types/ResponseAndParams.js';

export class ChatActivityService {
  private apiClient: TrendmoonApiClient;

  constructor(apiClient: TrendmoonApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Retrieves chat activity data.
   * @param params - Parameters for getting chat activity.
   */
  public async getChatActivity(params?: Types.GetChatActivityParams): Promise<Types.GetChatActivityResponse> {
    return this.apiClient.getChatActivity(params);
  }
}