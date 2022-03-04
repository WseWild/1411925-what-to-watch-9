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


type AppScreenProps = {
  filmCardTitle: string;
  filmCardGenre: string;
  filmCardYear: number;
}

function App({filmCardGenre, filmCardTitle, filmCardYear}: AppScreenProps): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainScreen filmCardGenre={filmCardGenre} filmCardTitle={filmCardTitle} filmCardYear={filmCardYear}/>}
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn/>}
        />
        <Route
          path={AppRoute.Film}
          element={<Film/>}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <MyList/>
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
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <Review/>
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
