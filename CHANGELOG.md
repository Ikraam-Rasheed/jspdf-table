# Changelog

## [1.1.0] - 2025-07-30

### Added - Core Table Functionality Improvements

- **Advanced Column Control**: Width constraints (minWidth, maxWidth), percentage widths, alignment options
- **Text Wrapping**: Automatic text wrapping for long content with `wrap: true` option
- **Column Alignment**: Individual column alignment (left, center, right) for headers and content
- **Multiple Width Calculation Modes**: Auto, equal, content-based, and fixed width modes
- **Enhanced Styling System**: Separate styles for headers, body, and alternate rows
- **Custom Border Control**: Fine-grained border styling with individual border controls
- **Advanced Themes**: Added 'minimal' theme, improved existing themes
- **Smart Margins**: Support for individual margin control (top, right, bottom, left)
- **Table Positioning**: Center tables, control table width (fixed, percentage, auto)
- **Return Values**: Function now returns table dimensions and position information

### Added - Error Handling & Validation

- **Comprehensive Error Handling**: Added custom error classes (`ValidationError`, `RenderError`, `TableError`)
- **Input Validation**: Extensive validation for all parameters with descriptive error messages
- **Safe Rendering**: Graceful handling of rendering errors with fallback mechanisms
- **Better Type Safety**: Exported interfaces and improved TypeScript support

### Enhanced Features

- **Improved Text Positioning**: Better vertical alignment and line height control
- **Multi-line Cell Support**: Automatic height calculation for wrapped text
- **Page Break Intelligence**: Smarter page breaks with proper header repetition
- **Performance Optimizations**: Better column width calculation algorithms
- **Enhanced Type Definitions**: More comprehensive TypeScript interfaces

### Fixed

- **Runtime Crashes**: Prevented crashes from empty data arrays, null values, and invalid inputs
- **Text Width Calculation**: Safe text width calculation with fallbacks
- **Page Break Handling**: Improved error handling for page operations
- **Color Validation**: Proper RGB color value validation (0-255 range)
- **Border Rendering**: Consistent border drawing across all themes

### Improved

- **API Design**: More intuitive and flexible options structure
- **Documentation**: Comprehensive examples and API reference
- **Error Messages**: More descriptive and actionable error messages
- **Logging**: Added warning messages for non-critical issues
- **Fallback Mechanisms**: Graceful degradation when operations fail

### Breaking Changes

- None - all changes are backward compatible

## [1.0.0] - 2025-07-30

### Added

- Initial release with basic table generation functionality
- Support for multiple themes (striped, grid, plain)
- Customizable styles and colors
- Automatic page breaks
- TypeScript support
