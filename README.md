# jspdf-table

[![npm version](https://badge.fury.io/js/%40ikramrasheed%2Fjspdf-table.svg)](https://badge.fury.io/js/%40ikramrasheed%2Fjspdf-table)
[![npm downloads](https://img.shields.io/npm/dm/@ikramrasheed/jspdf-table.svg)](https://www.npmjs.com/package/@ikramrasheed/jspdf-table)
[![GitHub license](https://img.shields.io/github/license/Ikraam-Rasheed/jspdf-table.svg)](https://github.com/Ikraam-Rasheed/jspdf-table/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Ikraam-Rasheed/jspdf-table.svg)](https://github.com/Ikraam-Rasheed/jspdf-table/stargazers)

A powerful TypeScript library for creating dynamic, feature-rich tables in jsPDF with advanced styling, text wrapping, column alignment, and automatic page breaks.

## Features

- **Advanced Column Control**: Width constraints, alignment, text wrapping
- **Rich Styling Options**: Multiple themes, custom colors, borders
- **Smart Page Breaks**: Automatic page breaks with header repetition  
- **Flexible Layout**: Multiple column width calculation modes
- **Robust Error Handling**: Comprehensive validation and graceful fallbacks
- **TypeScript Support**: Full type definitions and IntelliSense
- **Multiple Themes**: Striped, grid, plain, and minimal themes

## Installation

```bash
npm install @ikramrasheed/jspdf-table
```

**Note**: This package requires jsPDF as a peer dependency:

```bash
npm install jspdf @ikramrasheed/jspdf-table
```

## Basic Usage

```javascript
import jsPDF from 'jspdf';
import { autoTable } from '@ikramrasheed/jspdf-table';

const doc = new jsPDF();

const columns = [
  { header: 'ID', dataKey: 'id', width: 50, align: 'center' },
  { header: 'Name', dataKey: 'name', align: 'left' },
  { header: 'Email', dataKey: 'email', align: 'left' },
  { header: 'Salary', dataKey: 'salary', align: 'right' }
];

const data = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', salary: '$75,000' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', salary: '$82,000' }
];

const result = autoTable(doc, columns, data, {
  startY: 20,
  theme: 'striped',
  headerStyles: {
    fillColor: [52, 152, 219],
    textColor: [255, 255, 255],
    fontStyle: 'bold'
  }
});

console.log(`Table rendered at Y: ${result.finalY}`);
doc.save('table.pdf');
```

## Advanced Features

### Column Configuration

```javascript
const columns = [
  { 
    header: 'Product Name', 
    dataKey: 'name',
    width: 120,           // Fixed width
    minWidth: 80,         // Minimum width constraint
    maxWidth: 200,        // Maximum width constraint
    align: 'left',        // Text alignment
    headerAlign: 'center', // Header-specific alignment
    wrap: true            // Enable text wrapping
  },
  { 
    header: 'Price', 
    dataKey: 'price',
    width: '15%',         // Percentage width
    align: 'right'
  }
];
```

### Text Wrapping & Long Content

```javascript
const columns = [
  { 
    header: 'Description', 
    dataKey: 'description',
    wrap: true,           // Enable wrapping
    maxWidth: 200,        // Constrain width
    align: 'left'
  }
];

const data = [
  { 
    description: 'This is a very long description that will automatically wrap to multiple lines when it exceeds the column width.'
  }
];
```

### Advanced Styling & Themes

```javascript
autoTable(doc, columns, data, {
  theme: 'minimal',              // 'striped', 'grid', 'plain', 'minimal'
  showBorders: true,
  alternateRowColors: true,
  columnWidthMode: 'auto',       // 'auto', 'equal', 'content', 'fixed'
  
  styles: {
    fontSize: 10,
    cellPadding: 6,
    lineHeight: 1.3,
    font: 'helvetica'
  },
  
  headerStyles: {
    fontSize: 12,
    fontStyle: 'bold',
    fillColor: [46, 125, 50],
    textColor: [255, 255, 255],
    cellPadding: 8
  },
  
  bodyStyles: {
    fillColor: [255, 255, 255],
    textColor: [33, 33, 33]
  },
  
  alternateRowStyles: {
    fillColor: [248, 249, 250]
  },
  
  borderStyles: {
    top: 2,
    bottom: 2,
    horizontal: 0.5,
    vertical: 1
  }
});
```

### Custom Margins & Positioning

```javascript
autoTable(doc, columns, data, {
  margin: { 
    top: 20, 
    right: 15, 
    bottom: 20, 
    left: 25 
  },
  tableWidth: '80%',        // Use 80% of available width
  startY: 50,               // Start position
  showHeader: true,         // Show/hide header
  pageBreak: 'auto'         // Auto page breaks
});
```

## API Reference

### Column Interface

```typescript
interface Column {
  header: string;                           // Column header text
  dataKey: string;                          // Data property key
  width?: number | 'auto' | string;         // Column width
  align?: 'left' | 'center' | 'right';     // Content alignment
  headerAlign?: 'left' | 'center' | 'right'; // Header alignment
  minWidth?: number;                        // Minimum width
  maxWidth?: number;                        // Maximum width
  wrap?: boolean;                           // Enable text wrapping
}
```

### Table Options

```typescript
interface TableOptions {
  startY?: number;                          // Starting Y position
  margin?: number | MarginObject;           // Page margins
  pageBreak?: 'auto' | 'avoid' | 'always'; // Page break behavior
  theme?: 'striped' | 'grid' | 'plain' | 'minimal'; // Table theme
  tableWidth?: number | 'auto' | string;   // Table width
  columnWidthMode?: 'auto' | 'fixed' | 'content' | 'equal'; // Width calculation
  showHeader?: boolean;                     // Show table header
  showBorders?: boolean;                    // Show cell borders
  alternateRowColors?: boolean;             // Alternate row colors
  styles?: CellStyles;                      // Default cell styles
  headerStyles?: CellStyles & ColorStyles;  // Header styles
  bodyStyles?: CellStyles & ColorStyles;    // Body cell styles
  alternateRowStyles?: CellStyles & ColorStyles; // Alternate row styles
  borderStyles?: BorderStyles;              // Border configuration
  rowHeight?: number | 'auto';              // Row height
  headerHeight?: number | 'auto';           // Header height
}
```

### Return Value

```typescript
interface TableResult {
  finalY: number;        // Final Y position after table
  tableWidth: number;    // Actual table width
  tableHeight: number;   // Total table height
  pageCount: number;     // Number of pages used
}
```

## Themes

- **striped**: Alternating row colors (default)
- **grid**: Full borders with background colors
- **plain**: Minimal styling, clean look
- **minimal**: Very subtle borders and colors

## Error Handling

The library includes comprehensive error handling:

```javascript
import { ValidationError, RenderError, TableError } from 'jspdf-table';

try {
  autoTable(doc, columns, data, options);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Invalid input:', error.message);
  } else if (error instanceof RenderError) {
    console.error('Rendering failed:', error.message);
  }
}
```

## Examples

Check out the `/example` directory for comprehensive demos:

- `index.html` - Basic usage examples
- `error-handling-demo.html` - Error handling demonstrations
- `advanced-features-demo.html` - All advanced features showcase

## Contributing

We welcome contributions from the community! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Start for Contributors

```bash
# Clone the repository
git clone https://github.com/Ikraam-Rasheed/jspdf-table.git
cd jspdf-table

# Install dependencies
npm install

# Build the project
npm run build

# Run examples
npm start
```

### Ways to Contribute

- Report bugs and issues
- Suggest new features and improvements  
- Submit pull requests
- Improve documentation
- Star the repository if you find it useful

## NPM Package

This package is published on npm as `@ikramrasheed/jspdf-table`. You can:

- **View on npm**: [https://www.npmjs.com/package/@ikramrasheed/jspdf-table](https://www.npmjs.com/package/@ikramrasheed/jspdf-table)
- **Install**: `npm install @ikramrasheed/jspdf-table`
- **Current version**: 1.2.2

## License

[MIT](https://opensource.org/licenses/MIT) - see the [LICENSE](LICENSE) file for details.

## Open Source

This project is open source and welcomes contributions from the community. We believe in building great software together!

### Community

- **Issues**: Report bugs or request features
- **Discussions**: Ask questions and share ideas
- **Pull Requests**: Contribute code improvements
- **Documentation**: Help improve our docs

Thank you for using jspdf-table!