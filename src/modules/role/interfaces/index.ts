import { IAppResponse } from '@Types';

export interface IRoleResponse<T> extends IAppResponse {
  role?: T
  roles?: T,
}