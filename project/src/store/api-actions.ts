import { toast } from 'react-toastify';
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
  dropToken,
  saveToken
} from '../services/token';
import {
  APIRoute,
  AppRoute,
  AuthorizationStatus,
  FavoriteAction,
  ToastMessage
} from '../const';
import type {
  AuthData,
  AuthInfo
} from '../types/auth-data';
import type { FilmFromServer } from '../types/film';
import type {
  ReviewPost,
  ReviewProps
} from '../types/review';
import type { ThunkActionResult } from '../types/action';

export const fetchPromoAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<FilmFromServer>(APIRoute.Promo);
      dispatch(loadPromo(data));
    } catch {
      toast.error(ToastMessage.Data);
    }
  };

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<FilmFromServer[]>(APIRoute.Films);
      dispatch(loadFilms(data));
    } catch {
      toast.error(ToastMessage.Data);
    }
  };

export const fetchFilmAction = (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<FilmFromServer>(APIRoute.Film.replace(':id', `${filmId}`));
      dispatch(loadFilm(data));
    } catch {
      dispatch(redirectToRoute(APIRoute.NotFound));
      toast.error(ToastMessage.Film);
    }
  };

export const fetchSimilarFilmsAction = (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<FilmFromServer[]>(APIRoute.Similar.replace(':id', `${filmId}`));
      dispatch(loadSimilarFilms(data));
    } catch {
      toast.error(ToastMessage.Data);
    }
  };

export const fetchReviewsAction = (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<ReviewProps[]>(APIRoute.Reviews.replace(':id', `${filmId}`));
      dispatch(loadReviews(data));
    } catch {
      toast.error(ToastMessage.Data);
    }
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<AuthInfo>(APIRoute.Login);
      dispatch(loadAvatar(data.avatar_url));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      toast.info(ToastMessage.Auth);
    }
  };

export const loginAction = ({email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.post<AuthInfo>(APIRoute.Login, {email, password});

    saveToken(data.token);
    dispatch(loadAvatar(data.avatar_url));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void>  => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };

export const sendReviewAction = (filmId: number, review: ReviewPost ): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.post<ReviewProps[]>(APIRoute.Reviews.replace(':id', `${filmId}`), review);
      dispatch(loadReviews(data));
      dispatch(redirectToRoute(AppRoute.Film.replace(':id', `${filmId}/#Overview`)));
    } catch {
      toast.error(ToastMessage.Review);
    }
  };

export const fetchFavoriteFilms = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void>  => {
    try {
      const {data} = await api.get<FilmFromServer[]>(APIRoute.Favorite);
      dispatch(loadFavorite(data));
    } catch {
      toast.error(ToastMessage.Data);
    }
  };

export const setFavoriteAction = (filmId: number, action: FavoriteAction): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    try {
      const {data} = await api.post<FilmFromServer>(`${APIRoute.Favorite}/${filmId}/${action}`);

      dispatch(updateFilm(data));

      if (getState().films.promo.id === filmId) {
        dispatch(updatePromo(data));
      }
    } catch {
      dispatch(redirectToRoute(AppRoute.SignIn));
      toast.info(ToastMessage.Auth);
    }
  };
