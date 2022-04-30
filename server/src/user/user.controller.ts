import { Controller, Delete, Get, Param, Put, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service"
import { User } from "./schemas/user.schema"
import { ParseIntoIntPipe } from "../pipes/parseIntoInt.pipe"
import { AuthGuard } from "../auth/guards/auth.guard"
import { currentUserType } from "./type/currentUser.interface"
import { CurrentUser } from "../auth/decorators/user.decorator"
import { Album } from "../album/schemas/album.schema"
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("users")
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    async getAllUsers(
        @Query("offset", ParseIntoIntPipe) offset: number | null,
        @Query("count", ParseIntoIntPipe) count: number | null,
        @Query("searchValue") searchValue: string | null | undefined,
        @Query("searchSelect") searchSelect: string | null | undefined,
    ): Promise<User[]> {
        return await this.userService.findAllUser(offset, count, searchValue || "", searchSelect || "")
    }

    @Get("followers/:userID")
    async getFollowersFromUser(
        @Param("userID") userID: string,
        @Query("offset", ParseIntoIntPipe) offset: number | null
    ): Promise<User[]> {
        const userWithFollowers = await this.userService.getFollowersFromUser(userID, offset || 0)
        return this.userService.preparingFollowersFromUser(userWithFollowers)
    }

    @Get("followings/:userID")
    async getFollowingsFromUser(
        @Param("userID") userID: string,
        @Query("offset", ParseIntoIntPipe) offset: number | null
    ): Promise<User[]> {
        const userWithFollowings = await this.userService.getFollowingsFromUser(userID, offset || 0)
        return this.userService.preparingFollowingFromUser(userWithFollowings)
    }

    @Get("albums/:userID")
    async getAlbumsFromUser(
        @Param("userID") userID: string,
        @Query("offset", ParseIntoIntPipe) offset: number | null
    ): Promise<Album[]> {
        const result = await this.userService.getAlbumsFromUser(userID, offset || 0)
        return this.userService.preparingAlbumsFromUser(result)
    }




    @Get(":userID")
    async getUserByID(
        @Param("userID") userID: string
    ): Promise<User> {
        return await this.userService.findUserById(userID)
    }



    @Put("follow/:userID")
    @UseGuards(AuthGuard)
    async followUser(
        @Param("userID") userID: string,
        @CurrentUser() currentUser: currentUserType
    ): Promise<User> {
        return await this.userService.followUser(userID, currentUser)
    }

    @Delete("unfollow/:userID")
    @UseGuards(AuthGuard)
    async unfollowUser(
        @Param("userID") userID: string,
        @CurrentUser() currentUser: currentUserType
    ): Promise<User> {
        return await this.userService.unfollowUser(userID, currentUser) 
    }

    @Put("change-avatar")
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('avatar'))
    async changeAvatarOfUser(
        @UploadedFile() avatar: Express.Multer.File,
        @CurrentUser() currentUser: currentUserType
    ): Promise<string> {
        const result = await this.userService.changeAvatarOfUser(avatar, currentUser)
        return result
    }

    

}