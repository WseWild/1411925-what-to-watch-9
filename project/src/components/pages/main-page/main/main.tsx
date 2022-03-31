import {
  useEffect,
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useHistory } from 'react-router';
import FilmList from '../../../film-list/film-list';
import Footer from '../../../footer/footer';
import GenreList from '../genre-list/genre-list';
import Loading from '../../../loading/loading';
import MyListButton from '../../../my-list-btn/my-list-btn';
import ShowMore from '../show-more/show-more';
import UserBlock from '../../../user-block/user-block';
import { filterFilms } from '../../../../store/action';
import {
  getFilmList,
  getPromo
} from '../../../../store/film-list/selectors';
import { getFilteredFilms } from '../../../../store/filter/selectors';
import { AppRoute } from '../../../../const';

const FILM_CARD_AMOUNT = 8;
const DEFAULT_SHOW_SIZE = 1;

export default function Main(): JSX.Element {
  const promoFilm = useSelector(getPromo);
  const films = useSelector(getFilmList);
  const filteredFilms = useSelector(getFilteredFilms);

  const dispatch = useDispatch();
  const history = useHistory();
  const [showSize, setShowSize] = useState(DEFAULT_SHOW_SIZE);

  useEffect(() => {
    if (filteredFilms.length === 0) {
      dispatch(filterFilms(films));
    }
  });

  const {
    name,
    genre,
    released,
    posterImage,
    backgroundImage,
  } = promoFilm;

  const shownFilms = filteredFilms.slice(0, showSize * FILM_CARD_AMOUNT);

  const handleShowMoreClick = () => {
    setShowSize(() => showSize + 1);
  };

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <a href="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button"
                  onClick={() => history.push(AppRoute.Player.replace(':id', `${promoFilm.id}`))}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>

                <MyListButton film={promoFilm} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList
            films={films}
            resetShowSize={() => setShowSize(DEFAULT_SHOW_SIZE)}
          />
          {
            filteredFilms.length !== 0 ? <FilmList films={shownFilms} /> : <Loading />
          }
          {
            filteredFilms.length > shownFilms.length &&
            <ShowMore onClick={handleShowMoreClick} />
          }
        </section>

        <Footer />
      </div>
    </>
  );
}
