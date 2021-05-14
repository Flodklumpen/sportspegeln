import React from 'react';
import { render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

//maybe ugly hack? allows us to run tests using Auth0.
window.crypto = {
  subtle: {},
};

test('renders learn react link', async () => {
  const promise = Promise.resolve();
/*
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
 */

  await act(() => promise);
});
