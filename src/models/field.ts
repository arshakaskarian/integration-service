import { IsString } from 'class-validator';

export class Field {
  @IsString()
  public externalName: string;
  @IsString()
  public internalName: string;
  @IsString()
  public transformationFunction: string;
  @IsString()
  public defaultValue: any;

  constructor(
    externalName: string,
    internalName: string,
    transformationFunction: string,
    defaultValue: any,
  ) {
    this.externalName = externalName;
    this.internalName = internalName;
    this.transformationFunction = transformationFunction;
    this.defaultValue = defaultValue;
  }
}
