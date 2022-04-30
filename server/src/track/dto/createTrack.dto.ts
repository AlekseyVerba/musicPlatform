import { IsNotEmpty } from "class-validator"

export class CreateTrackDto {
    @IsNotEmpty({message: "Название трека не должно быть пустым"})
    name: string
    @IsNotEmpty({message: "Название артиса не должно быть пустым"})
    artist: string
    text: string | null | undefined
}