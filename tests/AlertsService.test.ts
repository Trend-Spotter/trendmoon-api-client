import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AlertsService } from '../src/services/AlertsService.js';
import { TrendmoonApiClient } from '../src/api/TrendmoonApiClient.js';
import * as Types from '../src/types/ResponseAndParams.js';
import * as Schema from '../src/types/Schema.js';

describe('AlertsService', () => {
  let alertsService: AlertsService;
  let mockApiClient: TrendmoonApiClient;

  beforeEach(() => {
    mockApiClient = {
      getTopAlertsToday: vi.fn(),
      getTopCategoryAlerts: vi.fn(),
    } as unknown as TrendmoonApiClient;

    alertsService = new AlertsService(mockApiClient);
  });

  describe('getTopAlertsToday', () => {
    it('should call apiClient.getTopAlertsToday and return the response', async () => {
      const mockResponse: Types.GetTopAlertsTodayResponse = [
        {
          category: 'DeFi',
          symbol: 'TEST',
          name: 'Test Coin',
          score: 85,
          technical_indicator_score: 90,
          social_indicator_score: 80,
          day_trend: 1,
          day_perc_diff: 5.5,
          social_mentions: 1000,
          mentions_ma: 800,
          mentions_upper_band: 1200,
          price_momentum: 0.8,
          price_pct_change: 10.5,
          volume_pct_change: 15.2
        }
      ];

      (mockApiClient.getTopAlertsToday as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

      const result = await alertsService.getTopAlertsToday();

      expect(mockApiClient.getTopAlertsToday).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTopCategoryAlerts', () => {
    it('should call apiClient.getTopCategoryAlerts and return the response', async () => {
      const mockResponse: Types.GetTopCategoryAlertsResponse = [
        {
          category: 'NFT',
          symbol: 'NFTT',
          name: 'NFT Test',
          score: 75,
          technical_indicator_score: 85,
          social_indicator_score: 70,
          day_trend: 1,
          day_perc_diff: 3.5,
          social_mentions: 800,
          mentions_ma: 600,
          mentions_upper_band: 1000,
          price_momentum: 0.6,
          price_pct_change: 8.5,
          volume_pct_change: 12.2
        }
      ];

      (mockApiClient.getTopCategoryAlerts as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

      const result = await alertsService.getTopCategoryAlerts();

      expect(mockApiClient.getTopCategoryAlerts).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });
  });
}); 