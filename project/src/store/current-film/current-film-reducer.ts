import { createReducer } from '@reduxjs/toolkit';
import {
  loadFilm,
  loadReviews,
  loadSimilarFilms,
  updateFilm
} from '../action';
import {
  adaptFilmsToClient,
  adaptToClient
} from '../../utils';
import type { FilmProps } from '../../types/film';
import type { CurrentFilmState } from '../../types/state';

export const initialState: CurrentFilmState = {
  currentFilm: {} as FilmProps,
  similarFilms: [],
  reviews: [],
  isSimilarFilmsLoaded: false,
  isReviewsLoaded: false,
};

export const currentFilmReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilm, (state, action) => {
      state.currentFilm = adaptToClient(action.payload);
      state.isSimilarFilmsLoaded = false;
      state.isReviewsLoaded = false;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = adaptFilmsToClient(action.payload);
      state.isSimilarFilmsLoaded = true;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
      state.isReviewsLoaded = true;
    })
    .addCase(updateFilm, (state, action) => {
      state.currentFilm = adaptToClient(action.payload);
    });
});
