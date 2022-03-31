import {
  memo,
  useState
} from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import FilmCardPlayer from '../film-card-player/film-card-player';
import { AppRoute } from '../../const';
import type { FilmCardProps } from './type';

function FilmCard({id, filmName, preview, previewVideoLink}: FilmCardProps): JSX.Element {
  const [isPlayed, setIsPlayed] = useState(false);
  const history = useHistory();

  const filmRoute = AppRoute.Film.replace(':id', `${id}/#Overview`);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => setIsPlayed(true)}
      onMouseLeave={() => setIsPlayed(false)}
    >
      <div
        className="small-film-card__image"
        onClick={() => history.push(filmRoute)}
      >
        <FilmCardPlayer
          src={previewVideoLink}
          poster={preview}
          isPlayed={isPlayed}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link"
          to={filmRoute}
        >
          {filmName}
        </Link>
      </h3>
    </article>
  );
}

export default memo(FilmCard);
