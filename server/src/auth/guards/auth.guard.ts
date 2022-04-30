import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { RequestExpress } from "../../types/requestExpress.interface"

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request: RequestExpress = context.switchToHttp().getRequest()

        if (!request.user) {
            throw new HttpException("Необходима авторизация", HttpStatus.UNAUTHORIZED)
        }
    
        return true

    }
}