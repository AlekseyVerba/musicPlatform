import * as mongoose from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import { User } from "../../user/schemas/user.schema"
import { Comment } from "./comment.schema"
import { TrackToUser } from "./tracksToUser.schema"

export type TrackDocument = Track & mongoose.Document


@Schema()
export class Track {
    _id: string
    @Prop()
    name:string

    @Prop()
    artist: string

    @Prop()
    text: string

    @Prop()
    listens: number

    @Prop()
    picture: string

    @Prop()
    audio: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    user: User

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]})
    comment: Comment[]
    
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]})
    likes: User[]

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "TrackToUser"}]})
    trackToUser: TrackToUser[]
}

export const TrackSchema = SchemaFactory.createForClass(Track)

TrackSchema.pre("remove", async function(next) {
    await this.model("User").find().where("tracks").in([this._id]).updateMany({$pull: {tracks: {$in: this._id}}})
    await this.model("Album").find().where("tracks").in([this._id]).updateMany({$pull: {tracks: {$in: this._id}}})
    await this.model("Comment").deleteOne({track: this._id})
    await this.model("TrackToUser").deleteOne({track: this._id})
    next()
})