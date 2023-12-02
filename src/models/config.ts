import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { DataSource } from './dataSource';
import { Authorization } from './authorization';
import { Category } from './category';
import { BasicAuthorization } from './basicAuthorization';
import { ApiKeyAuthorization } from './apiKeyAuthorization';

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
  @Type(() => DataSource)
  dataSource: DataSource;
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
