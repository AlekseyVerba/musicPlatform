import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response, NextFunction } from "express";
import { RequestExpress } from "../../types/requestExpress.interface"
import { verify } from "jsonwebtoken"
import { SECRET_KEY_JWT } from "../../config"
import { User } from "../../user/schemas/user.schema"

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: RequestExpress, res: Response, next: NextFunction) {
        try {

            const authHeader = req.headers.authorization


            if (!authHeader) {
                req.user = null
                return next()
            }

            const itemsHeader = authHeader.split(" ")
            const bearer = itemsHeader[0]
            const token = itemsHeader[1]

            if (bearer !== "Bearer" || !token) {
                req.user = null
                return next()
            }

            const currentUser = verify(token, SECRET_KEY_JWT) as User
            req.user = currentUser

            return next()
        } catch (e) {
            req.user = null
            return next()
        }

    }
}