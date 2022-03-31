import { combineReducers } from 'redux';
import { authReducer } from './auth/auth-reducer';
import { currentFilmReducer } from './current-film/current-film-reducer';
import { filmListReducer } from './film-list/film-list-reducer';
import { filterReducer } from './filter/filter-reducer';

export const rootReducer = combineReducers({
  films: filmListReducer,
  film: currentFilmReducer,
  filter: filterReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
