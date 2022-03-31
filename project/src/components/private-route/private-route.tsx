import {
  useSelector
} from 'react-redux';
import {
  Route,
  Redirect,
  RouteProps
} from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/auth/selectors';
import {
  AppRoute,
  AuthorizationStatus
} from '../../const';

export default function PrivateRoute(props: RouteProps): JSX.Element {
  const {exact, path, children} = props;
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <Route exact={exact} path={path}>
      {
        authorizationStatus === AuthorizationStatus.Auth
          ? children
          : <Redirect to={AppRoute.SignIn} />
      }
    </Route>
  );
}
