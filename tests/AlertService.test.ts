import { AlertsService } from '../src';
import { MockTrendmoonApiClient } from './mocks';
import type {
  GetTopAlertsTodayResponse,
  GetTopCategoryAlertsResponse,
} from '../src';

describe('AlertService - Mock Tests', () => {
  let alertService: AlertsService;
  let mockApiClient: MockTrendmoonApiClient;

  beforeEach(() => {
    mockApiClient = new MockTrendmoonApiClient();
    // @ts-ignore - MockTrendmoonApiClient has same interface as TrendmoonApiClient
    alertService = new AlertsService(mockApiClient);
  });

  describe('getTopAlertsToday', () => {
    it('should retrieve top alerts for today successfully', async () => {
      const result: GetTopAlertsTodayResponse = await alertService.getTopAlertsToday();
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('category');
      expect(result[0]).toHaveProperty('symbol');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('score');
    });
  });


  describe('getTopCategoryAlerts', () => {
    it('should retrieve top category alerts successfully', async () => {
      const result: GetTopCategoryAlertsResponse = await alertService.getTopCategoryAlerts();
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('category');
      expect(result[0]).toHaveProperty('symbol');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('score');
    });
  });
});