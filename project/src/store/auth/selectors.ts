import { AuthorizationStatus } from '../../const';
import type { State } from '../../types/state';
import type { FilmProps } from '../../types/film';

export const getAuthorizationStatus = ({auth}: State): AuthorizationStatus => auth.authorizationStatus;
export const getFavoriteFilms = ({auth}: State): FilmProps[] => auth.favoriteFilms;
export const getAvatar = ({auth}: State): string => auth.avatar;
