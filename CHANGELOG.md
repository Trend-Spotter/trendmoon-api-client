# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- **BREAKING CHANGE**: Updated `SearchCoinsParams` interface to use `query` parameter instead of separate `name` and `symbol` parameters
- **BREAKING CHANGE**: Added `sort_by` and `sort_order` parameters to `SearchCoinsParams` for enhanced sorting capabilities
- Updated `CoinService.searchCoins()` method documentation to reflect new query-based search functionality
- Enhanced search functionality to work more like CoinGecko's search with single query field

### Fixed
- Search coins endpoint now properly supports unified query search across name and symbol fields

## [0.1.2] - 2025-06-24

### Added
- `AlertService` implementation with comprehensive functionality
- `CategoryCoinService` for handling category-specific coin operations
- Topic summary endpoint in SocialService
- Mock tests for AlertService and CategoryCoinService
- Error handling utility classes
- Dedicated tsconfig configuration for tests
- Comprehensive test separation (mock vs integration tests)

### Changed
- Refactored test setup and examples structure
- Updated imports in README and scripts to reference package directly
- Improved ChatService test reliability
- Enhanced CoinService test implementation
- Updated publish workflow to use mock tests for CI/CD
- Refined `.gitignore` to better handle project files

### Fixed
- Missing endpoint coverage in Trendmoon API client
- SocialService test issues and content validation
- ChatService test stability issues
- CoinService test execution

### Removed
- Redundant service documentation files
- Obsolete IntelliJ IDEA project files
- Content validation in social service tests (causing test failures)

## [0.1.1] - 2024-XX-XX

### Added
- NPM package configuration and documentation
- GitHub Actions publish workflow with environment variables
- Automated publishing pipeline

### Changed
- Updated publish workflow to include proper environment variable handling

### Fixed
- Package publishing configuration

## [0.1.0] - 2024-03-14

### Added
- Initial release of @trendmoon/api-client
- Core services and utilities for Trendmoon API Client:
  - CategoryService with comprehensive category management
  - ChatService and ChatActivityService for messaging functionality
  - CoinService for cryptocurrency data
  - MessageService for message handling
  - SocialService for social features
  - UserService for user management
- Complete TypeScript client for Trendmoon API
- Comprehensive TypeScript types for all requests and responses
- Debug logging utility
- Environment configuration support with dotenv
- README documentation with CategoryService usage examples
- Core dependencies: node-fetch (^3.3.2), dotenv (^16.4.5), zod (^3.22.4)
- Development dependencies: TypeScript (^5.3.3), Vitest (^1.6.0), coverage reporting
- Node.js 16+ compatibility
- Proper package distribution configuration