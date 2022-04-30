import { userReducer } from "./userReducer"
import { combineReducers } from "redux"
import { trackReducer } from "./trackReducer"
import { createTrackReducer } from "./createTrackReducer/"
import { playerReducer } from "./playerReducer"
import { albumReducer } from "./albumReducer/"
import { userListReducer } from "./usersListReducer"
import { createAlbumReducer } from "./createAlbumReducer"
import { currentAlbumReducer } from "./currentAlbumReducer"
import { currentProfileRedcuer } from "./currentProfileReducer"
import { filterReducer } from "./fileReducer"
import { tracksFromFollowing } from "./tracksFromFollowing"

export const rootReducer = combineReducers({
    user: userReducer,
    tracks: trackReducer,
    createTrack: createTrackReducer,
    player: playerReducer,
    albums: albumReducer,
    userList: userListReducer,
    createAlbum: createAlbumReducer,
    currentAlbum: currentAlbumReducer,
    currentProfile: currentProfileRedcuer,
    filter: filterReducer,
    tracksFromFollowing: tracksFromFollowing
})

export type RootState = ReturnType<typeof rootReducer>