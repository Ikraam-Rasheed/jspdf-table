import jsPDF from 'jspdf';
export interface Column {
    header: string;
    dataKey: string;
    width?: number | 'auto' | string;
    align?: 'left' | 'center' | 'right';
    headerAlign?: 'left' | 'center' | 'right';
    minWidth?: number;
    maxWidth?: number;
    wrap?: boolean;
}
export interface CellStyles {
    font?: string;
    fontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic';
    fontSize?: number;
    cellPadding?: number;
    lineHeight?: number;
}
export interface ColorStyles {
    fillColor?: [number, number, number];
    textColor?: [number, number, number];
    borderColor?: [number, number, number];
}
export interface BorderStyles {
    top?: boolean | number;
    right?: boolean | number;
    bottom?: boolean | number;
    left?: boolean | number;
    horizontal?: boolean | number;
    vertical?: boolean | number;
}
export interface TableOptions {
    startY?: number;
    margin?: number | {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
    pageBreak?: 'auto' | 'avoid' | 'always';
    theme?: 'striped' | 'grid' | 'plain' | 'minimal';
    tableWidth?: number | 'auto' | string;
    columnWidthMode?: 'auto' | 'fixed' | 'content' | 'equal';
    showHeader?: boolean;
    showBorders?: boolean;
    alternateRowColors?: boolean;
    styles?: CellStyles;
    headerStyles?: CellStyles & ColorStyles;
    bodyStyles?: CellStyles & ColorStyles;
    alternateRowStyles?: CellStyles & ColorStyles;
    borderStyles?: BorderStyles;
    rowHeight?: number | 'auto';
    headerHeight?: number | 'auto';
}
export declare class TableError extends Error {
    code: string;
    constructor(message: string, code: string);
}
export declare class ValidationError extends TableError {
    constructor(message: string);
}
export declare class RenderError extends TableError {
    constructor(message: string);
}
export declare function autoTable(doc: jsPDF, columns: Column[], data: any[], options?: Partial<TableOptions>): {
    finalY: number;
    tableWidth: number;
    tableHeight: number;
    pageCount: any;
};
//# sourceMappingURL=index.d.ts.map