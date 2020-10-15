import React, { useEffect, useState } from 'react';

type StateT = {
  change: string;
  cost: number;
  currentPrice: number;
  currentValue: number;
  dte: number;
  entryPrice: number;
  expiration: string;
  name: string;
  quantity: number;
  strike: number;
  ticker: string;
  type: string;
}[];

const getQuantity = (cells: HTMLTableDataCellElement[]): number =>
  parseFloat(cells[5].innerText || '0');

const getCurrentPrice = (cells: HTMLTableDataCellElement[]): number =>
  parseFloat(cells[8].innerText || '0') * 100;

const getEntryPrice = (cells: HTMLTableDataCellElement[]): number =>
  parseFloat(cells[7].innerText || '0') * 100;

const getExpiration = (cells: HTMLTableDataCellElement[]): string => {
  const t = cells[4].innerText;
  const date = '20' + t[0] + t[1] + '-' + t[2] + t[3] + '-' + t[4] + t[5];

  return date;
};

const getStrike = (cells: HTMLTableDataCellElement[]): number =>
  Number(cells[3].innerText);

const getCost = (cells: HTMLTableDataCellElement[]): number => {
  const quantity = getQuantity(cells);
  const entryPrice = getEntryPrice(cells);

  return quantity * entryPrice;
};

const getChange = (cells: HTMLTableDataCellElement[]): string => {
  const entryPrice = getEntryPrice(cells);
  const currentPrice = getCurrentPrice(cells);

  return Math.round((currentPrice * 100) / entryPrice - 100) + '%';
};

const getCurrentValue = (cells: HTMLTableDataCellElement[]): number => {
  const quantity = getQuantity(cells);
  const currentPrice = getCurrentPrice(cells);

  return quantity * currentPrice;
};

const getDTE = (cells: HTMLTableDataCellElement[]): number => {
  const date = getExpiration(cells);
  const oneDay = 24 * 60 * 60 * 1000;
  const expiration = Number(new Date(date));
  const today = Number(new Date());

  return Math.round(Math.abs((expiration - today) / oneDay));
};

const getData = (): StateT | null => {
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
    quantity: getQuantity(row.cells),
    strike: getStrike(row.cells),
    ticker: row.dataset.root,
    type: row.cells[2].innerText,
  }));
};

const sort = (a: any, b: any) => {
  if (a.dte < b.dte) return -1;
  if (a.dte > b.dte) return 1;
  return 0;
};

const format = (item: number | string): string =>
  Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    .format(Number(item))
    .split('.')[0];

const App = (): JSX.Element | null => {
  const [state, setState] = useState<StateT | null>(null);

  const updateData = (): void => {
    const data = getData();
    if (!data) return;
    data.sort(sort);
    setState(data);
  };

  useEffect((): void => {
    setInterval(updateData, 1000);
  }, []);

  if (!state) return null;
  return (
    <section style={{ width: '600px', textAlign: "right" }}>
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Type</th>
            <th>Strike</th>
            <th>Expiration</th>
            <th>DTE</th>
            <th>Quantity</th>
            <th>Entry Price</th>
            <th>Cost</th>
            <th>Current Price</th>
            <th>Current Value</th>
            <th>Change</th>
          </tr>
        </thead>

        <tbody>
          {state.map((i) => (
            <tr key={i.name}>
              <td>{i.ticker}</td>
              <td>{i.type}</td>
              <td>{i.strike}</td>
              <td>{i.expiration}</td>
              <td>{i.dte}</td>
              <td>{i.quantity}</td>
              <td>{format(i.entryPrice)}</td>
              <td>{format(i.cost)}</td>
              <td>{format(i.currentPrice)}</td>
              <td>{format(i.currentValue)}</td>
              <td>{i.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default App;
