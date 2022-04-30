import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service"
import { User, UserDocument } from "../user/schemas/user.schema"
import { CreateUserDto } from "./dto/createUser.dto"
import { LoginUserDto } from "./dto/loginUser.dto"
import { UserWithTokenInterface } from "../user/type/UserWithToken.interface"
import { CurrentUser } from "./decorators/user.decorator"
import { currentUserType } from "../user/type/currentUser.interface"


@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}



    @Post("register")
    @UsePipes(ValidationPipe)
    async registration(
        @Body() createUserDto: CreateUserDto
    ): Promise<User> {
        const result = await this.authService.registration(createUserDto)
        return result
    }

    @Post("login")
    @UsePipes(ValidationPipe)
    async login(
        @Body() loginUserDto: LoginUserDto
    ): Promise<UserWithTokenInterface> {
        const result = await this.authService.login(loginUserDto)
        const token = this.authService.generateToken(result)

        return {user: result, token}
    }

    @Get()
    async auth(
        @CurrentUser() currentUser: currentUserType
    ): Promise<UserWithTokenInterface> {
        const result = await this.authService.auth(currentUser)
        const token = this.authService.generateToken(result)
        return {user: result, token}
    }


}