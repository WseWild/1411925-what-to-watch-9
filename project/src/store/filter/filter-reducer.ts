import { createReducer } from '@reduxjs/toolkit';
import { filterFilmsByGenre } from '../../utils';
import {
  changeGenre,
  filterFilms
} from '../action';
import { Genre } from '../../const';
import type { FilterState } from '../../types/state';

export const initialState: FilterState = {
  currentGenre: Genre.All,
  filteredFilms: [],
};

export const filterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.currentGenre = action.payload;
    })
    .addCase(filterFilms, (state, action) => {
      state.filteredFilms = filterFilmsByGenre(action.payload, state.currentGenre);
    });
});
