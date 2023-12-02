import { IsString } from 'class-validator';

export class Datasource {
  @IsString()
  baseUrl: string;
}
