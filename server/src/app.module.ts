import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose"
import { ServeStaticModule } from "@nestjs/serve-static";
import { AuthModule } from "./auth/auth.module"
import { AuthMiddleware } from "./auth/middlewares/decodeToken.middleware"
import { TrackModule } from "./track/track.module"
import { resolve } from "path"
import { AlbumModule } from "./album/album.module"

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname,"static")
        }),
        MongooseModule.forRoot("mongodb+srv://verba:sasafa12@cluster0.iaxkd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"),
        AuthModule,
        TrackModule,
        AlbumModule
    ]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes({path: "*", method: RequestMethod.ALL})
    }
}