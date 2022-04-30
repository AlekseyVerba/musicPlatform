import * as mongoose from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import { User } from "../../user/schemas/user.schema"
import { Track } from "../../track/schemas/track.schema"

export type TrackToUserDocument = TrackToUser & mongoose.Document


@Schema({
    timestamps: true
})
export class  TrackToUser {
    _id: string

    @Prop({type: mongoose.Types.ObjectId, ref: "User"})
    user: User

    @Prop({type: mongoose.Types.ObjectId, ref: "Track"})
    track: Track
    
}

export const TrackToUserSchema = SchemaFactory.createForClass(TrackToUser)