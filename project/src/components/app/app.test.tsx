import {
  render,
  screen
} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  makeFakeFilm,
  makeFakeFilmList
} from '../../mocks/film-data';
import App from './app';
import { createAPI } from '../../services/api';
import {
  AppRoute,
  AuthorizationStatus
} from '../../const';
import type { State } from '../../types/state';

const FILM_COUNT = 10;

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeFilm = makeFakeFilm();
const fakeFilmList = makeFakeFilmList(FILM_COUNT);

const store = mockStore({
  auth: {
    authorizationStatus: AuthorizationStatus.Auth,
    favoriteFilms: fakeFilmList,
  },
  films: {
    isDataLoaded: true,
    filmList: fakeFilmList,
    promo: fakeFilm,
  },
  film: {
    currentFilm: fakeFilm,
  },
  filter: {
    filteredFilms: fakeFilmList,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2021 What to watch Ltd./i)).toBeInTheDocument();
  });

  it('should render "SignIn" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);
    render(fakeApp);

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "MyList" when authorized user navigate to /myList', () => {
    history.push(AppRoute.MyList);
    render(fakeApp);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render "Film" when user navigate to "/films/:id"', () => {
    history.push(AppRoute.Film.replace(':id', fakeFilm.id.toString()));
    render(fakeApp);

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
  });

  it('should render "AddReview" when user navigate to "/films/:id/review"', () => {
    history.push(AppRoute.AddReview.replace(':id', fakeFilm.id.toString()));
    render(fakeApp);

    expect(screen.getByText(/Post/i)).toBeInTheDocument();
  });

  it('should render "Player" when user navigate to "/player/:id"', () => {
    history.push(AppRoute.Player.replace(':id', fakeFilm.id.toString()));
    render(fakeApp);

    expect(screen.getByText(/Full screen/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/404');
    render(fakeApp);

    expect(screen.getByText(/404 Page Not Found/i)).toBeInTheDocument();
  });
});
