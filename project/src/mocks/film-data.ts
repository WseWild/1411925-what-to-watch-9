import {
  datatype,
  date,
  internet,
  lorem,
  name
} from 'faker';
import {
  FilmFromServer,
  FilmProps
} from '../types/film';

export const makeFakeFilm = (): FilmProps => ({
  id: datatype.number(),
  name: name.title(),
  posterImage: internet.url(),
  previewImage: internet.url(),
  backgroundImage: internet.url(),
  backgroundColor: internet.color(),
  videoLink: internet.url(),
  previewVideoLink: internet.url(),
  description: lorem.paragraph(),
  rating: datatype.number(),
  scoresCount: datatype.number(),
  director: name.findName(),
  starring: [name.findName(), name.findName(), name.findName()],
  runTime: datatype.number(),
  genre: lorem.word(),
  released: date.past().getFullYear(),
  isFavorite: datatype.boolean(),
});

export const makeFakeFilmFromServer = (): FilmFromServer => ({
  'id': datatype.number(),
  'name': name.title(),
  'poster_image': internet.url(),
  'preview_image': internet.url(),
  'background_image': internet.url(),
  'background_color': internet.color(),
  'video_link': internet.url(),
  'preview_video_link': internet.url(),
  'description': lorem.paragraph(),
  'rating': datatype.number(),
  'scores_count': datatype.number(),
  'director': name.findName(),
  'starring': [name.findName(), name.findName(), name.findName()],
  'run_time': datatype.number(),
  'genre': lorem.word(),
  'released': date.past().getFullYear(),
  'is_favorite': datatype.boolean(),
});

export const makeFakeFilmList = (count: number): FilmProps[] =>
  new Array(count).fill(null).map(() => makeFakeFilm());

export const makeFakeFilmListFromServer = (count: number): FilmFromServer[] =>
  new Array(count).fill(null).map(() => makeFakeFilmFromServer());
