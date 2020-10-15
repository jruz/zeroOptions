import React from 'react';
import { render } from 'react-dom';
import App from './App';

const load = (): void => {
  const pageContainer = document.getElementById('options');
  const app = document.getElementById('app');
  if (!pageContainer || app) return;

  const appContainer = document.createElement('section');
  appContainer.id = 'app';
  pageContainer.appendChild(appContainer);

  render(<App />, appContainer);
};

setInterval(load, 3 * 1000);
