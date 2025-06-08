#!/bin/bash

# Script to generate README.md with links to documentation

echo "🚀 Generating README.md..."

# Get information from package.json
PACKAGE_NAME=$(grep '"name"' package.json | sed 's/.*"name":[[:space:]]*"\([^"]*\)".*/\1/')
PACKAGE_VERSION=$(grep '"version"' package.json | sed 's/.*"version":[[:space:]]*"\([^"]*\)".*/\1/' 2>/dev/null || echo "1.0.0")
PACKAGE_DESC=$(grep '"description"' package.json | sed 's/.*"description":[[:space:]]*"\([^"]*\)".*/\1/' 2>/dev/null || echo "Official TypeScript client for Trendmoon API")

# Create README.md
cat > README.md << EOL
# ${PACKAGE_NAME}

${PACKAGE_DESC}

## Installation

\`\`\`bash
npm install ${PACKAGE_NAME}
\`\`\`

## Configuration

You need to configure your \`.env\` file. See \`.env.example\` for required variables.

\`\`\`bash
cp .env.example .env
# Edit the .env file with your API keys
\`\`\`

## Quick Start

\`\`\`typescript
import { TrendmoonApiClient } from '${PACKAGE_NAME}';
import { CategoryService } from '../src';

// Initialize the API client
const apiClient = new TrendmoonApiClient();

// Use the services
const service = new CategoryService(apiClient);
const result = await service.getAllCategories();
\`\`\`

## Available Services

This library provides several services to interact with the Trendmoon API:

EOL

# Add links to each service documentation
echo "📝 Adding links to documentation..."

for doc_file in docs/*.md; do
    if [ -f "$doc_file" ]; then
        # Extract filename without extension
        service_name=$(basename "$doc_file" .md)

        # Extract service name without "Service" for display
        display_name=${service_name%Service}

        # Read the first description line from the documentation file
        description=$(grep "^## Description" "$doc_file" -A 1 | tail -1 | sed 's/This service provides methods to interact with //' | sed 's/-related endpoints of the Trendmoon API\.//')

        if [ -z "$description" ]; then
            description="Methods to interact with ${display_name} endpoints"
        fi

        echo "- **[${service_name}](docs/${service_name}.md)** - ${description}" >> README.md
    fi
done

# Add examples and additional documentation section
cat >> README.md << EOL

## Detailed Documentation

Each service has its own detailed documentation with:
- Complete method descriptions
- Parameters and return types
- Usage examples
- TypeScript interfaces

Click on the links above to access the documentation for each service.

## Project Structure

\`\`\`
src/
├── api/                 # Main API client
├── services/            # Services for each endpoint
├── types/              # TypeScript definitions
└── index.ts            # Main entry point

docs/                   # Services documentation
tests/                  # Unit tests
\`\`\`

## Development

### Install Dependencies

\`\`\`bash
npm install
\`\`\`

### Run Tests

\`\`\`bash
npm test
\`\`\`

### Generate Documentation

\`\`\`bash
# Generate services documentation
./generate_docs.sh

# Generate README.md with links
./generate_readme.sh
\`\`\`

### Build

\`\`\`bash
npm run build
\`\`\`

## Support

For any questions or issues, please check the documentation or create an issue.

## Version

Current version: ${PACKAGE_VERSION}
EOL

echo "✅ README.md generated successfully!"
echo "📁 Documentation files found:"
ls -la docs/*.md | awk '{print "   - " $9}'

echo "🎉 Generation completed!"