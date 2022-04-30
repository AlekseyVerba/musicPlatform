import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as mongoose from "mongoose"
import { Track } from "../../track/schemas/track.schema"
import { Album } from "../../album/schemas/album.schema"

export type UserDocument = User & mongoose.Document

@Schema()
export class User {
    _id: string
    @Prop({required: true, unique: true})
    username: string

    @Prop({required: true, unique: true})
    email: string

    @Prop({select: false})
    password: string

    @Prop({default: ""})
    imageURL: string



    @Prop({type: [{type: mongoose.Types.ObjectId, ref: "Track"}]})
    tracks: Track[]

    @Prop({type: [{type: mongoose.Types.ObjectId, ref: "Album"}]})
    albums: Album[]

    @Prop({type: [{type: mongoose.Types.ObjectId, ref: "Track"}]})
    liked: Track[]

    @Prop({type: [{type: mongoose.Types.ObjectId, ref: "User"}]})
    following: User[]

    @Prop({type: [{type: mongoose.Types.ObjectId, ref: "User"}]})
    followers: User[]

}

export const UserSchema = SchemaFactory.createForClass(User)