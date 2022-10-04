import { IAppResponse } from '@Types'

export interface IUserResponse<T> extends IAppResponse {
  user?: T
  users?: T,
}

export interface IUniqUserData {
  email?: string,
  phone?: string
}