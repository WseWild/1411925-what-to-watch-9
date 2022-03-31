import { Action } from 'redux';
import { AxiosInstance } from 'axios';
import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';
import { State } from './state';

export enum ActionType {
  ChangeGenre = 'films/changeGenre',
  FilterFilms = 'films/filterFilms',
  LoadPromo = 'data/loadPromo',
  LoadFilms = 'data/loadFilms',
  LoadFilm = 'data/loadFilm',
  LoadSimilarFilms = 'data/loadSimilarFilms',
  LoadReviews = 'data/loadReviews',
  LoadAvatar = 'user/loadAvatar',
  LoadFavorite = 'user/loadFavorite',
  UpdatePromo = 'user/updatePromo',
  UpdateFilm = 'user/updateFilm',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'app/redirect',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
