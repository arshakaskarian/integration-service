import {Injectable} from "@nestjs/common";
import {Authorization} from "../models/authorization/authorization";
import {BasicAuthorization} from "../models/authorization/basicAuthorization";

@Injectable()
export class AuthorizationService {
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
