# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New `getTopCategoriesDominance()` method in `CategoryService` for retrieving top categories by market performance
- New `CategoryDominanceResponse` interface for the top categories endpoint with renamed fields for clarity
- Support for pagination and sorting in category dominance queries with `sort_by` and `sort_order` parameters
- Enhanced category dominance documentation with comprehensive examples

### Changed
- Updated `CategoryService` documentation to better explain category dominance functionality
- Enhanced test coverage for category dominance endpoints

### Fixed
- Improved type definitions for category dominance responses

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