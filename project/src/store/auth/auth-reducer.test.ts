import {
  loadAvatar,
  loadFavorite,
  requireAuthorization,
  requireLogout
} from '../action';
import { makeFakeAuthData } from '../../mocks/auth-data';
import { makeFakeFilmListFromServer } from '../../mocks/film-data';
import {
  authReducer,
  initialState
} from './auth-reducer';
import { adaptFilmsToClient } from '../../utils';
import { AuthorizationStatus } from '../../const';

const FAKE_FILM_COUNT = 5;

describe('Reducer: Auth', () => {
  it('without additional parameters should return initial state', () => {
    expect(authReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update authorizationStatus to "AUTH"', () => {
    expect(authReducer(initialState, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({
        ...initialState,
        authorizationStatus: AuthorizationStatus.Auth,
      });
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {
    expect(authReducer(initialState, requireLogout()))
      .toEqual({
        ...initialState,
        authorizationStatus: AuthorizationStatus.NoAuth,
        favoriteFilms: [],
      });
  });

  it('should load favorite films', () => {
    const films = makeFakeFilmListFromServer(FAKE_FILM_COUNT);

    expect(authReducer(initialState, loadFavorite(films)))
      .toEqual({
        ...initialState,
        favoriteFilms: adaptFilmsToClient(films),
      });
  });

  it('should load user avatar', () => {
    const avatar = makeFakeAuthData().avatar_url;

    expect(authReducer(initialState, loadAvatar(avatar)))
      .toEqual({
        ...initialState,
        avatar: avatar,
      });
  });
});
