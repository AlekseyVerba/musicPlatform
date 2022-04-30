import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import * as mongoose from "mongoose"
import { User } from "../../user/schemas/user.schema"
import { Album } from "./album.schema"

export type AlbumCommentDocument = AlbumComment & mongoose.Document

@Schema()
export class AlbumComment {
    _id: string
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    user: User

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Album"})
    album: Album

    @Prop()
    text: string
}

export const AlbumCommentSchema = SchemaFactory.createForClass(AlbumComment)