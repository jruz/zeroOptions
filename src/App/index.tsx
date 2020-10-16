import React, { useEffect, useState, useRef } from 'react';
import { getData, StateT, sort } from './helpers';
import Table from './Table';

const App = (): JSX.Element | null => {
  const [state, setState] = useState<StateT | null>(null);
  const ref = useRef<any | null>(null);

  const updateData = (): void => {
    const data = getData();
    if (!data) return;

    data.sort(sort);
    setState(data);
  };

  useEffect((): (() => void) => {
    ref.current = setInterval(updateData, 1000);
    return () => {
      clearInterval(ref.current);
    };
  }, []);

  if (!state) return null;

  return <Table state={state} />;
};

export default App;
