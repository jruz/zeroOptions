declare namespace TableScssNamespace {
  export interface ITableScss {
    container: string;
    footer: string;
    green: string;
    header: string;
    red: string;
    tr: string;
  }
}

declare const TableScssModule: TableScssNamespace.ITableScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TableScssNamespace.ITableScss;
};

export = TableScssModule;
