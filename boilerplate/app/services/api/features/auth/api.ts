import { Api } from '../../api';
import { ApiResponse } from 'apisauce';
import { callApiSauce, resolve } from '../../../../utils/features';
import { getGeneralApiProblem } from '../../api-problem';
import { SignInResult, GetUserResult, SignOutResult, SignUpPostData, SignUpResult, SocialPlatformSignIn } from './api.types';

export class AuthApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async signIn(email: string, password: string, playerId?: string): Promise<SignInResult>  {
    try {
      const response: ApiResponse<any> = await callApiSauce(this.api.apisauce, {
        url: '/users/login',
        method: 'post',
        data: {
          email,
          password,
          player_id: playerId
        }
      })

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return resolve(problem)
      }

      const {  user, token }  = response.data

      return resolve<SignInResult>({
        kind: 'ok',
        user,
        token,
      })
    } catch(e) {
      __DEV__ && console.tron.log(e.message)
      return resolve({ kind: 'bad-data' })
    }
  }

  async socialSignIn(socialToken: string, platform: SocialPlatformSignIn, secretToken?: string): Promise<SignInResult>  {
    try {
      const response: ApiResponse<any> = await callApiSauce(this.api.apisauce, {
        url: '/users/social/login',
        method: 'post',
        data: {
          platform,
          secretToken,
          source: 'guichet',
        },
        headers: {
          'Authorization': `Bearer ${socialToken}`
        }
      })

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return resolve(problem)
      }

      const {  user, token }  = response.data

      return resolve<SignInResult>({
        kind: 'ok',
        user,
        token,
      })
    } catch(e) {
      __DEV__ && console.tron.log(e.message)
      return resolve({ kind: 'bad-data' })
    }
  }

  async signUp(data: SignUpPostData): Promise<SignUpResult>  {
    try {
      const response: ApiResponse<any> = await callApiSauce(this.api.apisauce, {
        url: '/users/register',
        method: 'post',
        data: {
          ...data,
          source: 'guichet'
        }
      })

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return resolve(problem)
      }

      const {  user, token }  = response.data

      return resolve<SignUpResult>({
        kind: 'ok',
        user,
        token,
      })
    } catch(e) {
      __DEV__ && console.tron.log(e.message)
      return resolve({ kind: 'bad-data' })
    }
  }

  async getUser(): Promise<GetUserResult> {
    try {
      const response: ApiResponse<any> = await callApiSauce(this.api.apisauce, {
        url: '/users/me',
        method: 'get',
      }, { secure: true })

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return resolve(problem)
      }

      const { user } = response.data

      return resolve<GetUserResult>({
        kind: 'ok',
        user,
      })
    } catch(e) {
      __DEV__ && console.tron.log(e.message)
      return resolve({ kind: 'bad-data' })
    }
  }

  async signOut(): Promise<SignOutResult> {
    try {
      const response: ApiResponse<any> = await callApiSauce(this.api.apisauce, {
        url: '/users/logout',
        method: 'post',
      })

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return resolve(problem)
      }

      return resolve<SignOutResult>({
        kind: 'ok',
      })
    } catch(e) {
      __DEV__ && console.tron.log(e.message)
      return resolve({ kind: 'bad-data' })
    }
  }
}