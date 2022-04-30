import { Body, Controller, Delete, Get, Param, Post, Put, Query, StreamableFile, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { TrackService } from "./track.service"
import { AuthGuard } from "../auth/guards/auth.guard"
import { CreateTrackDto } from "./dto/createTrack.dto"
import { Track } from "./schemas/track.schema"
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CurrentUser } from "../auth/decorators/user.decorator"
import { currentUserType } from "../user/type/currentUser.interface"
import { QuerySearchInterface } from "./type/querySearch.interface"
import { CreateCommentDto } from "./dto/createComment.dto"
import { Comment } from "./schemas/comment.schema"
import { IResponseStreamAndName } from "./type/responeStreamAndName.interface"
import { ParseIntoIntPipe } from "src/pipes/parseIntoInt.pipe";

@Controller("tracks")
export class TrackController {
    
    constructor(private readonly trackSerivce: TrackService) {}

    @Post("create")
    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileFieldsInterceptor([
        {name: "audio", maxCount: 1},
        {name: "imgAudio", maxCount: 1}
    ]))
    async createTrack(
        @Body() createTrackDto: CreateTrackDto,
        @UploadedFiles() files: {
            audio?: Express.Multer.File[],
            imgAudio?: Express.Multer.File[]
        },
        @CurrentUser() currentUser: currentUserType
    ): Promise<Track> {
        const {audio, imgAudio} = files
        const result = await this.trackSerivce.createTrack(audio[0], imgAudio[0], createTrackDto, currentUser)
        return result
    }

    @Get("tracks-from-user/:userID")
    async getTracksFromUser(
        @Param("userID") userID: string,
        @Query() query: QuerySearchInterface
    ): Promise<Track[]> {
        const user = await this.trackSerivce.getTracksFromUser(userID, query.offset || 0, query.count || 10)
        return this.trackSerivce.pullTracksFromUser(user)
    }

    @Get("tracks-from-album/:albumID")
    async getTracksFromAlbum(
        @Param("albumID") userID: string,
        @Query() query: QuerySearchInterface
    ): Promise<Track[]> {
        const album = await this.trackSerivce.getTracksFromAlbum(userID, query.offset || 0, query.count || 10)
        return this.trackSerivce.pullTracksFromAlbum(album)
    }

    @Get("last-updates-friends")
    @UseGuards(AuthGuard)
    async getLastUpdatesFriends(
        @CurrentUser() currentUser: currentUserType,
        @Query("offset", ParseIntoIntPipe) offset: number,
    ): Promise<any[]> {
        return await this.trackSerivce.getLastUpdatesFriends(currentUser, offset || 0)
    }

    @Get("my-tracks")
    @UseGuards(AuthGuard)
    async getMyTracks(
        @CurrentUser() currentUser: currentUserType,
        @Query() query: QuerySearchInterface
    ): Promise<Track[]> {
        const user = await this.trackSerivce.getMyTracks(currentUser, query.offset || 0, query.count || 10, query.searchValue || "", query.searchSelect || "")
        return this.trackSerivce.pullTracksFromUser(user)
    }

    @Get()
    async getAllTracks(
        @Query() query: QuerySearchInterface,
    ):  Promise<Track[]> {
        const result = await this.trackSerivce.getAllTracks(query.offset || 0, query.count || 10, query.searchValue || "", query.searchSelect || "")
        return result
    }




    @Get(":trackID")
    async getTrackById(
        @Param("trackID") trackID: string
    ): Promise<Track> {

        const result = await this.trackSerivce.getTrackById(trackID)
        return result
    }

    @Delete(":trackID")
    @UseGuards(AuthGuard)
    deleteTrack(
        @Param("trackID") trackID: string,
        @CurrentUser() currentUser: currentUserType
    ) {
        this.trackSerivce.deleteTrack(trackID, currentUser._id)
    }

    @Put(":trackID")
    addListen(
        @Param("trackID") trackID: string
    ) {

        this.trackSerivce.addListen(trackID)

    }

    @Post("like/:trackID")
    @UseGuards(AuthGuard)
    async addLike(
        @Param("trackID") trackID: string,
        @CurrentUser() curerntUserID: currentUserType
    ): Promise<Track> {
        return await this.trackSerivce.addLike(trackID, curerntUserID)
    }

    @Delete("like/:trackID/")
    async deleteLike(
        @Param("trackID") trackID: string,
        @CurrentUser() currentUser: currentUserType
    ): Promise<Track> {
        return await this.trackSerivce.deleteLike(trackID, currentUser)
    }

    @Get("comments/:trackID")
    async getComments(
        @Param("trackID") trackID: string
    ): Promise<Comment[]> {
        return await this.trackSerivce.getComments(trackID)
    } 

    @Post("add-comment/:trackID")
    @UseGuards(AuthGuard)
    async addComment(
        @Body() createCommentDto: CreateCommentDto,
        @Param("trackID") trackID: string,
        @CurrentUser() currentUser: currentUserType
    ): Promise<Comment> {

        return await this.trackSerivce.addComment(createCommentDto.text, trackID, currentUser._id)
    }

    @Delete("remove-comment/:commentID")
    @UseGuards(AuthGuard)
    async removeComment(
        @Param("commentID") commentID: string,
        @CurrentUser() currentUser: currentUserType
    ) {

        this.trackSerivce.removeComment(commentID, currentUser._id)

    }

    @Get("download/:trackID")
    async downloadTrack(
        @Param("trackID") trackID: string
    ): Promise<StreamableFile> {
        const result = await this.trackSerivce.downloadTrack(trackID)
        return result
    }

    @Post("add-to-user/:trackID")
    @UseGuards(AuthGuard)
    async addTrackToUser(
        @Param("trackID") trackID: string,
        @CurrentUser() currentUser: currentUserType
    ): Promise<Track> {
    
        return await this.trackSerivce.addTrackToUser(trackID, currentUser)
    }
    @Put("remove-from-user/:trackID")
    @UseGuards(AuthGuard)
    async removeTrackFromUser(
        @Param("trackID") trackID: string,
        @CurrentUser() currentUser: currentUserType
    ) {
        return await this.trackSerivce.removeTrackFromUser(trackID, currentUser)
    }
}