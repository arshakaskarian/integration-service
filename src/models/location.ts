import { IsNumber } from 'class-validator';

export class Location {
  @IsNumber()
  lng: number;
  @IsNumber()
  long: number;
}
