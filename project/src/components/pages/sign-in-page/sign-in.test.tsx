import {
  render,
  screen
} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import SignIn from './sign-in';
import { AuthorizationStatus } from '../../../const';

const mockStore = configureMockStore();

describe('Component: SignIn', () => {
  it('should render "SignIn" when  user navigate to "/login"', () => {
    const history = createMemoryHistory();
    history.push('/login');

    const store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <SignIn />
        </Router>
      </Provider>,
    );

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('© 2021 What to watch Ltd.')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('email'), 'test@mail.ru');
    userEvent.type(screen.getByTestId('password'), 'test123');

    expect(screen.getByDisplayValue('test@mail.ru')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test123')).toBeInTheDocument();
  });
});
