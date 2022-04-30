import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RequestExpress } from "../../types/requestExpress.interface"

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request: RequestExpress = ctx.switchToHttp().getRequest()
        return request.user
    }
)