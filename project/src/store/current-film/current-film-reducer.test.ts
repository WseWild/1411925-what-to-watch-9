import {
  loadFilm,
  loadReviews,
  loadSimilarFilms
} from '../action';
import {
  makeFakeFilmFromServer,
  makeFakeFilmListFromServer
} from '../../mocks/film-data';
import { makeFakeReviewList } from '../../mocks/review-data';
import {
  currentFilmReducer,
  initialState
} from './current-film-reducer';
import {
  adaptFilmsToClient,
  adaptToClient
} from '../../utils';

const FAKE_FILM_COUNT = 5;
const FAKE_REVIEW_COUNT = 4;

describe('Reducer: Current Film', () => {
  it('without additional parameters should return initial state', () => {
    expect(currentFilmReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should load current film', () => {
    const film = makeFakeFilmFromServer();

    expect(currentFilmReducer(initialState, loadFilm(film)))
      .toEqual({
        ...initialState,
        currentFilm: adaptToClient(film),
        isSimilarFilmsLoaded: false,
        isReviewsLoaded: false,
      });
  });

  it('should load similar films', () => {
    const films = makeFakeFilmListFromServer(FAKE_FILM_COUNT);

    expect(currentFilmReducer(initialState, loadSimilarFilms(films)))
      .toEqual({
        ...initialState,
        similarFilms: adaptFilmsToClient(films),
        isSimilarFilmsLoaded: true,
      });
  });

  it('should load reviews', () => {
    const reviews = makeFakeReviewList(FAKE_REVIEW_COUNT);

    expect(currentFilmReducer(initialState, loadReviews(reviews)))
      .toEqual({
        ...initialState,
        reviews: reviews,
        isReviewsLoaded: true,
      });
  });

  it('should update current film', () => {
    const film = makeFakeFilmFromServer();

    expect(currentFilmReducer(initialState, loadFilm(film)))
      .toEqual({
        ...initialState,
        currentFilm: adaptToClient(film),
      });
  });
});
