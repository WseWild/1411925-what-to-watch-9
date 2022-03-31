import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import FilmList from '../../film-list/film-list';
import Footer from '../../footer/footer';
import UserBlock from '../../user-block/user-block';
import { getFavoriteFilms } from '../../../store/auth/selectors';
import { fetchFavoriteFilms } from '../../../store/api-actions';
import { AppRoute } from '../../../const';

export default function MyList(): JSX.Element {
  const favoriteFilms = useSelector(getFavoriteFilms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteFilms());
  }, [dispatch]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList films={favoriteFilms} />
      </section>

      <Footer />
    </div>
  );
}
