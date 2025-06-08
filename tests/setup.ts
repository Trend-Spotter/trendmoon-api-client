import dotenv from 'dotenv';
import { delay, API_RATE_LIMIT_DELAY } from './utils/testHelpers';

dotenv.config({ path: './.env' });


beforeEach(async () => {
    await delay();
});