# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Build & Development
- `npm run build` - Compile TypeScript to dist/ directory
- `npm run dev` - Watch mode compilation with TypeScript
- `npm run clean` - Remove dist/ directory
- `npm run prepare` - Automatically builds before publishing

### Testing
- `npm test` - Run tests with Vitest in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:watch` - Run tests in watch mode

### Testing Individual Services
Test files are located in `tests/` directory and follow the pattern `ServiceName.test.ts`. To run a specific test:
- Use Vitest's built-in filtering: `npm test -- CategoryService`
- Or run with file pattern: `npm test -- tests/CategoryService.test.ts`

## Architecture Overview

This is a TypeScript SDK for the Trendmoon API with the following key architectural components:

### Core Structure
- **TrendmoonApiClient** (`src/api/TrendmoonApiClient.ts`) - Main HTTP client that handles authentication, request formatting, and error handling
- **Service Layer** (`src/services/`) - High-level service classes that wrap API client methods with domain-specific logic
- **Type Definitions** (`src/types/`) - TypeScript interfaces for API requests/responses and domain schemas
- **Utilities** (`src/utils/`) - Helper functions including debug logging

### Service Pattern
Each service (CategoryService, ChatService, etc.) follows a consistent pattern:
1. Takes TrendmoonApiClient instance in constructor
2. Provides domain-specific methods that call the underlying API client
3. Uses strongly-typed request/response interfaces from the types module

### Key Files
- `src/index.ts` - Main entry point that exports all public APIs
- `src/api/TrendmoonApiClient.ts` - Core HTTP client with all API endpoints
- `src/types/ResponseAndParams.ts` - Request/response type definitions
- `src/types/Schema.ts` - Domain object schemas
- `src/config/env.ts` - Environment configuration management

### Authentication & Configuration
- Uses API key authentication via `Api-key` header
- Configuration loaded from environment variables via `src/config/env.ts`
- Requires `.env` file with `TRENDMOON_API_URL` and `TRENDMOON_API_KEY`

### Error Handling
- API client provides detailed error messages with status codes
- Includes request/response debugging via `src/utils/debug.ts`
- Errors include both HTTP status and API-specific error details when available

### Build System
- TypeScript compilation with CommonJS output
- Vitest for testing with Node.js environment
- Separate tsconfig for tests (`tsconfig.test.json`)
- Coverage reporting with v8 provider

## API Documentation

The SDK is built against the **Trendmoon Tiamat API v1.0.0** - "API for Trendmoon social data".

### API Reference
- OpenAPI Specification: https://api.qa.trendmoon.ai/openapi.json
- Interactive Documentation: https://api.qa.trendmoon.ai/docs#/
- Contact: Trendmoon Team (https://trendmoon.ai/)

The interactive documentation provides a Swagger UI interface where you can:
- Explore all available endpoints with detailed descriptions
- Test API calls directly in the browser
- View request/response examples with syntax highlighting
- Access OAuth2 authentication flows

### Key API Capabilities

**Social Insights**
- Social trend analysis and tracking
- Keyword monitoring across platforms
- Social media post search and filtering
- AI-generated project summaries and insights

**Cryptocurrency Data**
- Comprehensive coin search and discovery
- Category dominance analysis
- Market metrics and platform information
- Multi-source cryptocurrency intelligence

**Telegram Group Analytics**
- Real-time chat activity monitoring
- Message retrieval and search
- Group status and health monitoring
- User activity tracking within groups

**User Intelligence**
- User search and discovery
- Message history analysis
- User verification and status checking

### Authentication Requirements
All API endpoints require API key authentication via the `Api-key` header. The SDK automatically handles this authentication when properly configured with environment variables.

## Testing Strategy

The SDK uses a **hybrid testing approach** for optimal reliability and performance:

### Recommended: Mock-based Tests
```bash
npm run test:mock  # 24 reliable tests in ~17s
```

### Integration Tests (API-dependent)
```bash
npm run test:integration  # May fail due to API issues
```

### Test Categories
- **Mock Tests**: `tests/*.mock.test.ts` - Fast, reliable, no API dependency
- **Integration Tests**: `tests/*.test.ts` - Real API calls, may timeout/fail
- **New Services**: AlertService, CategoryCoinService use mocks by default

For detailed testing guidance, see `TESTING.md`.