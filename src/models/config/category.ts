import { Field } from './field';
import { HttpMethod, ReturnType } from './config';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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
