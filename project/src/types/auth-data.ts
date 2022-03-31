import { Token } from '../services/token';

export type AuthData = {
  email: string,
  password: string,
}

export type AuthInfo = {
  token: Token,
  'avatar_url': string,
}
