import { RootState } from '../store/root-reducer';
import { AuthorizationStatus } from '../const';
import type { FilmProps } from '../types/film';
import type { ReviewProps } from '../types/review';

export type FilmListState = {
  promo: FilmProps,
  filmList: FilmProps[],
  isDataLoaded: boolean,
};

export type FilterState = {
  currentGenre: string,
  filteredFilms: FilmProps[],
};

export type CurrentFilmState = {
  currentFilm: FilmProps,
  similarFilms: FilmProps[],
  reviews: ReviewProps[],
  isSimilarFilmsLoaded: boolean,
  isReviewsLoaded: boolean,
};

export type AuthState = {
  authorizationStatus: AuthorizationStatus,
  avatar: string,
  favoriteFilms: FilmProps[],
}

export type State = RootState;
