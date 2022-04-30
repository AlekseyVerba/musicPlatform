import { IsNotEmpty } from "class-validator"

export class CreateAlbumDto {
    @IsNotEmpty({message: "Название альбома не может быть пустым"})
    name: string
    description?: string
    isShowInRecommendation?: boolean
}