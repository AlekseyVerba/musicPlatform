import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema"
import { Model } from "mongoose"
import { CreateUserInterface } from "./type/createUser.interface"
import { currentUserType } from "./type/currentUser.interface"
import { Album } from "src/album/schemas/album.schema";
import { TypeFilter } from "../types/filter.enum"
import { FileService } from "../file/file.service"
import { TypesFile } from ".././file/types/typeFile.enum"
import HelpFunctions from "../helpFunctions/"


@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly fileService: FileService
    ) {}

    async createUser(userInfo: CreateUserInterface): Promise<User> {
        const newUser = await this.userModel.create({username: userInfo.username, email: userInfo.email, password: userInfo.password})
        return newUser
    }

    async findAllUser(offset: number = 0, count: number = 10, searchValue: string, searchSelect: string): Promise<User[]> {

        let users

        switch (searchSelect) {
            case TypeFilter.CREATE:
                users = await this.userModel.find({ "username": { $regex: searchValue } }).sort({date: -1, _id: 1}).skip(offset).limit(count)
                break;

            case TypeFilter.NAME: {
                users = await this.userModel.find({ "username": { $regex: searchValue } }).sort({username: -1, _id: 1}).skip(offset).limit(count)
                break;
            }

            case TypeFilter.FOLLOWERS: {
                users = await this.userModel.find({ "username": { $regex: searchValue } }).sort({followers: -1, _id: 1}).skip(offset).limit(count)
                break;
            }

            case TypeFilter.FOLLOWINGS: {
                users = await this.userModel.find({ "username": { $regex: searchValue } }).sort({following: -1, _id: 1}).skip(offset).limit(count)
                break;
            }
        
            default:
                users = await this.userModel.find({ "username": { $regex: searchValue } }).skip(offset).limit(count)
                break;
        }

        return users
    }

    async findUserById(userID: string): Promise<UserDocument> {
        return await this.userModel.findById(userID)
    }

    async doesUserHaveTrack(userID: string, trackID):Promise<UserDocument> {
        return await this.userModel.findById(userID).where("tracks").in([trackID])
    }

    async findUserByEmail(email: string, password?: boolean): Promise<User> {
        if (password) {
            return await this.userModel.findOne({email}).select("+password")
        } else {
            return await this.userModel.findOne({email})
        }
        
    }

    async findUserByUsername(username: string): Promise<User> {
        return await this.userModel.findOne({username})
    }
    
    async followUser(userID: string, currentUser: currentUserType): Promise<User> {
        try {

            const currentCandidate = await this.userModel.findById(userID).populate("followers")

            if (!currentCandidate) {
                throw new HttpException(`Пользователь не найден`, HttpStatus.NOT_FOUND)
            }

            const currentUserCandidate = await this.userModel.findById(currentUser._id).populate("following")

            if (!currentUserCandidate) {
                throw new HttpException(`Текущий пользователь не найден`, HttpStatus.NOT_FOUND)
            }

            const doesCurrentCandidateHaveFollowerCurrentUser = await this.userModel.findById(userID).where("followers").in([currentUserCandidate])

            console.log(doesCurrentCandidateHaveFollowerCurrentUser)

            if (doesCurrentCandidateHaveFollowerCurrentUser) {
                throw new HttpException(`Вы уже подписаны на данного пользователя`, HttpStatus.NOT_FOUND)
            }

            const doesCurrentUserFollowingOnUserCandidate = await this.userModel.findById(currentUser._id).where("following").in([currentCandidate])

            if (doesCurrentUserFollowingOnUserCandidate) {
                throw new HttpException(`Вы уже подписаны на данного пользователя`, HttpStatus.NOT_FOUND)
            }

            currentCandidate.followers.push(currentUserCandidate)
            currentUserCandidate.following.push(currentCandidate)
            await currentCandidate.save()
            return await currentUserCandidate.save()

        } catch(e) {
            throw new HttpException(`Произошла ошибка: ${e}`, HttpStatus.NOT_FOUND)
        }
    }

    async unfollowUser(userID: string, currentUser: currentUserType): Promise<User> {
        try {

            const candidateUser = await this.userModel.findById(userID).where("followers").in([currentUser._id])
            console.log(candidateUser)
            if (!candidateUser) {
                throw new HttpException("Вы не подписаны на данного пользователя", HttpStatus.NOT_FOUND)
            }

            const candidateCurrentUser = await this.userModel.findById(currentUser._id).where("following").in([candidateUser.id])
            console.log(candidateCurrentUser)
            if (!candidateCurrentUser) {
                throw new HttpException("Вы не подписаны на данного пользователя", HttpStatus.NOT_FOUND)
            }

            await candidateUser.updateOne({$pull: {followers: {$in: [candidateCurrentUser.id]}}})
            await candidateCurrentUser.updateOne({$pull: {following: {$in: [candidateUser.id]}}})
            return await candidateCurrentUser
        } catch(e) {
            throw new HttpException(`Произошла ошибка: ${e}`, HttpStatus.NOT_FOUND)
        }
    }

    async getTracksFromUser(userID: string, offset: number = 0, count: number = 10): Promise<User> {
        return await this.userModel.findById(userID).populate({path: "tracks", options: {
            limit: count,
            sort: { created: -1},
            skip: offset
    
        },
        populate: "user"
        })
    }

    async getTracksFromUserWithFilter(currentUser: currentUserType ,offset: number = 0, count: number = 10, searchValue: string, searchSelect: string): Promise<User> {
        
        const populate = HelpFunctions.createPopulateFilter("tracks", offset, count, searchValue, searchSelect)
        return await this.userModel.findById(currentUser._id).populate(populate).select("tracks")
    }

    async getMyAlbums(currentUser: currentUserType, offset: number, count: number, searchValue: string, searchSelect: string): Promise<User> {

        const populate = HelpFunctions.createPopulateFilter("albums", offset, count, searchValue, searchSelect)
        return await this.userModel.findById(currentUser._id).populate(populate).select("albums")

    }

    async getFollowersFromUser(userID: string, offset: number): Promise<User> {
        try {

            return await this.userModel.findById(userID).populate({path:"followers", options: {
                limit: 10,
                sort: { created: -1},
                skip: offset
        
            }})

        } catch(e) {
            throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND)
        }
    }

    preparingFollowersFromUser(user: User):User[] {
        return user.followers
    }

    async getFollowingsFromUser(userID: string, offset: number): Promise<User> {
        try {

            return await this.userModel.findById(userID).populate({path:"following", options: {
                limit: 10,
                sort: { created: -1},
                skip: offset
        
            }})

        } catch(e) {
            throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND)
        }
    }

    preparingFollowingFromUser(user: User):User[] {
        return user.following
    }

    async getAlbumsFromUser(userID: string, offset: number): Promise<User> {
        try {

            return await this.userModel.findById(userID).populate({path:"albums", options: {
                limit: 10,
                sort: { created: -1},
                skip: offset
        
            },
            populate: {
                path: "user"
            }
        })

        } catch(e) {
            throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND)
        }
    }

    preparingAlbumsFromUser(user: User):Album[] {
        return user.albums
    }

    async changeAvatarOfUser(avatar: Express.Multer.File, currentUser: currentUserType): Promise<string> {

            if (!avatar) {
                throw new HttpException("Фото должно быть обязательно", HttpStatus.BAD_REQUEST)
            }

            const currentUserCandidate = await this.userModel.findById(currentUser._id)

            if (!currentUserCandidate) {
                throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND)
            }

            const urlFile = await this.fileService.createFile(TypesFile.AVATAR_USER, avatar)
            console.log(urlFile)
            currentUserCandidate.imageURL = urlFile
            await currentUserCandidate.save()

            return urlFile

        
    }



}
// skip(offset).limit(count)