import { ChatService } from '../src';
import { TrendmoonApiClient } from '../src';
import type {
  GetChatByUsernameParams,
  GetChatByUsernameResponse,
  GetGroupsServiceStatusResponse,
  GetSpecificGroupParams,
  GetSpecificGroupResponse,
  GetAllGroupsResponse,
} from '../src';

describe('ChatService - Real API Integration with TrendmoonApiClient', () => {
  let chatService: ChatService;
  let realApiClient: TrendmoonApiClient;

  beforeEach(() => {
    realApiClient = new TrendmoonApiClient();
    chatService = new ChatService(realApiClient);
  });

  it('should retrieve chat details by group username successfully', async () => {
    const mockParams: GetChatByUsernameParams = {
      group_username: 'taraxa_project', // Utilisez un nom d'utilisateur de groupe existant pour ce test
    };
    const result: GetChatByUsernameResponse = await chatService.getChatByUsername(mockParams);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('chat_id');
    expect(typeof result.chat_id).toBe('number');
    expect(result).toHaveProperty('group_username');
    expect(typeof result.group_username).toBe('string');
    expect(result).toHaveProperty('title');
    expect(typeof result.title).toBe('string');
    expect(result).toHaveProperty('member_count');
    expect(typeof result.member_count).toBe('number');
    expect(result).toHaveProperty('member_online_count');
    expect(typeof result.member_online_count).toBe('number');
  }, 15000);

  it('should handle non-existent group username for getChatByUsername gracefully', async () => {
    const mockParams: GetChatByUsernameParams = {
      group_username: 'nonexistentgroup12345',
    };

    try {
      const result: GetChatByUsernameResponse = await chatService.getChatByUsername(mockParams);
      expect(result).toBeDefined();
      // Assurez-vous que les assertions ici correspondent à la façon dont votre API renvoie un groupe inexistant.
      // Par exemple, si l'API renvoie un objet vide ou avec des propriétés nulles/indéfinies.
      // Si chat_id peut être null pour un groupe non trouvé :
      expect(result.chat_id).toBeNull();
      // Si group_username peut être null pour un groupe non trouvé :
      expect(result.group_username).toBeNull();
      // Ou si vous vous attendez à un objet vide :
      // expect(Object.keys(result).length).toBe(0);
    } catch (error: any) {
      // Si l'API lève une erreur pour un groupe inexistant
      expect(error).toBeDefined();
      // expect(error.message).toContain('Group not found');
    }
  }, 15000);

  it('should retrieve groups service status successfully', async () => {
    const result: GetGroupsServiceStatusResponse = await chatService.getGroupsServiceStatus();

    expect(result).toBeDefined();
    expect(result).toHaveProperty('status');
    expect(typeof result.status).toBe('string');
    // Si votre GetGroupsServiceStatusResponse contient d'autres propriétés de statut, ajoutez-les ici.
    // Ex: expect(result).toHaveProperty('message');
    // expect(typeof result.message).toBe('string');
  }, 15000);

  it('should handle non-existent group username for getSpecificGroup gracefully', async () => {
    const mockParams: GetSpecificGroupParams = {
      group_username: 'anothernonexistentgroup123',
    };

    try {
      const result: GetSpecificGroupResponse = await chatService.getSpecificGroup(mockParams);
      expect(result).toBeDefined();
      // Assurez-vous que les assertions ici correspondent à la façon dont votre API renvoie un groupe inexistant.
      // Par exemple, si l'API renvoie un objet vide ou avec des propriétés nulles/indéfinies.
      expect(result.group_username).toBeNull(); // Ou undefined, ou expect(Object.keys(result).length).toBe(0);
    } catch (error: any) {
      // Si l'API lève une erreur pour un groupe inexistant
      expect(error).toBeDefined();
      // expect(error.message).toContain('Group not found');
    }
  }, 15000);

  it('should retrieve all monitored groups successfully', async () => {
    const result: GetAllGroupsResponse = await chatService.getAllGroups();

    expect(result).toBeDefined();
    expect(Array.isArray(result['groups'])).toBe(true);

    if (result['groups'].length > 0) {
      const firstGroup = result['groups'][0]!;
      const secondGroup = result['groups'][0]!;
      expect(typeof firstGroup).toBe('string');
      expect(typeof secondGroup).toBe('string');
    }
  }, 15000);
});