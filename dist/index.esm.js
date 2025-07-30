/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cs: () => (/* binding */ autoTable),
/* harmony export */   rQ: () => (/* binding */ TableError),
/* harmony export */   vH: () => (/* binding */ RenderError),
/* harmony export */   yI: () => (/* binding */ ValidationError)
/* harmony export */ });
// Custom error classes for better error handling
class TableError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = 'TableError';
    }
}
class ValidationError extends TableError {
    constructor(message) {
        super(message, 'VALIDATION_ERROR');
    }
}
class RenderError extends TableError {
    constructor(message) {
        super(message, 'RENDER_ERROR');
    }
}
// Input validation functions
function validateDoc(doc) {
    if (!doc) {
        throw new ValidationError('Document parameter is required');
    }
    if (typeof doc !== 'object' || typeof doc.text !== 'function' || typeof doc.rect !== 'function') {
        throw new ValidationError('Document must be a valid jsPDF instance');
    }
}
function validateColumns(columns) {
    if (!Array.isArray(columns)) {
        throw new ValidationError('Columns must be an array');
    }
    if (columns.length === 0) {
        throw new ValidationError('At least one column is required');
    }
    columns.forEach((column, index) => {
        if (!column || typeof column !== 'object') {
            throw new ValidationError(`Column at index ${index} must be an object`);
        }
        if (typeof column.header !== 'string' || column.header.trim() === '') {
            throw new ValidationError(`Column at index ${index} must have a non-empty header string`);
        }
        if (typeof column.dataKey !== 'string' || column.dataKey.trim() === '') {
            throw new ValidationError(`Column at index ${index} must have a non-empty dataKey string`);
        }
    });
}
function validateData(data) {
    if (!Array.isArray(data)) {
        throw new ValidationError('Data must be an array');
    }
    // Allow empty data arrays - they should just render headers
}
function validateOptions(options) {
    if (options && typeof options !== 'object') {
        throw new ValidationError('Options must be an object');
    }
    if (options) {
        const { startY, margin, pageBreak, theme, styles, headerStyles, bodyStyles } = options;
        if (startY !== undefined && (typeof startY !== 'number' || startY < 0)) {
            throw new ValidationError('startY must be a non-negative number');
        }
        if (margin !== undefined && (typeof margin !== 'number' || margin < 0)) {
            throw new ValidationError('margin must be a non-negative number');
        }
        if (pageBreak !== undefined && !['auto', 'avoid', 'always'].includes(pageBreak)) {
            throw new ValidationError('pageBreak must be "auto", "avoid", or "always"');
        }
        if (theme !== undefined && !['striped', 'grid', 'plain', 'minimal'].includes(theme)) {
            throw new ValidationError('theme must be "striped", "grid", "plain", or "minimal"');
        }
        if (styles !== undefined) {
            validateStyles(styles, 'styles');
        }
        if (headerStyles !== undefined) {
            validateColorStyles(headerStyles, 'headerStyles');
        }
        if (bodyStyles !== undefined) {
            validateColorStyles(bodyStyles, 'bodyStyles');
        }
    }
}
function validateStyles(styles, fieldName) {
    if (typeof styles !== 'object') {
        throw new ValidationError(`${fieldName} must be an object`);
    }
    const { font, fontStyle, fontSize, cellPadding } = styles;
    if (font !== undefined && typeof font !== 'string') {
        throw new ValidationError(`${fieldName}.font must be a string`);
    }
    if (fontStyle !== undefined && !['normal', 'bold', 'italic', 'bolditalic'].includes(fontStyle)) {
        throw new ValidationError(`${fieldName}.fontStyle must be "normal", "bold", "italic", or "bolditalic"`);
    }
    if (fontSize !== undefined && (typeof fontSize !== 'number' || fontSize <= 0)) {
        throw new ValidationError(`${fieldName}.fontSize must be a positive number`);
    }
    if (cellPadding !== undefined && (typeof cellPadding !== 'number' || cellPadding < 0)) {
        throw new ValidationError(`${fieldName}.cellPadding must be a non-negative number`);
    }
}
function validateColorStyles(colorStyles, fieldName) {
    if (typeof colorStyles !== 'object') {
        throw new ValidationError(`${fieldName} must be an object`);
    }
    const { fillColor, textColor } = colorStyles;
    if (fillColor !== undefined) {
        validateColor(fillColor, `${fieldName}.fillColor`);
    }
    if (textColor !== undefined) {
        validateColor(textColor, `${fieldName}.textColor`);
    }
}
function validateColor(color, fieldName) {
    if (!Array.isArray(color) || color.length !== 3) {
        throw new ValidationError(`${fieldName} must be an array of 3 numbers [r, g, b]`);
    }
    color.forEach((value, index) => {
        if (typeof value !== 'number' || value < 0 || value > 255) {
            throw new ValidationError(`${fieldName}[${index}] must be a number between 0 and 255`);
        }
    });
}
// Utility functions for improved table functionality
function safeGetTextWidth(doc, text) {
    var _a, _b;
    try {
        return doc.getTextWidth(text);
    }
    catch (error) {
        console.warn(`Failed to get text width for "${text}":`, error);
        // Fallback: estimate width based on character count and font size
        const fontSize = ((_b = (_a = doc.internal) === null || _a === void 0 ? void 0 : _a.getFontSize) === null || _b === void 0 ? void 0 : _b.call(_a)) || 10;
        return text.length * fontSize * 0.6; // Rough estimation
    }
}
function parseMargin(margin) {
    if (typeof margin === 'number') {
        return { top: margin, right: margin, bottom: margin, left: margin };
    }
    return {
        top: margin.top || 10,
        right: margin.right || 10,
        bottom: margin.bottom || 10,
        left: margin.left || 10
    };
}
function parseWidth(width, availableWidth) {
    if (typeof width === 'number') {
        return width;
    }
    if (typeof width === 'string' && width.endsWith('%')) {
        const percentage = parseFloat(width) / 100;
        return availableWidth * percentage;
    }
    return 0; // Will be calculated later for 'auto'
}
function wrapText(doc, text, maxWidth, fontSize) {
    if (!text || maxWidth <= 0)
        return [text || ''];
    const words = text.toString().split(' ');
    const lines = [];
    let currentLine = '';
    for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = safeGetTextWidth(doc, testLine);
        if (testWidth <= maxWidth) {
            currentLine = testLine;
        }
        else {
            if (currentLine) {
                lines.push(currentLine);
                currentLine = word;
            }
            else {
                // Single word is too long, break it
                lines.push(word);
            }
        }
    }
    if (currentLine) {
        lines.push(currentLine);
    }
    return lines.length > 0 ? lines : [''];
}
function calculateColumnWidths(doc, columns, data, availableWidth, mode, styles) {
    const columnCount = columns.length;
    if (mode === 'equal') {
        const equalWidth = availableWidth / columnCount;
        return columns.map(() => equalWidth);
    }
    // Calculate content-based widths
    const contentWidths = columns.map((column, index) => {
        // Header width
        const headerWidth = safeGetTextWidth(doc, column.header);
        // Data width
        let maxDataWidth = 0;
        if (data.length > 0) {
            const dataWidths = data.map(row => {
                const cellValue = row[column.dataKey];
                const cellText = cellValue !== null && cellValue !== undefined ? String(cellValue) : '';
                return safeGetTextWidth(doc, cellText);
            }).filter(width => !isNaN(width) && isFinite(width));
            maxDataWidth = dataWidths.length > 0 ? Math.max(...dataWidths) : 0;
        }
        let calculatedWidth = Math.max(headerWidth, maxDataWidth) + (styles.cellPadding || 2) * 2;
        // Apply column-specific width constraints
        if (column.width && typeof column.width === 'number') {
            calculatedWidth = column.width;
        }
        else if (column.width && typeof column.width === 'string') {
            calculatedWidth = parseWidth(column.width, availableWidth);
        }
        // Apply min/max width constraints
        if (column.minWidth) {
            calculatedWidth = Math.max(calculatedWidth, column.minWidth);
        }
        if (column.maxWidth) {
            calculatedWidth = Math.min(calculatedWidth, column.maxWidth);
        }
        return calculatedWidth;
    });
    if (mode === 'content') {
        return contentWidths;
    }
    // Auto mode: scale to fit available width
    const totalContentWidth = contentWidths.reduce((sum, width) => sum + width, 0);
    if (totalContentWidth <= availableWidth) {
        // Content fits, distribute extra space proportionally
        const extraSpace = availableWidth - totalContentWidth;
        const scaleFactor = availableWidth / totalContentWidth;
        return contentWidths.map(width => width * scaleFactor);
    }
    else {
        // Content doesn't fit, scale down proportionally
        const scaleFactor = availableWidth / totalContentWidth;
        return contentWidths.map(width => width * scaleFactor);
    }
}
function getTextAlignment(align, cellWidth, textWidth, padding) {
    switch (align) {
        case 'center':
            return (cellWidth - textWidth) / 2;
        case 'right':
            return cellWidth - textWidth - padding;
        case 'left':
        default:
            return padding;
    }
}
function drawBorders(doc, x, y, width, height, borders, borderColor = [0, 0, 0]) {
    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
    // Draw individual borders
    if (borders.top) {
        const lineWidth = typeof borders.top === 'number' ? borders.top : 0.1;
        doc.setLineWidth(lineWidth);
        doc.line(x, y, x + width, y);
    }
    if (borders.right) {
        const lineWidth = typeof borders.right === 'number' ? borders.right : 0.1;
        doc.setLineWidth(lineWidth);
        doc.line(x + width, y, x + width, y + height);
    }
    if (borders.bottom) {
        const lineWidth = typeof borders.bottom === 'number' ? borders.bottom : 0.1;
        doc.setLineWidth(lineWidth);
        doc.line(x, y + height, x + width, y + height);
    }
    if (borders.left) {
        const lineWidth = typeof borders.left === 'number' ? borders.left : 0.1;
        doc.setLineWidth(lineWidth);
        doc.line(x, y, x, y + height);
    }
}
function autoTable(doc, columns, data, options = {}) {
    var _a, _b;
    try {
        // Input validation
        validateDoc(doc);
        validateColumns(columns);
        validateData(data);
        validateOptions(options);
        // Extract and set defaults for options
        const { startY = 20, margin = 10, pageBreak = 'auto', theme = 'striped', tableWidth = 'auto', columnWidthMode = 'auto', showHeader = true, showBorders = true, alternateRowColors = true, styles = {}, headerStyles = {}, bodyStyles = {}, alternateRowStyles = {}, borderStyles = {}, rowHeight = 'auto', headerHeight = 'auto' } = options;
        // Parse margin
        const margins = parseMargin(margin);
        // Default styles with improved defaults
        const defaultStyles = {
            font: 'helvetica',
            fontStyle: 'normal',
            fontSize: 10,
            cellPadding: 4,
            lineHeight: 1.2
        };
        const defaultHeaderStyles = Object.assign(Object.assign({}, defaultStyles), { fontStyle: 'bold', fillColor: [240, 240, 240], textColor: [0, 0, 0], borderColor: [200, 200, 200] });
        const defaultBodyStyles = Object.assign(Object.assign({}, defaultStyles), { fillColor: [255, 255, 255], textColor: [0, 0, 0], borderColor: [220, 220, 220] });
        const defaultAlternateRowStyles = Object.assign(Object.assign({}, defaultStyles), { fillColor: [248, 248, 248], textColor: [0, 0, 0] });
        const defaultBorderStyles = showBorders ? {
            top: true,
            right: true,
            bottom: true,
            left: true,
            horizontal: true,
            vertical: true
        } : {};
        // Merge styles
        const finalStyles = Object.assign(Object.assign({}, defaultStyles), styles);
        const finalHeaderStyles = Object.assign(Object.assign({}, defaultHeaderStyles), headerStyles);
        const finalBodyStyles = Object.assign(Object.assign({}, defaultBodyStyles), bodyStyles);
        const finalAlternateRowStyles = Object.assign(Object.assign({}, defaultAlternateRowStyles), alternateRowStyles);
        const finalBorderStyles = Object.assign(Object.assign({}, defaultBorderStyles), borderStyles);
        // Calculate available width
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        let availableWidth = pageWidth - margins.left - margins.right;
        if (typeof tableWidth === 'number') {
            availableWidth = Math.min(tableWidth, availableWidth);
        }
        else if (typeof tableWidth === 'string' && tableWidth.endsWith('%')) {
            const percentage = parseFloat(tableWidth) / 100;
            availableWidth = (pageWidth - margins.left - margins.right) * percentage;
        }
        // Set font for width calculations
        doc.setFont(finalStyles.font, finalStyles.fontStyle);
        doc.setFontSize(finalStyles.fontSize);
        // Calculate column widths using improved algorithm
        const columnWidths = calculateColumnWidths(doc, columns, data, availableWidth, columnWidthMode, finalStyles);
        // Validate table fits on page
        const totalTableWidth = columnWidths.reduce((sum, width) => sum + width, 0);
        if (totalTableWidth > availableWidth) {
            console.warn(`Table width (${totalTableWidth}) exceeds available width (${availableWidth}). Columns will be scaled down.`);
        }
        let cursorY = startY;
        const tableStartX = margins.left + (availableWidth - totalTableWidth) / 2; // Center table
        function drawCell(text, x, y, width, height, cellStyles, column, isHeader = false) {
            try {
                // Set font and size
                doc.setFont(cellStyles.font, cellStyles.fontStyle);
                doc.setFontSize(cellStyles.fontSize);
                // Draw cell background
                if (cellStyles.fillColor) {
                    doc.setFillColor(cellStyles.fillColor[0], cellStyles.fillColor[1], cellStyles.fillColor[2]);
                    doc.rect(x, y, width, height, 'F');
                }
                // Draw borders
                if (showBorders && finalBorderStyles) {
                    const borderColor = cellStyles.borderColor || [0, 0, 0];
                    drawBorders(doc, x, y, width, height, finalBorderStyles, borderColor);
                }
                // Handle text wrapping if enabled
                const maxTextWidth = width - (cellStyles.cellPadding * 2);
                const lines = column.wrap ?
                    wrapText(doc, text, maxTextWidth, cellStyles.fontSize) :
                    [text];
                // Set text color
                if (cellStyles.textColor) {
                    doc.setTextColor(cellStyles.textColor[0], cellStyles.textColor[1], cellStyles.textColor[2]);
                }
                // Draw text with proper alignment
                const lineHeight = cellStyles.fontSize * (cellStyles.lineHeight || 1.2);
                const totalTextHeight = lines.length * lineHeight;
                const startY = y + (height - totalTextHeight) / 2 + lineHeight * 0.8;
                lines.forEach((line, lineIndex) => {
                    const textWidth = safeGetTextWidth(doc, line);
                    const align = isHeader ? (column.headerAlign || column.align) : column.align;
                    const textX = x + getTextAlignment(align, width, textWidth, cellStyles.cellPadding);
                    const textY = startY + (lineIndex * lineHeight);
                    doc.text(line, textX, textY);
                });
                return lines.length * lineHeight;
            }
            catch (error) {
                console.error(`Error drawing cell:`, error);
                return cellStyles.fontSize * (cellStyles.lineHeight || 1.2);
            }
        }
        function drawHeader() {
            if (!showHeader)
                return 0;
            try {
                const calculatedHeaderHeight = typeof headerHeight === 'number' ?
                    headerHeight :
                    finalHeaderStyles.fontSize + finalHeaderStyles.cellPadding * 2;
                let currentX = tableStartX;
                let maxRowHeight = calculatedHeaderHeight;
                columns.forEach((column, index) => {
                    const cellWidth = columnWidths[index];
                    const textHeight = drawCell(column.header, currentX, cursorY, cellWidth, calculatedHeaderHeight, finalHeaderStyles, column, true);
                    maxRowHeight = Math.max(maxRowHeight, textHeight + finalHeaderStyles.cellPadding * 2);
                    currentX += cellWidth;
                });
                cursorY += maxRowHeight;
                return maxRowHeight;
            }
            catch (error) {
                throw new RenderError(`Failed to draw table header: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
        function drawRow(rowData, rowIndex) {
            try {
                const calculatedRowHeight = typeof rowHeight === 'number' ?
                    rowHeight :
                    finalStyles.fontSize + finalStyles.cellPadding * 2;
                // Check if we need a new page
                if (pageBreak === 'auto' && cursorY + calculatedRowHeight > pageHeight - margins.bottom) {
                    try {
                        doc.addPage();
                        cursorY = margins.top;
                        if (showHeader) {
                            drawHeader();
                        }
                    }
                    catch (error) {
                        console.error('Error adding new page:', error);
                        throw new RenderError(`Failed to add new page: ${error instanceof Error ? error.message : String(error)}`);
                    }
                }
                // Determine row styles based on theme and alternating colors
                let currentRowStyles = finalBodyStyles;
                if (alternateRowColors && rowIndex % 2 !== 0) {
                    currentRowStyles = Object.assign(Object.assign({}, finalBodyStyles), finalAlternateRowStyles);
                }
                // Apply theme-specific styling
                if (theme === 'striped' && rowIndex % 2 !== 0) {
                    currentRowStyles = Object.assign(Object.assign({}, currentRowStyles), { fillColor: finalAlternateRowStyles.fillColor || [248, 248, 248] });
                }
                else if (theme === 'minimal') {
                    currentRowStyles = Object.assign(Object.assign({}, currentRowStyles), { fillColor: [255, 255, 255], borderColor: [240, 240, 240] });
                }
                let currentX = tableStartX;
                let maxRowHeight = calculatedRowHeight;
                columns.forEach((column, index) => {
                    try {
                        const cellWidth = columnWidths[index];
                        // Get cell value safely
                        const cellValue = rowData && rowData[column.dataKey] !== undefined ? rowData[column.dataKey] : '';
                        const cellText = cellValue !== null ? String(cellValue) : '';
                        const textHeight = drawCell(cellText, currentX, cursorY, cellWidth, calculatedRowHeight, currentRowStyles, column, false);
                        maxRowHeight = Math.max(maxRowHeight, textHeight + currentRowStyles.cellPadding * 2);
                        currentX += cellWidth;
                    }
                    catch (error) {
                        console.error(`Error drawing cell for column "${column.header}" at row ${rowIndex}:`, error);
                        // Continue with next column
                        currentX += columnWidths[index] || 50; // Fallback width
                    }
                });
                cursorY += maxRowHeight;
                return maxRowHeight;
            }
            catch (error) {
                console.error(`Error drawing row ${rowIndex}:`, error);
                // Continue with next row by incrementing cursorY
                const fallbackHeight = finalStyles.fontSize + finalStyles.cellPadding * 2;
                cursorY += fallbackHeight;
                return fallbackHeight;
            }
        }
        // Draw the table
        try {
            const headerHeight = drawHeader();
            if (data.length > 0) {
                data.forEach((rowData, index) => {
                    try {
                        drawRow(rowData, index);
                    }
                    catch (error) {
                        console.error(`Error processing row ${index}:`, error);
                        // Continue with next row
                    }
                });
            }
            // Return table information for potential chaining or further processing
            return {
                finalY: cursorY,
                tableWidth: totalTableWidth,
                tableHeight: cursorY - startY,
                pageCount: ((_b = (_a = doc.internal) === null || _a === void 0 ? void 0 : _a.getNumberOfPages) === null || _b === void 0 ? void 0 : _b.call(_a)) || 1
            };
        }
        catch (error) {
            throw new RenderError(`Failed to render table: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    catch (error) {
        // Re-throw our custom errors
        if (error instanceof TableError) {
            throw error;
        }
        // Wrap unexpected errors
        console.error('Unexpected error in autoTable:', error);
        throw new TableError(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`, 'UNEXPECTED_ERROR');
    }
}

const __webpack_exports__RenderError = __webpack_exports__.vH;
const __webpack_exports__TableError = __webpack_exports__.rQ;
const __webpack_exports__ValidationError = __webpack_exports__.yI;
const __webpack_exports__autoTable = __webpack_exports__.cs;
export { __webpack_exports__RenderError as RenderError, __webpack_exports__TableError as TableError, __webpack_exports__ValidationError as ValidationError, __webpack_exports__autoTable as autoTable };
