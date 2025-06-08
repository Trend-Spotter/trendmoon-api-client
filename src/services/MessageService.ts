import { TrendmoonApiClient } from '../api/TrendmoonApiClient.js';
import * as Types from '../types/ResponseAndParams.js';

export class MessageService {
  private apiClient: TrendmoonApiClient;

  constructor(apiClient: TrendmoonApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Retrieves messages for a specific chat.
   * @param params - Parameters for getting messages for a chat.
   */
  public async getMessagesForChat(params: Types.GetMessagesForChatParams): Promise<Types.GetMessagesForChatResponse> {
    return this.apiClient.getMessagesForChat(params);
  }

  /**
   * Searches for messages based on various criteria.
   * @param params - Parameters for searching messages.
   */
  public async searchMessages(params: Types.SearchMessagesParams): Promise<Types.SearchMessagesResponse> {
    return this.apiClient.searchMessages(params);
  }

  /**
   * Retrieves messages within a specific timeframe.
   * @param params - Parameters for getting messages within a timeframe.
   */
  public async getMessagesWithinTimeframe(params?: Types.GetMessagesWithinTimeframeParams): Promise<Types.GetMessagesWithinTimeframeResponse> {
    return this.apiClient.getMessagesWithinTimeframe(params);
  }

  /**
   * Retrieves messages sent by a specific user.
   * @param params - Parameters for getting messages for a user.
   */
  public async getMessagesForUser(params: Types.GetMessagesForUserParams): Promise<Types.GetMessagesForUserResponse> {
    return this.apiClient.getMessagesForUser(params);
  }
}