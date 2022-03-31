import type { FilmProps } from '../../types/film';
import type { State } from '../../types/state';

export const getIsDataLoaded = ({films}: State): boolean => films.isDataLoaded;
export const getFilmList = ({films}: State): FilmProps[] => films.filmList;
export const getPromo = ({films}: State): FilmProps => films.promo;
