import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import { Match } from '../components/Match';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import store from '../store';

const server = setupServer(
  rest.put('/tournament/edit_match', (req, res, ctx) => {
    return res(ctx.json({}))
  }),

  rest.put('/tournament/report_match', (req, res, ctx) => {
    return res(ctx.json({}))
  })
);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const placeHolderMatch = {
  tournamentName: "Name",
  date: "",
  time: "",
  challenger: "challenger_name",
  defender: "defender_name",
  scoreChallenger: 1,
  scoreDefender: 2
};


// function sleep from the following address:
// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


test('render component', async () => {
  act(() => {
    render(
      <Provider store={store}>
        <Match report={false} match={placeHolderMatch} />
      </Provider>
    );
  });
});

test('check that information in form is correct', async () => {
  act(() => {
    render(
      <Provider store={store}>
        <Match report={false} match={placeHolderMatch} />
      </Provider>
    );
    fireEvent.click(screen.getByRole('img'));
  });

  await screen.findByText('Redigera match');
  expect(screen.getByLabelText('Utmanare:') === placeHolderMatch.challenger);
  expect(screen.getByLabelText('Försvarare:') === placeHolderMatch.defender);
});


test('check that points are shown when report is true', async () => {
  act(() => {
    render(
      <Provider store={store}>
        <Match report={true} match={placeHolderMatch} />
      </Provider>
    );
    fireEvent.click(screen.getByRole('img'));
  });

  await screen.findByText('Redigera match');
  expect(screen.getByText('Poäng'));
});


test('report false - can submit with empty fields', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <Match report={false} match={placeHolderMatch} />
      </Provider>
    );
    fireEvent.click(screen.getByRole('img'));

    await screen.findByText('Redigera match');

    fireEvent.click(screen.getByText('Spara'));
    await sleep(500);

  });

  expect(screen.findByRole('img'));
});


test('report true - cannot submit with empty fields', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <Match report={true} match={placeHolderMatch} />
      </Provider>
    );
    fireEvent.click(screen.getByRole('img'));

    await screen.findByText('Redigera match');

    fireEvent.click(screen.getByText('Rapportera'));
    await sleep(500);
  });

  expect(screen.findByText('Redigera match'));
});
