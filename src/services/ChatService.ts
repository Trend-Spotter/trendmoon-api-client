import { TrendmoonApiClient } from '../api/TrendmoonApiClient.js';
import * as Types from '../types/ResponseAndParams.js';

export class ChatService {
  private apiClient: TrendmoonApiClient;

  constructor(apiClient: TrendmoonApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Retrieves chat details by group username.
   * @param params - Parameters for getting chat by username.
   */
  public async getChatByUsername(params: Types.GetChatByUsernameParams): Promise<Types.GetChatByUsernameResponse> {
    return this.apiClient.getChatByUsername(params);
  }

  /**
   * Retrieves the status of the groups service.
   */
  public async getGroupsServiceStatus(): Promise<Types.GetGroupsServiceStatusResponse> {
    return this.apiClient.getGroupsServiceStatus();
  }

  /**
   * Retrieves the status of a specific group.
   * @param params - Parameters for getting a specific group.
   */
  public async getSpecificGroup(params: Types.GetSpecificGroupParams): Promise<Types.GetSpecificGroupResponse> {
    return this.apiClient.getSpecificGroup(params);
  }

  /**
   * Adds a new group to be monitored.
   * @param body - Request body for adding a new group.
   */
  public async addNewGroup(body: Types.AddNewGroupRequest): Promise<Types.AddNewGroupResponse> {
    return this.apiClient.addNewGroup(body);
  }

  /**
   * Retrieves a list of all monitored groups.
   */
  public async getAllGroups(): Promise<Types.GetAllGroupsResponse> {
    return this.apiClient.getAllGroups();
  }
}