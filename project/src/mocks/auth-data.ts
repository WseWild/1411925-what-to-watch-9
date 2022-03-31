import {
  datatype,
  internet
} from 'faker';
import {
  AuthData,
  AuthInfo
} from '../types/auth-data';

export const makeFakeUserData = (): AuthData => ({
  email: internet.email(),
  password: internet.password(),
});

export const makeFakeAuthData = (): AuthInfo => ({
  token: datatype.string(),
  'avatar_url': internet.url(),
});
