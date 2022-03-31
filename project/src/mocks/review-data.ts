import {
  datatype,
  date,
  internet,
  lorem
} from 'faker';
import {
  ReviewPost,
  ReviewProps
} from '../types/review';

export const makeFakeReview = (): ReviewProps => ({
  id: datatype.number(),
  user: {
    id: datatype.number(),
    name: internet.userName(),
  },
  rating: datatype.number(),
  comment: lorem.sentences(),
  date: date.recent().toISOString(),
});

export const makeFakeReviewPost = (): ReviewPost => ({
  rating: datatype.number(),
  comment: lorem.sentences(),
});

export const makeFakeReviewList = (count: number): ReviewProps[] =>
  new Array(count).fill(null).map(() => makeFakeReview());
