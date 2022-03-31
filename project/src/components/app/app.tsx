import {
  Switch,
  Route
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddReview from '../pages/add-review-page/add-review/add-review';
import Film from '../pages/film-page/film/film';
import Main from '../pages/main-page/main/main';
import MyList from '../pages/my-list-page/my-list';
import NotFound from '../not-found/not-found';
import Player from '../pages/player-page/player/player';
import PrivateRoute from '../private-route/private-route';
import SignIn from '../pages/sign-in-page/sign-in';
import Spinner from '../spinner/spinner';
import { getAuthorizationStatus } from '../../store/auth/selectors';
import {
  getIsDataLoaded,
  getPromo
} from '../../store/film-list/selectors';
import {
  AppRoute,
  AuthorizationStatus
} from '../../const';

export default function App(): JSX.Element {
  const isDataLoaded = useSelector(getIsDataLoaded);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const promo = useSelector(getPromo);

  if (authorizationStatus === AuthorizationStatus.Unknown || !isDataLoaded || !promo.id) {
    return <Spinner />;
  }

  return (
    <Switch>
      <Route path={AppRoute.Main} exact>
        <Main />
      </Route>
      <Route path={AppRoute.SignIn} exact>
        <SignIn />
      </Route>
      <PrivateRoute path={AppRoute.MyList} exact>
        <MyList />
      </PrivateRoute>
      <Route path={AppRoute.Film} exact>
        <Film />
      </Route>
      <PrivateRoute path={AppRoute.AddReview} exact>
        <AddReview />
      </PrivateRoute>
      <Route path={AppRoute.Player} exact>
        <Player />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
