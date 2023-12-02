import { Field } from './field';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import {HttpMethod, ReturnType} from "../types";

export class Category {
  @IsString()
  public name: string;
  @IsString()
  public endpoint: string;

  @IsString()
  public method: HttpMethod;

  @IsString()
  @IsOptional()
  public returnType?: ReturnType = 'array';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Field)
  public fields: Field[];
}
