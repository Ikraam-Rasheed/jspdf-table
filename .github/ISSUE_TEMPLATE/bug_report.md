---
name: Bug report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
assignees: ''
---

## Bug Description
A clear and concise description of what the bug is.

## Steps to Reproduce
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
A clear and concise description of what you expected to happen.

## Actual Behavior
A clear and concise description of what actually happened.

## Code Example
```javascript
// Minimal code example that reproduces the issue
const doc = new jsPDF();
const columns = [
  { header: 'Test', dataKey: 'test' }
];
const data = [
  { test: 'value' }
];

autoTable(doc, columns, data, {
  // your options here
});
```

## Environment
- **Browser**: [e.g. Chrome 91.0.4472.124, Firefox 89.0]
- **Node.js version**: [e.g. 16.14.0]
- **jspdf version**: [e.g. 3.0.1]
- **jspdf-dynamic-tables version**: [e.g. 1.2.0]
- **Operating System**: [e.g. Windows 10, macOS 12.0, Ubuntu 20.04]

## Screenshots
If applicable, add screenshots to help explain your problem.

## Additional Context
Add any other context about the problem here.

## Possible Solution
If you have ideas on how to fix this, please describe them here.