import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Put, StreamableFile } from "@nestjs/common";
import { UserService } from "../user/user.service"
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose"
import { Track, TrackDocument } from "./schemas/track.schema"
import { Comment, CommentDocument } from "./schemas/comment.schema"
import { CreateTrackDto } from "./dto/createTrack.dto"
import { currentUserType } from "../user/type/currentUser.interface"
import { FileService } from "../file/file.service"
import { TypesFile } from "../file/types/typeFile.enum"
import { IResponseStreamAndName } from "./type/responeStreamAndName.interface"
import { User } from "../user/schemas/user.schema"
import { AlbumService } from "../album/album.service"
import { Album } from "../album/schemas/album.schema"
import { TypeFilter } from "../types/filter.enum"
import { TrackToUserDocument, TrackToUser } from "./schemas/tracksToUser.schema"
import * as mongoose from "mongoose";


@Injectable()
export class TrackService {
    constructor(
        @InjectModel(Track.name) private readonly TrackModule: Model<TrackDocument>,
        @InjectModel(Comment.name) private readonly CommentModule: Model<CommentDocument>,
        @InjectModel(TrackToUser.name) private readonly TrackToUserModule: Model<TrackToUserDocument>,
        private readonly userSerivce: UserService,
        private readonly fileService: FileService,
        @Inject(forwardRef(() => AlbumService)) private readonly albumService: AlbumService
    ) {}


    async createTrack(
        audio: Express.Multer.File, 
        img: Express.Multer.File, 
        createTrackDto: CreateTrackDto, 
        currentUser: currentUserType
    ): Promise<Track>{

        let resultCreateAudio = ""
        let resultCreateImg = ""

        if (audio) {
            resultCreateAudio = await this.fileService.createFile(TypesFile.AUDIO, audio) 
        }

        if (img) {
            resultCreateImg = await this.fileService.createFile(TypesFile.IMAGE, img)
        }

        const newTrack = await this.TrackModule.create({...createTrackDto, listens: 0, picture: resultCreateImg, audio: resultCreateAudio, user: currentUser._id, })

        return await newTrack
    }

    async getAllTracks(offset: number = 0, count: number = 10, searchValue: string, searchSelect: string): Promise<Track[]> {

        let tracks: any

        switch (searchSelect) {
            // objectIDCurrentUser
            case TypeFilter.CREATE: {
                tracks = await this.TrackModule.find({"name": {$regex: searchValue}}).sort({date: -1, _id : 1}).skip(offset).limit(count).populate("user")
                break
            }

            case TypeFilter.NAME: {
                tracks = await this.TrackModule.find({"name": {$regex: searchValue}}).sort({name: 1, _id : 1}).skip(offset).limit(count).populate("user")
                break
            }

            case TypeFilter.CREATOR: {
                tracks = await this.TrackModule.find({"name": {$regex: searchValue}}).sort({user: -1, _id : 1}).skip(offset).limit(count).populate("user")
                break
            }

            case TypeFilter.LISTEN: {
                tracks = await this.TrackModule.find({"name": {$regex: searchValue}}).sort({listens: -1, _id : 1}).skip(offset).limit(count).populate("user")
                break
            }

            case TypeFilter.LIKE: {
                tracks = await this.TrackModule.find({"name": {$regex: searchValue}}).sort({likes: -1, _id : 1}).skip(offset).limit(count).populate("user")
                break
            }

            

            default: {
                tracks = await this.TrackModule.find({"name": {$regex: searchValue}}).skip(offset).limit(count).populate("user")
                break
            }
        }

        return tracks
    }


    async getMyTracks(currentUser: currentUserType ,offset: number = 0, count: number = 10, searchValue: string, searchSelect: string): Promise<User> {
        const result = await this.userSerivce.getTracksFromUserWithFilter(currentUser ,offset, count, searchValue, searchSelect)
        return result
    }


    async deleteTrack(trackID: string, currentUserID: string) {

        const trackCandidate =  await this.TrackModule.findById(trackID).populate("user")


        if (!trackCandidate) {
            throw new HttpException("Трэк не найден", HttpStatus.NOT_FOUND)
        }

        if (trackCandidate.user._id.toString() !== currentUserID) {
            throw new HttpException("Нету доступа", HttpStatus.UNAUTHORIZED)
        }

        if (trackCandidate.audio) {
            await this.fileService.deleteFile(trackCandidate.audio)
        }

        if (trackCandidate.picture) {
            await this.fileService.deleteFile(trackCandidate.picture)
        }

        await trackCandidate.delete()

    }

    async addListen(trackID: string): Promise<Track> {
        const candidateTrack = await this.TrackModule.findById(trackID)
        candidateTrack.listens += 1
        return candidateTrack.save()
    }

    async getTrackById(trackID: string): Promise<Track> {


       try {
        const candidate = await this.TrackModule.findById(trackID).populate("user")


        if (!candidate) {
            throw new HttpException("Трек не найден", HttpStatus.NOT_FOUND)
        }

        return candidate
       } catch(e) {
           throw new HttpException("Трек не найден", HttpStatus.NOT_FOUND)
       }

    }

    async addComment(text: string, trackID: string, currentUserID: string): Promise<Comment> {
        const newComment = await (await this.CommentModule.create({track: new mongoose.Types.ObjectId(trackID), user: new mongoose.Types.ObjectId(currentUserID), text})).populate("user")
        return newComment
    }

    async removeComment(commentID: string, currentUserID) {
        const currentComment = await this.CommentModule.findById(commentID).populate("user")

        if (!currentComment) {
            throw new HttpException("Комментарий не найден", HttpStatus.NOT_FOUND )
        }

        if (currentComment.user._id.toString() !== currentUserID) {
            throw new HttpException("У вас нету доступа", HttpStatus.METHOD_NOT_ALLOWED )
        }

        currentComment.delete()

    }

    async downloadTrack(trackID: string): Promise<StreamableFile> {

        const candidateTrack = await this.TrackModule.findById(trackID)

        if (!candidateTrack) {
            throw new HttpException("Трэк не найден", HttpStatus.NOT_FOUND)
        }

        const file = this.fileService.downloadFile(candidateTrack.audio)

        return file
    }

    async addLike(trackID: string, currentUserID: currentUserType): Promise<Track> {
                
            const currentUser = await this.userSerivce.findUserById(currentUserID._id)
            const checkbyLike = await this.TrackModule.findById(trackID).where("likes").in([currentUser])
            

            if (checkbyLike) {
                throw new HttpException("Вы уже ставили лайк на данный трек", HttpStatus.BAD_REQUEST)
            }

            const candidateTrack =  await this.TrackModule.findById(trackID)

            if (!candidateTrack) {
                throw new HttpException("Трэк не найден", HttpStatus.NOT_FOUND)
            }

            candidateTrack.likes.push(currentUser)

            await candidateTrack.save()
            return candidateTrack
        

    }

    async deleteLike(trackID: string, currentUserDec: currentUserType, ): Promise<Track> {

        // const currentUser = await this.userSerivce.findUserById(currentUserDec._id)
        const candidateTrack = await this.TrackModule.findById(trackID).populate("user")

        // console.log(candidateTrack)
        // console.log(currentUserDec)

        const checkCurrentUserPutLike = await this.TrackModule.find({
            _id: trackID}).where("likes").in([new mongoose.Types.ObjectId(currentUserDec._id)])


        // 
        if (checkCurrentUserPutLike.length === 0) {
            throw new HttpException("Вы не можете убрать данный лайк", HttpStatus.BAD_REQUEST)
        }

        return await candidateTrack.updateOne({$pull: {likes: { $in: [currentUserDec]}}})
    }

    async getComments(trackID: string): Promise<Comment[]> {

        const trackCan = await this.TrackModule.findById(trackID)
        return await this.CommentModule.find().where("track").in([trackID]).populate("user")

    }

    async addTrackToUser(trackID: string, currentUser: currentUserType): Promise<Track> {
        try {

            const candidateTrack = await this.TrackModule.findById(trackID)
            const currentUserModel = await this.userSerivce.findUserById(currentUser._id)
            console.log("1")
            console.log(candidateTrack)
            console.log(currentUserModel)
            if (!candidateTrack) {
                throw new HttpException("Трэк не найден", HttpStatus.NOT_FOUND)
            }

            if (!currentUserModel) {
                throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND)
            }

            const doesUserHaveCurrentTrack = await this.userSerivce.doesUserHaveTrack(currentUser._id, trackID)
        
            if (doesUserHaveCurrentTrack) {
                throw new HttpException("Пользователь уже имеет данный трэк", HttpStatus.BAD_REQUEST)
            }

            const infoAddTrack = await this.TrackToUserModule.create({user: currentUserModel, track: candidateTrack})
            candidateTrack.trackToUser.push(infoAddTrack._id)
           
            currentUserModel.tracks.push(candidateTrack)
            await candidateTrack.save()
            await currentUserModel.save()
            return candidateTrack

        } catch(e) {
            throw new HttpException(`Произошла ошибка: ${e}`, HttpStatus.NOT_FOUND)
        }
    }

    async removeTrackFromUser(trackID: string, currentUser: currentUserType) {
        try {


            const currentUserModel = await this.userSerivce.findUserById(currentUser._id)



            if (!currentUserModel) {
                throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND)
            }

            const results = await this.TrackToUserModule.deleteOne({
                track: new mongoose.Types.ObjectId(trackID),
                user: new mongoose.Types.ObjectId(currentUser._id)
            })

            await currentUserModel.updateOne({$pull: {tracks: {$in: [trackID]}}})
            return "as" as any



        } catch(e) {
            throw new HttpException(`Произошла ошибка: ${e}`, HttpStatus.NOT_FOUND)
        }
    }

    async getTracksFromUser(userID: string, offset: number = 0, count: number = 10): Promise<User> {
        const result = await this.userSerivce.getTracksFromUser(userID, offset, count)
        return result
    }

    async getTracksFromAlbum(albumID: string, offset: number = 0, count: number = 10): Promise<Album> {
        const result = await this.albumService.getTracksFromAlbum(albumID, offset, count)
        return result
    }


    pullTracksFromUser(user: User): Track[] {
        return user.tracks
    }

    pullTracksFromAlbum(album: Album): Track[] {
        return album.tracks
    }

    async getLastUpdatesFriends(currentUser: currentUserType, offset: number): Promise<any[]> {
        let followingsID = (await this.userSerivce.findUserById(currentUser._id)).following
        const followings = await this.TrackToUserModule.find()
                        .where("user").in(followingsID)
                        .skip(offset)
                        .limit(15)
                        .sort({createdAt: -1})
                        .populate("track")
                        .populate({path: "user", select: "imageURL email username"})
        

        let currentUserInArray
        let sortFollowings: any = []

        followings.forEach(follow => {
            if (follow.user.username === currentUserInArray) {
                sortFollowings[sortFollowings.length - 1].push(follow)
            } else {
                currentUserInArray = follow.user.username
                sortFollowings.push([])
                sortFollowings[sortFollowings.length - 1].push(follow)
            }
        })

        

        
        return sortFollowings
    }
}