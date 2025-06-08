import { ChatActivityService } from '../src';
import { TrendmoonApiClient } from '../src';
import type {
  GetChatActivityParams,
  GetChatActivityResponse,
} from '../src';

describe('ChatActivityService - Real API Integration with TrendmoonApiClient', () => {
  let chatActivityService: ChatActivityService;
  let realApiClient: TrendmoonApiClient;

  beforeEach(() => {
    realApiClient = new TrendmoonApiClient();
    chatActivityService = new ChatActivityService(realApiClient);
  });

  it('should retrieve chat activity data successfully and contain expected metrics for the current month', async () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = today;

    const startDateISO = startOfMonth.toISOString().split('.')[0];
    const endDateISO = endOfMonth.toISOString().split('.')[0];

    const mockParams: GetChatActivityParams = {
      group_username: 'babycatebsc',
      start_date: startDateISO,
      end_date: endDateISO
    };
    const result: GetChatActivityResponse = await chatActivityService.getChatActivity(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(0);

    if (result.length > 0) {
      const firstActivity = result[0]!;

      expect(firstActivity).toHaveProperty('chat_id');
      expect(typeof firstActivity.chat_id).toBe('number');
      expect(firstActivity).toHaveProperty('date');
      expect(typeof firstActivity.date).toBe('string');

      if (firstActivity.group_username !== undefined && firstActivity.group_username !== null) {
        expect(typeof firstActivity.group_username).toBe('string');
      }
      if (firstActivity.title !== undefined && firstActivity.title !== null) {
        expect(typeof firstActivity.title).toBe('string');
      }

      expect(firstActivity).toHaveProperty('member_count');
      expect(typeof firstActivity.member_count).toBe('number');
      expect(firstActivity).toHaveProperty('num_messages');
      expect(typeof firstActivity.num_messages).toBe('number');
      expect(firstActivity).toHaveProperty('num_unique_users');
      expect(typeof firstActivity.num_unique_users).toBe('number');
      expect(firstActivity).toHaveProperty('member_online_count');
      expect(typeof firstActivity.member_online_count).toBe('number');

      if (firstActivity.daily_growth_messages !== undefined && firstActivity.daily_growth_messages !== null) {
        expect(typeof firstActivity.daily_growth_messages).toBe('number');
      }
      if (firstActivity.weekly_growth_messages !== undefined && firstActivity.weekly_growth_messages !== null) {
        expect(typeof firstActivity.weekly_growth_messages).toBe('number');
      }
      if (firstActivity.monthly_growth_messages !== undefined && firstActivity.monthly_growth_messages !== null) {
        expect(typeof firstActivity.monthly_growth_messages).toBe('number');
      }
      if (firstActivity.daily_growth_unique_users !== undefined && firstActivity.daily_growth_unique_users !== null) {
        expect(typeof firstActivity.daily_growth_unique_users).toBe('number');
      }
      if (firstActivity.weekly_growth_unique_users !== undefined && firstActivity.weekly_growth_unique_users !== null) {
        expect(typeof firstActivity.weekly_growth_unique_users).toBe('number');
      }
      if (firstActivity.monthly_growth_unique_users !== undefined && firstActivity.monthly_growth_unique_users !== null) {
        expect(typeof firstActivity.monthly_growth_unique_users).toBe('number');
      }

      if (firstActivity.weekly_perc_returning_users !== undefined && firstActivity.weekly_perc_returning_users !== null) {
        expect(typeof firstActivity.weekly_perc_returning_users).toBe('number');
      }
      if (firstActivity.monthly_perc_returning_users !== undefined && firstActivity.monthly_perc_returning_users !== null) {
        expect(typeof firstActivity.monthly_perc_returning_users).toBe('number');
      }
      if (firstActivity.gini_coefficient !== undefined && firstActivity.gini_coefficient !== null) {
        expect(typeof firstActivity.gini_coefficient).toBe('number');
      }
      if (firstActivity.top_user_ratio !== undefined && firstActivity.top_user_ratio !== null) {
        expect(typeof firstActivity.top_user_ratio).toBe('number');
      }
      if (firstActivity.is_well_distributed !== undefined && firstActivity.is_well_distributed !== null) {
        expect(typeof firstActivity.is_well_distributed).toBe('boolean');
      }

      expect(firstActivity).toHaveProperty('administrator_count');
      expect(typeof firstActivity.administrator_count).toBe('number');
      expect(firstActivity).toHaveProperty('restricted_count');
      expect(typeof firstActivity.restricted_count).toBe('number');

      if (firstActivity.bot_amount !== undefined && firstActivity.bot_amount !== null) {
        expect(typeof firstActivity.bot_amount).toBe('number');
      }

      expect(firstActivity).toHaveProperty('banned_count');
      expect(typeof firstActivity.banned_count).toBe('number');

      expect(firstActivity).toHaveProperty('is_verified');
      expect(typeof firstActivity.is_verified).toBe('number');
      expect(firstActivity).toHaveProperty('is_scam');
      expect(typeof firstActivity.is_scam).toBe('number');
      expect(firstActivity).toHaveProperty('is_fake');
      expect(typeof firstActivity.is_fake).toBe('number');
    }
  }, 15000);

  it('should return an empty array or handle error for a non-existent group', async () => {
    const mockParams: GetChatActivityParams = {
      group_username: 'nonexistentgroup12345',
      start_date: '2024-01-01T00:00:00',
      end_date: '2024-01-02T00:00:00'
    };

    try {
      const result: GetChatActivityResponse = await chatActivityService.getChatActivity(mockParams);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    } catch (error: any) {
      expect(error).toBeDefined();
    }
  }, 15000);
});