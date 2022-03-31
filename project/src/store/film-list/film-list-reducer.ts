import { createReducer } from '@reduxjs/toolkit';
import {
  loadFilms,
  loadPromo,
  updatePromo
} from '../action';
import {
  adaptFilmsToClient,
  adaptToClient
} from '../../utils';
import type { FilmListState } from '../../types/state';
import type { FilmProps } from '../../types/film';

export const initialState: FilmListState = {
  promo: {} as FilmProps,
  filmList: [],
  isDataLoaded: false,
};

export const filmListReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state, action) => {
      state.filmList = adaptFilmsToClient(action.payload);
      state.isDataLoaded = true;
    })
    .addCase(loadPromo, (state, action) => {
      state.promo = adaptToClient(action.payload);
    })
    .addCase(updatePromo, (state, action) => {
      state.promo = adaptToClient(action.payload);
    });
});
