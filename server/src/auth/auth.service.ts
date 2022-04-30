import { Body, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service"
import { CreateUserDto } from "./dto/createUser.dto"
import { LoginUserDto } from "./dto/loginUser.dto"
import { User } from "../user/schemas/user.schema"
import { hash, compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { SECRET_KEY_JWT } from "../config"
import { currentUserType } from "../user/type/currentUser.interface"


@Injectable()
export class AuthService {
    constructor(
        private readonly userSerivce: UserService
    ) {}


    async registration(createUserDto: CreateUserDto): Promise<User> {
        const candidateByEmail = await this.userSerivce.findUserByEmail(createUserDto.email)

        if (candidateByEmail) {
            throw new HttpException("Пользователь с данным Email уже существует", HttpStatus.BAD_REQUEST)
        }

        const candidateByUsername = await this.userSerivce.findUserByUsername(createUserDto.username)

        if (candidateByUsername) {
            throw new HttpException("Пользователь с данным username уже существует", HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await hash(createUserDto.password, 5)

        const newUser = await this.userSerivce.createUser({...createUserDto, password: hashPassword})

        return newUser
    }

    async login(loginUserDto: LoginUserDto): Promise<User> {

        const candidate = await this.userSerivce.findUserByEmail(loginUserDto.email, true)

        if (!candidate) {
            throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND)
        }

        const passwordIsTheSame = await compare(loginUserDto.password, candidate.password)

        if (!passwordIsTheSame) {
            throw new HttpException("Пароль не совпадает", HttpStatus.BAD_REQUEST)
        }

        candidate.password = undefined
        return candidate

    }

    async auth(currentUser: currentUserType): Promise<User> {
        const user = await this.userSerivce.findUserById(currentUser._id)
        return user
    }

    generateToken(user: User): string {
        const token = sign({_id: user._id, username: user.username, imageURL: user.imageURL}, SECRET_KEY_JWT)
        return token
    }

}