import { TrendmoonApiClient } from '../api/TrendmoonApiClient.js';
import * as Types from '../types/ResponseAndParams.js';

/**
 * AlertService handles alert-related operations
 * Provides methods for retrieving various types of alerts and trending information
 */
export class AlertService {
  private apiClient: TrendmoonApiClient;

  constructor(apiClient: TrendmoonApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Retrieves top alerts for today.
   * @returns Promise resolving to today's top alerts
   */
  public async getTopAlertsToday(): Promise<Types.GetTopAlertsTodayResponse> {
    return this.apiClient.getTopAlertsToday();
  }

  /**
   * Retrieves top categories for today.
   * @returns Promise resolving to today's top categories
   */
  public async getTopCategoriesToday(): Promise<Types.GetTopCategoriesTodayResponse> {
    return this.apiClient.getTopCategoriesToday();
  }

  /**
   * Retrieves top category alerts.
   * @returns Promise resolving to category-specific alerts
   */
  public async getTopCategoryAlerts(): Promise<Types.GetTopCategoryAlertsResponse> {
    return this.apiClient.getTopCategoryAlerts();
  }
}