import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "../user/user.module"
import { TrackController } from "./track.controller"
import { TrackService } from "./track.service"
import { Track, TrackSchema } from "./schemas/track.schema"
import { Comment, CommentSchema } from "./schemas/comment.schema"
import { FileModule } from "../file/file.module"
import { AlbumModule } from "../album/album.module"
import { TrackToUser, TrackToUserSchema } from "./schemas/tracksToUser.schema"

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                { name: Track.name, schema: TrackSchema },
                { name: Comment.name, schema: CommentSchema },
                { name: TrackToUser.name, schema: TrackToUserSchema }
            ]
        ),
        UserModule,
        FileModule,
        forwardRef(() => AlbumModule)
    ],
    controllers: [TrackController],
    providers: [TrackService],
    exports: [TrackService]
})
export class TrackModule {}