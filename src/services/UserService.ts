import { TrendmoonApiClient } from '../api/TrendmoonApiClient.js';
import * as Types from '../types/ResponseAndParams.js';

export class UserService {
  private apiClient: TrendmoonApiClient;

  constructor(apiClient: TrendmoonApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Searches for users based on various criteria.
   * @param params - Parameters for searching users.
   */
  public async searchUsers(params?: Types.SearchUsersParams): Promise<Types.SearchUsersResponse> {
    return this.apiClient.searchUsers(params);
  }

  /**
   * Retrieves a user by their ID or username.
   * @param params - Parameters for getting a user by identifier.
   */
  public async getUserByIdentifier(params: Types.GetUserByIdentifierParams): Promise<Types.GetUserByIdentifierResponse> {
    return this.apiClient.getUserByIdentifier(params);
  }
}