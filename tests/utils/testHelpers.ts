import { beforeEach } from 'vitest';


export const API_RATE_LIMIT_DELAY = 1000; // 1 seconde

export const delay = (ms: number = API_RATE_LIMIT_DELAY): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
