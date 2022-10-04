import { UserEntity } from '@Entities';
import { IAppResponse } from '@Types';

export interface IAuthResponse extends IAppResponse {
  user: UserEntity;
  role: string | null;
  accessToken: string;
  refreshToken: string
}