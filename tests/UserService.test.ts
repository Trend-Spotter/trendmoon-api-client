import { UserService } from '../src';
import { TrendmoonApiClient } from '../src';
import type {
  SearchUsersParams,
  SearchUsersResponse,
  GetUserByIdentifierParams,
  GetUserByIdentifierResponse,
} from '../src';

describe('UserService - Real API Integration with TrendmoonApiClient', () => {
  let userService: UserService;
  let realApiClient: TrendmoonApiClient;

  beforeEach(() => {
    realApiClient = new TrendmoonApiClient();
    userService = new UserService(realApiClient);
  });

  // Test for searchUsers
  it('should search users without filters and return results', async () => {
    const mockParams: SearchUsersParams = {};
    const result: SearchUsersResponse = await userService.searchUsers(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    // Expect an array of users, potentially empty but test is for successful response
    // If API often returns data, ensure it returns more than 0 users.
    // For a "real" integration test, we expect data if the API has it.
    // expect(result.length).toBeGreaterThan(0); // Uncomment if you're sure the API always returns users
    if (result.length > 0) {
      const firstUser = result[0]!;
      expect(firstUser).toHaveProperty('user_id');
      expect(typeof firstUser.user_id).toBe('number');
      expect(firstUser).toHaveProperty('username');
      expect(typeof firstUser.username).toBe('string');
    }
  }, 15000);

  it('should search users by username', async () => {
    const mockParams: SearchUsersParams = { username: 'reedvoid' };
    const result: SearchUsersResponse = await userService.searchUsers(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      const firstUser = result[0]!;
      expect(firstUser).toHaveProperty('username', 'reedvoid');
      expect(firstUser).toHaveProperty('user_id');
    }
  }, 15000);

  it('should search users filtered by bot = true', async () => {
    const mockParams: SearchUsersParams = { bot: true };
    const result: SearchUsersResponse = await userService.searchUsers(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    // Expect all returned users to be bots if filter is applied correctly
    result.forEach(user => {
      expect(user).toHaveProperty('bot', true);
    });
    // expect(result.length).toBeGreaterThan(0); // Uncomment if you expect specific bots
  }, 15000);

  it('should search users filtered by verified = true', async () => {
    const mockParams: SearchUsersParams = { verified: true };
    const result: SearchUsersResponse = await userService.searchUsers(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    result.forEach(user => {
      expect(user).toHaveProperty('verified', true);
    });
  }, 15000);

  it('should search users with a combination of filters', async () => {
    const mockParams: SearchUsersParams = { username: 'telegram', spammer: false, verified: true };
    const result: SearchUsersResponse = await userService.searchUsers(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    result.forEach(user => {
      if (user.username) {
        expect(user.username.toLowerCase()).toContain('telegram');
      }
      expect(user).toHaveProperty('spammer', false);
      expect(user).toHaveProperty('verified', true);
    });
  }, 15000);

  // Test for getUserByIdentifier
  it('should retrieve user information by user_id', async () => {
    // Assume a user with this ID exists for the test
    const userId = '123456789'; // Use a real user ID if possible
    const mockParams: GetUserByIdentifierParams = { identifier: userId };
    const result: GetUserByIdentifierResponse = await userService.getUserByIdentifier(mockParams);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('user_id', parseInt(userId));
    expect(result).toHaveProperty('username');
    expect(typeof result.username).toBe('string');
  }, 15000);

  it('should retrieve user information by username', async () => {
    const username = 'reedvoid'; // Use a real username if possible
    const mockParams: GetUserByIdentifierParams = { identifier: username };
    const result: GetUserByIdentifierResponse = await userService.getUserByIdentifier(mockParams);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('username', username);
    expect(result).toHaveProperty('user_id');
    expect(typeof result.user_id).toBe('number');
  }, 15000);

  it('should throw an error if identifier is not found', async () => {
    const nonExistentIdentifier = 'nonexistentuser12345'; // An identifier that should not exist
    const mockParams: GetUserByIdentifierParams = { identifier: nonExistentIdentifier };
    await expect(userService.getUserByIdentifier(mockParams)).rejects.toThrow();
  }, 15000);
});