import { AuthType } from './config';
import { IsString } from 'class-validator';

export abstract class Authorization {
  @IsString()
  public authType: AuthType;

  constructor(authType: AuthType) {
    this.authType = authType;
  }

  abstract auth(): void;
}
