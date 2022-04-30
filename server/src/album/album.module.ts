import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AlbumController } from "./album.controller"
import { AlbumService } from "./album.service"
import { Album, AlbumSchema } from "./schemas/album.schema"
import { AlbumComment, AlbumCommentSchema } from "./schemas/albumComments.schema"
import { FileModule } from "../file/file.module"
import { TrackModule } from "../track/track.module"
import { UserModule } from "../user/user.module"

@Module({
    imports: [MongooseModule.forFeature(
        [
            {
                name: Album.name,
                schema: AlbumSchema
            },
            {
                name: AlbumComment.name,
                schema: AlbumCommentSchema
            }
        ]
        ),
        FileModule,
        UserModule,
        forwardRef(() => TrackModule)
    ],
    controllers: [AlbumController],
    providers: [AlbumService],
    exports: [AlbumService]
})
export class AlbumModule {}