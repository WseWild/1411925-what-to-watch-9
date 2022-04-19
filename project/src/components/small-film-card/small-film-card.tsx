// import {FilmInfo} from '../../types/film';
import {MouseEvent, useState} from 'react';
import VideoPlayer from '../video-player/video-player';

type SmallFilmCardProps = {
  id: number,
  video: string,
  title: string,
  previewImage: string,
}

function SmallFilmCard({title, id, previewImage, video}: SmallFilmCardProps ): JSX.Element {
  const keyValue = `${id}`;


  const [activeFilmCard, setActiveFilmCard] = useState(keyValue);

  return (
    <article key={keyValue} id={keyValue} className='small-film-card catalog__films-card'
      onMouseOver={(({target}: MouseEvent<HTMLElement>) => {
        setActiveFilmCard(activeFilmCard);
      })}

    >
      <VideoPlayer src={video} autoplay={false} activeFilmCard={activeFilmCard}  poster={previewImage} title={title} />
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{title}</a>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
