import { IsEmail, Length } from "class-validator"

export class CreateUserDto {
    @Length(3, 16, {message: "Имя пользователя должно быть минимум из 3 символов и максимум из 16"})
    username: string
    @IsEmail({}, {message: "Некорректный Email"})
    email: string
    @Length(3, 16, {message: "Пароль должен быть минимум из 3 символов и максимум из 16"})
    password: string
}