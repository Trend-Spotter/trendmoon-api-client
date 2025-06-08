# @trendmoon/api-client

Official TypeScript client for Trendmoon API

## Installation

```bash
npm install @trendmoon/api-client
```

## Configuration

You need to configure your `.env` file. See `.env.example` for required variables.

```bash
cp .env.example .env
# Edit the .env file with your API keys
```

## Quick Start

```typescript
import { TrendmoonApiClient } from '@trendmoon/api-client';
import { CategoryService } from '../src';

// Initialize the API client
const apiClient = new TrendmoonApiClient();

// Use the services
const service = new CategoryService(apiClient);
const result = await service.getAllCategories();
```

## Available Services

This library provides several services to interact with the Trendmoon API:

- **[CategoryService](docs/CategoryService.md)** - Category
- **[ChatActivityService](docs/ChatActivityService.md)** - ChatActivity
- **[ChatService](docs/ChatService.md)** - Chat
- **[CoinService](docs/CoinService.md)** - Coin
- **[MessageService](docs/MessageService.md)** - Message
- **[SocialService](docs/SocialService.md)** - Social
- **[UserService](docs/UserService.md)** - User

## Detailed Documentation

Each service has its own detailed documentation with:
- Complete method descriptions
- Parameters and return types
- Usage examples
- TypeScript interfaces

Click on the links above to access the documentation for each service.

## Project Structure

```
src/
├── api/                 # Main API client
├── services/            # Services for each endpoint
├── types/              # TypeScript definitions
└── index.ts            # Main entry point

docs/                   # Services documentation
tests/                  # Unit tests
```

## Development

### Install Dependencies

```bash
npm install
```

### Run Tests

```bash
npm test
```

### Generate Documentation

```bash
# Generate services documentation
./generate_docs.sh

# Generate README.md with links
./generate_readme.sh
```

### Build

```bash
npm run build
```

## Support

For any questions or issues, please check the documentation or create an issue.

## Version

Current version: 0.1.0
