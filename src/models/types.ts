export type FieldType = 'number' | 'string' | 'array' | 'boolean';
export type HttpMethod = 'get' | 'post';
export type ApiKeyAddTo = 'header' | 'param';
export type ReturnType = Array<any> | object | string | number;
export type AuthType =
    | 'not-auth'
    | 'api-key'
    | 'bearer-token'
    | 'basic'
    | 'auth2'
    | 'sso';

