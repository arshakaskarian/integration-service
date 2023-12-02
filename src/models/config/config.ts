import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { Datasource } from '../datasource/datasource';
import { Authorization } from '../authorization/authorization';
import { Category } from './category';
import { BasicAuthorization } from '../authorization/basicAuthorization';
import { ApiKeyAuthorization } from '../authorization/apiKeyAuthorization';

export class Config {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  swaggerUrl?: string;

  @ValidateNested()
  @Type(() => Datasource)
  dataSource: Datasource;
  @ValidateNested()
  @Type(() => Authorization, {
    discriminator: {
      property: 'authType',
      subTypes: [
        { value: BasicAuthorization, name: 'basic' },
        { value: ApiKeyAuthorization, name: 'api-key' },
      ],
    },
  })
  authorization: Authorization | BasicAuthorization | ApiKeyAuthorization;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Category)
  categories: Category[];
}

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
