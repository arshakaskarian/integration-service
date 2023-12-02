import { Authorization } from './authorization';
import { ApiKeyAddTo } from '../types';
import { IsString } from 'class-validator';

export class ApiKeyAuthorization extends Authorization {
  @IsString()
  public key: string;
  @IsString()
  public value: string;
  @IsString()
  public addTo: ApiKeyAddTo;

  constructor() {
    super('api-key');
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  auth(): void {}
}
