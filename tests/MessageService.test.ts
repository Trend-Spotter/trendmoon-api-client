import { MessageService } from '../src';
import { TrendmoonApiClient } from '../src';
import type {
  GetMessagesForChatParams,
  GetMessagesForChatResponse,
  SearchMessagesParams,
  SearchMessagesResponse,
  GetMessagesWithinTimeframeParams,
  GetMessagesWithinTimeframeResponse,
  GetMessagesForUserParams,
  GetMessagesForUserResponse,
} from '../src';

describe('MessageService - Real API Integration with TrendmoonApiClient', () => {
  let messageService: MessageService;
  let realApiClient: TrendmoonApiClient;

  beforeEach(() => {
    realApiClient = new TrendmoonApiClient();
    messageService = new MessageService(realApiClient);
  });

  const startDate = '2024-03-01T00:00:00';
  const endDate = '2024-03-20T23:59:59';

  // Test pour getMessagesForChat
  it('should retrieve messages for a specific Telegram group chat successfully', async () => {
    const mockParams: GetMessagesForChatParams = {
      group_username: 'taraxa_project',
      start_date: startDate,
      end_date: endDate,
    };
    const result: GetMessagesForChatResponse = await messageService.getMessagesForChat(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(0);
    if (result.length > 0) {
      const firstMessage = result[0]!; // Assertion de non-nullité
      expect(firstMessage).toHaveProperty('id');
      expect(firstMessage).toHaveProperty('chat_id');
      expect(firstMessage).toHaveProperty('group_username', 'taraxa_project');
      expect(firstMessage).toHaveProperty('date');
      expect(firstMessage).toHaveProperty('text');
    }
  }, 15000);

  it('should retrieve messages for a specific Telegram group chat by chat_id successfully', async () => {
    const mockParams: GetMessagesForChatParams = {
      chat_id: -1001234567890, // Converti en nombre
      start_date: startDate,
      end_date: endDate,
    };
    const result: GetMessagesForChatResponse = await messageService.getMessagesForChat(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(0);
    if (result.length > 0) {
      const firstMessage = result[0]!; // Assertion de non-nullité
      expect(firstMessage).toHaveProperty('id');
      expect(firstMessage).toHaveProperty('chat_id', -1001234567890); // Converti en nombre
    }
  }, 15000);

  it('should throw an error for getMessagesForChat if neither group_username nor chat_id is provided', async () => {
    const mockParams: GetMessagesForChatParams = {
      // Aucun group_username ni chat_id fourni pour tester l'erreur
      start_date: startDate,
      end_date: endDate,
    };
    // @ts-ignore - Intentionnellement pour tester l'erreur
    await expect(messageService.getMessagesForChat(mockParams)).rejects.toThrow();
  }, 15000);

  // Test pour searchMessages
  it('should search Telegram messages with text and group_username filter successfully', async () => {
    const mockParams: SearchMessagesParams = {
      text: 'solana',
      group_username: 'taraxa_project',
      start_date: startDate,
      end_date: endDate,
    };
    const result: SearchMessagesResponse = await messageService.searchMessages(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(0);
    if (result.length > 0) {
      const firstMessage = result[0]!; // Assertion de non-nullité
      expect(firstMessage).toHaveProperty('id');
      expect(firstMessage).toHaveProperty('group_username', 'taraxa_project');
      expect(firstMessage).toHaveProperty('text');
      expect(firstMessage.text?.toLowerCase()).toContain('solana');
    }
  }, 15000);

  it('should search Telegram messages with user_is_bot filter successfully', async () => {
    const mockParams: SearchMessagesParams = {
      user_is_bot: true,
      start_date: startDate,
      end_date: endDate,
    };
    const result: SearchMessagesResponse = await messageService.searchMessages(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(0);
    if (result.length > 0) {
      const firstMessage = result[0]!; // Assertion de non-nullité
      expect(firstMessage).toHaveProperty('user_is_bot', true);
    }
  }, 15000);

  it('should throw an error for searchMessages if start_date or end_date is missing', async () => {
    // @ts-ignore - Intentionnellement pour tester l'erreur où start_date est manquant
    const mockParams: SearchMessagesParams = {
      text: 'test',
      end_date: endDate,
    };
    await expect(messageService.searchMessages(mockParams)).rejects.toThrow();
  }, 15000);

  // Test pour getMessagesWithinTimeframe
  it('should retrieve Telegram messages within a timeframe successfully', async () => {
    const mockParams: GetMessagesWithinTimeframeParams = {
      start_date: startDate,
      end_date: endDate,
    };
    const result: GetMessagesWithinTimeframeResponse = await messageService.getMessagesWithinTimeframe(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(0);
    if (result.length > 0) {
      const firstMessage = result[0]!; // Assertion de non-nullité
      expect(firstMessage).toHaveProperty('id');
      expect(firstMessage).toHaveProperty('date');
    }
  }, 15000);

  it('should retrieve Telegram messages within a timeframe with with_spams filter successfully', async () => {
    const mockParams: GetMessagesWithinTimeframeParams = {
      start_date: startDate,
      end_date: endDate,
      with_spams: true,
    };
    const result: GetMessagesWithinTimeframeResponse = await messageService.getMessagesWithinTimeframe(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(0);
  }, 15000);

  // Test pour getMessagesForUser
  it('should retrieve messages for a specific user by username successfully', async () => {
    const mockParams: GetMessagesForUserParams = {
      username: 'reedvoid',
      start_date: startDate,
      end_date: endDate,
    };
    const result: GetMessagesForUserResponse = await messageService.getMessagesForUser(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(0);
    if (result.length > 0) {
      const firstMessage = result[0]!; // Assertion de non-nullité
      expect(firstMessage).toHaveProperty('id');
      expect(firstMessage).toHaveProperty('username', 'reedvoid');
      expect(firstMessage).toHaveProperty('user_id');
    }
  }, 15000);

  it('should retrieve messages for a specific user by user_id successfully', async () => {
    const mockParams: GetMessagesForUserParams = {
      user_id: 123456789, // Converti en nombre
      start_date: startDate,
      end_date: endDate,
    };
    const result: GetMessagesForUserResponse = await messageService.getMessagesForUser(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(0);
    if (result.length > 0) {
      const firstMessage = result[0]!; // Assertion de non-nullité
      expect(firstMessage).toHaveProperty('id');
      expect(firstMessage).toHaveProperty('user_id', 123456789); // Converti en nombre
    }
  }, 15000);

  it('should throw an error for getMessagesForUser if neither username nor user_id is provided', async () => {
    const mockParams: GetMessagesForUserParams = {
      // Aucun username ni user_id fourni pour tester l'erreur
      start_date: startDate,
      end_date: endDate,
    };
    // @ts-ignore - Intentionnellement pour tester l'erreur
    await expect(messageService.getMessagesForUser(mockParams)).rejects.toThrow();
  }, 15000);
});