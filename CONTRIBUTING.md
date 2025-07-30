# Contributing to jspdf-table

Thank you for your interest in contributing to jspdf-table! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Git

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/jspdf-table.git
   cd jspdf-table
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Build the project**:
   ```bash
   npm run build
   ```

5. **Run examples** to test:
   ```bash
   npm start
   # Open http://localhost:8080 in your browser
   ```

## 🛠️ Development Workflow

### Project Structure

```
jspdf-table/
├── src/
│   └── index.ts          # Main library code
├── dist/                 # Built files (auto-generated)
├── example/              # Demo files and examples
├── webpack.*.config.js   # Build configurations
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project metadata
```

### Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** in the `src/` directory

3. **Build and test**:
   ```bash
   npm run build
   # Test your changes using the examples
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

### Commit Message Format

We follow conventional commit format:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
- `feat: add text wrapping support for table cells`
- `fix: resolve column width calculation issue`
- `docs: update API documentation for new features`

## 🧪 Testing

### Manual Testing

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Test examples**:
   ```bash
   npm start
   ```
   Open the example files in your browser and test functionality.

3. **Test error handling**:
   - Try invalid inputs
   - Test edge cases
   - Verify error messages are helpful

### Adding Tests

Currently, the project uses manual testing through examples. When adding new features:

1. **Create example usage** in the existing demo files
2. **Test edge cases** and error conditions
3. **Verify backward compatibility**

## 📝 Documentation

### Code Documentation

- **Add JSDoc comments** for new functions and interfaces
- **Include parameter descriptions** and examples
- **Document any breaking changes**

### README Updates

When adding new features:

1. **Update the features list**
2. **Add usage examples**
3. **Update the API reference**
4. **Add to the changelog**

### Example Files

- **Create examples** for new features in `/example` directory
- **Update existing examples** if behavior changes
- **Ensure examples are well-commented**

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce** the problem
3. **Expected vs actual behavior**
4. **Code example** that demonstrates the issue
5. **Environment details** (browser, Node.js version, etc.)

### Bug Report Template

```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Code Example
```javascript
// Minimal code example that reproduces the issue
```

## Environment
- Browser: Chrome 91.0.4472.124
- Node.js: 16.14.0
- jspdf-dynamic-tables: 1.2.0
```

## 💡 Feature Requests

When suggesting new features:

1. **Describe the use case** - why is this needed?
2. **Provide examples** - how would it be used?
3. **Consider alternatives** - are there existing ways to achieve this?
4. **Think about API design** - how should it integrate with existing features?

## 🔍 Code Review Process

### Pull Request Guidelines

1. **Clear title and description**
2. **Reference related issues** (if any)
3. **Include examples** of new functionality
4. **Update documentation** as needed
5. **Ensure backward compatibility**

### Review Criteria

- **Code quality** - readable, maintainable, follows existing patterns
- **Functionality** - works as intended, handles edge cases
- **Documentation** - adequate comments and examples
- **Compatibility** - doesn't break existing functionality

## 🎯 Areas for Contribution

### High Priority

- **Unit testing framework** - Set up comprehensive test suite
- **Performance optimization** - Improve rendering speed
- **Bundle size optimization** - Reduce library size
- **Browser compatibility** - Test and fix cross-browser issues

### Medium Priority

- **Advanced features** - Cell merging, custom renderers
- **Export formats** - Additional output options
- **Accessibility** - Screen reader support, ARIA labels
- **Internationalization** - Multi-language support

### Documentation

- **API documentation** - Comprehensive reference
- **Tutorials** - Step-by-step guides
- **Best practices** - Performance and usage tips
- **Migration guides** - Upgrade instructions

## 📞 Getting Help

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and community support
- **Code Review** - Submit PRs for feedback

## 🙏 Recognition

Contributors will be:

- **Listed in CHANGELOG.md** for significant contributions
- **Mentioned in release notes** for major features
- **Added to contributors list** in the repository

Thank you for contributing to jspdf-table! 🎉