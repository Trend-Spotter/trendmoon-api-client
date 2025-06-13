import { TrendmoonApiClient } from '../api/TrendmoonApiClient.js';
import * as Types from '../types/ResponseAndParams.js';

export class SocialService {
  private apiClient: TrendmoonApiClient;

  constructor(apiClient: TrendmoonApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Retrieves social trend data for a coin.
   * @param params - Parameters for getting social trend.
   */
  public async getSocialTrend(params?: Types.GetSocialTrendParams): Promise<Types.GetSocialTrendResponse> {
    return this.apiClient.getSocialTrend(params);
  }

  /**
   * Retrieves keyword trend data.
   * @param params - Parameters for getting keyword trend.
   */
  public async getKeywordTrend(params?: Types.GetKeywordTrendParams): Promise<Types.GetKeywordTrendResponse> {
    return this.apiClient.getKeywordTrend(params);
  }

  /**
   * Retrieves a project summary.
   * @param params - Parameters for getting project summary.
   */
  public async getProjectSummary(params?: Types.GetProjectSummaryParams): Promise<Types.GetProjectSummaryResponse> {
    return this.apiClient.getProjectSummary(params);
  }

  /**
   * Retrieves posts related to a specific topic.
   * @param params - Parameters for getting topic posts.
   */
  public async getTopicPosts(params?: Types.GetTopicPostsParams): Promise<Types.GetTopicPostsResponse> {
    return this.apiClient.getTopicPosts(params);
  }

  /**
   * Retrieves news related to a specific topic.
   * @param params - Parameters for getting topic news.
   */
  public async getTopicNews(params?: Types.GetTopicNewsParams): Promise<Types.GetTopicNewsResponse> {
    return this.apiClient.getTopicNews(params);
  }

  /**
   * Searches social posts.
   * @param params - Parameters for searching social posts.
   */
  public async searchSocialPosts(params: Types.SearchSocialPostsParams): Promise<Types.SearchSocialPostsResponse> {
    return this.apiClient.searchSocialPosts(params);
  }

  /**
   * Retrieves social trends for multiple coins.
   * @param params - Parameters for getting social trends.
   */
  public async getSocialTrends(params: Types.GetSocialTrendsParams): Promise<Types.GetSocialTrendsResponse> {
    return this.apiClient.getSocialTrends(params);
  }

  /**
   * Retrieves a summary for a specific topic.
   * @param params - Parameters for getting topic summary.
   */
  public async getTopicSummary(params: Types.GetTopicSummaryParams): Promise<Types.GetTopicSummaryResponse> {
    return this.apiClient.getTopicSummary(params);
  }
}