import { Authorization } from './authorization';

export interface Auth2Authorization extends Authorization {
  token: string;
  headerPrefix: string;
  tokenName?: string;
  grantType?: string; //TODO change to Type
  callbackUrl?: string;
  authUrl?: string;
  accessTokenUrl?: string;
  clientId?: string;
  clientSecret?: string;
  scope?: string;
  state?: string;
  clientAuthentication?: string; //TODO change to type
}
