import type { State } from '../../types/state';
import type { FilmProps } from '../../types/film';

export const getFilteredFilms = ({filter}: State): FilmProps[] => filter.filteredFilms;
export const getCurrentGenre = ({filter}: State): string => filter.currentGenre;
