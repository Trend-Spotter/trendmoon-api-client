import { TrendmoonApiClient } from '../src';
import { config } from '../src/config/env.js';
import type {
  GetRootResponse,
  GetChatByUsernameParams,
  GetSocialTrendParams,
  GetSocialTrendResponse,
  AddNewGroupRequest,
  AddNewGroupResponse,
} from '../src';

describe('TrendmoonApiClient - Real API Integration', () => {
  let client: TrendmoonApiClient;

  beforeEach(() => {
    client = new TrendmoonApiClient();
  });

  it('should get the API root successfully', async () => {
    const response: GetRootResponse = await client.getRoot();
    expect(response).toBeDefined();
    expect(response).toHaveProperty('status');
    expect(response).toHaveProperty('message');
  }, 10000);

  it('should handle a 404 (not found) API error', async () => {
    const invalidChatUsername: GetChatByUsernameParams['group_username'] = 'nonExistentChatRoom12345';
    await expect(client.getChatByUsername({ group_username: invalidChatUsername })).rejects.toThrow();
  }, 10000);

  it('should retrieve social trends for a coin', async () => {
    const params: GetSocialTrendParams = { coin_id: 'bitcoin' };
    const response: GetSocialTrendResponse = await client.getSocialTrend(params);
    expect(response).toBeDefined();
    expect(Array.isArray(response.trend_market_data)).toBe(true);
    expect(response).toHaveProperty('coin_id');
    expect(response).toHaveProperty('name');
    expect(response).toHaveProperty('symbol');
    if (response.trend_market_data.length > 0) {
      expect(response.trend_market_data[0]).toHaveProperty('date');
    }
  }, 10000);

  it('should add a new group successfully (if API allows in test)', async () => {
    const newGroupName = `test_group_${Date.now()}`;
    const mockBody: AddNewGroupRequest = { group_username: newGroupName };
    const response: AddNewGroupResponse = await client.addNewGroup(mockBody);
    expect(response).toBeDefined();
    expect(response).toHaveProperty('message');
  }, 20000);
});