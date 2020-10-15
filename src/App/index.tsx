import React, { useEffect, useState } from 'react';

type DataT = {
  ticker: string;
  name: string;
  type: string;
  value: number;
  entry: number;
  quantity: number;
  currentPrice: number;
  dte: number;
}[];

const getQuantity = (cells: HTMLTableDataCellElement[]): number =>
  parseFloat(cells[5].innerText || '0');

const getCurrentPrice = (cells: HTMLTableDataCellElement[]): number =>
  parseFloat(cells[8].innerText || '0') * 100;

const getValue = (cells: HTMLTableDataCellElement[]): number => {
  const quantity = getQuantity(cells);
  const currentPrice = getCurrentPrice(cells);
  return quantity * currentPrice;
};

const getDTE = (cells: HTMLTableDataCellElement[]): number => {
  const t = cells[4].innerText;
  const date = '20' + t[0] + t[1] + '-' + t[2] + t[3] + '-' + t[4] + t[5];
  const oneDay = 24 * 60 * 60 * 1000;
  const expiration = Number(new Date(date));
  const today = Number(new Date());

  return Math.round(Math.abs((expiration - today) / oneDay));
};

const getData = (): DataT | null => {
  const table: any = document.getElementById('opTable-2');
  if (!table) return null;
  console.log('table', table);

  const rows = Array.from(table.rows);
  return rows.map((row: any) => ({
    name: row.cells[0].innerText,
    ticker: row.dataset.root,
    type: row.cells[2].innerText,
    entry: row.cells[7].innerText,
    quantity: getQuantity(row.cells),
    currentPrice: getCurrentPrice(row.cells),
    value: getValue(row.cells),
    dte: getDTE(row.cells),
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
  const [state, setState] = useState(null);

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
    <section style={{ width: '500px' }}>
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Type</th>
            <th>DTE</th>
            <th>Quantity</th>
            <th>Entry</th>
            <th>Price</th>
            <th>Value</th>
          </tr>
        </thead>

        <tbody>
          {state.map((i) => (
            <tr key={i.name}>
              <td>{i.ticker}</td>
              <td>{i.type}</td>
              <td>{i.dte}</td>
              <td>{i.quantity}</td>
              <td>{i.entry}</td>
              <td>{format(i.currentPrice)}</td>
              <td>{format(i.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default App;
