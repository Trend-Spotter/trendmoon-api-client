# Testing Guide - Trendmoon SDK

## 🎯 **Testing Strategy**

The Trendmoon SDK uses a **hybrid testing strategy** to maximize reliability and performance:

### **Mock Tests (Recommended for Development)**
```bash
# Run only reliable tests with mocks
npm run test:mock
```
✅ **Advantages:**
- ⚡ **Fast** (24 tests in ~17s)
- 🔒 **Reliable** (no external API dependency)
- 🧪 **Stable** (no 503 errors, rate limits, timeouts)
- 💰 **Cost-effective** (no API consumption)

### **Integration Tests (For Final Validation)**
```bash
# Run tests against real API (may fail)
npm run test:integration
```
⚠️ **Warning:**
- 🐌 **Slow** (up to 3+ minutes)
- 🔌 **API-dependent** (503 errors, rate limits)
- 💸 **Consume API quotas**
- ⏱️ **Frequent timeouts** (15s per test)

## 🧪 **Available Test Types**

### **1. Complete Mock Tests**
- `tests/SocialService.mock.test.ts` - 17 SocialService tests (4 new methods)
- `tests/AlertService.test.ts` - 3 AlertService tests  
- `tests/CategoryCoinService.test.ts` - 4 CategoryCoinService tests

### **2. Integration Tests**
- `tests/CategoryService.test.ts` - Core category tests
- `tests/SocialService.test.ts` - Existing method tests
- `tests/CoinService.test.ts` - Coin and platform tests
- Other services...

## 🚀 **Test Commands**

```bash
# Recommended tests (mocks only)
npm run test:mock

# Fast tests with watch mode
npm run test:watch -- tests/*.mock.test.ts

# Test a specific service  
npm run test:run -- tests/SocialService.mock.test.ts

# All tests (including real API - may fail)
npm test

# Tests with coverage
npm run test:coverage

# Build + mock tests (recommended before commit)
npm run build && npm run test:mock
```

## 📊 **Test Coverage**

### **✅ Fully Tested Services (Mocks)**
| Service | Tests | Methods | Status |
|---------|--------|----------|---------|
| **SocialService** | 17 | 7/7 (100%) | ✅ Complete |
| **AlertService** | 3 | 3/3 (100%) | ✅ Complete |
| **CategoryCoinService** | 4 | 2/2 (100%) | ✅ Complete |

### **🔶 Partially Tested Services (Real API)**
| Service | Tests | Status |
|---------|--------|---------|
| CategoryService | 8 | ⚠️ API Dependent |
| CoinService | 12 | ⚠️ API Dependent |
| ChatService | 5 | ⚠️ API Dependent |
| UserService | 9 | ⚠️ API Dependent |

## 🛠️ **For Developers**

### **Daily Development**
```bash
# Recommended workflow
npm run test:mock        # Fast tests
npm run build           # TypeScript verification
```

### **Before Commit**
```bash
npm run build && npm run test:mock
```

### **CI/CD Pipeline**
```bash
# Recommended pipeline
npm ci
npm run build
npm run test:mock  # Reliable tests
# npm run test:integration  # Optional if API stable
```

### **Debug Specific Test**
```bash
# Debug with detailed logs
DEBUG_MODE=true npm run test:run -- tests/SocialService.mock.test.ts
```

## 🔧 **Environment Variables**

```bash
# Test configuration
DEBUG_MODE=true                    # Enable detailed logs
TRENDMOON_LOG_LEVEL=DEBUG         # Logging level
TRENDMOON_ENABLE_LOGGING=true     # Force logging

# API configuration (for integration tests)
TRENDMOON_API_URL=https://api.qa.trendmoon.ai
TRENDMOON_API_KEY=your_api_key
```

## 📈 **Performance Metrics**

### **Mock Tests (Recommended)**
- ⚡ **Duration:** ~17 seconds
- 🎯 **Reliability:** 100% 
- 📊 **Tests:** 24 tests
- 💚 **Success Rate:** 24/24 (100%)

### **Integration Tests (Real API)**  
- 🐌 **Duration:** 3+ minutes
- 😬 **Reliability:** ~30-70% (depends on API)
- 📊 **Tests:** 84 tests
- 🔶 **Success Rate:** Variable (63/84 in last run)

## 🎯 **Recommendation**

**Use `npm run test:mock` for daily development!**

Mock tests are:
- Faster ⚡
- More reliable 🔒  
- More cost-effective 💰
- Perfect for TDD 🧪

Integration tests remain useful for final validation, but should not block daily development.