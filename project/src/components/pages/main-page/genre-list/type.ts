import { FilmProps } from '../../../../types/film';

export type GenreListProps = {
  films: FilmProps[],
  resetShowSize: () => void,
}
