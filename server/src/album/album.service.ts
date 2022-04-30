import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Post } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Album, AlbumDocument } from "./schemas/album.schema"
import { Model } from "mongoose"
import { CreateAlbumDto } from "./dto/createAlbum.dto"
import { currentUserType } from "../user/type/currentUser.interface"
import { FileService } from "../file/file.service"
import { TypesFile } from "../file/types/typeFile.enum"
import { TrackService } from "../track/track.service"
import { UserService } from "../user/user.service"
import { AlbumComment, AlbumCommentDocument } from "./schemas/albumComments.schema"
import { TypeFilter } from "../types/filter.enum"
import { User } from "../user/schemas/user.schema"
import mongoose from "mongoose";

@Injectable()
export class AlbumService {

    constructor(

        @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
        @InjectModel(AlbumComment.name) private albumCommentModel: Model<AlbumCommentDocument>,
        private readonly fileService: FileService,
        private readonly userService: UserService,
        @Inject(forwardRef(() => TrackService)) private readonly trackService: TrackService,
    ) { }

    async getAlbums(offset: number = 0, count: number = 10, searchValue: string, searchSelect: string): Promise<Album[]> {

        let albums

        switch (searchSelect) {
            case TypeFilter.CREATE:

                albums = await this.albumModel.find({ "name": { $regex: searchValue } }).sort({ date: -1, _id : 1 }).skip(offset).limit(count).populate("user")
                
                break;

            case TypeFilter.CREATOR:
                albums = await this.albumModel.find({ "name": { $regex: searchValue } }).sort({ user: -1, _id : 1 }).skip(offset).limit(count).populate("user")
                break;
// 
            case TypeFilter.LIKE:
                albums = await this.albumModel.find({ "name": { $regex: searchValue } }).sort({ likes: -1, _id : 1 }).skip(offset).limit(count).populate("user")
                break;

            case TypeFilter.NAME: {
                albums = await this.albumModel.find({ "name": { $regex: searchValue } }).sort({ name: 1, _id : 1}).skip(offset).limit(count).populate("user")
                break;
            }

            default:
                albums = await this.albumModel.find({ "name": { $regex: searchValue } }).skip(offset).limit(count).populate("user")
                break;
        }

        return albums
    }

    async getMyAlbums(currentUser: currentUserType, offset: number = 0, count: number = 10, searchValue: string, searchSelect: string): Promise<User> {
        const user = await this.userService.getMyAlbums(currentUser , offset, count, searchValue, searchSelect)
        return user
    }

    pullAlbums(user: User): Album[] {
        return user.albums
    }

    async getAlbumByID(albumID: string): Promise<Album> {
        try {
            const candidateAlbum = await this.albumModel.findById(albumID).populate("user")
            if (!candidateAlbum) {
                throw new HttpException("Альбом не найден", HttpStatus.NOT_FOUND)
            }

            return candidateAlbum
        } catch (e) {
            throw new HttpException("Альбом не найден", HttpStatus.NOT_FOUND)
        }
    }

    async createAlbum(createAlbumDto: CreateAlbumDto, currentUser: currentUserType, fileAvatar: Express.Multer.File): Promise<Album> {

        let pathAvatarAlbum = ""

        if (fileAvatar) {
            pathAvatarAlbum = await this.fileService.createFile(TypesFile.IMAGE_ALBUM, fileAvatar)
        }

        const newAlbum = await this.albumModel.create(
            {
                name: createAlbumDto.name,
                describe: createAlbumDto.description || "",
                isShowInRecommendation: createAlbumDto.isShowInRecommendation,
                imageURL: pathAvatarAlbum,
                user: currentUser._id
            }
        )

        return newAlbum
    }

    async deleteAlbum(albumID: string, currentUser: currentUserType) {
        const candidateAlbum = await this.albumModel.findById(albumID).populate("user")

        if (!candidateAlbum) {
            throw new HttpException("Альбом не найден", HttpStatus.NOT_FOUND)
        }

        if (currentUser._id !== candidateAlbum.user._id.toString()) {
            throw new HttpException("У вас нету права удалить данный альбом", HttpStatus.FORBIDDEN)
        }

        this.fileService.deleteFile(candidateAlbum.imageURL)

        return await candidateAlbum.delete()
    }

    async addTrackToAlbum(trackID: string, albumID: string, currentUser: currentUserType): Promise<Album> {

        const candidateAlbum = await this.albumModel.findById(albumID).populate("user")


        if (!candidateAlbum) {
            throw new HttpException("Альбом не найден", HttpStatus.NOT_FOUND)
        }

        if (candidateAlbum.user._id.toString() !== currentUser._id) {
            throw new HttpException("У вас нету прав добавить музыку в этот альбом", HttpStatus.FORBIDDEN)
        }

        const candidateTrack = await this.trackService.getTrackById(trackID)

        if (!candidateTrack) {
            throw new HttpException("Песня не найдена", HttpStatus.NOT_FOUND)
        }

        const doesAlbumHaveCurrentTrack = await this.albumModel.findById(albumID).where("tracks").in([trackID])

        if (doesAlbumHaveCurrentTrack) {
            throw new HttpException("Данная песня уже существует в альбоме", HttpStatus.BAD_REQUEST)
        }

        candidateAlbum.tracks.push(candidateTrack)
        return await candidateAlbum.save()
    }

    async deleteTrackFromAlbum(albumID: string, trackID: string, currentUser: currentUserType) {
        const currentAlbum = await this.albumModel.findById(albumID).populate("user")

        if (!currentAlbum) {
            throw new HttpException("Альбом не найден", HttpStatus.NOT_FOUND)
        }

        if (currentAlbum.user._id.toString() !== currentUser._id) {
            throw new HttpException("У вас нету прав для удаления трека", HttpStatus.FORBIDDEN)
        }

        const doesAlbumHaveCurrentTrack = await this.albumModel.findById(albumID).where("tracks").in([trackID])

        if (!doesAlbumHaveCurrentTrack) {
            throw new HttpException("Данный альбом не имеет такого трека", HttpStatus.NOT_FOUND)
        }

        return await currentAlbum.updateOne({ $pull: { tracks: { $in: [trackID] } } })

    }

    async addLike(albumID: string, currentUser: currentUserType): Promise<Album> {
        let currentAlbum
        try {
            currentAlbum = await this.albumModel.findOne({ _id: albumID })
        } catch (e) {
            if (!currentAlbum) {
                throw new HttpException("Альбом не найден", HttpStatus.NOT_FOUND)
            }
        }




        const didCurrentUserPutLike = await this.albumModel.findById(albumID).where("likes").in([currentUser._id])

        if (didCurrentUserPutLike) {
            throw new HttpException("Данный пользователь уже ставил лайк", HttpStatus.BAD_REQUEST)
        }

        const candidateCurrentUser = await this.userService.findUserById(currentUser._id)

        currentAlbum.likes.push(candidateCurrentUser)

        return currentAlbum.save()

    }

    async removeLikeFromAlbum(albumID: string, currentUser: currentUserType) {
        const candidateAlbum = await this.albumModel.findById(albumID).populate("user")

        const checkCurrentUserPutLike = await this.albumModel.find({
            _id: albumID}).where("likes").in([new mongoose.Types.ObjectId(currentUser._id)])



        if (checkCurrentUserPutLike.length === 0) {
            throw new HttpException("Вы не можете убрать данный лайк", HttpStatus.BAD_REQUEST)
        }

        return await candidateAlbum.updateOne({ $pull: { likes: { $in: [currentUser._id] } } })
    }

    async getTracksFromAlbum(albumID: string, offset: number = 0, count: number = 10): Promise<Album> {
        return await this.albumModel.findById(albumID).populate({ path: "tracks", populate: { path: "user" } })
    }

    async addAlbumToUser(albumID: string, currentUser: currentUserType): Promise<Album> {
        try {
            const currentUserCandidate = await this.userService.findUserById(currentUser._id)
            const currentAlbumCandidate = await this.albumModel.findById(albumID)

            // console.log(currentAlbumCandidate)

            if (!currentUserCandidate || !currentAlbumCandidate) {
                throw new HttpException("Пользователь или альбом не найден", HttpStatus.NOT_FOUND)
            }

            const doesCurrentUserHaveCurrentAlbum = await currentUserCandidate.populate({ path: "albums", match: { _id: { $in: currentAlbumCandidate._id } } })

            console.log(doesCurrentUserHaveCurrentAlbum.albums.length !== 0)

            if (doesCurrentUserHaveCurrentAlbum.albums.length !== 0) {
                throw new HttpException("Пользователь уже имеет данный альбом", HttpStatus.BAD_REQUEST)
            }

            currentUserCandidate.albums.push(currentAlbumCandidate)

            await currentUserCandidate.save()

            return currentAlbumCandidate
        } catch (e) {
            throw new HttpException(e, HttpStatus.NOT_FOUND)
        }
    }

    async removeAlbumFromUser(albumID: string, currentUser: currentUserType): Promise<Album> {
        try {
            const currentUserCandidate = await this.userService.findUserById(currentUser._id)
            const currentAlbumCandidate = await this.albumModel.findById(albumID)

            // console.log(currentAlbumCandidate)

            if (!currentUserCandidate || !currentAlbumCandidate) {
                throw new HttpException("Пользователь или альбом не найден", HttpStatus.NOT_FOUND)
            }

            const doesCurrentUserHaveCurrentAlbum = await currentUserCandidate.populate({ path: "albums", match: { _id: { $in: currentAlbumCandidate._id } } })


            if (doesCurrentUserHaveCurrentAlbum.albums.length === 0) {
                throw new HttpException("Пользователь не имеет данный альбом", HttpStatus.BAD_REQUEST)
            }

            await currentUserCandidate.updateOne({ $pull: { albums: { $in: [currentAlbumCandidate._id] } } })


            return currentAlbumCandidate
        } catch (e) {
            throw new HttpException(e, HttpStatus.NOT_FOUND)
        }
    }

    async addCommentToAlbum(currentUser: currentUserType, albumID: string, text: string): Promise<AlbumComment> {

        try {

            const currentUserCandidate = await this.userService.findUserById(currentUser._id)
            const albumCandidate = await this.albumModel.findById(albumID)

            if (!currentUserCandidate || !albumCandidate) {
                throw new HttpException("Пользователь или альбом не найден", HttpStatus.NOT_FOUND)
            }

            const newCommentByAlbum = await this.albumCommentModel.create({ user: currentUserCandidate, album: albumCandidate, text })

            return newCommentByAlbum.save()

        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async removeCommentFromAlbum(commentID: string, currentUser: currentUserType) {

        try {

            const currentUserCandidate = await this.userService.findUserById(currentUser._id)
            const candidateComment = await this.albumCommentModel.findById(commentID).populate("user")


            if (!currentUserCandidate || !candidateComment) {
                throw new HttpException("Комментарий или пользователь не найден", HttpStatus.NOT_FOUND)
            }

            if (candidateComment.user._id.toString() !== currentUser._id) {
                throw new HttpException("Нету прав для удаления данного комментария", HttpStatus.FORBIDDEN)
            }

            await candidateComment.delete()

        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async getCommentsFromAlbum(albumID: string, offset: number, count: number): Promise<AlbumComment[]> {
        const result = await this.albumCommentModel.find().where("album").in([albumID]).skip(offset).limit(count).populate("user")
        return result
    }

}
