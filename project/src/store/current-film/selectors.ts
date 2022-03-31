import type { FilmProps } from '../../types/film';
import type { ReviewProps } from '../../types/review';
import type { State } from '../../types/state';

export const getIsSimilarFilmsLoaded = ({film}: State): boolean => film.isSimilarFilmsLoaded;
export const getIsReviewsLoaded = ({film}: State): boolean => film.isReviewsLoaded;
export const getSimilarFilms = ({film}: State): FilmProps[] => film.similarFilms;
export const getReviews = ({film}: State): ReviewProps[] => film.reviews;
export const getCurrentFilm = ({film}: State): FilmProps => film.currentFilm;
