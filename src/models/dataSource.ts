import { IsString } from 'class-validator';

export class DataSource {
  @IsString()
  baseUrl: string;
}
