import { config } from '../config/env.js';
import fetch from 'node-fetch';
import { debugLog } from '../utils/debug.js';
import * as Types from '../types/ResponseAndParams.js'; // Importer tous les types de requêtes/réponses


export class TrendmoonApiClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.baseUrl = config.TRENDMOON_API_URL;
    this.apiKey = config.TRENDMOON_API_KEY;
  }

  private async request<T>(
    endpoint: string,
    method: string,
    params?: Record<string, any>,
    body?: any
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    const headers: Record<string, string> = {
      'Api-key': this.apiKey,
      'accept': 'application/json',
    };

    if (body && method !== 'GET') {
      headers['Content-Type'] = 'application/json';
    }

    // Add query parameters for GET requests
    if (method === 'GET' && params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(item => url.searchParams.append(key, item));
          } else {
            url.searchParams.append(key, String(value));
          }
        }
      });
    }

    debugLog.info(`Calling API: ${method} ${url.toString()}`);
    debugLog.info('Headers:', { ...headers, 'Api-key': '***********' }); // Mask API key
    if (body) {
      debugLog.info('Request Body:', body);
    }

    try {
      const response = await fetch(url.toString(), {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      debugLog.info('Response status:', response.status);
      debugLog.info('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        debugLog.error('Error response body:', errorText);
        let errorMessage = `Erreur API: ${response.status} - ${response.statusText}`;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorMessage;
          if (errorJson.detail) {
            errorMessage += `\nDétails: ${JSON.stringify(errorJson.detail)}`;
          }
        } catch (e) {
          // Not a JSON error, use plain text
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      debugLog.info('Received data (truncated):', JSON.stringify(data).substring(0, 500) + (JSON.stringify(data).length > 500 ? '...' : ''));
      return data as T;
    } catch (error) {
      debugLog.error('Detailed error in API request:', error);
      throw error;
    }
  }

  // --- / (Root) ---
  public async getRoot(): Promise<Types.GetRootResponse> {
    return this.request<Types.GetRootResponse>('/', 'GET');
  }

  // --- /chats/{group_username} ---
  public async getChatByUsername(params: Types.GetChatByUsernameParams): Promise<Types.GetChatByUsernameResponse> {
    const { group_username, ...queryParams } = params;
    return this.request<Types.GetChatByUsernameResponse>(`/chats/${group_username}`, 'GET', queryParams);
  }

  // --- /chat_activity/ ---
  public async getChatActivity(params?: Types.GetChatActivityParams): Promise<Types.GetChatActivityResponse> {
    return this.request<Types.GetChatActivityResponse>('/chat_activity/', 'GET', params);
  }

  // --- /messages/chat ---
  public async getMessagesForChat(params: Types.GetMessagesForChatParams): Promise<Types.GetMessagesForChatResponse> {
    return this.request<Types.GetMessagesForChatResponse>('/messages/chat', 'GET', params);
  }

  // --- /messages/search ---
  public async searchMessages(params: Types.SearchMessagesParams): Promise<Types.SearchMessagesResponse> {
    return this.request<Types.SearchMessagesResponse>('/messages/search', 'GET', params);
  }

  // --- /messages/timeframe ---
  public async getMessagesWithinTimeframe(params?: Types.GetMessagesWithinTimeframeParams): Promise<Types.GetMessagesWithinTimeframeResponse> {
    return this.request<Types.GetMessagesWithinTimeframeResponse>('/messages/timeframe', 'GET', params);
  }

  // --- /messages/user ---
  public async getMessagesForUser(params: Types.GetMessagesForUserParams): Promise<Types.GetMessagesForUserResponse> {
    return this.request<Types.GetMessagesForUserResponse>('/messages/user', 'GET', params);
  }

  // --- /users/search ---
  public async searchUsers(params?: Types.SearchUsersParams): Promise<Types.SearchUsersResponse> {
    return this.request<Types.SearchUsersResponse>('/users/search', 'GET', params);
  }

  // --- /users/{identifier} ---
  public async getUserByIdentifier(params: Types.GetUserByIdentifierParams): Promise<Types.GetUserByIdentifierResponse> {
    const { identifier, ...queryParams } = params;
    return this.request<Types.GetUserByIdentifierResponse>(`/users/${identifier}`, 'GET', queryParams);
  }

  // --- /categories/dominance ---
  public async getCategoryDominanceForAssets(params?: Types.GetCategoryDominanceForAssetsParams): Promise<Types.GetCategoryDominanceForAssetsResponse> {
    return this.request<Types.GetCategoryDominanceForAssetsResponse>('/categories/dominance', 'GET', params);
  }

  // --- /categories/all ---
  public async getAllCategories(): Promise<Types.GetAllCategoriesResponse> {
    return this.request<Types.GetAllCategoriesResponse>('/categories/all', 'GET');
  }

  // --- /coins/search ---
  public async searchCoins(params?: Types.SearchCoinsParams): Promise<Types.SearchCoinsResponse> {
    return this.request<Types.SearchCoinsResponse>('/coins/search', 'GET', params);
  }

  // --- /coins/platforms ---
  public async getPlatforms(): Promise<Types.GetPlatformsResponse> {
    return this.request<Types.GetPlatformsResponse>('/coins/platforms', 'GET');
  }

  // --- /coins/details ---
  public async getCoinDetails(params?: Types.GetCoinDetailsParams): Promise<Types.GetCoinDetailsResponse> {
    return this.request<Types.GetCoinDetailsResponse>('/coins/details', 'GET', params);
  }

  // --- /social/trend ---
  public async getSocialTrend(params?: Types.GetSocialTrendParams): Promise<Types.GetSocialTrendResponse> {
    return this.request<Types.GetSocialTrendResponse>('/social/trend', 'GET', params);
  }

  // --- /social/keyword ---
  public async getKeywordTrend(params?: Types.GetKeywordTrendParams): Promise<Types.GetKeywordTrendResponse> {
    return this.request<Types.GetKeywordTrendResponse>('/social/keyword', 'GET', params);
  }

  // --- /social/project_summary ---
  public async getProjectSummary(params?: Types.GetProjectSummaryParams): Promise<Types.GetProjectSummaryResponse> {
    return this.request<Types.GetProjectSummaryResponse>('/social/project_summary', 'GET', params);
  }

  // --- /social/topic_posts ---
  public async getTopicPosts(params?: Types.GetTopicPostsParams): Promise<Types.GetTopicPostsResponse> {
    return this.request<Types.GetTopicPostsResponse>('/social/topic_posts', 'GET', params);
  }

  // --- /social/topic_news ---
  public async getTopicNews(params?: Types.GetTopicNewsParams): Promise<Types.GetTopicNewsResponse> {
    return this.request<Types.GetTopicNewsResponse>('/social/topic_news', 'GET', params);
  }

  // --- /social/topic_summary ---
  public async getTopicSummary(params: Types.GetTopicSummaryParams): Promise<Types.GetTopicSummaryResponse> {
    return this.request<Types.GetTopicSummaryResponse>('/social/topic_summary', 'GET', params);
  }

  // --- /social/search ---
  public async searchSocialPosts(params: Types.SearchSocialPostsParams): Promise<Types.SearchSocialPostsResponse> {
    return this.request<Types.SearchSocialPostsResponse>('/social/search', 'GET', params);
  }

  // --- /social/trends ---
  public async getSocialTrends(params: Types.GetSocialTrendsParams): Promise<Types.GetSocialTrendsResponse> {
    return this.request<Types.GetSocialTrendsResponse>('/social/trends', 'GET', params);
  }

  // --- /groups/status ---
  public async getGroupsServiceStatus(): Promise<Types.GetGroupsServiceStatusResponse> {
    return this.request<Types.GetGroupsServiceStatusResponse>('/groups/status', 'GET');
  }

  // --- /groups/{group_username} ---
  public async getSpecificGroup(params: Types.GetSpecificGroupParams): Promise<Types.GetSpecificGroupResponse> {
    const { group_username, ...queryParams } = params;
    return this.request<Types.GetSpecificGroupResponse>(`/groups/${group_username}`, 'GET', queryParams);
  }

  // --- /groups/add_group ---
  public async addNewGroup(body: Types.AddNewGroupRequest): Promise<Types.AddNewGroupResponse> {
    return this.request<Types.AddNewGroupResponse>('/groups/add_group', 'POST', undefined, body);
  }

  // --- /groups/ ---
  public async getAllGroups(): Promise<Types.GetAllGroupsResponse> {
    return this.request<Types.GetAllGroupsResponse>('/groups/', 'GET');
  }

  // --- /get_top_alerts_today ---
  public async getTopAlertsToday(): Promise<Types.GetTopAlertsTodayResponse> {
    return this.request<Types.GetTopAlertsTodayResponse>('/get_top_alerts_today', 'GET');
  }

  // --- /get_top_categories_today ---
  public async getTopCategoriesToday(): Promise<Types.GetTopCategoriesTodayResponse> {
    // Note: TopCategoriesResponse is not defined in the provided Schema.ts.
    // Assuming it's an array of some category type or string array based on context.
    // If it's a new type, you'll need to define it in Schema.ts
    // For now, I'll assume it's just a placeholder or needs to be defined.
    return this.request<Types.GetTopCategoriesTodayResponse>('/get_top_categories_today', 'GET');
  }

  // --- /get_top_category_alerts ---
  public async getTopCategoryAlerts(): Promise<Types.GetTopCategoryAlertsResponse> {
    return this.request<Types.GetTopCategoryAlertsResponse>('/get_top_category_alerts', 'GET');
  }

  // --- /get_category_coins_legacy ---
  public async getCategoryCoinsLegacy(params: Types.GetCategoryCoinsLegacyParams): Promise<Types.GetCategoryCoinsLegacyResponse> {
    return this.request<Types.GetCategoryCoinsLegacyResponse>('/get_category_coins_legacy', 'GET', params);
  }

  // --- /get_category_coins ---
  public async getCategoryCoins(params: Types.GetCategoryCoinsParams): Promise<Types.GetCategoryCoinsResponse> {
    return this.request<Types.GetCategoryCoinsResponse>('/get_category_coins', 'GET', params);
  }

  // --- /status (general status) ---
  public async getGeneralStatus(): Promise<Types.GetGeneralStatusResponse> {
    return this.request<Types.GetGeneralStatusResponse>('/status', 'GET');
  }
}