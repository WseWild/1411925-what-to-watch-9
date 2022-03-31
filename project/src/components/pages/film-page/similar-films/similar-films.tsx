import {
  memo,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import FilmList from '../../../film-list/film-list';
import Loading from '../../../loading/loading';
import { fetchSimilarFilmsAction } from '../../../../store/api-actions';
import {
  getCurrentFilm,
  getIsSimilarFilmsLoaded,
  getSimilarFilms
} from '../../../../store/current-film/selectors';

const MAX_SIMILAR_FILMS = 4;

function SimilarFilms(): JSX.Element {
  const currentFilm = useSelector(getCurrentFilm);
  const similarFilms = useSelector(getSimilarFilms);
  const isSimilarFilmsLoaded = useSelector(getIsSimilarFilmsLoaded);
  const dispatch = useDispatch();

  const getSimilarFilmList = (id: number) => {
    dispatch(fetchSimilarFilmsAction(id));
  };

  useEffect(() => {
    if (!isSimilarFilmsLoaded) {
      getSimilarFilmList(currentFilm.id);
    }
  });

  if (!isSimilarFilmsLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      {
        similarFilms.length > 0 && (
          <>
            <h2 className="catalog__title">More like this</h2>
            <FilmList films={similarFilms
              .filter((film) => film.id !== currentFilm.id)
              .slice(0, MAX_SIMILAR_FILMS)}
            />
          </>
        )
      }
    </div>
  );
}

export default memo(SimilarFilms);
