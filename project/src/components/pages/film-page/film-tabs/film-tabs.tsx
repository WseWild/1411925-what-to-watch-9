import { Link } from 'react-router-dom';
import FilmTabOverview from '../film-tab-overview/film-tab-overview';
import FilmTabDetails from '../film-tab-details/film-tab-details';
import FilmTabReviews from '../film-tab-reviews/film-tab-reviews';
import type { FilmProps } from '../../../../types/film';
import type { FilmTabsProps } from './type';

const FilmTab = {
  OVERVIEW: 'Overview',
  DETAILS: 'Details',
  REVIEWS: 'Reviews',
};

const renderActiveTab = (tab: string, film: FilmProps) => {
  switch (tab) {
    case FilmTab.OVERVIEW:
      return <FilmTabOverview film={film} />;
    case FilmTab.DETAILS:
      return <FilmTabDetails film={film} />;
    case FilmTab.REVIEWS:
      return <FilmTabReviews />;
  }
};

export default function FilmTabs({id, film}: FilmTabsProps) : JSX.Element {
  const urlHash = document.location.hash.replace('#', '');

  const setClassName = (thisTab: string) => (
    `film-nav__item ${urlHash === thisTab ? 'film-nav__item--active' : ''}`
  );

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={setClassName(FilmTab.OVERVIEW)}>
            <Link
              className="film-nav__link"
              to={`/films/${id}/#${FilmTab.OVERVIEW}`}
            >Overview
            </Link>
          </li>
          <li className={setClassName(FilmTab.DETAILS)}>
            <Link
              className="film-nav__link"
              to={`/films/${id}/#${FilmTab.DETAILS}`}
            >Details
            </Link>
          </li>
          <li className={setClassName(FilmTab.REVIEWS)}>
            <Link
              className="film-nav__link"
              to={`/films/${id}/#${FilmTab.REVIEWS}`}
            >Reviews
            </Link>
          </li>
        </ul>
      </nav>
      {renderActiveTab(urlHash, film)}
    </div>
  );
}
