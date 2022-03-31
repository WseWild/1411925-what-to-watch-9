import {
  changeGenre,
  filterFilms
} from '../action';
import {
  makeFakeFilm,
  makeFakeFilmList
} from '../../mocks/film-data';
import {
  filterReducer,
  initialState
} from './filter-reducer';
import { filterFilmsByGenre } from '../../utils';

const FAKE_FILM_COUNT = 20;

describe('Reducer: Filter', () => {
  it('without additional parameters should return initial state', () => {
    expect(filterReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should change current genre', () => {
    const filmGenre = makeFakeFilm().genre;

    expect(filterReducer(initialState, changeGenre(filmGenre)))
      .toEqual({
        ...initialState,
        currentGenre: filmGenre,
      });
  });

  it('should filter films by genre', () => {
    const films = makeFakeFilmList(FAKE_FILM_COUNT);

    expect(filterReducer(initialState, filterFilms(films)))
      .toEqual({
        ...initialState,
        filteredFilms: filterFilmsByGenre(films, initialState.currentGenre),
      });
  });
});
