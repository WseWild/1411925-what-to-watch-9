import { createReducer } from '@reduxjs/toolkit';
import {
  loadAvatar,
  loadFavorite,
  requireAuthorization,
  requireLogout
} from '../action';
import {
  AuthorizationStatus,
  Avatar
} from '../../const';
import { AuthState } from '../../types/state';
import { adaptFilmsToClient } from '../../utils';

export const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  avatar: Avatar.Default,
  favoriteFilms: [],
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.favoriteFilms = [];
    })
    .addCase(loadFavorite, (state, action) => {
      state.favoriteFilms = adaptFilmsToClient(action.payload);
    })
    .addCase(loadAvatar, (state, action) => {
      state.avatar = action.payload;
    });
});
