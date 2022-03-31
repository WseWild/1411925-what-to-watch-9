import { memo } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions';
import {
  getAuthorizationStatus,
  getAvatar
} from '../../store/auth/selectors';
import {
  AppRoute,
  AuthorizationStatus
} from '../../const';

function UserBlock(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const avatar = useSelector(getAvatar);
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  return (
    <ul className="user-block">
      {
        authorizationStatus === AuthorizationStatus.Auth ?
          (
            <>
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <Link to={AppRoute.MyList}>
                    <img src={avatar} alt="User avatar" width="63" height="63" />
                  </Link>
                </div>
              </li>
              <li className="user-block__item">
                <Link
                  className="user-block__link"
                  to={AppRoute.Main}
                  onClick={handleLogoutClick}
                >
                  Sign Out
                </Link>
              </li>
            </>
          ) : (
            <li className="user-block__item">
              <Link className="user-block__link" to={AppRoute.SignIn}>Sign In</Link>
            </li>
          )
      }
    </ul>
  );
}

export default memo(UserBlock);
