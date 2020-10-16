export type StateT = {
  change: number;
  cost: number;
  currentPrice: number;
  currentValue: number;
  dte: number;
  entryPrice: number;
  expiration: string;
  name: string;
  pnl: number;
  quantity: number;
  strike: number;
  ticker: string;
  type: string;
}[];

export const getQuantity = (cells: HTMLTableDataCellElement[]): number =>
  parseFloat(cells[5].innerText || '0');

export const getCurrentPrice = (cells: HTMLTableDataCellElement[]): number =>
  parseFloat(cells[8].innerText || '0') * 100;

export const getEntryPrice = (cells: HTMLTableDataCellElement[]): number =>
  parseFloat(cells[7].innerText || '0') * 100;

export const getExpiration = (cells: HTMLTableDataCellElement[]): string => {
  const t = cells[4].innerText;
  const date = '20' + t[0] + t[1] + '-' + t[2] + t[3] + '-' + t[4] + t[5];

  return date;
};

export const getStrike = (cells: HTMLTableDataCellElement[]): number =>
  Number(cells[3].innerText);

export const getCost = (cells: HTMLTableDataCellElement[]): number => {
  const quantity = getQuantity(cells);
  const entryPrice = getEntryPrice(cells);

  return quantity * entryPrice;
};

export const getPnl = (cells: HTMLTableDataCellElement[]): number => {
  const cost = getCost(cells);
  const currentValue = getCurrentValue(cells);

  return currentValue - cost;
};

export const getPercent = (start: number, end: number): number =>
  Math.round((end * 100) / start - 100);

export const getChange = (cells: HTMLTableDataCellElement[]): number => {
  const entryPrice = getEntryPrice(cells);
  const currentPrice = getCurrentPrice(cells);

  return getPercent(entryPrice, currentPrice);
};

export const getCurrentValue = (cells: HTMLTableDataCellElement[]): number => {
  const quantity = getQuantity(cells);
  const currentPrice = getCurrentPrice(cells);

  return quantity * currentPrice;
};

export const getDTE = (cells: HTMLTableDataCellElement[]): number => {
  const date = getExpiration(cells);
  const oneDay = 24 * 60 * 60 * 1000;
  const expiration = Number(new Date(date));
  const today = Number(new Date());

  return Math.round(Math.abs((expiration - today) / oneDay));
};

export const getData = (): StateT | null => {
  const table: any = document.getElementById('opTable-2');
  if (!table) return null;

  const rows = Array.from(table.rows);
  return rows.map((row: any) => ({
    change: getChange(row.cells),
    cost: getCost(row.cells),
    currentPrice: getCurrentPrice(row.cells),
    currentValue: getCurrentValue(row.cells),
    dte: getDTE(row.cells),
    entryPrice: getEntryPrice(row.cells),
    expiration: getExpiration(row.cells),
    name: row.cells[0].innerText,
    pnl: getPnl(row.cells),
    quantity: getQuantity(row.cells),
    strike: getStrike(row.cells),
    ticker: row.dataset.root,
    type: row.cells[2].innerText,
  }));
};

export const sort = (a: any, b: any) => {
  if (a.dte < b.dte) return -1;
  if (a.dte > b.dte) return 1;
  return 0;
};

export const format = (item: number | string): string =>
  Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    .format(Number(item))
    .split('.')[0];
