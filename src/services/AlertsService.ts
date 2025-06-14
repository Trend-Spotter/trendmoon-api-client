import { TrendmoonApiClient } from '../api/TrendmoonApiClient.js';
import * as Types from '../types/ResponseAndParams.js';

export class AlertsService {
  private apiClient: TrendmoonApiClient;

  constructor(apiClient: TrendmoonApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Retrieves top alerts for today.
   */
  public async getTopAlertsToday(): Promise<Types.GetTopAlertsTodayResponse> {
    return this.apiClient.getTopAlertsToday();
  }

  /**
   * Retrieves top category alerts.
   */
  public async getTopCategoryAlerts(): Promise<Types.GetTopCategoryAlertsResponse> {
    return this.apiClient.getTopCategoryAlerts();
  }
} 