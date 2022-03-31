import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  changeGenre,
  filterFilms
} from '../../../../store/action';
import { getCurrentGenre } from '../../../../store/filter/selectors';
import { Genre } from '../../../../const';
import type { FilmProps } from '../../../../types/film';
import type { GenreListProps } from './type';

export default function GenreList({films, resetShowSize}: GenreListProps): JSX.Element {
  const currentGenre = useSelector(getCurrentGenre);
  const dispatch = useDispatch();

  const onChangeGenre = (genre: string) => {
    dispatch(changeGenre(genre));
  };

  const onFilterFilms = (filmList: FilmProps[]) => {
    dispatch(filterFilms(filmList));
  };

  const genres = [
    Genre.All,
    ...new Set(films.map((film) => film.genre)),
  ];

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li
          key={genre}
          className={`catalog__genres-item ${currentGenre === genre && 'catalog__genres-item--active'}`}
        >
          <a
            href="/"
            className="catalog__genres-link"
            onClick={(evt) => {
              evt.preventDefault();
              onChangeGenre(genre);
              onFilterFilms(films);
              resetShowSize();
            }}
          >
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
}
