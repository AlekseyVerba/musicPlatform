import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
import { Track } from "./track.schema"
import { User } from "../../user/schemas/user.schema"

export type CommentDocument = Comment & mongoose.Document


@Schema()
export class Comment {
    _id: string

    @Prop({type: mongoose.Types.ObjectId, ref: "Track"})
    track: Track

    @Prop({type: mongoose.Types.ObjectId, ref: "User"})
    user: User

    @Prop()
    text: string
}

export const CommentSchema = SchemaFactory.createForClass(Comment)