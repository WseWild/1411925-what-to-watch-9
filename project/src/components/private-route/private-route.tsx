import {AppRoute, AuthorizationStatus} from '../../const';
import {RouteProps} from 'react-router-dom';
import {Navigate} from 'react-router-dom';


type PrivateRouteProps = RouteProps & {
  children: JSX.Element;
  authorizationStatus: AuthorizationStatus;
}

function PrivateRoute({children, authorizationStatus} : PrivateRouteProps): JSX.Element {


  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivateRoute;

