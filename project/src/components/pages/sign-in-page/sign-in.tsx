import {
  FormEvent,
  useState
} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAction } from '../../../store/api-actions';
import Footer from '../../footer/footer';
import { AppRoute } from '../../../const';
import type { AuthData } from '../../../types/auth-data';
import type { ThunkAppDispatch } from '../../../types/action';

const DEFAULT_FORM_STATE: AuthData = {
  email: '',
  password: '',
};

const passwordRegEx = /(?=.*\d)(?![.\n])(?=.*[A-Za-z])/;
const checkPassword = (password: string) => passwordRegEx.test(password);

export default function SignIn(): JSX.Element {
  const [userInput, setUserInput] = useState(DEFAULT_FORM_STATE);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const dispatch = useDispatch<ThunkAppDispatch>();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData))
      .catch(() => setIsEmailValid(false));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsEmailValid(true);

    if (!checkPassword(userInput.password)) {
      setIsPasswordValid(false);
      return;
    }
    setIsPasswordValid(true);

    onSubmit(userInput);
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form
          action="#"
          className="sign-in__form"
          onSubmit={handleSubmit}
        >
          {
            !isEmailValid &&
            <div className="sign-in__message">
              <p>Please enter a valid email address</p>
            </div>
          }
          {
            !isPasswordValid &&
            <div className="sign-in__message">
              <p>We can’t recognize this email <br /> and password combination. Please try again.</p>
            </div>
          }
          <div className="sign-in__fields">
            <div className={`sign-in__field ${!isEmailValid && 'sign-in__field--error'}`}>
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                data-testid="email"
                onChange={(evt) => setUserInput({
                  ...userInput,
                  email: evt.currentTarget.value,
                })}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                data-testid="password"
                onChange={(evt) => setUserInput({
                  ...userInput,
                  password: evt.currentTarget.value,
                })}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
