import {
  memo,
  useEffect,
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { setFavoriteAction } from '../../store/api-actions';
import {
  AuthorizationStatus,
  FavoriteAction
} from '../../const';
import type { FilmProps } from '../../types/film';
import { getAuthorizationStatus } from '../../store/auth/selectors';

function MyListButton({film}: {film: FilmProps}): JSX.Element {
  const [isInFavoriteList, setIsInFavoriteList] = useState(film.isFavorite);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();

  useEffect(() => setIsInFavoriteList(film.isFavorite), [film]);

  const handleFavoriteClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      setIsInFavoriteList(!isInFavoriteList);
    }
    dispatch(setFavoriteAction(film.id, isInFavoriteList ? FavoriteAction.Remove : FavoriteAction.Add));
  };

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={handleFavoriteClick}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={isInFavoriteList ? '#in-list' : '#add'}></use>
      </svg>
      <span>My list</span>
    </button>
  );
}

export default memo(MyListButton);
