import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as mongoose from "mongoose"
import { User } from "../../user/schemas/user.schema"
import { Track } from "../../track/schemas/track.schema"

export type AlbumDocument = Album & mongoose.Document

@Schema()
export class Album {
    _id: string

    @Prop()
    name: string

    @Prop()
    describe: string

    @Prop({default: true})
    isShowInRecommendation: boolean

    @Prop({default: ""})
    imageURL: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    user: User

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]})
    likes: User[]

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Track"}]})
    tracks: Track[]
}

export const AlbumSchema = SchemaFactory.createForClass(Album)

AlbumSchema.pre("remove", async function(next) {
    await this.model("User").find().where("albums").in([this._id]).updateMany({$pull: {albums: {$in: this._id}}})
    await this.model("AlbumComment").deleteOne({album: this._id})
    next()
})