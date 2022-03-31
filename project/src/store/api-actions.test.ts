import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import {
  checkAuthAction,
  fetchFavoriteFilms,
  fetchFilmAction,
  fetchFilmsAction,
  fetchPromoAction,
  fetchReviewsAction,
  fetchSimilarFilmsAction,
  loginAction,
  logoutAction,
  sendReviewAction,
  setFavoriteAction
} from './api-actions';
import {
  loadAvatar,
  loadFavorite,
  loadFilm,
  loadFilms,
  loadPromo,
  loadReviews,
  loadSimilarFilms,
  redirectToRoute,
  requireAuthorization,
  requireLogout,
  updateFilm,
  updatePromo
} from './action';
import {
  makeFakeAuthData,
  makeFakeUserData
} from '../mocks/auth-data';
import {
  makeFakeFilm,
  makeFakeFilmFromServer,
  makeFakeFilmListFromServer
} from '../mocks/film-data';
import {
  makeFakeReviewList,
  makeFakeReviewPost
} from '../mocks/review-data';
import {
  APIRoute,
  AppRoute,
  AuthorizationStatus,
  FavoriteAction
} from '../const';
import type { State } from '../types/state';

const AUTH_TOKEN_KEY_NAME = 'user-token';
const FILM_COUNT = 10;
const REVIEW_COUNT = 5;

const fakeAuthData = makeFakeAuthData();
const fakeUser = makeFakeUserData();
const fakeFilm = makeFakeFilm();
const fakeServerFilm = makeFakeFilmFromServer();
const fakeServerFilms = makeFakeFilmListFromServer(FILM_COUNT);
const fakeReview = makeFakeReviewPost();
const fakeReviews = makeFakeReviewList(REVIEW_COUNT);

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, fakeAuthData);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      loadAvatar(fakeAuthData.avatar_url),
      requireAuthorization(AuthorizationStatus.Auth),
    ]);
  });

  it('should dispatch RequrieAuthorization and RedirectToRoute when POST /login', async () => {
    const store = mockStore();
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, fakeAuthData);

    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    expect(store.getActions()).toEqual([
      loadAvatar(fakeAuthData.avatar_url),
      requireAuthorization(AuthorizationStatus.Auth),
      redirectToRoute(AppRoute.Main),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, fakeAuthData.token);
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    expect(store.getActions()).toEqual([
      requireLogout(),
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });

  it('should dispatch LoadPromo when Get /promo', async () => {
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, fakeServerFilm);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    expect(store.getActions()).toEqual([
      loadPromo(fakeServerFilm),
    ]);
  });

  it('should dispatch LoadFilms when Get /films', async () => {
    mockAPI
      .onGet(APIRoute.Films)
      .reply(200, fakeServerFilms);

    const store = mockStore();

    await store.dispatch(fetchFilmsAction());

    expect(store.getActions()).toEqual([
      loadFilms(fakeServerFilms),
    ]);
  });

  it('should dispatch LoadFilm when Get /films/:id', async () => {
    mockAPI
      .onGet(APIRoute.Film.replace(':id', `${fakeFilm.id}`))
      .reply(200, fakeServerFilm);

    const store = mockStore();

    await store.dispatch(fetchFilmAction(fakeFilm.id));

    expect(store.getActions()).toEqual([
      loadFilm(fakeServerFilm),
    ]);
  });

  it('should dispatch RedirectToRoute when Get /films/:id is failed', async () => {
    mockAPI
      .onGet(APIRoute.Film.replace(':id', `${fakeFilm.id}`))
      .reply(404);

    const store = mockStore();

    await store.dispatch(fetchFilmAction(fakeFilm.id));

    expect(store.getActions()).toEqual([
      redirectToRoute(APIRoute.NotFound),
    ]);
  });

  it('should dispatch LoadSimilarFilms when Get /films/:id/similar', async () => {
    mockAPI
      .onGet(APIRoute.Similar.replace(':id', `${fakeFilm.id}`))
      .reply(200, fakeServerFilms);

    const store = mockStore();

    await store.dispatch(fetchSimilarFilmsAction(fakeFilm.id));

    expect(store.getActions()).toEqual([
      loadSimilarFilms(fakeServerFilms),
    ]);
  });

  it('should dispatch LoadReviews when Get /comments/:id', async () => {
    mockAPI
      .onGet(APIRoute.Reviews.replace(':id', `${fakeFilm.id}`))
      .reply(200, fakeReviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(fakeFilm.id));

    expect(store.getActions()).toEqual([
      loadReviews(fakeReviews),
    ]);
  });

  it('should dispatch LoadReviews and RedirectToRoute when Post /comments/:id', async () => {
    mockAPI
      .onPost(APIRoute.Reviews.replace(':id', `${fakeFilm.id}`))
      .reply(200, fakeReviews);

    const store = mockStore();

    await store.dispatch(sendReviewAction(fakeFilm.id, fakeReview));

    expect(store.getActions()).toEqual([
      loadReviews(fakeReviews),
      redirectToRoute(AppRoute.Film.replace(':id', `${fakeFilm.id}/#Overview`)),
    ]);
  });

  it('should dispatch LoadFavorite when Get /favorite', async () => {
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, fakeServerFilms);

    const store = mockStore();

    await store.dispatch(fetchFavoriteFilms());

    expect(store.getActions()).toEqual([
      loadFavorite(fakeServerFilms),
    ]);
  });

  it('should dispatch UpdateFilm (and UpdatePromo if matched) when Post /favorite/:id/1', async () => {
    mockAPI
      .onPost(`${APIRoute.Favorite}/${fakeFilm.id}/${FavoriteAction.Add}`)
      .reply(200, fakeServerFilm);

    const store = mockStore({
      film: {currentFilm: fakeFilm},
      films: {promo: fakeFilm},
    });

    await store.dispatch(setFavoriteAction(fakeFilm.id, FavoriteAction.Add));

    expect(store.getActions()).toEqual([
      updateFilm(fakeServerFilm),
      updatePromo(fakeServerFilm),
    ]);
  });

  it('should dispatch UpdateFilm (and UpdatePromo if matched) when Post /favorite/:id/0', async () => {
    mockAPI
      .onPost(`${APIRoute.Favorite}/${fakeFilm.id}/${FavoriteAction.Remove}`)
      .reply(200, fakeServerFilm);

    const store = mockStore({
      film: {currentFilm: fakeFilm},
      films: {promo: fakeFilm},
    });

    await store.dispatch(setFavoriteAction(fakeFilm.id, FavoriteAction.Remove));

    expect(store.getActions()).toEqual([
      updateFilm(fakeServerFilm),
      updatePromo(fakeServerFilm),
    ]);
  });

  it('should dispatch RedirectToRoute when Post /favorite/:id/1 is failed', async () => {
    mockAPI
      .onPost(`${APIRoute.Favorite}/${fakeFilm.id}/${FavoriteAction.Add}`)
      .reply(401);

    const store = mockStore();

    await store.dispatch(setFavoriteAction(fakeFilm.id, FavoriteAction.Add));

    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.SignIn),
    ]);
  });

  it('should dispatch RedirectToRoute when Post /favorite/:id/0 is failed', async () => {
    mockAPI
      .onPost(`${APIRoute.Favorite}/${fakeFilm.id}/${FavoriteAction.Remove}`)
      .reply(401);

    const store = mockStore();

    await store.dispatch(setFavoriteAction(fakeFilm.id, FavoriteAction.Remove));

    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.SignIn),
    ]);
  });
});
