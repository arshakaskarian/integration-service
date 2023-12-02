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



