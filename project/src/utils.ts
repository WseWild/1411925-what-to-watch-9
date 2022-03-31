import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {
  Genre,
  Grade,
  Time
} from './const';
import type {
  FilmFromServer,
  FilmProps
} from './types/film';
dayjs.extend(duration);

export const filterFilmsByGenre = (films: FilmProps[], genre: string): FilmProps[] => {
  if (genre === Genre.All) {
    return films;
  }

  return films.filter((film) => film.genre === genre);
};

export const adaptToClient = (film: FilmFromServer): FilmProps => (
  {
    id: film['id'],
    name: film['name'],
    posterImage: film['poster_image'],
    previewImage: film['preview_image'],
    backgroundImage: film['background_image'],
    backgroundColor: film['background_color'],
    videoLink: film['video_link'],
    previewVideoLink: film['preview_video_link'],
    description: film['description'],
    rating: film['rating'],
    scoresCount: film['scores_count'],
    director: film['director'],
    starring: film['starring'],
    runTime: film['run_time'],
    genre: film['genre'],
    released: film['released'],
    isFavorite: film['is_favorite'],
  }
);

export const adaptFilmsToClient = (films: FilmFromServer[]): FilmProps[] => (
  films.map((film) => adaptToClient(film))
);

export const getGrade = (rating: number): string => {
  if (rating === 10) {
    return Grade.Awesome;
  } else if (rating >= 8) {
    return Grade.VeryGood;
  } else if (rating >= 5) {
    return Grade.Good;
  } else if (rating >= 3) {
    return Grade.Normal;
  } else if (rating > 0) {
    return Grade.Bad;
  }
  return '';
};

export const formatDate = (date: string): string => dayjs(date).format('YYYY-MM-DD');
export const formatRunTime = (runtime: number): string => dayjs.duration(runtime, 'minutes').format('H[h] mm[m]');

export const formatRemainingTime = (remainingTime: number): string => {
  const format = remainingTime >= Time.HourInSecond ? '-HH:mm:ss' : '-mm:ss';

  return dayjs.duration(remainingTime, 'seconds').format(format);
};

export const humanizeDate = (date: string): string => dayjs(date).format('MMMM D, YYYY');
