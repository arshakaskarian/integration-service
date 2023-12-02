import {IsOptional, IsString} from 'class-validator';
import {FieldType} from "../types";

export class Field {
  @IsString()
  public externalName: string;
  @IsString()
  public internalName: string;
  @IsString()
  public transformationFunction: string;
  @IsString()
  public defaultValue: any;
  @IsString()
  @IsOptional()
  public fieldType : FieldType;

  constructor(
    externalName: string,
    internalName: string,
    transformationFunction: string,
    defaultValue: any,
    fieldType : FieldType,
  ) {
    this.externalName = externalName;
    this.internalName = internalName;
    this.transformationFunction = transformationFunction;
    this.defaultValue = defaultValue;
    this.fieldType = fieldType;
  }
}

