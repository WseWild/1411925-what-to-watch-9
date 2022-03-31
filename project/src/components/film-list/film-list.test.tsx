import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FilmList from './film-list';
import { makeFakeFilmList } from '../../mocks/film-data';

const FILM_COUNT = 10;

const history = createMemoryHistory();
const fakeFilmList = makeFakeFilmList(FILM_COUNT);

const mockStore = configureMockStore();
const store = mockStore({
  films: {
    filmList: fakeFilmList,
  },
});

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <FilmList films={fakeFilmList} />
        </Router>,
      </Provider>,
    );

    expect(container.firstChild).toHaveClass('catalog__films-list');
  });
});
