import { CoinService } from '../src';
import { TrendmoonApiClient } from '../src';
import type {
  SearchCoinsParams,
  SearchCoinsResponse,
  GetPlatformsResponse,
  GetCoinDetailsParams,
  GetCoinDetailsResponse,
} from '../src';

describe('CoinService - Real API Integration with TrendmoonApiClient', () => {
  let coinService: CoinService;
  let realApiClient: TrendmoonApiClient;

  beforeEach(() => {
    realApiClient = new TrendmoonApiClient();
    coinService = new CoinService(realApiClient);
  });

  it('should search coins by name successfully', async () => {
    const mockParams: SearchCoinsParams = { name: 'bitcoin' };
    const result: SearchCoinsResponse = await coinService.searchCoins(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name', 'Bitcoin');
    expect(result[0]).toHaveProperty('symbol', 'btc');
  }, 15000);

  it('should search coins by symbol successfully', async () => {
    const mockParams: SearchCoinsParams = { symbol: 'eth' };
    const result: SearchCoinsResponse = await coinService.searchCoins(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name', 'Ethereum');
    expect(result[0]).toHaveProperty('symbol', 'eth');
  }, 15000);

  it('should search coins by category successfully', async () => {
    const mockParams: SearchCoinsParams = { category: 'Decentralized Finance (DeFi)', page_size: 5 };
    const result: SearchCoinsResponse = await coinService.searchCoins(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    if (result[0] && result[0].categories) {
      expect(result[0].categories).toContain('Decentralized Finance (DeFi)');
    } else {
      throw new Error('Expected categories to be defined on the first result item');
    }
  }, 15000);

  it('should search coins with pagination', async () => {
    const mockParams: SearchCoinsParams = { page: 2, page_size: 2 };
    const result: SearchCoinsResponse = await coinService.searchCoins(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
  }, 15000);

  it('should return all coins if no filters are provided', async () => {
    const mockParams: SearchCoinsParams = { page_size: 5 };
    const result: SearchCoinsResponse = await coinService.searchCoins(mockParams);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  }, 15000);

  it('should retrieve all blockchain platforms successfully', async () => {
    const result: GetPlatformsResponse = await coinService.getPlatforms();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(typeof result[0]).toBe('string');
  }, 15000);

  it('should retrieve coin details by coin_id successfully', async () => {
    const mockParams: GetCoinDetailsParams = { coin_id: 'ethereum' };
    const result: GetCoinDetailsResponse = await coinService.getCoinDetails(mockParams);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('id', 'ethereum');
    expect(result).toHaveProperty('name', 'Ethereum');
    expect(result).toHaveProperty('symbol', 'eth');
  }, 15000);

  it('should retrieve coin details by contract_address successfully', async () => {
    const mockParams: GetCoinDetailsParams = { contract_address: '0xdac17f958d2ee523a2206206994597c13d831ec7' };
    const result: GetCoinDetailsResponse = await coinService.getCoinDetails(mockParams);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('id', 'tether');
    expect(result).toHaveProperty('symbol', 'usdt');
  }, 15000);

  it('should retrieve coin details by symbol successfully', async () => {
    const mockParams: GetCoinDetailsParams = { symbol: 'btc' };
    const result: GetCoinDetailsResponse = await coinService.getCoinDetails(mockParams);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('id', 'bitcoin');
    expect(result).toHaveProperty('name', 'Bitcoin');
    expect(result).toHaveProperty('symbol', 'btc');
  }, 15000);

  it('should retrieve coin details by project_name successfully', async () => {
    const mockParams: GetCoinDetailsParams = { project_name: 'Dogecoin' };
    const result: GetCoinDetailsResponse = await coinService.getCoinDetails(mockParams);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('id', 'dogecoin');
    expect(result).toHaveProperty('name', 'Dogecoin');
    expect(result).toHaveProperty('symbol', 'doge');
  }, 15000);

  it('should return null or throw error if no coin details found for invalid ID', async () => {
    const mockParams: GetCoinDetailsParams = { coin_id: 'nonexistentcoin12345' };
    await expect(coinService.getCoinDetails(mockParams)).rejects.toThrow();
  }, 15000);

  it('should prioritize more specific identifiers when retrieving coin details', async () => {
    const mockParams: GetCoinDetailsParams = { coin_id: 'bitcoin', symbol: 'eth' };
    const result: GetCoinDetailsResponse = await coinService.getCoinDetails(mockParams);
    expect(result).toHaveProperty('id', 'bitcoin');
  }, 15000);
});