import { Authorization } from './authorization';

export class BearerTokenAuthorization extends Authorization {
  constructor(private token: string) {
    super('bearer-token');
  }

  auth(): void {
    throw new Error('Method not implemented.');
  }
}
