import {
  loadFilms,
  loadPromo,
  updatePromo
} from '../action';
import {
  makeFakeFilmFromServer,
  makeFakeFilmListFromServer
} from '../../mocks/film-data';
import {
  filmListReducer,
  initialState
} from './film-list-reducer';
import {
  adaptFilmsToClient,
  adaptToClient
} from '../../utils';

const FAKE_FILM_COUNT = 20;

describe('Reducer: Film List', () => {
  it('without additional parameters should return initial state', () => {
    expect(filmListReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should load film list', () => {
    const films = makeFakeFilmListFromServer(FAKE_FILM_COUNT);

    expect(filmListReducer(initialState, loadFilms(films)))
      .toEqual({
        ...initialState,
        filmList: adaptFilmsToClient(films),
        isDataLoaded: true,
      });
  });

  it('should load promo film', () => {
    const film = makeFakeFilmFromServer();

    expect(filmListReducer(initialState, loadPromo(film)))
      .toEqual({
        ...initialState,
        promo: adaptToClient(film),
      });
  });

  it('should update promo film', () => {
    const film = makeFakeFilmFromServer();

    expect(filmListReducer(initialState, updatePromo(film)))
      .toEqual({
        ...initialState,
        promo: adaptToClient(film),
      });
  });
});
