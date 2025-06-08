#!/bin/bash

echo "🚀 Generating complete documentation..."

# Generate services documentation
echo "📝 Generating services documentation..."
./generate_docs.sh

# Generate README.md
echo "📄 Generating README.md..."
./generate_readme.sh

echo "🎉 Complete documentation generated!"