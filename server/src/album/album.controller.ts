import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe, ParseIntPipe, Put } from "@nestjs/common";
import { AlbumService } from "./album.service"
import { AuthGuard } from "../auth/guards/auth.guard"
import { Album } from "./schemas/album.schema"
import { CreateAlbumDto } from "./dto/createAlbum.dto"
import { CurrentUser } from "../auth/decorators/user.decorator"
import { currentUserType } from "../user/type/currentUser.interface"
import { FileInterceptor } from "@nestjs/platform-express";
import { ParseIntoIntPipe } from "../pipes/parseIntoInt.pipe"
import { ParseStringToBoolean } from "../pipes/parseStringToBoolean.pipe"
import { AlbumComment } from "./schemas/albumComments.schema"


@Controller("albums")
export class AlbumController {
    constructor(
        private readonly albumServise: AlbumService
    ){}

    @Get()
    async getAlbums(
        @Query("offset", ParseIntoIntPipe) offset: number | null | undefined,
        @Query("count", ParseIntoIntPipe) count: number | null | undefined,
        @Query("searchValue") searchValue: string | null | undefined,
        @Query("searchSelect") searchSelect: string | null | undefined,
    ): Promise<Album[]> { 
        return await this.albumServise.getAlbums(offset, count, searchValue || "", searchSelect || "")
    }

    @Get("my-albums")
    @UseGuards(AuthGuard)
    async getMyAlbums(
        @CurrentUser() currentUser: currentUserType,
        @Query("offset", ParseIntoIntPipe) offset: number | null | undefined,
        @Query("count", ParseIntoIntPipe) count: number | null | undefined,
        @Query("searchValue") searchValue: string | null | undefined,
        @Query("searchSelect") searchSelect: string | null | undefined,
    ): Promise<Album[]> {
        const user = await this.albumServise.getMyAlbums(currentUser , offset, count, searchValue || "", searchSelect || "")
        return this.albumServise.pullAlbums(user)
    }

    @Get(":albumID")
    async getAlbumByID(
        @Param("albumID") albumID: string
    ): Promise<Album> {
        return await this.albumServise.getAlbumByID(albumID)
    }

    @Post("create")
    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor("avatar"))
    async createAlbum(
        @Body(ParseStringToBoolean) createAlbumDto: CreateAlbumDto,
        @CurrentUser() currentUser: currentUserType,
        @UploadedFile() avatar: Express.Multer.File
    ): Promise<Album> {
        const result = await this.albumServise.createAlbum(createAlbumDto, currentUser, avatar)
        return result
    }

    @Post("add-to-user/:albumID")
    @UseGuards(AuthGuard)
    async addAlbumToUser(
        @Param("albumID") albumID: string,
        @CurrentUser() currentUser: currentUserType
    ): Promise<Album> {
        const result = await this.albumServise.addAlbumToUser(albumID, currentUser)
        return result
    }

    @Delete("remove-from-user/:albumID/")
    @UseGuards(AuthGuard)
    async removeAlbumFromUser(
        @Param("albumID") albumID: string,
        @CurrentUser() currentUser: currentUserType
    ): Promise<Album> {
        const result = await this.albumServise.removeAlbumFromUser(albumID, currentUser)
        return result
    }

    @Post("comments/:albumID/")
    @UseGuards(AuthGuard)
    async addCommentToAlbum(
        @CurrentUser() currentUser: currentUserType,
        @Body("text") text: string,
        @Param("albumID") albumID: string
    ): Promise<AlbumComment> {
        console.log(text)
        return await this.albumServise.addCommentToAlbum(currentUser, albumID, text)
    }

    @Delete("comments/:commentID")
    @UseGuards(AuthGuard)
    async removeCommentFromAlbum(
        @CurrentUser() currentUser: currentUserType,
        @Param("commentID") commentID: string
    ) {
        await this.albumServise.removeCommentFromAlbum(commentID, currentUser)
    }

    @Get("comments/:albumID")
    async getCommentsFromAlbum(
        @Param("albumID") albumID: string,
        @Query("offset", ParseIntoIntPipe) offset?: number,
        @Query("count", ParseIntoIntPipe) count?: number
     ): Promise<AlbumComment[]> {


        return await this.albumServise.getCommentsFromAlbum(albumID, offset || 0, count || 10)
    }

    @Delete(":albumID")
    @UseGuards(AuthGuard)
    async deleteAlbum(
        @Param("albumID") albumID: string,
        @CurrentUser() currentUser: currentUserType
    ) {

        const result = await this.albumServise.deleteAlbum(albumID, currentUser)
        return result
    }
// 
    @Put(":albumID")
    @UseGuards(AuthGuard)
    async addTrackToAlbum(
        @Body("trackID") trackID: string,
        @Param("albumID") albumID: string,
        @CurrentUser() currentUser: currentUserType
    ): Promise<Album> {
        return await this.albumServise.addTrackToAlbum(trackID, albumID, currentUser)
    }

    
    @Delete("/remove-like/:albumID")
    async removeLikeFromAlbum(
        @Param("albumID") albumID: string,
        @CurrentUser() currentUser: currentUserType
    ) {
        console.log(currentUser)
        return await this.albumServise.removeLikeFromAlbum(albumID, currentUser)
    }

    @Delete("/:albumID/:trackID")
    @UseGuards(AuthGuard)
    async deleteTrackFromAlbum(
        @Param("albumID") albumID: string,
        @Param("trackID") trackID: string,
        @CurrentUser() currentUser: currentUserType
    ) {
        console.log("fff")
        return await this.albumServise.deleteTrackFromAlbum(albumID, trackID, currentUser)
    }

    @Put("add-like/:albumID")
    @UseGuards(AuthGuard)
    async addLike(
        @Param("albumID") albumID: string,
        @CurrentUser() currentUser: currentUserType
    ): Promise<Album>{
        return await this.albumServise.addLike(albumID, currentUser)
    }

    


}