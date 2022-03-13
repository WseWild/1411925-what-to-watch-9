import MainScreen from '../main/main';
import Film from '../film/film';
import MyList from '../my-list/my-list';
import Player from '../player/player';
import Review from '../add-review/add-review';
import SignIn from '../sign-in/sign-in';
import PrivateRoute from '../private-route/private-route';
import Error404Page from '../error404-page/error404-page';
import {AppRoute, AuthorizationStatus} from '../../const';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {FilmsInfo, FilmInfo} from '../../types/film';


type AppScreenProps = {
  filmCardTitle: string;
  filmCardGenre: string;
  filmCardYear: number;
  filmsInfo: FilmsInfo;
}

function App({filmsInfo, filmCardGenre, filmCardTitle, filmCardYear}: AppScreenProps): JSX.Element {
  const [firstFilm] = filmsInfo;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainScreen filmsInfo={filmsInfo}  filmCardGenre={filmCardGenre} filmCardTitle={filmCardTitle} filmCardYear={filmCardYear}/>}
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn/>}
        />
        <Route
          path={AppRoute.Film}
          element={<Film  filmsInfo={filmsInfo} />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <MyList filmsInfo={filmsInfo}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Player}
          element={<Player/>}
        />
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <Review filmInfo={firstFilm as FilmInfo}/>
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<Error404Page/>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
