import {
  useEffect,
  useRef,
  useState
} from 'react';
import {
  useHistory,
  useParams
} from 'react-router';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import PauseIcon from '../pause-icon/pause-icon';
import PlayIcon from '../play-icon/play-icon';
import { getCurrentFilm } from '../../../../store/current-film/selectors';
import { fetchFilmAction } from '../../../../store/api-actions';
import { Time } from '../../../../const';
import ControlsRow from '../controls-row/controls-row';

export default function Player(): JSX.Element {
  const currentFilm = useSelector(getCurrentFilm);
  const dispatch = useDispatch();
  const history = useHistory();
  const {id}: {id: string} = useParams();
  const filmId = Number(id);

  const ref = useRef<HTMLVideoElement>(null);
  const [isPlayed, setIsPlayed] = useState(false);
  const [duration, setDuration] = useState(Time.Zero);
  const [currentTime, setCurrentTime] = useState(Time.Zero);

  useEffect(() => {
    dispatch(fetchFilmAction(filmId));
  }, [dispatch, filmId]);

  useEffect(() => {
    isPlayed ? ref.current?.play() : ref.current?.pause();
  }, [isPlayed]);

  const {
    name,
    posterImage,
    videoLink,
  } = currentFilm;

  return (
    <div className="player">
      <video
        src={videoLink}
        ref={ref}
        className="player__video"
        preload='metadata'
        poster={posterImage}
        onTimeUpdate={(evt) => setCurrentTime(Math.round(evt.currentTarget.currentTime))}
        onDurationChange={(evt) => setDuration(Math.round(evt.currentTarget.duration))}
      />
      <button
        type="button"
        className="player__exit"
        onClick={() => history.goBack()}
      >
        Exit
      </button>
      {/* <Link to={AppRoute.Film.replace(':id', `${id}/#Overview`)}>
        <button type="button" className="player__exit">Exit</button>
      </Link> */}

      <div className="player__controls">

        <ControlsRow
          duration={duration}
          currentTime={currentTime}
        />

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={() => setIsPlayed((state) => !state)}
          >
            {
              isPlayed ? <PauseIcon /> : <PlayIcon />
            }
            <span>{isPlayed ? 'Pause' : 'Play'}</span>
          </button>

          <div className="player__name">{name}</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={() => ref.current?.requestFullscreen()}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
