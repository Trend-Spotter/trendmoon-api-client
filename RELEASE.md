# Release Guide for @trendmoon/api-client

This guide outlines the step-by-step process for creating and publishing new versions of the @trendmoon/api-client package.

## Prerequisites

- Node.js installed (version 16 or higher)
- npm account with access to @trendmoon organization
- GitHub account with access to the repository
- NPM_TOKEN set up in GitHub repository secrets

## Release Process

### 1. Prepare Your Changes

1. Make sure all your changes are committed to the main branch
2. Update the "Unreleased" section in `CHANGELOG.md` with your changes:
   ```markdown
   ## [Unreleased]

   ### Added
   - New feature X
   - New endpoint Y

   ### Changed
   - Updated documentation
   - Improved error handling

   ### Fixed
   - Bug fix for issue Z
   ```

### 2. Choose the Version Type

Decide which type of version bump you need:
- `patch`: For backwards-compatible bug fixes (0.1.0 → 0.1.1)
- `minor`: For new features that don't break existing functionality (0.1.0 → 0.2.0)
- `major`: For breaking changes (0.1.0 → 1.0.0)

### 3. Create New Version

Run one of these commands based on your version type:
```bash
# For bug fixes
npm version patch

# For new features
npm version minor

# For breaking changes
npm version major
```

This will:
- Update `package.json` version
- Create a git tag
- Update `CHANGELOG.md` with the new version
- Stage the changes

### 4. Push Changes

Push your changes and the new tag to GitHub:
```bash
git push --follow-tags
```

### 5. Create GitHub Release

1. Go to your GitHub repository
2. Click on "Releases" in the right sidebar
3. Click "Create a new release"
4. Select the tag you just created (e.g., v0.1.1)
5. Use the same version number as the title
6. Copy the relevant changes from CHANGELOG.md to the release notes
7. Click "Publish release"

### 6. Verify Publication

The GitHub Action will automatically:
1. Build the package
2. Run tests
3. Publish to npm if tests pass

You can verify the publication by:
1. Checking the GitHub Actions tab for successful completion
2. Visiting https://www.npmjs.com/package/@trendmoon/api-client
3. Testing the new version in a project:
   ```bash
   npm install @trendmoon/api-client@latest
   ```

## Troubleshooting

### If GitHub Action Fails

1. Check the GitHub Actions tab for error messages
2. Common issues:
   - NPM_TOKEN not set or expired
   - Tests failing
   - Build errors
   - Version conflicts

### If Manual Publication is Needed

If you need to publish manually:
```bash
# Build the package
npm run build

# Run tests
npm test

# Publish
npm publish --access public
```

## Versioning Guidelines

Follow these guidelines when deciding on version bumps:

### Patch (0.1.0 → 0.1.1)
- Bug fixes
- Documentation updates
- Minor improvements
- No new features
- No breaking changes

### Minor (0.1.0 → 0.2.0)
- New features
- New endpoints
- New functionality
- No breaking changes
- Backwards compatible

### Major (0.1.0 → 1.0.0)
- Breaking changes
- API changes
- Major refactoring
- Incompatible changes
- Requires user updates

## Best Practices

1. Always update the CHANGELOG.md before versioning
2. Test the package locally before publishing
3. Keep the main branch stable
4. Use feature branches for development
5. Review changes before publishing
6. Maintain clear documentation
7. Follow semantic versioning strictly

## Rollback Procedure

If you need to rollback a version:

1. Unpublish the version (within 72 hours of publishing):
   ```bash
   npm unpublish @trendmoon/api-client@<version>
   ```

2. Delete the git tag:
   ```bash
   git tag -d v<version>
   git push origin :refs/tags/v<version>
   ```

3. Revert the version in package.json and CHANGELOG.md
4. Create a new release with the previous version

Note: Unpublishing is only possible within 72 hours of publishing. After that, you'll need to publish a new version with fixes.
