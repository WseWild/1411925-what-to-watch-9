import { useEffect } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import Loading from '../../../loading/loading';
import Review from '../review/review';
import { fetchReviewsAction } from '../../../../store/api-actions';
import {
  getCurrentFilm,
  getIsReviewsLoaded,
  getReviews
} from '../../../../store/current-film/selectors';

export default function FilmTabReviews() : JSX.Element {
  const currentFilm = useSelector(getCurrentFilm);
  const reviews = useSelector(getReviews);
  const isReviewsLoaded = useSelector(getIsReviewsLoaded);
  const dispatch = useDispatch();

  const getReviewList = (id: number) => {
    dispatch(fetchReviewsAction(id));
  };

  useEffect(() => {
    if (!isReviewsLoaded) {
      getReviewList(currentFilm.id);
    }
  });

  if (!isReviewsLoaded) {
    return <Loading />;
  }

  const midIndex = Math.round(reviews.length / 2);

  return (
    <div className="film-card__reviews film-card__row">
      {<Review reviews={reviews.slice(0, midIndex)} />}
      {<Review reviews={reviews.slice(midIndex)} />}
    </div>
  );
}
