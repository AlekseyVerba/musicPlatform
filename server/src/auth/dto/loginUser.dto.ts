import { IsEmail, Length } from "class-validator"

export class LoginUserDto {
    @IsEmail({}, {message: "Некорректный Email"})
    email: string
    @Length(3, 16, {message: "Пароль должен быть минимум из 3 символов и максимум из 16"})
    password: string
}