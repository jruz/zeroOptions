import React from 'react';
import { StateT, getPercent, format } from './helpers';

type PropsT = {
  state: StateT;
};

const Table = ({ state }: PropsT): JSX.Element => {
  const totalCost = state.reduce((a, i) => i.cost + a, 0);
  const totalValue = state.reduce((a, i) => i.currentValue + a, 0);
  const totalPnl = state.reduce((a, i) => i.pnl + a, 0);
  const totalChange = getPercent(totalCost, totalValue);

  return (
    <section style={{ width: '700px', textAlign: 'right' }}>
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
            <th>Current Price</th>
            <th>Cost</th>
            <th>Current Value</th>
            <th>Change</th>
            <th>P&L</th>
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
              <td>{format(i.currentPrice)}</td>
              <td>{format(i.cost)}</td>
              <td>{format(i.currentValue)}</td>
              <td>{i.change}%</td>
              <td>{format(i.pnl)}</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <th>Total</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{format(totalCost)}</td>
            <td>{format(totalValue)}</td>
            <td>{totalChange}%</td>
            <td>{format(totalPnl)}</td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
};

export default Table;
