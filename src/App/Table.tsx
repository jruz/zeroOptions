import React from 'react';

import { StateT, getPercent, format, getCash } from './helpers';
import styles from './Table.scss';

type PropsT = {
  state: StateT;
};

const Table = ({ state }: PropsT): JSX.Element => {
  const totalCost = state.reduce((a, i) => i.cost + a, 0);
  const totalValue = state.reduce((a, i) => i.currentValue + a, 0);
  const totalPnl = state.reduce((a, i) => i.pnl + a, 0);
  const totalChange = getPercent(totalCost, totalValue);
  const cash = getCash();
  const total = totalValue + cash;
  const exposure = Math.round((totalCost * 100) / (cash + totalCost));
  const color = (val: number): string => (val < 0 ? styles.red : styles.green);

  return (
    <section className={styles.container}>
      <table>
        <thead className={styles.header}>
          <tr>
            <th className="text-left">Ticker</th>
            <th>Type</th>
            <th>Strike</th>
            <th>Expiration</th>
            <th>DTE</th>
            <th>Quantity</th>
            <th>Entry Price</th>
            <th>Current Price</th>
            <th>Cost</th>
            <th>Current Value</th>
            <th>Change</th>
            <th>P&L</th>
          </tr>
        </thead>

        <tbody>
          {state.map((i) => {
            return (
              <tr key={i.name} className={styles.tr}>
                <td
                  className={`${color(i.pnl)} text-left pointer`}
                  onClick={() => i.click()}
                >
                  {i.ticker}
                </td>
                <td>{i.type}</td>
                <td>{i.strike}</td>
                <td>{i.expiration}</td>
                <td>{i.dte}</td>
                <td>{i.quantity}</td>
                <td>{format(i.entryPrice, false)}</td>
                <td>{format(i.currentPrice, false)}</td>
                <td>{format(i.cost)}</td>
                <td>{format(i.currentValue)}</td>
                <td className={color(i.pnl)}>{i.change}%</td>
                <td className={color(i.pnl)}>{format(i.pnl)}</td>
              </tr>
            );
          })}
        </tbody>

        <tfoot className={styles.footer}>
          <tr>
            <th colSpan="10">P&L</th>
            <td className={color(totalPnl)}>{totalChange}%</td>
            <td className={color(totalPnl)}>{format(totalPnl)}</td>
          </tr>
          <tr>
            <th colSpan="10">Exposure</th>
            <td>{exposure}%</td>
            <td>{format(totalCost)}</td>
          </tr>
          <tr>
            <th colSpan="10">Total</th>
            <td></td>
            <td>{format(total)}</td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
};

export default Table;
