import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Config, ReturnType } from './models/config';
import { Field } from './models/field';
import { Authorization } from './models/authorization';
import { BasicAuthorization } from './models/basicAuthorization';

const _ = require('lodash');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async createPost(@Body() config: Config) {
    const { baseUrl } = config.dataSource;
    const { method, endpoint, fields, returnType } = config.categories[0];
    let result: any;
    const fieldsMap = this.initFieldMap(fields);
    const response = await this.doCall(
      baseUrl,
      endpoint,
      method,
      config.authorization,
    );
    if (response.ok) {
      try {
        result = await this.transform(returnType, result, response, fieldsMap);
      } catch (error) {
        return error.message;
      }
    }
    return result;
  }

  private async doCall(
    baseUrl: string,
    endpoint: string,
    method: 'get' | 'post',
    authorization,
  ) {
    console.log(fetch);
    const headers = this.authorization(authorization);
    const response: Response = await fetch(`${baseUrl}${endpoint}`, {
      method: method.toLowerCase(),
      headers,
      // body: new URLSearchParams(authReq)
    });
    return response;
  }

  private initFieldMap(fields: Field[]) {
    const fieldsMap: Map<string, string> = new Map<string, string>();
    fields.forEach((item: Field) => {
      fieldsMap[item.internalName] = item.externalName;
    });
    return fieldsMap;
  }

  private async transform(
    returnType: ReturnType,
    result: any,
    response: Response,
    fieldsMap: any,
  ) {
    switch (returnType) {
      case 'array': {
        result = [];
        this.transformToArray(await response.json(), fieldsMap, result);
        break;
      }
      case 'object': {
        result = {};
        result = this.transformToObject(fieldsMap, await response.json());
        break;
      }
      case 'number': {
        throw new Error('Case for number not implement yet');
      }
      case 'string': {
        throw new Error('Case for string not implement yet');
      }
      default: {
        throw new Error(`Case for ${returnType} not implement yet`);
      }
    }
    return result;
  }

  function;

  transformToArray(data: any, fieldsMap: any, result: any[]): void {
    data.forEach((item: any) => {
      result.push(this.transformToObject(fieldsMap, item));
    });
  }

  private transformToObject(fieldsMap: any, item: any) {
    const transformedObject = {};
    Object.entries(fieldsMap).forEach(([key, value]) => {
      _.set(transformedObject, key, _.get(item, value));
    });
    return transformedObject;
  }

  authorization(auth: Authorization): any {
    if (auth instanceof BasicAuthorization) {
      return {
        Authorization:
          'Basic ' +
          Buffer.from(auth.username + ':' + auth.password).toString('base64'),
      };
    }
  }
}
