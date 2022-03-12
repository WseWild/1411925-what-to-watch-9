import SmallFilmCard from '../small-film-card/small-film-card';
import {FilmsInfo} from '../../types/film';

function FilmsList(filmsInfo :FilmsInfo): JSX.Element {

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <div className="catalog__films-list">
        {filmsInfo.map((film) =>  SmallFilmCard(film))}
      </div>
    </section>
  );

}

export default FilmsList;
