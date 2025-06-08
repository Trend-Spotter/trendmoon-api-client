#!/bin/bash

# Create docs directory if it doesn't exist
mkdir -p docs

# List services from files in src/services
# excluding index.ts
services=$(find src/services -name "*.ts" | grep -v "index.ts" | sed 's|src/services/||' | sed 's|\.ts$||')

for service in $services; do
  echo "Creating markdown file for $service..."

  # Extract service name without "Service"
  service_name=${service%Service}

  # Create variable for service name with lowercase first letter
  service_var="${service,}"

  # Create file with header
  cat > "docs/${service}.md" << EOT
# ${service}

## Description
This service provides methods to interact with ${service_name}-related endpoints of the Trendmoon API.

## Usage

\`\`\`typescript
import { TrendmoonApiClient } from './api/TrendmoonApiClient.js';
import { ${service} } from './services/${service}.js';

const apiClient = new TrendmoonApiClient();
const ${service_var} = new ${service}(apiClient);
\`\`\`

## Methods

The following methods are available in this service:

EOT

  # Read service file and process methods
  while IFS= read -r line; do
    if [[ "$line" =~ public[[:space:]]+async[[:space:]]+([a-zA-Z0-9_]+) ]]; then
      method_name="${BASH_REMATCH[1]}"

      # Extract method details using simpler approach
      param_string=""
      has_params=false
      param_type=""

      # Check for params with simple string matching
      if [[ "$line" == *"params?"* ]]; then
        param_string="params?"
        has_params=true
      elif [[ "$line" == *"params:"* ]]; then
        param_string="params"
        has_params=true
      fi

      # Extract return type
      if [[ "$line" =~ Promise\<([^>]+)\> ]]; then
        return_type="${BASH_REMATCH[1]}"
      else
        return_type=""
      fi

      # Extract parameter type using grep
      if [ "$has_params" = true ]; then
        # Use grep to extract the parameter type
        param_type=$(echo "$line" | grep -o 'Types\.[a-zA-Z0-9_]*' | head -1 | sed 's/Types\.//')
        if [ -z "$param_type" ]; then
          # Fallback: try to extract type after params:
          param_type=$(echo "$line" | sed -n 's/.*params[?]*:[[:space:]]*\([^)]*\)).*/\1/p' | sed 's/Types\.//')
        fi
      fi

      # Add method to documentation
      cat >> "docs/${service}.md" << EOT
### \`${method_name}(${param_string})\`
Interacts with the ${method_name} endpoint.

EOT

      # Add parameter info if available
      if [ "$has_params" = true ] && [ -n "$param_type" ]; then
        echo "#### Parameters" >> "docs/${service}.md"
        echo "\`\`\`typescript" >> "docs/${service}.md"

        # Find parameter definition
        param_def=$(grep -A 20 "export interface ${param_type}" src/types/ResponseAndParams.ts 2>/dev/null || grep -A 20 "export type ${param_type}" src/types/ResponseAndParams.ts 2>/dev/null)

        if [ -n "$param_def" ]; then
          echo "$param_def" | head -20 >> "docs/${service}.md"
        else
          echo "${param_type}" >> "docs/${service}.md"
        fi

        echo "\`\`\`" >> "docs/${service}.md"
        echo "" >> "docs/${service}.md"
      fi

      # Add return type information
      if [ -n "$return_type" ]; then
        echo "#### Returns" >> "docs/${service}.md"
        echo "\`\`\`typescript" >> "docs/${service}.md"

        if [[ "$return_type" =~ ^Types\. ]]; then
          # Remove Types. prefix
          clean_return_type="${return_type#Types.}"

          # Find return type definition
          return_def=$(grep -A 10 "export type ${clean_return_type}" src/types/ResponseAndParams.ts 2>/dev/null)

          if [ -n "$return_def" ]; then
            echo "$return_def" >> "docs/${service}.md"

            # Check for Schema reference
            if [[ "$return_def" =~ Schema\.([a-zA-Z0-9_]+) ]]; then
              schema_type="${BASH_REMATCH[1]}"
              echo "" >> "docs/${service}.md"
              echo "// Referenced Schema type:" >> "docs/${service}.md"

              schema_def=$(grep -A 30 "export interface ${schema_type}" src/types/Schema.ts 2>/dev/null || grep -A 10 "export type ${schema_type}" src/types/Schema.ts 2>/dev/null)
              if [ -n "$schema_def" ]; then
                echo "$schema_def" | head -30 >> "docs/${service}.md"
              fi
            fi
          else
            echo "$return_type" >> "docs/${service}.md"
          fi
        else
          echo "$return_type" >> "docs/${service}.md"
        fi

        echo "\`\`\`" >> "docs/${service}.md"
        echo "" >> "docs/${service}.md"
      fi

      # Add example
      cat >> "docs/${service}.md" << EOT
#### Example
\`\`\`typescript
const result = await ${service_var}.${method_name}(${param_string});
\`\`\`

EOT
    fi
  done < "src/services/${service}.ts"

  # Add complete example at the end
  cat >> "docs/${service}.md" << EOT
## Complete Example

\`\`\`typescript
import { TrendmoonApiClient } from './api/TrendmoonApiClient.js';
import { ${service} } from './services/${service}.js';

// Initialize the API client and service
const apiClient = new TrendmoonApiClient();
const ${service_var} = new ${service}(apiClient);

// Example usage of the service
(async () => {
  try {
    // Use any method from the service
    const result = await ${service_var}.someMethod();
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
})();
\`\`\`
EOT

  echo "Generated docs/${service}.md"
done

echo "Documentation generation completed!"