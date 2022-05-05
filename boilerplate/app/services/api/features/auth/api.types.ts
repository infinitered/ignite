/* eslint-disable camelcase */
import { User } from '../../../../models'
import { GeneralApiProblem } from '../../api-problem'

export type UserResult = {
  kind: 'ok';
  user: User;
  token?: string;
}

export type SignInResult = UserResult | GeneralApiProblem

export type SignUpResult = UserResult | GeneralApiProblem

export type GetUserResult = UserResult | GeneralApiProblem

export type SignOutResult = { kind:'ok' } | GeneralApiProblem

export type SignUpPostData = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
  player_id?: string
}

export type SocialPlatformSignIn = 'google' | 'facebook' | 'apple' | 'twitter'
