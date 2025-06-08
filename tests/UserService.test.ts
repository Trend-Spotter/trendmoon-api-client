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

  // Test pour searchUsers
  it('devrait rechercher des utilisateurs sans filtres et retourner des résultats', async () => {
    const mockParams: SearchUsersParams = {};
    const result: SearchUsersResponse = await userService.searchUsers(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    // Attendez-vous à un tableau d'utilisateurs, potentiellement vide mais le test est pour une réponse réussie
    // Si l'API retourne souvent des données, assurez-vous qu'elle retourne plus de 0 utilisateurs.
    // Pour un test d'intégration "réel", nous nous attendons à des données si l'API en a.
    // expect(result.length).toBeGreaterThan(0); // Décommentez si vous êtes sûr que l'API renvoie toujours des utilisateurs
    if (result.length > 0) {
      const firstUser = result[0]!;
      expect(firstUser).toHaveProperty('user_id');
      expect(typeof firstUser.user_id).toBe('number');
      expect(firstUser).toHaveProperty('username');
      expect(typeof firstUser.username).toBe('string');
    }
  }, 15000);

  it('devrait rechercher des utilisateurs par username', async () => {
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

  it('devrait rechercher des utilisateurs filtrés par bot = true', async () => {
    const mockParams: SearchUsersParams = { bot: true };
    const result: SearchUsersResponse = await userService.searchUsers(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    // On s'attend à ce que tous les utilisateurs retournés soient des bots si le filtre est appliqué correctement
    result.forEach(user => {
      expect(user).toHaveProperty('bot', true);
    });
    // expect(result.length).toBeGreaterThan(0); // Décommentez si vous vous attendez à des bots spécifiques
  }, 15000);

  it('devrait rechercher des utilisateurs filtrés par verified = true', async () => {
    const mockParams: SearchUsersParams = { verified: true };
    const result: SearchUsersResponse = await userService.searchUsers(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    result.forEach(user => {
      expect(user).toHaveProperty('verified', true);
    });
  }, 15000);

  it('devrait rechercher des utilisateurs avec une combinaison de filtres', async () => {
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

  // Test pour getUserByIdentifier
  it('devrait récupérer les informations d\'un utilisateur par user_id', async () => {
    // Supposons qu'un utilisateur avec cet ID existe pour le test
    const userId = '123456789'; // Utilisez un ID d'utilisateur réel si possible
    const mockParams: GetUserByIdentifierParams = { identifier: userId };
    const result: GetUserByIdentifierResponse = await userService.getUserByIdentifier(mockParams);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('user_id', parseInt(userId));
    expect(result).toHaveProperty('username');
    expect(typeof result.username).toBe('string');
  }, 15000);

  it('devrait récupérer les informations d\'un utilisateur par username', async () => {
    const username = 'reedvoid'; // Utilisez un nom d'utilisateur réel si possible
    const mockParams: GetUserByIdentifierParams = { identifier: username };
    const result: GetUserByIdentifierResponse = await userService.getUserByIdentifier(mockParams);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('username', username);
    expect(result).toHaveProperty('user_id');
    expect(typeof result.user_id).toBe('number');
  }, 15000);

  it('devrait lancer une erreur si l\'identifiant n\'est pas trouvé', async () => {
    const nonExistentIdentifier = 'nonexistentuser12345'; // Un identifiant qui ne devrait pas exister
    const mockParams: GetUserByIdentifierParams = { identifier: nonExistentIdentifier };
    await expect(userService.getUserByIdentifier(mockParams)).rejects.toThrow();
  }, 15000);
});