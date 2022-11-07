import React from 'react';
import 'regenerator-runtime/runtime';
import { render as rtlRender } from '@testing-library/react';
import 'core-js';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event'

import { BrowserRouter } from 'react-router-dom';
import server from './mocks/server';
import reducers from '../src/redux/reducers';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: { ...reducers }, preloadedState }),
    route = '/',
    ...renderOptions
  } = {}
) {
  window.history.pushState({}, 'Initial Page', route);
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children} </BrowserRouter>
      </Provider>
    );
  }
  return {
    user: userEvent.setup(),
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions })};
}

let store = {};

beforeAll(() => {
  // Mock local storage
  global.Storage.prototype.setItem = jest.fn((key, value) => {
    store[key] = value;
  });
  global.Storage.prototype.getItem = jest.fn((key) => store[key]);
  // start up the mock server
  server.listen();
});

beforeEach(() => {
  store = {};
});

afterEach(() => server.resetHandlers());

afterAll(() => {
  global.Storage.prototype.setItem.mockReset();
  global.Storage.prototype.getItem.mockReset();
  server.close();
});

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
jest.mock('react-chartjs-2', () => ({
  Bar: () => null,
  Doughnut: () => null,
}));
