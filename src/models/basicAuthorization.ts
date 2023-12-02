import { Authorization } from './authorization';
import { IsString } from 'class-validator';

export class BasicAuthorization extends Authorization {
  @IsString()
  public username: string;
  @IsString()
  public password: string;
  constructor() {
    super('basic');
  }

  auth(): void {
    throw new Error('Method not implemented.');
  }
}
